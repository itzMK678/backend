import { StudentPayload } from "../types/ai.types";
import { generateAIResponse } from "./gemini.service";
import { buildEducationalSystemPrompt } from "./educational-prompt.service";

export async function generateStudentResource(body: StudentPayload) {
  const {
    tool,
    subject,
    topic,
    grade,
    language = "en",
    difficulty = "intermediate",
    studentInput,
    currentStep,
  } = body;

  const systemInstruction = buildEducationalSystemPrompt({
    role: "student",
    language,
    subject,
    difficulty,
    mode: `student-${tool}`,
  });

  let studentPrompt = "";
  switch (tool) {
    case "explain-simply":
      studentPrompt = `Explain "${topic}" in ${subject || "science"} so that a ${grade || "high school"} student can grasp it intuitively:
1. The "In Plain English" 2-sentence summary
2. A creative real-world everyday analogy
3. Why this actually matters in real life
4. 3 key vocabulary terms with simple definitions
5. A simple check question to test my understanding.`;
      break;

    case "step-by-step":
      studentPrompt = `Provide a meticulous, step-by-step breakdown of how to solve or understand:
"${studentInput || topic}"
For each step:
- State the purpose of the step
- Show the exact mathematical / conceptual transformation
- Add an "Alert" noting the common mistake students make here.
End with a self-check question.`;
      break;

    case "practice-questions":
      studentPrompt = `Generate 4 progressive practice questions on "${topic}" for level: ${difficulty}:
- Question 1: Direct Recall / Concept check
- Question 2: Standard Application
- Question 3: Multi-step Reasoning
- Question 4: Real-world scenario problem
Provide collapsible/hidden hints for each, and then detailed answers with full explanations at the end.`;
      break;

    case "socratic-hint":
      studentPrompt = `The student is trying to solve:
"${studentInput || topic}"
DO NOT give the direct final answer right away.
Instead, act as a supportive tutor:
1. Identify the core principle at play.
2. Give Hint Level ${currentStep || 1} (a guiding question or nudge that points them in the right direction).
3. Ask the student one specific question they need to answer next to make progress.`;
      break;

    case "summarize":
      studentPrompt = `Summarize the following study material on "${topic}":
"""
${studentInput || topic}
"""
Provide:
1. Executive Summary (3-4 bullet points)
2. Core Rules / Formulas / Dates / Figures
3. 3 Flashcard Q&A pairs for active recall.`;
      break;

    case "diagnose-weakness":
      studentPrompt = `Diagnostic Assessment for topic: "${topic}":
Create a 3-question diagnostic quiz specifically designed to pinpoint where a student's confusion lies:
- Question A tests foundational vocabulary/concepts
- Question B tests procedural execution
- Question C tests conceptual transfer
Explain what it means if a student fails A, B, or C, and what they should review for each.`;
      break;

    default:
      studentPrompt = `Help the student master: ${topic} (${subject}).`;
  }

  const result = await generateAIResponse(
    {
      systemInstruction,
      prompt: studentPrompt,
      temperature: 0.65,
    },
    {
      requestedLang: language,
      role: "student",
      subject,
      difficulty,
    }
  );

  return {
    content: result.text,
    model: result.model,
    provider: result.provider,
  };
}
