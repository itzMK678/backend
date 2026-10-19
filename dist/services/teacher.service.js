"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTeacherResource = generateTeacherResource;
const gemini_service_1 = require("./gemini.service");
const educational_prompt_service_1 = require("./educational-prompt.service");
async function generateTeacherResource(body) {
    const { tool, subject, topic, grade, duration, studentLevel, language = "en", rawNotes, questionCount, difficulty, } = body;
    const systemInstruction = (0, educational_prompt_service_1.buildEducationalSystemPrompt)({
        role: "teacher",
        language,
        subject,
        difficulty: studentLevel || difficulty,
        mode: `teacher-${tool}`,
    });
    let toolPrompt = "";
    switch (tool) {
        case "lesson-planner":
            toolPrompt = `Create a comprehensive, classroom-ready Lesson Plan for:
- Subject: ${subject || "General"}
- Topic: ${topic}
- Target Grade/Class: ${grade || "Secondary"}
- Duration: ${duration || "40 minutes"}
- Student Learning Level: ${studentLevel || "Mixed Ability"}

Include the following structured sections:
1. Learning Objectives (Bloom's Taxonomy, measurable SMART goals)
2. Materials & Setup Required
3. Hook & Introduction (0-5 mins): Engaging diagnostic or real-life question
4. Conceptual Direct Instruction (5-20 mins): Key explanations, diagrams, analogies
5. Guided & Collaborative Student Activities (20-30 mins): Step-by-step hands-on/group tasks
6. Formative Assessment & Check for Understanding (30-35 mins): Quick questions
7. Lesson Summary & Exit Ticket (35-40 mins)
8. Differentiated Homework (Standard, Support, and Extension tiers)
9. Common Student Misconceptions & How to Address Them`;
            break;
        case "quiz-generator":
            toolPrompt = `Generate a rigorous, multi-format Quiz on:
- Topic: ${topic}
- Subject: ${subject || "General"}
- Grade: ${grade || "Secondary"}
- Total Questions: ${questionCount || 8}
- Difficulty: ${difficulty || "Standard Exam Level"}

Structure:
- Section A: Multiple Choice Questions (with 4 distinct options and answer rationale)
- Section B: Short Conceptual / Reasoning Questions (with model marking rubric)
- Section C: Numerical or Application Problem (if applicable to ${subject})
- Full Official Marking Key & Step-by-Step Scoring Guide at the end.`;
            break;
        case "homework-generator":
            toolPrompt = `Create a 3-Tier Differentiated Homework Assignment for:
- Topic: ${topic} (${subject})
- Grade: ${grade || "Secondary"}

Tiers required:
1. Tier 1 (Foundational / Core Recall): Reinforces basic vocabulary, definitions, and direct formulas.
2. Tier 2 (Standard Board Standard): Application, multi-step calculations, and conceptual reasoning.
3. Tier 3 (Challenge / Higher Order Thinking): Scenario analysis, real-world transfer, or synthesis problem.
Include an answer key with rubric for teacher grading.`;
            break;
        case "answer-key":
            toolPrompt = `Generate an exhaustive, official Teacher Answer Key and Grading Rubric for the topic:
"${topic}" (${subject || "General"}).

Provide:
1. Model exemplary answers for standard board questions
2. Step-by-step marking rubrics (where partial credit is awarded)
3. Common flawed answers or pitfalls that students submit and how to penalize them fairly.`;
            break;
        case "topic-explainer":
            toolPrompt = `Provide a Master Teacher's Pedagogy Guide on how to teach:
"${topic}" (${subject || "General"}).

Include:
1. The Intuitive Mental Model: The single best real-world analogy to introduce this topic.
2. Socratic Questioning Sequence: 4 progressive questions to guide student discovery.
3. Common Roadblocks: Exactly where students get stuck and the breakthrough explanation to unstick them.
4. Blackboard / Visual Layout: Recommended board plan or diagram schematic.`;
            break;
        case "classroom-activity":
            toolPrompt = `Design an interactive, student-centered Classroom Activity for:
"${topic}" (${subject}).
Duration: ${duration || "25 minutes"}.
Provide:
- Activity Name & Real-World Framing
- Materials needed (low-cost or everyday stationery)
- Step-by-step rules & team roles
- Discussion prompts & formative debrief questions.`;
            break;
        case "revision-material":
            toolPrompt = `Create a high-yield student Revision Cheat Sheet & Summary on:
"${topic}" (${subject}).
Provide:
1. Executive Formula / Law / Concept Box
2. Key Definitions (Bullet points)
3. 3 "Must-Remember" High-Yield Board Exam Points
4. Common Exam Traps to Avoid.`;
            break;
        case "notes-to-lesson":
            toolPrompt = `Transform these teacher's raw lecture notes or textbook excerpt into a professional, structured Lesson Plan:
Notes:
"""
${rawNotes || topic}
"""

Synthesize into:
- Central Lesson Objective
- Key Concept Sequencing
- Interactive Discussion Questions
- Formative Assessment Check.`;
            break;
        default:
            toolPrompt = `Generate educational pedagogical material for: ${topic} (${subject}).`;
    }
    const result = await (0, gemini_service_1.generateAIResponse)({
        systemInstruction,
        prompt: toolPrompt,
        temperature: 0.65,
    }, {
        requestedLang: language,
        role: "teacher",
        subject,
        difficulty: studentLevel || difficulty,
    });
    return {
        content: result.text,
        model: result.model,
        provider: result.provider,
    };
}
