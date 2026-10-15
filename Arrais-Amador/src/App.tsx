import React, { useState } from 'react';
import { useExamEngine } from './hooks/useExamEngine';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ConceptsStudyScreen } from './components/ConceptsStudyScreen';
import { ExamScreen } from './components/ExamScreen';
import { StudyModeScreen } from './components/StudyModeScreen';
import { FlashcardsScreen } from './components/FlashcardsScreen';
import { ResultDashboard } from './components/ResultDashboard';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { NightLightsSimulator } from './components/NightLightsSimulator';
import { SlideViewerScreen } from './components/SlideViewerScreen';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ActiveTab, ExamResult, OfficialCategory, StudyFilter } from './types';
import { Compass, AlertCircle, ShieldCheck, Ship, Timer, ArrowRight, Zap, CheckCircle2, Anchor } from 'lucide-react';

export const App: React.FC = () => {
  const {
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
    lastResult,
    history,
    wrongQuestionIds,
    startOfficialArraisExam,
    startOfficialMotonautaExam,
    startCadernoEspecialExam,
    startSprintChallenge,
    startStudyMode,
    startErrorNotebookMode,
    selectOption,
    toggleFlagForReview,
    finishExam,
    clearHistory,
    resetCurrentSession,
  } = useExamEngine();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [viewingResult, setViewingResult] = useState<ExamResult | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-400 p-0.5 shadow-xl animate-pulse">
          <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center">
            <Compass className="w-8 h-8 text-gold-500 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-100">Bússola Digital</h2>
          <p className="text-xs text-slate-400">Carregando banco de dados normativo de Arrais-Amador...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">Erro ao carregar dados</h2>
        <p className="text-xs text-slate-400 max-w-sm">{errorMsg}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gold-500 text-navy-950 font-bold rounded-xl text-xs"
        >
          Recarregar
        </button>
      </div>
    );
  }

  const isExamInProgress =
    (examMode === 'MODO_OFICIAL_ARRAIS' ||
      examMode === 'MODO_OFICIAL_MOTONAUTA' ||
      examMode === 'MODO_CADERNO_ESPECIAL' ||
      examMode === 'MODO_SPRINT_DESAFIO' ||
      examMode === 'official') &&
    !viewingResult &&
    !lastResult &&
    currentQuestions.length > 0;

  const handleStartOfficialExam = () => {
    setViewingResult(null);
    startOfficialArraisExam();
    setActiveTab('exam');
  };

  const handleStartMotonautaExam = () => {
    setViewingResult(null);
    startOfficialMotonautaExam();
    setActiveTab('exam');
  };

  const handleStartCadernoEspecialExam = () => {
    setViewingResult(null);
    startCadernoEspecialExam();
    setActiveTab('exam');
  };

  const handleStartSprintExam = () => {
    setViewingResult(null);
    startSprintChallenge();
    setActiveTab('exam');
  };

  const handleStartStudy = (topic?: OfficialCategory | 'ALL', count?: number, filter?: StudyFilter) => {
    setViewingResult(null);
    startStudyMode(topic, count, filter);
    setActiveTab('study');
  };

  const handleStartErrors = () => {
    setViewingResult(null);
    startErrorNotebookMode();
    setActiveTab('study');
  };

  const handleFinishExam = () => {
    const res = finishExam();
    setViewingResult(res);
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setViewingResult(null);
    if (tab === 'errors') {
      startErrorNotebookMode();
      setActiveTab('study');
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-gold-500 selection:text-navy-950 pb-20 md:pb-0">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        errorCount={wrongQuestionIds.length}
        isExamInProgress={isExamInProgress}
      />

      <main className="flex-1 py-4">
        {(viewingResult || (isExamInProgress === false && lastResult)) ? (
          <ResultDashboard
            result={viewingResult || lastResult!}
            onRetryOfficial={handleStartOfficialExam}
            onRetryErrors={handleStartErrors}
            onGoToStudy={() => {
              setViewingResult(null);
              resetCurrentSession();
              setActiveTab('study');
            }}
            onGoToFlashcards={() => {
              setViewingResult(null);
              resetCurrentSession();
              setActiveTab('flashcards');
            }}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeScreen
                onStartOfficialExam={handleStartOfficialExam}
                onStartMotonautaExam={handleStartMotonautaExam}
                onStartCadernoEspecialExam={handleStartCadernoEspecialExam}
                onStartSprintExam={handleStartSprintExam}
                onGoToLights={() => setActiveTab('lights')}
                onGoToSlides={() => setActiveTab('slides')}
                onGoToConcepts={() => setActiveTab('concepts')}
                onGoToStudy={() => setActiveTab('study')}
                onGoToFlashcards={() => setActiveTab('flashcards')}
                onStartErrorsMode={handleStartErrors}
                errorCount={wrongQuestionIds.length}
                totalQuestions={allQuestions.length}
                totalFlashcards={allFlashcards.length}
              />
            )}

            {activeTab === 'slides' && (
              <SlideViewerScreen
                onStartStudyWithCategory={(cat) => handleStartStudy(cat, undefined, 'ALL')}
              />
            )}

            {activeTab === 'concepts' && (
              <ConceptsStudyScreen
                onStartPractice={(topic) => handleStartStudy(topic)}
                onGoToExam={handleStartOfficialExam}
              />
            )}

            {activeTab === 'lights' && (
              <NightLightsSimulator />
            )}

            {activeTab === 'exam' && (
              isExamInProgress ? (
                <ExamScreen
                  questions={currentQuestions}
                  currentIndex={currentQuestionIndex}
                  answers={answers}
                  timeRemaining={timeRemaining}
                  examTitle={examTitle}
                  onSelectIndex={setCurrentQuestionIndex}
                  onSelectOption={selectOption}
                  onToggleFlag={toggleFlagForReview}
                  onFinishExam={handleFinishExam}
                  onCancelExam={() => {
                    if (window.confirm('Deseja realmente cancelar o simulado em andamento?')) {
                      resetCurrentSession();
                      setActiveTab('home');
                    }
                  }}
                />
              ) : (
                <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      Central de Simulados Náuticos
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-100">
                      Escolha o Formato da Prova
                    </h1>
                    <p className="text-sm text-slate-300 max-w-xl mx-auto">
                      Provas balanceadas com cronômetro regressivo oficial e critérios reais de aprovação da Capitania dos Portos (DPC).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Modo 1: Arrais-Amador */}
                    <div className="bg-navy-900 border-2 border-gold-500/50 hover:border-gold-500 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-5 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-500/30 flex items-center justify-center">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-400">
                            Exame Principal
                          </span>
                          <h2 className="text-xl font-black text-slate-100 mt-0.5">
                            Arrais-Amador
                          </h2>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2 pt-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span><strong>40 questões</strong> oficiais DPC</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span><strong>120 minutos</strong> (2 horas)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>Balanço: 13 RIPEAM, 9 Baliz., 7 Legis., 6 Salvat., 5 Manobra</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>Aprovação com <strong>≥ 50% (20 acertos)</strong></span>
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={handleStartOfficialExam}
                        className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Iniciar Simulado Arrais</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Modo 2: Caderno Especial Fluvial */}
                    <div className="bg-navy-900 border border-emerald-500/40 hover:border-emerald-500/80 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-5 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                          <Anchor className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                            Banca Fluvial (Tabatinga)
                          </span>
                          <h2 className="text-xl font-black text-slate-100 mt-0.5">
                            Caderno Fluvial
                          </h2>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2 pt-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span><strong>40 questões</strong> canônicas fluviais</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span><strong>120 minutos</strong> cronometrados</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>Foco em rios, hidrovias, amarração e socorros</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>Aprovação com <strong>≥ 50% (20 acertos)</strong></span>
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={handleStartCadernoEspecialExam}
                        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-navy-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Iniciar Caderno Fluvial</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Modo 2: Motonauta */}
                    <div className="bg-navy-900 border border-cyan-500/30 hover:border-cyan-500/60 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-5 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                          <Ship className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                            Moto Aquática (Jet-Ski)
                          </span>
                          <h2 className="text-xl font-black text-slate-100 mt-0.5">
                            Motonauta (MTA)
                          </h2>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2 pt-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span><strong>20 questões</strong> NORMAM-212</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span><strong>90 minutos</strong> de duração</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>Regras de praias (200m), chave de corte, passageiros e acidentes</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>Aprovação com <strong>≥ 50% (10 acertos)</strong></span>
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={handleStartMotonautaExam}
                        className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-navy-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Iniciar Simulado Motonauta</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Modo 3: Sprint Desafio */}
                    <div className="bg-navy-900 border border-amber-500/30 hover:border-amber-500/60 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-5 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                          <Timer className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                            Desafio Rápido
                          </span>
                          <h2 className="text-xl font-black text-slate-100 mt-0.5">
                            Sprint Náutico
                          </h2>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2 pt-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <span><strong>20 questões</strong> aleatórias</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <span><strong>40 minutos</strong> contra o relógio</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <span>Treino de agilidade para fixação e raciocínio rápido</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <span>Excelente para pausas curtas</span>
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={handleStartSprintExam}
                        className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-navy-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Iniciar Sprint (20 Q.)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}

            {activeTab === 'study' && (
              <StudyModeScreen
                allQuestions={allQuestions}
                currentQuestions={currentQuestions}
                currentIndex={currentQuestionIndex}
                answers={answers}
                onStartStudy={handleStartStudy}
                onSelectOption={selectOption}
                onNextQuestion={() => setCurrentQuestionIndex((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
                onRestart={() => {
                  resetCurrentSession();
                }}
                errorCount={wrongQuestionIds.length}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardsScreen flashcards={allFlashcards} />
            )}

            {activeTab === 'stats' && (
              <PerformanceDashboard
                history={history}
                wrongQuestionIds={wrongQuestionIds}
                onStartErrorsMode={handleStartErrors}
                onClearHistory={clearHistory}
                onSelectHistoricalResult={(res) => setViewingResult(res)}
                onStartExam={handleStartOfficialExam}
              />
            )}
          </>
        )}
      </main>

      <footer className="border-t border-navy-800 bg-navy-950/80 px-4 py-6 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Compass className="w-4 h-4 text-gold-400" />
          <span className="font-bold text-slate-200">Bússola Digital — Simulado Arrais-Amador & Motonauta</span>
          <span className="text-[10px] bg-navy-800 border border-navy-700 px-1.5 py-0.5 rounded text-gold-400 font-semibold">NORMAM-211 & 212 / 2026</span>
        </div>
        <p className="text-[11px] text-slate-500 max-w-md mx-auto">
          Aplicação web gratuita e offline (PWA) de auxílio preparatório para a Carteira de Habilitação de Amador (CHA).
        </p>
      </footer>

      {/* Floating Bottom Nav for Mobile Devices */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenExamModal={() => handleSelectTab('exam')}
        errorCount={wrongQuestionIds.length}
        isExamInProgress={isExamInProgress}
      />
    </div>
  );
};

