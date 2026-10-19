import * as pdfParseModule from "pdf-parse";

/**
 * Robust helper to extract text from a PDF Buffer.
 * Supports both pdf-parse v2 class constructor (new PDFParse({ data }))
 * and pdf-parse v1 function invocation, plus fallback text extraction.
 */
export async function extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
  // 1. Try class-based PDFParse (pdf-parse v2)
  try {
    const PDFParseClass = (pdfParseModule as any).PDFParse;
    if (typeof PDFParseClass === "function") {
      const parser = new PDFParseClass({ data: buffer });
      await parser.load();
      const res = await parser.getText();
      if (typeof res === "string" && res.trim()) return res.trim();
      if (res && typeof res.text === "string" && res.text.trim()) return res.text.trim();
    }
  } catch (err: any) {
    console.warn("PDFParse class extraction attempt:", err?.message || err);
  }

  // 2. Try function-based pdfParse (pdf-parse v1)
  try {
    const fn = (pdfParseModule as any).default || pdfParseModule;
    if (typeof fn === "function") {
      const res = await fn(buffer);
      if (typeof res === "string" && res.trim()) return res.trim();
      if (res && typeof res.text === "string" && res.text.trim()) return res.text.trim();
    }
  } catch (err2: any) {
    console.warn("Function-based pdfParse fallback:", err2?.message || err2);
  }

  // 3. Fallback: stream text extraction from raw buffer
  try {
    const raw = buffer.toString("latin1");
    const textChunks: string[] = [];
    const textMatches = raw.match(/\(([^()]{2,})\)\s*T[jJ]/g);
    if (textMatches && textMatches.length > 0) {
      for (const m of textMatches) {
        const cleaned = m.replace(/^\(/, "").replace(/\)\s*T[jJ]$/, "").trim();
        if (cleaned.length > 1) textChunks.push(cleaned);
      }
      if (textChunks.length > 0) {
        return textChunks.join(" ");
      }
    }
  } catch (rawErr) {
    console.warn("Raw PDF stream extraction failed:", rawErr);
  }

  return "";
}

export async function parseDocumentPayload(name: string = "", type: string = "", base64: string = ""): Promise<{
  text: string;
  wordCount: number;
  name: string;
}> {
  const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "");
  const buffer = Buffer.from(cleanBase64, "base64");

  let text = "";
  const lowerName = name.toLowerCase();
  if (lowerName.endsWith(".pdf") || type === "application/pdf") {
    text = await extractTextFromPdfBuffer(buffer);
  } else {
    text = buffer.toString("utf-8");
  }

  text = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return { text, wordCount, name };
}
