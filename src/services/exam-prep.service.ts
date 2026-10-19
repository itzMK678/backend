import { ExamPrepRequest } from "../types/exam.types";
import { generateAIResponse } from "./gemini.service";
import { generateDirectExamPrepFallback } from "../generators/exam-fallback.generator";
import { searchEducationalWeb } from "./web-research.service";
import { loadLibraryFromDisk } from "./knowledge-library.service";
import { WebSearchResult } from "../types/ai.types";

export async function generateExamPreparation(body: ExamPrepRequest) {
  const {
    tool = "full-mock",
    targetExam = "matric",
    subject = "biology",
    topic = "General Syllabus",
    chapter,
    questionCount = 20,
    difficulty = "intermediate",
    language = "en",
    timeLimitMinutes,
    syllabusText,
    syllabusFileName,
    enableWebResearch,
    userId,
    libraryDocId,
  } = body;

  const effectiveTopic = chapter ? `${chapter} — ${topic}` : topic;

  // Retrieve user's syllabus document from library if specified
  let injectedSyllabus = syllabusText || "";
  let injectedFileName = syllabusFileName || "";
  if (libraryDocId && !injectedSyllabus) {
    try {
      const allDocs = loadLibraryFromDisk();
      const matched = allDocs.find((d) => d.id === libraryDocId && (!userId || d.userId === userId));
      if (matched) {
        injectedSyllabus = matched.extractedText.slice(0, 15000);
        injectedFileName = matched.bookName || matched.title || matched.fileName;
      }
    } catch (libErr) {
      console.warn("Exam-prep library lookup warning:", libErr);
    }
  }

  // Web research if requested
  let retrievedWebSources: WebSearchResult[] = [];
  if (enableWebResearch) {
    try {
      retrievedWebSources = await searchEducationalWeb(`${targetExam} ${subject} ${effectiveTopic} exam syllabus`, 3);
    } catch (searchErr) {
      console.warn("Exam-prep web search warning:", searchErr);
    }
  }

  const systemInstruction = `You are the FAI AVENIQ Official Exam Preparation and Examination Board Simulation Engine.
Your mission is to generate authoritative, syllabus-aligned, and academically rigorous examination resources for ${targetExam.toUpperCase()} candidates.

ACADEMIC INTEGRITY DIRECTIVE:
These questions are syllabus-aligned practice resources developed to mirror official examination formats, standards, and difficulty.
Ground questions directly in standard board curricula or any attached syllabus documents.`;

  const examPrompt = `Generate a comprehensive exam resource for:
EXAM: ${targetExam}
SUBJECT: ${subject}
TOPIC: ${effectiveTopic}
TOOL: ${tool}
QUESTIONS: ${questionCount}
DIFFICULTY: ${difficulty}
TIME LIMIT: ${timeLimitMinutes || 45} mins
${injectedSyllabus ? `\nSYLLABUS CONTENT ("${injectedFileName}"):\n"""\n${injectedSyllabus.slice(0, 5000)}\n"""\n` : ""}
${retrievedWebSources.length > 0 ? `\nONLINE SOURCES:\n${retrievedWebSources.map((r) => `- [${r.title}](${r.url})`).join("\n")}\n` : ""}
Provide high-yield, structured, exam-grade content with full answer key, mistake analysis, and scoring rubrics.`;

  try {
    const result = await generateAIResponse(
      {
        systemInstruction,
        prompt: examPrompt,
        temperature: 0.65,
      },
      {
        requestedLang: language,
        role: "exam-engine",
        subject,
        difficulty,
      }
    );

    return {
      content: result.text,
      model: result.model,
      provider: result.provider,
    };
  } catch (error: any) {
    console.warn("Falling back to direct exam prep fallback generator:", error?.message || error);
    const fallbackContent = generateDirectExamPrepFallback(
      tool,
      targetExam,
      subject,
      effectiveTopic,
      questionCount,
      difficulty,
      timeLimitMinutes,
      injectedSyllabus,
      injectedFileName,
      chapter,
      retrievedWebSources
    );

    return {
      content: fallbackContent,
      model: "FAI AVENIQ Exam Engine",
      provider: "curriculum",
    };
  }
}