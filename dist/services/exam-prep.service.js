"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExamPreparation = generateExamPreparation;
const gemini_service_1 = require("./gemini.service");
const exam_fallback_generator_1 = require("../generators/exam-fallback.generator");
const web_research_service_1 = require("./web-research.service");
const knowledge_library_service_1 = require("./knowledge-library.service");
async function generateExamPreparation(body) {
    const { tool = "full-mock", targetExam = "matric", subject = "biology", topic = "General Syllabus", chapter, questionCount = 20, difficulty = "intermediate", language = "en", timeLimitMinutes, syllabusText, syllabusFileName, enableWebResearch, userId, libraryDocId, } = body;
    const effectiveTopic = chapter ? `${chapter} — ${topic}` : topic;
    // Retrieve user's syllabus document from library if specified
    let injectedSyllabus = syllabusText || "";
    let injectedFileName = syllabusFileName || "";
    if (libraryDocId && !injectedSyllabus) {
        try {
            const allDocs = (0, knowledge_library_service_1.loadLibraryFromDisk)();
            const matched = allDocs.find((d) => d.id === libraryDocId && (!userId || d.userId === userId));
            if (matched) {
                injectedSyllabus = matched.extractedText.slice(0, 15000);
                injectedFileName = matched.bookName || matched.title || matched.fileName;
            }
        }
        catch (libErr) {
            console.warn("Exam-prep library lookup warning:", libErr);
        }
    }
    // Web research if requested
    let retrievedWebSources = [];
    if (enableWebResearch) {
        try {
            retrievedWebSources = await (0, web_research_service_1.searchEducationalWeb)(`${targetExam} ${subject} ${effectiveTopic} exam syllabus`, 3);
        }
        catch (searchErr) {
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
        const result = await (0, gemini_service_1.generateAIResponse)({
            systemInstruction,
            prompt: examPrompt,
            temperature: 0.65,
        }, {
            requestedLang: language,
            role: "exam-engine",
            subject,
            difficulty,
        });
        return {
            content: result.text,
            model: result.model,
            provider: result.provider,
        };
    }
    catch (error) {
        console.warn("Falling back to direct exam prep fallback generator:", error?.message || error);
        const fallbackContent = (0, exam_fallback_generator_1.generateDirectExamPrepFallback)(tool, targetExam, subject, effectiveTopic, questionCount, difficulty, timeLimitMinutes, injectedSyllabus, injectedFileName, chapter, retrievedWebSources);
        return {
            content: fallbackContent,
            model: "FAI AVENIQ Exam Engine",
            provider: "curriculum",
        };
    }
}
