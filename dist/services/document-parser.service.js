"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromPdfBuffer = extractTextFromPdfBuffer;
exports.parseDocumentPayload = parseDocumentPayload;
// Polyfills for serverless environments (e.g. Vercel Linux) where canvas/DOMMatrix is absent
if (typeof globalThis.DOMMatrix === "undefined") {
    globalThis.DOMMatrix = class DOMMatrix {
    };
}
if (typeof globalThis.ImageData === "undefined") {
    globalThis.ImageData = class ImageData {
    };
}
if (typeof globalThis.Path2D === "undefined") {
    globalThis.Path2D = class Path2D {
    };
}
/**
 * Robust helper to extract text from a PDF Buffer.
 * Supports both pdf-parse v2 class constructor (new PDFParse({ data }))
 * and pdf-parse v1 function invocation, plus fallback text extraction.
 */
async function extractTextFromPdfBuffer(buffer) {
    let pdfParseModule = null;
    try {
        pdfParseModule = await Promise.resolve().then(() => __importStar(require("pdf-parse")));
    }
    catch (impErr) {
        console.warn("Dynamic import of pdf-parse failed:", impErr?.message || impErr);
    }
    // 1. Try class-based PDFParse (pdf-parse v2)
    if (pdfParseModule) {
        try {
            const PDFParseClass = pdfParseModule.PDFParse;
            if (typeof PDFParseClass === "function") {
                const parser = new PDFParseClass({ data: buffer });
                await parser.load();
                const res = await parser.getText();
                if (typeof res === "string" && res.trim())
                    return res.trim();
                if (res && typeof res.text === "string" && res.text.trim())
                    return res.text.trim();
            }
        }
        catch (err) {
            console.warn("PDFParse class extraction attempt:", err?.message || err);
        }
    }
    // 2. Try function-based pdfParse (pdf-parse v1)
    try {
        const fn = pdfParseModule.default || pdfParseModule;
        if (typeof fn === "function") {
            const res = await fn(buffer);
            if (typeof res === "string" && res.trim())
                return res.trim();
            if (res && typeof res.text === "string" && res.text.trim())
                return res.text.trim();
        }
    }
    catch (err2) {
        console.warn("Function-based pdfParse fallback:", err2?.message || err2);
    }
    // 3. Fallback: stream text extraction from raw buffer
    try {
        const raw = buffer.toString("latin1");
        const textChunks = [];
        const textMatches = raw.match(/\(([^()]{2,})\)\s*T[jJ]/g);
        if (textMatches && textMatches.length > 0) {
            for (const m of textMatches) {
                const cleaned = m.replace(/^\(/, "").replace(/\)\s*T[jJ]$/, "").trim();
                if (cleaned.length > 1)
                    textChunks.push(cleaned);
            }
            if (textChunks.length > 0) {
                return textChunks.join(" ");
            }
        }
    }
    catch (rawErr) {
        console.warn("Raw PDF stream extraction failed:", rawErr);
    }
    return "";
}
async function parseDocumentPayload(name = "", type = "", base64 = "") {
    const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");
    let text = "";
    const lowerName = name.toLowerCase();
    if (lowerName.endsWith(".pdf") || type === "application/pdf") {
        text = await extractTextFromPdfBuffer(buffer);
    }
    else {
        text = buffer.toString("utf-8");
    }
    text = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return { text, wordCount, name };
}
