export type OfficialCategory =
  | 'RIPEAM'
  | 'Balizamento'
  | 'Legislação Náutica'
  | 'Manobra, Atracação e Fundeio'
  | 'Primeiros Socorros, Salvatagem e Incêndio'
  | 'Motonauta';

export type ExamMode =
  | 'MODO_OFICIAL_ARRAIS'
  | 'MODO_OFICIAL_MOTONAUTA'
  | 'MODO_CADERNO_ESPECIAL'
  | 'MODO_ESTUDO_IMEDIATO'
  | 'MODO_SPRINT_DESAFIO'
  | 'errors'
  | 'official'
  | 'study';

export type StudyFilter = 'ALL' | 'UNANSWERED' | 'ERRORS';

export type IllustrationType =
  | 'maneuver_head_on'
  | 'maneuver_crossing'
  | 'maneuver_overtaking'
  | 'sound_signals'
  | 'nav_lights'
  | 'day_shape_anchored'
  | 'day_shape_not_under_command'
  | 'buoy_starboard'
  | 'buoy_port'
  | 'buoy_isolated_danger'
  | 'buoy_safe_water'
  | 'buoy_cardinal'
  | 'buoy_preferred_channel'
  | 'mooring_diagram'
  | 'fire_triangle'
  | 'first_aid';

export interface Question {
  id: number;
  topic: OfficialCategory;
  subtopic: string;
  question: string;
  options: string[];
  correctIndex: number;
  answer?: number;
  explanation: string;
  normReference: string;
  reference?: string;
  image?: IllustrationType | null;
  examPreset?: string;
  examOrder?: number;
}

export interface ExamAnswer {
  questionId: number;
  selectedIndex: number | null;
  isFlaggedForReview: boolean;
  timeSpentSeconds?: number;
}

export interface ExamResult {
  id: string;
  date: string;
  mode: ExamMode;
  examTitle?: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  isApproved: boolean;
  timeElapsedSeconds: number;
  categoryStats: Record<OfficialCategory, { total: number; correct: number; percentage: number }>;
  answers: ExamAnswer[];
  questions: Question[];
}

export interface Flashcard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  front: string;
  back: string;
  normReference: string;
  icon?: string;
  signalType?: string;
  soundDuration?: number[];
  imageType?: IllustrationType;
}

export interface SlideItem {
  number: number;
  image: string;
}

export interface SlideLesson {
  id: string;
  day: number;
  title: string;
  subtitle: string;
  category: string;
  instructor: string;
  totalSlides: number;
  folder: string;
  isUpcoming?: boolean;
  slides: SlideItem[];
}

export type ActiveTab = 'home' | 'concepts' | 'study' | 'exam' | 'flashcards' | 'stats' | 'errors' | 'lights' | 'slides';

