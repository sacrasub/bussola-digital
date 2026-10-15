import { useState, useEffect, useCallback } from 'react';
import { Question, Flashcard, ExamAnswer, ExamResult, OfficialCategory, ExamMode, StudyFilter } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'bussola_arrais_history_v1',
  ERRORS: 'bussola_arrais_errors_v1',
  ANSWERED: 'bussola_arrais_answered_ids_v1',
  FLASHCARDS: 'bussola_arrais_flashcard_stats_v1',
  THEME: 'bussola_arrais_theme_v1',
};

export const EXAM_DURATIONS = {
  ARRAIS: 120 * 60,     // 120 minutos (2 horas) - 40 questões
  MOTONAUTA: 90 * 60,   // 90 minutos (1h30) - 20 questões
  SPRINT: 40 * 60,      // 40 minutos - 20 questões
};

export const OFFICIAL_EXAM_DURATION_SECONDS = EXAM_DURATIONS.ARRAIS;

export function useExamEngine() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [allFlashcards, setAllFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Estado do Simulado / Treino em andamento
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [examMode, setExamMode] = useState<ExamMode | null>(null);
  const [examTitle, setExamTitle] = useState<string>('Simulado');
  const [initialDuration, setInitialDuration] = useState<number>(EXAM_DURATIONS.ARRAIS);
  const [timeRemaining, setTimeRemaining] = useState<number>(EXAM_DURATIONS.ARRAIS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);

  // Histórico, Caderno de Erros e Questões Respondidas
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<number[]>([]);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);

  // Carregar dados de questions.json e flashcards.json
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const base = import.meta.env.BASE_URL;
        const [qRes, fcRes] = await Promise.all([
          fetch(`${base}data/questions.json`),
          fetch(`${base}data/flashcards.json`),
        ]);

        if (!qRes.ok || !fcRes.ok) {
          throw new Error('Falha ao carregar banco de dados náutico.');
        }

        const qData: Question[] = await qRes.json();
        const fcData: Flashcard[] = await fcRes.json();

        setAllQuestions(qData);
        setAllFlashcards(fcData);

        // Carregar Histórico do LocalStorage
        const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
        if (savedHistory) {
          try {
            setHistory(JSON.parse(savedHistory));
          } catch (e) {
            console.error('Erro ao ler histórico do LocalStorage', e);
          }
        }

        // Carregar Caderno de Erros
        const savedErrors = localStorage.getItem(STORAGE_KEYS.ERRORS);
        if (savedErrors) {
          try {
            setWrongQuestionIds(JSON.parse(savedErrors));
          } catch (e) {
            console.error('Erro ao ler caderno de erros', e);
          }
        }

        // Carregar Questões já respondidas
        const savedAnswered = localStorage.getItem(STORAGE_KEYS.ANSWERED);
        if (savedAnswered) {
          try {
            setAnsweredQuestionIds(JSON.parse(savedAnswered));
          } catch (e) {
            console.error('Erro ao ler questões respondidas', e);
          }
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao inicializar aplicativo.';
        setErrorMsg(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Timer do Simulado
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Tempo esgotado -> auto submit
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemaining]);

  // Embaralhar array
  const shuffle = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  /**
   * 1. MODO_OFICIAL_ARRAIS:
   * 40 questões, 120 minutos, balanço estrito DPC:
   * - RIPEAM: 13 questões
   * - Balizamento: 9 questões
   * - Legislação Náutica: 7 questões
   * - Manobra, Atracação e Fundeio: 5 questões
   * - Primeiros Socorros, Salvatagem e Incêndio: 6 questões
   */
  const startOfficialArraisExam = useCallback(() => {
    if (allQuestions.length === 0) return;

    const ripeamList = allQuestions.filter((q) => q.topic === 'RIPEAM');
    const balizList = allQuestions.filter((q) => q.topic === 'Balizamento');
    const legisList = allQuestions.filter((q) => q.topic === 'Legislação Náutica');
    const manobList = allQuestions.filter((q) => q.topic === 'Manobra, Atracação e Fundeio');
    const prisocList = allQuestions.filter((q) => q.topic === 'Primeiros Socorros, Salvatagem e Incêndio');

    const selected: Question[] = [
      ...shuffle(ripeamList).slice(0, 13),
      ...shuffle(balizList).slice(0, 9),
      ...shuffle(legisList).slice(0, 7),
      ...shuffle(manobList).slice(0, 5),
      ...shuffle(prisocList).slice(0, 6),
    ];

    const finalExamQuestions = shuffle(selected);

    setCurrentQuestions(finalExamQuestions);
    setAnswers(
      finalExamQuestions.map((q) => ({
        questionId: q.id,
        selectedIndex: null,
        isFlaggedForReview: false,
      }))
    );
    setCurrentQuestionIndex(0);
    setExamMode('MODO_OFICIAL_ARRAIS');
    setExamTitle('Simulado Oficial Arrais-Amador (40 Q.)');
    setInitialDuration(EXAM_DURATIONS.ARRAIS);
    setTimeRemaining(EXAM_DURATIONS.ARRAIS);
    setIsTimerRunning(true);
    setLastResult(null);
  }, [allQuestions]);

  /**
   * 2. MODO_OFICIAL_MOTONAUTA:
   * 20 questões, 90 minutos, matérias de moto aquática / jet-ski (NORMAM-212 / NORMAM-211)
   */
  const startOfficialMotonautaExam = useCallback(() => {
    if (allQuestions.length === 0) return;

    const motoList = allQuestions.filter((q) => q.topic === 'Motonauta');
    const ripeamList = allQuestions.filter((q) => q.topic === 'RIPEAM');
    const balizList = allQuestions.filter((q) => q.topic === 'Balizamento');
    const prisocList = allQuestions.filter((q) => q.topic === 'Primeiros Socorros, Salvatagem e Incêndio');

    // Composição: 14 questões de Motonauta + 2 de RIPEAM + 2 de Balizamento + 2 de Salvatagem/Incêndio
    const selected: Question[] = [
      ...shuffle(motoList).slice(0, Math.min(14, motoList.length)),
      ...shuffle(ripeamList).slice(0, 2),
      ...shuffle(balizList).slice(0, 2),
      ...shuffle(prisocList).slice(0, 2),
    ];

    // Se faltar para completar 20, completa do acervo geral
    if (selected.length < 20) {
      const remaining = allQuestions.filter((q) => !selected.some((s) => s.id === q.id));
      selected.push(...shuffle(remaining).slice(0, 20 - selected.length));
    }

    const finalExamQuestions = shuffle(selected).slice(0, 20);

    setCurrentQuestions(finalExamQuestions);
    setAnswers(
      finalExamQuestions.map((q) => ({
        questionId: q.id,
        selectedIndex: null,
        isFlaggedForReview: false,
      }))
    );
    setCurrentQuestionIndex(0);
    setExamMode('MODO_OFICIAL_MOTONAUTA');
    setExamTitle('Simulado Oficial Motonauta / Jet-Ski (20 Q.)');
    setInitialDuration(EXAM_DURATIONS.MOTONAUTA);
    setTimeRemaining(EXAM_DURATIONS.MOTONAUTA);
    setIsTimerRunning(true);
    setLastResult(null);
  }, [allQuestions]);

  /**
   * 3. MODO_SPRINT_DESAFIO:
   * 20 questões rápidas aleatórias, 40 minutos
   */
  const startSprintChallenge = useCallback(() => {
    if (allQuestions.length === 0) return;

    const questionsList = shuffle(allQuestions).slice(0, 20);

    setCurrentQuestions(questionsList);
    setAnswers(
      questionsList.map((q) => ({
        questionId: q.id,
        selectedIndex: null,
        isFlaggedForReview: false,
      }))
    );
    setCurrentQuestionIndex(0);
    setExamMode('MODO_SPRINT_DESAFIO');
    setExamTitle('Sprint Desafio Náutico (20 Q. / 40 min)');
    setInitialDuration(EXAM_DURATIONS.SPRINT);
    setTimeRemaining(EXAM_DURATIONS.SPRINT);
    setIsTimerRunning(true);
    setLastResult(null);
  }, [allQuestions]);

  /**
   * 4. MODO_ESTUDO_IMEDIATO (Treino Direcionado por Matéria e Filtros)
   * Filtros: 'ALL' (Todas), 'UNANSWERED' (Não respondidas), 'ERRORS' (Caderno de erros)
   */
  const startStudyMode = useCallback(
    (topic?: OfficialCategory | 'ALL', count = 20, filter: StudyFilter = 'ALL') => {
      if (allQuestions.length === 0) return;

      let filtered = allQuestions;

      // Filtro por tópico
      if (topic && topic !== 'ALL') {
        filtered = filtered.filter((q) => q.topic === topic);
      }

      // Filtro por estado de resolução
      if (filter === 'UNANSWERED') {
        const unanswered = filtered.filter((q) => !answeredQuestionIds.includes(q.id));
        if (unanswered.length > 0) {
          filtered = unanswered;
        }
      } else if (filter === 'ERRORS') {
        const errors = filtered.filter((q) => wrongQuestionIds.includes(q.id));
        if (errors.length > 0) {
          filtered = errors;
        }
      }

      const questionsList = shuffle(filtered).slice(0, count);

      setCurrentQuestions(questionsList);
      setAnswers(
        questionsList.map((q) => ({
          questionId: q.id,
          selectedIndex: null,
          isFlaggedForReview: false,
        }))
      );
      setCurrentQuestionIndex(0);
      setExamMode('MODO_ESTUDO_IMEDIATO');
      setExamTitle(`Modo Treino: ${topic === 'ALL' || !topic ? 'Todas as Matérias' : topic}`);
      setTimeRemaining(0);
      setIsTimerRunning(false);
      setLastResult(null);
    },
    [allQuestions, answeredQuestionIds, wrongQuestionIds]
  );

  /**
   * Inicia o Caderno de Erros
   */
  const startErrorNotebookMode = useCallback(() => {
    if (wrongQuestionIds.length === 0 || allQuestions.length === 0) return;

    const errorQuestions = allQuestions.filter((q) => wrongQuestionIds.includes(q.id));
    const questionsList = shuffle(errorQuestions);

    setCurrentQuestions(questionsList);
    setAnswers(
      questionsList.map((q) => ({
        questionId: q.id,
        selectedIndex: null,
        isFlaggedForReview: false,
      }))
    );
    setCurrentQuestionIndex(0);
    setExamMode('errors');
    setExamTitle('Caderno de Erros (Remediação)');
    setTimeRemaining(0);
    setIsTimerRunning(false);
    setLastResult(null);
  }, [allQuestions, wrongQuestionIds]);

  /**
   * Seleciona a alternativa da questão atual e persiste registro de respondidas
   */
  const selectOption = useCallback((optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      if (next[currentQuestionIndex]) {
        next[currentQuestionIndex] = {
          ...next[currentQuestionIndex],
          selectedIndex: optionIndex,
        };
      }
      return next;
    });

    // Registra questão no banco de respondidas
    const currentQ = currentQuestions[currentQuestionIndex];
    if (currentQ) {
      setAnsweredQuestionIds((prev) => {
        if (!prev.includes(currentQ.id)) {
          const updated = [...prev, currentQ.id];
          localStorage.setItem(STORAGE_KEYS.ANSWERED, JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  }, [currentQuestionIndex, currentQuestions]);

  /**
   * Alterna a marcação para revisão (bandeira)
   */
  const toggleFlagForReview = useCallback(() => {
    setAnswers((prev) => {
      const next = [...prev];
      if (next[currentQuestionIndex]) {
        next[currentQuestionIndex] = {
          ...next[currentQuestionIndex],
          isFlaggedForReview: !next[currentQuestionIndex].isFlaggedForReview,
        };
      }
      return next;
    });
  }, [currentQuestionIndex]);

  /**
   * Finaliza a prova e calcula o resultado
   */
  const finishExam = useCallback((): ExamResult => {
    setIsTimerRunning(false);

    let correctCount = 0;
    const categoryStats: Record<OfficialCategory, { total: number; correct: number; percentage: number }> = {
      'RIPEAM': { total: 0, correct: 0, percentage: 0 },
      'Balizamento': { total: 0, correct: 0, percentage: 0 },
      'Legislação Náutica': { total: 0, correct: 0, percentage: 0 },
      'Manobra, Atracação e Fundeio': { total: 0, correct: 0, percentage: 0 },
      'Primeiros Socorros, Salvatagem e Incêndio': { total: 0, correct: 0, percentage: 0 },
      'Motonauta': { total: 0, correct: 0, percentage: 0 },
    };

    const newWrongIds = new Set<number>(wrongQuestionIds);

    currentQuestions.forEach((q, idx) => {
      const ans = answers[idx];
      const isCorrect = ans && ans.selectedIndex === q.correctIndex;

      // Stats por categoria
      if (categoryStats[q.topic]) {
        categoryStats[q.topic].total += 1;
        if (isCorrect) {
          categoryStats[q.topic].correct += 1;
        }
      }

      if (isCorrect) {
        correctCount += 1;
        // Se acertou no caderno de erros ou simulado, remove do caderno de erros
        newWrongIds.delete(q.id);
      } else {
        newWrongIds.add(q.id);
      }
    });

    // Calcular % por categoria
    (Object.keys(categoryStats) as OfficialCategory[]).forEach((cat) => {
      const st = categoryStats[cat];
      st.percentage = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
    });

    const totalQuestions = currentQuestions.length;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const isApproved = scorePercentage >= 50; // Regra DPC / Marinha do Brasil (mínimo 50%)

    const isTimedMode =
      examMode === 'MODO_OFICIAL_ARRAIS' ||
      examMode === 'MODO_OFICIAL_MOTONAUTA' ||
      examMode === 'MODO_SPRINT_DESAFIO' ||
      examMode === 'official';

    const timeElapsedSeconds = isTimedMode ? Math.max(0, initialDuration - timeRemaining) : 0;

    const result: ExamResult = {
      id: `sim-${Date.now()}`,
      date: new Date().toISOString(),
      mode: examMode || 'study',
      examTitle,
      totalQuestions,
      correctCount,
      scorePercentage,
      isApproved,
      timeElapsedSeconds,
      categoryStats,
      answers,
      questions: currentQuestions,
    };

    setLastResult(result);

    // Salvar histórico no LocalStorage
    const updatedHistory = [result, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));

    // Salvar caderno de erros
    const updatedErrorsArray = Array.from(newWrongIds);
    setWrongQuestionIds(updatedErrorsArray);
    localStorage.setItem(STORAGE_KEYS.ERRORS, JSON.stringify(updatedErrorsArray));

    return result;
  }, [currentQuestions, answers, examMode, examTitle, initialDuration, timeRemaining, wrongQuestionIds, history]);

  /**
   * Limpa histórico
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  }, []);

  /**
   * Limpa caderno de erros
   */
  const clearErrors = useCallback(() => {
    setWrongQuestionIds([]);
    localStorage.removeItem(STORAGE_KEYS.ERRORS);
  }, []);

  return {
    allQuestions,
    allFlashcards,
    isLoading,
    errorMsg,
    currentQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    examMode,
    examTitle,
    timeRemaining,
    isTimerRunning,
    lastResult,
    history,
    wrongQuestionIds,
    answeredQuestionIds,
    // Modos de Exame
    startOfficialExam: startOfficialArraisExam, // alias retrocompatível
    startOfficialArraisExam,
    startOfficialMotonautaExam,
    startSprintChallenge,
    startStudyMode,
    startErrorNotebookMode,
    selectOption,
    toggleFlagForReview,
    finishExam,
    clearHistory,
    clearErrors,
    resetCurrentSession: () => {
      setIsTimerRunning(false);
      setExamMode(null);
      setCurrentQuestions([]);
      setAnswers([]);
      setLastResult(null);
    },
  };
}

