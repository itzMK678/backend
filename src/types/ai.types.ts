export interface AttachmentPayload {
  name: string;
  type: string;
  dataUrl?: string;
  extractedText?: string;
}

export interface GenerateAIRequest {
  systemInstruction?: string;
  messages?: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  prompt?: string;
  temperature?: number;
  attachment?: AttachmentPayload;
}

export interface GenerateAIResponse {
  text: string;
  model: string;
  provider: 'gemini' | 'curriculum' | 'canonical';
}

export interface ChatPayload {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  role?: string;
  language?: string;
  subject?: string;
  difficulty?: string;
  attachment?: AttachmentPayload;
  studyMemory?: any;
  enableWebResearch?: boolean;
  userId?: string;
  selectedLibraryDocId?: string;
}

export interface ChatResult {
  content: string;
  model?: string;
  provider?: string;
  isRealAI?: boolean;
  isRealGemini?: boolean;
}

export interface StoredLibraryDoc {
  id: string;
  userId: string;
  title: string;
  bookName: string;
  subject: string;
  classLevel: string;
  chapter: string;
  fileType: 'pdf' | 'text' | 'notes';
  fileName: string;
  extractedText: string;
  wordCount: number;
  fileSizeBytes?: number;
  summary?: string;
  createdAt: number;
  updatedAt: number;
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet?: string;
  source?: string;
}

export interface TeacherPayload {
  tool: string;
  subject: string;
  topic: string;
  grade?: string;
  duration?: string;
  studentLevel?: string;
  language?: string;
  rawNotes?: string;
  questionCount?: number;
  difficulty?: string;
}

export interface StudentPayload {
  tool: string;
  subject: string;
  topic: string;
  grade?: string;
  language?: string;
  difficulty?: string;
  studentInput?: string;
  currentStep?: number;
}

export interface ResearchPayload {
  researchQuestion: string;
  subject: string;
  scope?: string;
  methodology?: string;
}

export interface TitlePayload {
  prompt?: string;
  firstMessage?: string;
  subject?: string;
  role?: string;
}

export interface ParseDocumentPayload {
  name?: string;
  type?: string;
  base64?: string;
}
