import { ResearchPayload } from "../types/ai.types";
import { generateAIResponse } from "./gemini.service";
import { searchEducationalWeb } from "./web-research.service";

export async function executeResearchSynthesis(body: ResearchPayload) {
  const { researchQuestion, subject, scope, methodology } = body;

  const systemInstruction = `You are the FAI AVENIQ Research Workbench Engine.
FAI AVENIQ is an Educational AI Learning Assistant.
You maintain academic integrity, epistemological humility, and rigorous conceptual distinction.

CRITICAL RESEARCH PROTOCOL:
1. Clearly differentiate between:
   [AI MODEL SYNTHESIS & REASONING] (The model's deductive knowledge)
   vs
   [EXTERNAL VERIFIABLE LITERATURE & STANDARDS] (Concepts requiring external peer-reviewed validation).
2. DO NOT fabricate imaginary DOIs or non-existent URLs. Refer to established canonical theories, seminal papers, academic institutions, and empirical paradigms.
3. Break the inquiry down into a structured research workflow.`;

  let webNotice = "";
  try {
    const webResults = await searchEducationalWeb(researchQuestion, 3);
    if (webResults.length > 0) {
      webNotice = `\n\nVerified Online Background Sources:\n${webResults
        .map((r, i) => `${i + 1}. [${r.title}](${r.url})${r.snippet ? ` - ${r.snippet}` : ""}`)
        .join("\n")}\n`;
    }
  } catch (err) {
    console.warn("Web research synthesis warning:", err);
  }

  const researchPrompt = `Conduct a structured research breakdown on the following academic inquiry:
RESEARCH QUESTION: "${researchQuestion}"
SUBJECT FIELD: ${subject || "Interdisciplinary"}
SCOPE: ${scope || "Comprehensive Academic"}
METHODOLOGY FOCUS: ${methodology || "Conceptual & Empirical Synthesis"}
${webNotice}
Provide a structured research dossier:
1. RESEARCH QUESTION DECOMPOSITION
   - Primary Thesis / Inquiry
   - Key Sub-Questions (3 distinct angles)
   - Scope Boundaries & Definitions

2. SYSTEMATIC EVIDENCE & THEORETICAL FRAMEWORK [AI SYNTHESIS]
   - Established Consensus (What is widely accepted in the field)
   - Competing Perspectives & Active Debates
   - Underlying Mechanisms / Scientific Principles

3. SOURCE VERIFICATION MATRIX & CRITICAL EVALUATION
   - High-Credibility Academic Source Types to Consult (e.g. PubMed, IEEE, Nature, JSTOR)
   - Empirical Indicators to Look For
   - Potential Bias or Confounding Variables to account for

4. CANONICAL CITATIONS & BENCHMARK PARADIGMS
   - Seminal researchers, standard textbook frameworks, or governing international bodies (e.g., WHO, IUPAC, CERN, AMS)
   - Verified reference breakdown.

5. NEXT RESEARCH STEPS FOR THE SCHOLAR
   - Concrete actionable tasks to verify and expand this inquiry.`;

  const result = await generateAIResponse({
    systemInstruction,
    prompt: researchPrompt,
    temperature: 0.5,
  });

  return {
    content: result.text,
    model: result.model,
    provider: result.provider,
  };
}
