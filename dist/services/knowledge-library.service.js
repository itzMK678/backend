"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLibraryFromDisk = loadLibraryFromDisk;
exports.saveLibraryToDisk = saveLibraryToDisk;
exports.findRelevantLibraryPassages = findRelevantLibraryPassages;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_DIR = process.env.VERCEL ? "/tmp" : path_1.default.resolve(process.cwd(), "data");
const LIBRARY_FILE = path_1.default.resolve(DATA_DIR, "knowledge_library.json");
function loadLibraryFromDisk() {
    try {
        if (!fs_1.default.existsSync(DATA_DIR)) {
            fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
        }
        if (!fs_1.default.existsSync(LIBRARY_FILE)) {
            const seedFile = path_1.default.resolve(process.cwd(), "data", "knowledge_library.json");
            if (fs_1.default.existsSync(seedFile)) {
                try {
                    const seedContent = fs_1.default.readFileSync(seedFile, "utf-8");
                    fs_1.default.writeFileSync(LIBRARY_FILE, seedContent, "utf-8");
                    return JSON.parse(seedContent) || [];
                }
                catch {
                    // fallback to empty
                }
            }
            fs_1.default.writeFileSync(LIBRARY_FILE, JSON.stringify([]), "utf-8");
            return [];
        }
        const raw = fs_1.default.readFileSync(LIBRARY_FILE, "utf-8");
        return JSON.parse(raw) || [];
    }
    catch (err) {
        console.error("Error reading knowledge library from disk:", err);
        return [];
    }
}
function saveLibraryToDisk(docs) {
    try {
        if (!fs_1.default.existsSync(DATA_DIR)) {
            fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs_1.default.writeFileSync(LIBRARY_FILE, JSON.stringify(docs, null, 2), "utf-8");
        return true;
    }
    catch (err) {
        console.error("Error writing knowledge library to disk:", err);
        return false;
    }
}
/**
 * Searches the student's saved library documents and retrieves relevant passages.
 * Filters strictly by userId to preserve user privacy and data separation.
 */
function findRelevantLibraryPassages(query, userId, selectedDocId, subject) {
    if (!query || !query.trim())
        return [];
    const allDocs = loadLibraryFromDisk();
    // Strict user isolation
    let userDocs = userId ? allDocs.filter((d) => d.userId === userId) : allDocs;
    if (selectedDocId) {
        userDocs = userDocs.filter((d) => d.id === selectedDocId);
    }
    else if (subject && subject !== "general") {
        const subjectDocs = userDocs.filter((d) => d.subject?.toLowerCase() === subject.toLowerCase());
        if (subjectDocs.length > 0)
            userDocs = subjectDocs;
    }
    if (userDocs.length === 0)
        return [];
    const queryTerms = query
        .toLowerCase()
        .replace(/[?!.,'"]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 2);
    if (queryTerms.length === 0)
        return [];
    const matches = [];
    for (const doc of userDocs) {
        const paragraphs = (doc.extractedText || "")
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter((p) => p.length > 30);
        for (const paragraph of paragraphs) {
            const lowerP = paragraph.toLowerCase();
            let score = 0;
            for (const term of queryTerms) {
                if (lowerP.includes(term)) {
                    score += 1;
                }
            }
            if (doc.chapter && query.toLowerCase().includes(doc.chapter.toLowerCase())) {
                score += 3;
            }
            if (doc.bookName && query.toLowerCase().includes(doc.bookName.toLowerCase())) {
                score += 2;
            }
            if (score >= 2 || (queryTerms.length <= 2 && score >= 1)) {
                matches.push({
                    doc,
                    passage: paragraph.length > 1200 ? paragraph.slice(0, 1200) + "..." : paragraph,
                    score,
                });
            }
        }
    }
    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, 2);
}
