import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, ChevronRight, RotateCcw, Award, Compass, ShieldCheck, Anchor, Flame, Ship, Filter, AlertTriangle } from 'lucide-react';
import { Question, OfficialCategory, ExamAnswer, StudyFilter } from '../types';
import { NauticalIllustration } from './NauticalIllustrations';

interface Props {
  allQuestions: Question[];
  currentQuestions: Question[];
  currentIndex: number;
  answers: ExamAnswer[];
  onStartStudy: (topic?: OfficialCategory | 'ALL', count?: number, filter?: StudyFilter) => void;
  onSelectOption: (optionIndex: number) => void;
  onNextQuestion: () => void;
  onRestart: () => void;
  errorCount?: number;
}

export const StudyModeScreen: React.FC<Props> = ({
  allQuestions,
  currentQuestions,
  currentIndex,
  answers,
  onStartStudy,
  onSelectOption,
  onNextQuestion,
  onRestart,
  errorCount = 0,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<OfficialCategory | 'ALL'>('ALL');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [selectedFilter, setSelectedFilter] = useState<StudyFilter>('ALL');

  const topics: { id: OfficialCategory | 'ALL'; title: string; count: number; icon: React.ReactNode }[] = [
    { id: 'ALL', title: 'Todos os Tópicos', count: allQuestions.length, icon: <Compass className="w-5 h-5 text-gold-400" /> },
    { id: 'RIPEAM', title: '1. RIPEAM (Manobras & Luzes)', count: allQuestions.filter(q => q.topic === 'RIPEAM').length, icon: <Compass className="w-5 h-5 text-sky-400" /> },
    { id: 'Balizamento', title: '2. Balizamento IALA Região B', count: allQuestions.filter(q => q.topic === 'Balizamento').length, icon: <Anchor className="w-5 h-5 text-emerald-400" /> },
    { id: 'Legislação Náutica', title: '3. Legislação & NORMAM-211', count: allQuestions.filter(q => q.topic === 'Legislação Náutica').length, icon: <ShieldCheck className="w-5 h-5 text-amber-400" /> },
    { id: 'Manobra, Atracação e Fundeio', title: '4. Manobra & Fundeio', count: allQuestions.filter(q => q.topic === 'Manobra, Atracação e Fundeio').length, icon: <Anchor className="w-5 h-5 text-indigo-400" /> },
    { id: 'Primeiros Socorros, Salvatagem e Incêndio', title: '5. Salvatagem, Incêndio & PRISOC', count: allQuestions.filter(q => q.topic === 'Primeiros Socorros, Salvatagem e Incêndio').length, icon: <Flame className="w-5 h-5 text-rose-400" /> },
    { id: 'Motonauta', title: '6. Motonauta (Jet-Ski / NORMAM-212)', count: allQuestions.filter(q => q.topic === 'Motonauta').length, icon: <Ship className="w-5 h-5 text-cyan-400" /> },
  ];

  // If study mode not started, show topic selection
  if (currentQuestions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Modo Treino com Gabarito Imediato
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
            Escolha uma Matéria para Estudo
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Estude com feedback instantâneo a cada resposta, comentários normativos e justificativas técnicas baseadas no regulamento oficial da Marinha do Brasil.
          </p>
        </div>

        {/* Filter Selector (All, Unanswered, Errors) */}
        <div className="bg-navy-900/90 border border-navy-700/80 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Filter className="w-4 h-4 text-gold-400" />
            <span>Filtro de Questões:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedFilter === 'ALL'
                  ? 'bg-gold-500 text-navy-950 border-gold-400 shadow'
                  : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700'
              }`}
            >
              Todas as Questões
            </button>

            <button
              onClick={() => setSelectedFilter('UNANSWERED')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedFilter === 'UNANSWERED'
                  ? 'bg-sky-500 text-navy-950 border-sky-400 shadow'
                  : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700'
              }`}
            >
              Apenas Não Respondidas
            </button>

            <button
              onClick={() => setSelectedFilter('ERRORS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                selectedFilter === 'ERRORS'
                  ? 'bg-rose-500 text-white border-rose-400 shadow'
                  : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Apenas Caderno de Erros {errorCount > 0 ? `(${errorCount})` : ''}</span>
            </button>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {topics.map((t) => {
            const isSelected = selectedTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-4 group active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-br from-navy-800 to-navy-700 border-gold-500 ring-2 ring-gold-500/30 shadow-lg'
                    : 'bg-navy-900/80 border-navy-700/80 hover:bg-navy-800/80 hover:border-navy-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-navy-950 border border-navy-800">
                    {t.icon}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-navy-950 text-slate-400 border border-navy-800">
                    {t.count} questões
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-gold-400 transition-colors">
                    {t.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Question Count Selector & Start Button */}
        <div className="bg-navy-900/90 border border-navy-700 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300">Quantidade:</span>
            <div className="flex gap-1.5">
              {[10, 20, 30, 40].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    questionCount === num
                      ? 'bg-gold-500 text-navy-950 border-gold-400 shadow'
                      : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onStartStudy(selectedTopic, questionCount, selectedFilter)}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-extrabold text-sm rounded-xl shadow-lg shadow-gold-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Iniciar Treino ({questionCount} Questões)</span>
          </button>
        </div>
      </div>
    );
  }


  // Active study question
  const currentQ = currentQuestions[currentIndex];
  const currentAns = answers[currentIndex];
  const hasAnswered = currentAns && currentAns.selectedIndex !== null;
  const isCorrect = hasAnswered && currentAns.selectedIndex === currentQ.correctIndex;

  const totalAnswered = answers.filter((a) => a.selectedIndex !== null).length;
  const totalCorrect = currentQuestions.reduce((acc, q, idx) => {
    return acc + (answers[idx]?.selectedIndex === q.correctIndex ? 1 : 0);
  }, 0);

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Header bar */}
      <div className="bg-navy-900 border border-navy-700 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-navy-800 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full">
            {currentQ.topic}
          </span>
          <span className="text-xs text-slate-400">
            Questão <strong>{currentIndex + 1}</strong> de {currentQuestions.length}
          </span>
        </div>

        {/* Score indicator */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-slate-300">
            Acertos: <strong className="text-emerald-400">{totalCorrect}</strong> / {totalAnswered}
          </span>
          <button
            onClick={onRestart}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 bg-navy-800 px-2.5 py-1 rounded-lg border border-navy-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Trocar Tema</span>
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-navy-800/90 rounded-2xl border border-navy-700/80 p-5 md:p-7 shadow-xl space-y-5">
        <div>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
            {currentQ.subtopic}
          </span>
          <h2 className="text-lg md:text-xl font-bold text-slate-100 mt-1 leading-snug">
            {currentIndex + 1}. {currentQ.question}
          </h2>
        </div>

        {/* Illustration */}
        {currentQ.image && (
          <div className="my-2">
            <NauticalIllustration type={currentQ.image} showLabel={hasAnswered} />
          </div>
        )}

        {/* Options with immediate visual feedback */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = currentAns?.selectedIndex === optIdx;
            const isThisCorrect = optIdx === currentQ.correctIndex;

            let cardStyle = 'bg-navy-900/60 border-navy-700/70 text-slate-300 hover:bg-navy-700/60';

            if (hasAnswered) {
              if (isThisCorrect) {
                cardStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/40';
              } else if (isSelected && !isThisCorrect) {
                cardStyle = 'bg-rose-500/20 border-rose-500 text-rose-100 ring-1 ring-rose-500/40';
              } else {
                cardStyle = 'bg-navy-900/30 border-navy-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={hasAnswered}
                onClick={() => onSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${cardStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center flex-shrink-0 ${
                    hasAnswered && isThisCorrect
                      ? 'bg-emerald-500 text-navy-950 font-black'
                      : hasAnswered && isSelected && !isThisCorrect
                      ? 'bg-rose-500 text-white font-black'
                      : 'bg-navy-800 text-slate-300 border border-navy-700'
                  }`}
                >
                  {optionLetters[optIdx] || optIdx + 1}
                </div>

                <span className="text-sm md:text-base flex-1 pt-0.5 leading-relaxed">
                  {opt}
                </span>

                {hasAnswered && isThisCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                )}
                {hasAnswered && isSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Card after answering */}
        {hasAnswered && (
          <div className={`p-4 md:p-5 rounded-xl border space-y-2.5 animate-fade-in ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Resposta Correta!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-400 font-extrabold text-sm">
                  <XCircle className="w-4 h-4" />
                  <span>Resposta Incorreta</span>
                </div>
              )}
            </div>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              <strong>Explicação:</strong> {currentQ.explanation}
            </p>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-gold-400 font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Referência Oficial: {currentQ.normReference}</span>
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {hasAnswered && (
        <div className="flex justify-end pt-2">
          {currentIndex < currentQuestions.length - 1 ? (
            <button
              onClick={onNextQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold text-sm rounded-xl shadow-lg shadow-gold-500/20 active:scale-95 transition-all"
            >
              <span>Próxima Questão</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-900/30 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Concluir Treino e Selecionar Outro</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
