import fs from "fs";
import path from "path";
import { StoredLibraryDoc } from "../types/ai.types";

const DATA_DIR = process.env.VERCEL ? "/tmp" : path.resolve(process.cwd(), "data");
const LIBRARY_FILE = path.resolve(DATA_DIR, "knowledge_library.json");

export function loadLibraryFromDisk(): StoredLibraryDoc[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LIBRARY_FILE)) {
      const seedFile = path.resolve(process.cwd(), "data", "knowledge_library.json");
      if (fs.existsSync(seedFile)) {
        try {
          const seedContent = fs.readFileSync(seedFile, "utf-8");
          fs.writeFileSync(LIBRARY_FILE, seedContent, "utf-8");
          return JSON.parse(seedContent) || [];
        } catch {
          // fallback to empty
        }
      }
      fs.writeFileSync(LIBRARY_FILE, JSON.stringify([]), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(LIBRARY_FILE, "utf-8");
    return JSON.parse(raw) || [];
  } catch (err) {
    console.error("Error reading knowledge library from disk:", err);
    return [];
  }
}

export function saveLibraryToDisk(docs: StoredLibraryDoc[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LIBRARY_FILE, JSON.stringify(docs, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing knowledge library to disk:", err);
    return false;
  }
}

/**
 * Searches the student's saved library documents and retrieves relevant passages.
 * Filters strictly by userId to preserve user privacy and data separation.
 */
export function findRelevantLibraryPassages(
  query: string,
  userId?: string,
  selectedDocId?: string,
  subject?: string
): Array<{ doc: StoredLibraryDoc; passage: string; score: number }> {
  if (!query || !query.trim()) return [];
  const allDocs = loadLibraryFromDisk();

  // Strict user isolation
  let userDocs = userId ? allDocs.filter((d) => d.userId === userId) : allDocs;
  if (selectedDocId) {
    userDocs = userDocs.filter((d) => d.id === selectedDocId);
  } else if (subject && subject !== "general") {
    const subjectDocs = userDocs.filter(
      (d) => d.subject?.toLowerCase() === subject.toLowerCase()
    );
    if (subjectDocs.length > 0) userDocs = subjectDocs;
  }

  if (userDocs.length === 0) return [];

  const queryTerms = query
    .toLowerCase()
    .replace(/[?!.,'"]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (queryTerms.length === 0) return [];

  const matches: Array<{ doc: StoredLibraryDoc; passage: string; score: number }> = [];

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