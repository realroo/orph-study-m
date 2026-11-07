export type ExamCategory = 
  | 'banking'
  | 'regulatory'
  | 'ssc'
  | 'railways'
  | 'state_psc'
  | 'insurance';

export type SectionType = 
  | 'Quantitative Aptitude'
  | 'Reasoning Ability'
  | 'English Language'
  | 'General & Banking Awareness'
  | 'Computer Knowledge';

export interface Question {
  id: string;
  section: SectionType;
  questionNumber: number;
  questionTextEn: string;
  questionTextHi?: string;
  passage?: string;
  optionsEn: string[];
  optionsHi?: string[];
  correctOptionIndex: number;
  marksPositive: number;
  marksNegative: number;
  explanation: string;
  shortcutTip?: string;
  topic: string;
  avgTimeSeconds: number;
  topperTimeSeconds: number;
}

export interface SectionConfig {
  name: SectionType;
  durationMinutes: number; // For sectional timer (e.g. 20m for Banking)
  totalQuestions: number;
  maxMarks: number;
}

export type PaperType = 'full_mock' | 'pyq' | 'sectional' | 'mini_mock' | 'live_test';

export interface ExamPaper {
  id: string;
  examId: string;
  examTitle: string;
  category: ExamCategory;
  paperTitle: string;
  paperType: PaperType;
  year?: number;
  isFree: boolean;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarkingRatio: number; // e.g. 0.25
  sections: SectionConfig[];
  questions: Question[];
  attemptsCount: number;
  cutoffScore: {
    UR: number;
    OBC: number;
    EWS: number;
    SC: number;
    ST: number;
  };
}

export interface ExamSeries {
  id: string;
  title: string;
  shortCode: string;
  category: ExamCategory;
  badge: string;
  description: string;
  totalTests: number;
  freeTestsCount: number;
  pyqCount: number;
  activeAspirants: number;
  featured: boolean;
  papers: ExamPaper[];
}

export type QuestionStatus = 
  | 'not_visited'
  | 'not_answered'
  | 'answered'
  | 'marked_for_review'
  | 'answered_and_marked';

export interface CandidateResponse {
  selectedOptionIndex: number | null;
  status: QuestionStatus;
  timeSpentSeconds: number;
  isBookmarked?: boolean;
}

export interface TestResult {
  paperId: string;
  paperTitle: string;
  examTitle: string;
  totalScore: number;
  maxScore: number;
  positiveScore: number;
  negativeScore: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracyPercentage: number;
  percentile: number;
  allIndiaRank: number;
  totalCandidates: number;
  totalTimeSeconds: number;
  cutoffCleared: boolean;
  sectionBreakdown: {
    section: SectionType;
    score: number;
    maxScore: number;
    attempted: number;
    correct: number;
    incorrect: number;
    accuracy: number;
    timeSpentSeconds: number;
    sectionalCutoff: number;
    clearedCutoff: boolean;
  }[];
  responses: Record<string, CandidateResponse>;
  completedAt: string;
}

export interface CurrentAffairItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  keyPoints: string[];
  quizQuestion?: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}
