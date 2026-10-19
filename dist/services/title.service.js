"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConversationTitle = generateConversationTitle;
const gemini_service_1 = require("./gemini.service");
async function generateConversationTitle(prompt) {
    if (!prompt || !prompt.trim()) {
        return { title: "New Conversation" };
    }
    try {
        const result = await (0, gemini_service_1.generateAIResponse)({
            prompt: `Generate a short, concise, natural 3 to 5-word title for an educational inquiry starting with: "${prompt.slice(0, 200)}". Do not use quotes or punctuation. Return ONLY the title.`,
            temperature: 0.3,
        });
        let title = result.text?.trim().split("\n")[0].replace(/^["'#*]+|["'#*]+$/g, "").trim() || "";
        if (!title || title.length > 50 || title.split(/\s+/).length > 8) {
            const words = prompt.trim().split(/\s+/).slice(0, 5).join(" ");
            title = words ? words.charAt(0).toUpperCase() + words.slice(1) : "Educational Quest";
        }
        return { title };
    }
    catch (err) {
        const words = prompt.trim().split(/\s+/).slice(0, 5).join(" ");
        const fallback = words ? words.charAt(0).toUpperCase() + words.slice(1) : "Educational Quest";
        return { title: fallback };
    }
}
