export interface ExamPrepRequest {
  tool?:
    | "full-mock"
    | "mcq-bank"
    | "concept-builder"
    | "numericals"
    | "subjective-qa"
    | "weak-topics"
    | "revision-schedule"
    | string;
  targetExam?: string;
  subject?: string;
  topic?: string;
  chapter?: string;
  questionCount?: number;
  difficulty?: string;
  language?: string;
  timeLimitMinutes?: number;
  syllabusText?: string;
  syllabusFileName?: string;
  enableWebResearch?: boolean;
  userId?: string;
  libraryDocId?: string;
  studyMemory?: any;
}