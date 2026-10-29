import { GoogleGenAI } from "@google/genai";
import { GenerateAIRequest, GenerateAIResponse } from "../types/ai.types";
import {
  detectLanguage,
  detectSubject,
  detectAcademicLevel,
  buildCurriculumGrounding,
} from "./educationalEngine";
import { generateDirectEducationalAnswer } from "../generators/educational-fallback.generator";

export function getGeminiApiKey(): string {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (!geminiKey || geminiKey === "MY_GEMINI_API_KEY" || geminiKey === "your_gemini_api_key_here") {
    const err: any = new Error(
      "GEMINI_API_KEY is not configured or is a placeholder. Using educational engine fallback."
    );
    err.statusCode = 400;
    err.isConfigError = true;
    throw err;
  }
  return geminiKey;
}

export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY?.trim();
  return Boolean(key && key !== "MY_GEMINI_API_KEY" && key !== "your_gemini_api_key_here");
}

export async function callGemini(
  apiKey: string,
  req: GenerateAIRequest,
  overrideModel?: string
): Promise<GenerateAIResponse> {
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  let prompt = req.prompt || "";
  if (req.messages && req.messages.length > 0) {
    const formatted = req.messages
      .map(
        (m) =>
          `${m.role === "user" ? "User" : m.role === "assistant" ? "Assistant" : "System"}: ${m.content}`
      )
      .join("\n\n");
    prompt = `${formatted}\n\nAssistant:`;
  }

  const model = overrideModel || process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

  const isImageAttachment =
    req.attachment?.dataUrl &&
    (req.attachment.type === "image" ||
      req.attachment.dataUrl.startsWith("data:image/") ||
      Boolean(req.attachment.name?.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i)));

  const isPdfAttachment =
    req.attachment?.dataUrl &&
    (req.attachment.type === "pdf" ||
      req.attachment.type === "application/pdf" ||
      req.attachment.dataUrl.startsWith("data:application/pdf") ||
      Boolean(req.attachment.name?.match(/\.pdf$/i)));

  const timeoutMs = 12000;
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Gemini API request timed out after ${timeoutMs}ms`)), timeoutMs);
  });

  let response: any;
  if ((isImageAttachment || isPdfAttachment) && req.attachment?.dataUrl) {
    const match = req.attachment.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    const mimeType = match ? match[1] : isPdfAttachment ? "application/pdf" : "image/jpeg";
    const data = match ? match[2] : req.attachment.dataUrl.replace(/^data:[^;]+;base64,/, "");

    const attachmentPrompt =
      prompt ||
      (isPdfAttachment
        ? "Please analyze and explain this attached PDF study material thoroughly with structured clarity."
        : "Please analyze this educational diagram or image thoroughly with step-by-step clarity.");

    response = await Promise.race([
      ai.models.generateContent({
        model,
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType,
                  data,
                },
              },
              {
                text: attachmentPrompt,
              },
            ],
          },
        ],
        config: {
          systemInstruction: req.systemInstruction,
          temperature: req.temperature ?? 0.7,
        },
      }),
      timeoutPromise,
    ]);
  } else {
    response = await Promise.race([
      ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: req.systemInstruction,
          temperature: req.temperature ?? 0.7,
        },
      }),
      timeoutPromise,
    ]);
  }

  const text = response?.text;
  if (!text) {
    throw new Error("Gemini API returned an empty response. Please retry.");
  }

  return {
    text,
    model,
    provider: "gemini",
  };
}

export async function callGeminiAqa(
  apiKey: string,
  req: GenerateAIRequest
): Promise<GenerateAIResponse> {
  let userQuery = req.prompt || "";
  if (req.messages && req.messages.length > 0) {
    const lastMsg = req.messages[req.messages.length - 1];
    userQuery = lastMsg?.content || "";
  }

  const groundingContent = buildCurriculumGrounding(userQuery);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/aqa:generateAnswer?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: userQuery }] }],
      inline_passages: {
        passages: [
          {
            id: "eduPassage1",
            content: { parts: [{ text: groundingContent }] },
          },
        ],
      },
      answer_style: "VERBOSE",
    }),
  });

  if (!res.ok) {
    const errData: any = await res.json().catch(() => null);
    throw new Error(errData?.error?.message || `Google Gemini API returned status ${res.status}`);
  }

  const data: any = await res.json();
  let text = data?.answer?.content?.parts?.[0]?.text;

  const refusalPatterns = [
    "your sources do not contain",
    "the provided sources do not",
    "the provided passages do not",
    "sources do not mention",
    "the provided text does not contain",
    "i am unable to answer",
    "based on the provided sources, i cannot",
  ];
  const isRefusal = text ? refusalPatterns.some((p) => text.toLowerCase().includes(p)) : false;

  if (!text || data?.answer?.finishReason === "LANGUAGE" || isRefusal) {
    throw new Error("Google Gemini AQA insufficient grounding: falling back to native educational engine.");
  }

  text = text.replace(/\[\d+\]/g, "").trim();

  return {
    text,
    model: "gemini-3.8-flash",
    provider: "gemini",
  };
}

export async function generateAIResponse(
  req: GenerateAIRequest,
  options?: { requestedLang?: string; role?: string; subject?: string; difficulty?: string }
): Promise<GenerateAIResponse> {
  let query = req.prompt || "";
  if (req.messages && req.messages.length > 0) {
    query = req.messages[req.messages.length - 1]?.content || "";
  }

  const detectedLang = detectLanguage(query, options?.requestedLang);
  const detectedSub = detectSubject(query, options?.subject);
  const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

  // 1. Try Google Gemini with official SDK
  try {
    const apiKey = getGeminiApiKey();
    return await callGemini(apiKey, req, primaryModel);
  } catch (geminiErr: any) {
    console.warn(`Primary Gemini call (${primaryModel}) failed:`, geminiErr?.message || geminiErr);

    // If primary model wasn't gemini-3.5-flash-lite and experienced 503/timeout, retry with fast lite model
    if (primaryModel !== "gemini-3.5-flash-lite") {
      try {
        console.info("Retrying with fast reliable fallback model 'gemini-3.5-flash-lite'...");
        const apiKey = getGeminiApiKey();
        return await callGemini(apiKey, req, "gemini-3.5-flash-lite");
      } catch (liteErr: any) {
        console.warn("Fast lite fallback model also failed:", liteErr?.message || liteErr);
      }
    }

    // 2. Immediate zero-latency educational curriculum fallback
    console.info("Using immediate comprehensive curriculum engine fallback.");
    const answer = generateDirectEducationalAnswer(
      query,
      detectedLang,
      detectedSub,
      detectAcademicLevel(query, options?.difficulty),
      options?.role,
      options?.difficulty
    );
    return {
      text: answer,
      model: `${primaryModel} (Educational Fallback)`,
      provider: "curriculum",
    };
  }
}