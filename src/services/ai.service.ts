import { ChatPayload, ChatResult } from "../types/ai.types";
import { generateAIResponse, isGeminiConfigured } from "./gemini.service";
import { buildEducationalSystemPrompt } from "./educational-prompt.service";
import { findRelevantLibraryPassages } from "./knowledge-library.service";
import { searchEducationalWeb } from "./web-research.service";
import { extractTextFromPdfBuffer } from "./document-parser.service";

export function matchGreetingQuestion(query: string, language?: string): string | null {
  const q = query.toLowerCase().trim().replace(/[?!.,'"]/g, "");

  const isGreeting =
    q === "salam" ||
    q === "assalam o alaikum" ||
    q === "assalam alaikum" ||
    q === "assalamoalaikum" ||
    q === "assalam-o-alaikum" ||
    q === "asalam alaikum" ||
    q === "aslam o alikum" ||
    q === "slam" ||
    q === "hello" ||
    q === "hi" ||
    q === "hey" ||
    q === "good morning" ||
    q === "good afternoon" ||
    q === "good evening" ||
    q === "how are you" ||
    q === "how are you today" ||
    q === "how are you doing" ||
    q === "hello how are you" ||
    q === "hi how are you" ||
    q === "hey how are you" ||
    q === "assalam o alaikum how are you" ||
    q === "assalam alaikum how are you" ||
    q === "assalam o alaikum kaise hain" ||
    q === "assalam o alaikum kaise ho" ||
    q === "assalam o alaikum aap kaise hain" ||
    q === "assalam alaikum kaise hain" ||
    q === "kese ho" ||
    q === "kaise ho" ||
    q === "kese hain" ||
    q === "kaise hain" ||
    q === "kya haal hai" ||
    q === "kia hal ha" ||
    q === "kia haal hy" ||
    q === "اسلام علیکم" ||
    q === "السلام علیکم" ||
    q === "سلام" ||
    q === "ہیلو" ||
    q === "آپ کیسے ہیں" ||
    q === "السلام علیکم آپ کیسے ہیں" ||
    q.startsWith("hello ") ||
    q.startsWith("hi ") ||
    q.startsWith("assalam o alaikum ") ||
    q.startsWith("assalam alaikum ") ||
    q.startsWith("asalam ");

  if (!isGreeting || q.length > 50) return null;

  const isUrdu = language === "ur" || /[\u0600-\u06FF]/.test(query);
  const isRomanUrdu =
    language === "roman_ur" ||
    q.includes("kese") ||
    q.includes("kaise") ||
    q.includes("haal") ||
    q.includes("hal") ||
    q.includes("aap");

  if (isUrdu) {
    return "وعلیکم السلام! ہیلو! آپ آج کیسے ہیں؟ امید ہے آپ بالکل خیریت سے ہوں گے۔\n\nآج آپ کیا سیکھنا یا پڑھنا چاہتے ہیں؟ میں بیالوجی، فزکس، کیمسٹری، ریاضی، کمپیوٹر سائنس، اردو، انگریزی یا امتحانی تیاری میں آپ کی مکمل رہنمائی کے لیے حاضر ہوں۔";
  }

  if (isRomanUrdu) {
    return "Assalam-o-Alaikum! Hello! Aap kaise hain? Umeed hai aap bilkul khairiyat se honge.\n\nAaj aap kya seekhna ya parhna chahte hain? Main aap ki Biology, Physics, Chemistry, Mathematics, Computer Science, Urdu, ya kisi bhi exam ki tayari mein mukammal madad karne ke liye hazir hoon!";
  }

  return "Assalam-o-Alaikum! Hello! How are you today? I hope you are doing well.\n\nWhat would you like to learn or work on today? I am here to help you across Biology, Physics, Chemistry, Mathematics, Computer Science, English, Urdu, Exam Preparation, or any everyday questions!";
}

export function matchCreatorQuestion(query: string): string | null {
  const q = query.toLowerCase().trim().replace(/[?!.,'"]/g, "");

  if (
    q.includes("who created you") ||
    q.includes("who made you") ||
    q.includes("who built you") ||
    q.includes("who is your creator") ||
    q.includes("who is your developer") ||
    q.includes("who developed you") ||
    q.includes("who developed fai aveniq") ||
    q.includes("who created fai aveniq") ||
    q.includes("who designed fai aveniq") ||
    q.includes("who is the developer")
  ) {
    return "Fatima Anum Rasheed is currently studying in Class 10 with Biology as her field of study. She has a strong interest in technology, web development, programming, and educational AI. She is the developer of FAI AVENIQ, an educational AI project designed to make learning more accessible, organized, and student-friendly.";
  }

  if (
    q.includes("who is fatima anum rasheed") ||
    q.includes("who is fatima anam rasheed") ||
    q.includes("who is fatima") ||
    q.includes("who is farima anum rasheed") ||
    q.includes("who is farima anam rasheed") ||
    q.includes("who is farima")
  ) {
    return "Fatima Anum Rasheed is currently studying in Class 10 with Biology as her field of study. She has a strong interest in technology, web development, programming, and educational AI. She is the developer of FAI AVENIQ.";
  }

  return null;
}

export async function generateChatResponse(payload: ChatPayload): Promise<ChatResult> {
  const {
    messages,
    role = "student",
    language = "en",
    subject = "general",
    difficulty = "intermediate",
    attachment,
    studyMemory,
    enableWebResearch,
    userId,
    selectedLibraryDocId,
  } = payload;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages array is required");
  }

  // Process attachment if provided
  const processedMessages = [...messages];
  if (attachment && processedMessages.length > 0) {
    const lastIdx = processedMessages.length - 1;
    const lastMsg = processedMessages[lastIdx];

    let attachedContext = "";
    if (attachment.extractedText) {
      attachedContext = `[Attached Study Material: "${attachment.name}"]\nContent:\n${attachment.extractedText.slice(0, 15000)}\n\n`;
    } else if (
      attachment.dataUrl &&
      (attachment.name?.toLowerCase().endsWith(".pdf") || attachment.type === "application/pdf")
    ) {
      try {
        const cleanB64 = attachment.dataUrl.replace(/^data:[^;]+;base64,/, "");
        const buf = Buffer.from(cleanB64, "base64");
        const pdfText = (await extractTextFromPdfBuffer(buf)).trim();
        if (pdfText) {
          attachedContext = `[Attached Study Material (PDF: ${attachment.name})]\nContent:\n${pdfText.slice(0, 15000)}\n\n`;
        }
      } catch (pdfErr) {
        console.warn("PDF parsing error in chat:", pdfErr);
      }
    } else if (attachment.type === "image" || attachment.name?.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i)) {
      attachedContext = `[Attached Educational Image / Diagram: "${attachment.name}"]\n(Analyze questions, diagrams, handwritten formulas, or textbook content in this visual study material)\n\n`;
    }

    if (attachedContext && !lastMsg.content.includes(attachment.name)) {
      processedMessages[lastIdx] = {
        ...lastMsg,
        content: `${attachedContext}User Query: ${lastMsg.content}`,
      };
    }
  }

  const lastUserMsg = processedMessages[processedMessages.length - 1]?.content || "";

  // Check creator questions
  const creatorAnswer = matchCreatorQuestion(lastUserMsg);
  if (creatorAnswer) {
    return {
      content: creatorAnswer,
      model: "FAI AVENIQ Canonical Protocol",
      provider: "canonical",
      isRealAI: true,
    };
  }

  // Check greeting questions
  const greetingAnswer = matchGreetingQuestion(lastUserMsg, language);
  if (greetingAnswer) {
    return {
      content: greetingAnswer,
      model: "FAI AVENIQ Warm Protocol",
      provider: "canonical",
      isRealAI: true,
    };
  }

  // Ground with knowledge library if applicable
  let libraryGroundingInstruction = "";
  if (userId || selectedLibraryDocId) {
    try {
      const libraryMatches = findRelevantLibraryPassages(
        lastUserMsg,
        userId,
        selectedLibraryDocId,
        subject
      );
      if (libraryMatches.length > 0) {
        libraryGroundingInstruction = `\n\n[STUDENT KNOWLEDGE LIBRARY GROUNDED SOURCES]
The student has saved relevant textbook / syllabus passages in their persistent Knowledge Library.
${libraryMatches
  .map(
    (m, i) =>
      `Excerpt ${i + 1} (Source Book: "${m.doc.bookName}", Chapter: "${m.doc.chapter}", Class: "${m.doc.classLevel}", Subject: "${m.doc.subject}"):\n"""\n${m.passage}\n"""`
  )
  .join("\n\n")}

MANDATORY KNOWLEDGE LIBRARY GROUNDING DIRECTIVE:
1. Ground your answer in the student's saved Knowledge Library source passages provided above.
2. Explicitly cite the specific Book and Chapter used so the student knows their saved library was referenced.`;
      }
    } catch (libErr) {
      console.warn("Knowledge library passage lookup warning:", libErr);
    }
  }

  // Conduct web research if enabled
  let webGroundingInstruction = "";
  if (enableWebResearch) {
    try {
      const retrievedWebSources = await searchEducationalWeb(lastUserMsg);
      if (retrievedWebSources.length > 0) {
        webGroundingInstruction = `\n\n[VERIFIED WEB SEARCH GROUNDING]
The student activated "Research from Websites". The following live educational resources and standards were retrieved:
${retrievedWebSources.map((r, i) => `${i + 1}. [${r.title}](${r.url})${r.snippet ? ` - ${r.snippet}` : ""}`).join("\n")}

MANDATORY RESEARCH PRESENTATION RULES:
1. Clearly differentiate between:
   - "### 🌐 Verified External Web Sources & References" (list the retrieved clickable markdown links above)
   - "### 📚 Academic Synthesis & Explanation" (your structured AI educational answer)
2. Never invent imaginary URLs. Only cite the retrieved sources above or standard official academic bodies.`;
      }
    } catch (searchErr) {
      console.warn("Web research query failed:", searchErr);
    }
  }

  const systemInstruction =
    buildEducationalSystemPrompt({
      role,
      language,
      subject,
      difficulty,
      mode: "workspace-chat",
      studyMemory,
    }) +
    libraryGroundingInstruction +
    webGroundingInstruction;

  const result = await generateAIResponse(
    {
      systemInstruction,
      messages: processedMessages,
      attachment,
      temperature: 0.7,
    },
    {
      requestedLang: language,
      role,
      subject,
      difficulty,
    }
  );

  return {
    content: result.text,
    model: result.model,
    provider: result.provider,
    isRealAI: true,
    isRealGemini: isGeminiConfigured(),
  };
}