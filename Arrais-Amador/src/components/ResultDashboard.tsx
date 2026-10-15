import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, AlertTriangle, BookOpen, Layers, Printer } from 'lucide-react';
import { ExamResult, OfficialCategory } from '../types';
import { NauticalIllustration } from './NauticalIllustrations';
import { ReadinessCertificate } from './ReadinessCertificate';

interface Props {
  result: ExamResult;
  onRetryOfficial: () => void;
  onRetryErrors: () => void;
  onGoToStudy: () => void;
  onGoToFlashcards: () => void;
}

export const ResultDashboard: React.FC<Props> = ({
  result,
  onRetryOfficial,
  onRetryErrors,
  onGoToStudy,
  onGoToFlashcards,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'errors' | 'correct'>('all');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  useEffect(() => {
    if (result.isApproved) {

      // Fire confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E0A96D', '#10B981', '#38BDF8', '#F59E0B'],
      });
    }
  }, [result.isApproved]);

  const wrongAnswersCount = result.totalQuestions - result.correctCount;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const filteredQuestionsWithAnswers = result.questions
    .map((q, idx) => ({
      question: q,
      answer: result.answers[idx],
      isCorrect: result.answers[idx]?.selectedIndex === q.correctIndex,
      index: idx,
    }))
    .filter((item) => {
      if (filterMode === 'errors') return !item.isCorrect;
      if (filterMode === 'correct') return item.isCorrect;
      return true;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Hero Approval Banner */}
      <div
        className={`rounded-3xl border p-6 md:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden ${
          result.isApproved
            ? 'bg-gradient-to-b from-emerald-950/70 via-navy-900 to-navy-900 border-emerald-500/50'
            : 'bg-gradient-to-b from-rose-950/70 via-navy-900 to-navy-900 border-rose-500/50'
        }`}
      >
        {/* Glow backdrop */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
            result.isApproved ? 'bg-emerald-400' : 'bg-rose-500'
          }`}
        ></div>

        <div className="relative z-10 space-y-3">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg ${
              result.isApproved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-rose-500/10'
            }`}
          >
            {result.isApproved ? <Award className="w-9 h-9" /> : <AlertTriangle className="w-9 h-9" />}
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Resultado Oficial — Padrão Marinha do Brasil
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 mt-1">
              {result.isApproved ? (
                <span className="text-emerald-400">APROVADO PARA ARRAIS-AMADOR!</span>
              ) : (
                <span className="text-rose-400">NÃO ATINGIU A NOTA MÍNIMA (50%)</span>
              )}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto mt-1">
              {result.isApproved
                ? 'Parabéns! Seu aproveitamento atende aos critérios normativos da Capitania dos Portos (DPC).'
                : 'A Marinha do Brasil exige no mínimo 50% de acertos (20 de 40 questões). Revise os tópicos abaixo e tente novamente.'}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-3">
            <div className="bg-navy-950/70 border border-navy-800 p-3 rounded-2xl">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Aproveitamento</span>
              <p className={`text-2xl font-extrabold ${result.isApproved ? 'text-emerald-400' : 'text-rose-400'}`}>
                {result.scorePercentage}%
              </p>
            </div>

            <div className="bg-navy-950/70 border border-navy-800 p-3 rounded-2xl">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Acertos</span>
              <p className="text-2xl font-extrabold text-slate-100">
                {result.correctCount} <span className="text-xs font-normal text-slate-400">/ {result.totalQuestions}</span>
              </p>
            </div>

            <div className="bg-navy-950/70 border border-navy-800 p-3 rounded-2xl">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Erros</span>
              <p className="text-2xl font-extrabold text-rose-400">
                {wrongAnswersCount}
              </p>
            </div>

            <div className="bg-navy-950/70 border border-navy-800 p-3 rounded-2xl">
              <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> Tempo
              </span>
              <p className="text-2xl font-extrabold text-gold-400">
                {formatTime(result.timeElapsedSeconds)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setShowCertificate(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/30 active:scale-95 transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Exportar Certificado de Prontidão (PDF)</span>
        </button>

        <button
          onClick={onRetryOfficial}
          className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold text-sm shadow-lg shadow-gold-500/20 active:scale-95 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Fazer Novo Simulado Oficial (40 Q.)</span>
        </button>

        {wrongAnswersCount > 0 && (
          <button
            onClick={onRetryErrors}
            className="px-6 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-extrabold text-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Refazer Apenas as {wrongAnswersCount} Questões Erradas</span>
          </button>
        )}

        <button
          onClick={onGoToStudy}
          className="px-5 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 font-bold text-sm active:scale-95 transition-all flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-sky-400" />
          <span>Modo Treino por Tópico</span>
        </button>

        <button
          onClick={onGoToFlashcards}
          className="px-5 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 font-bold text-sm active:scale-95 transition-all flex items-center gap-2"
        >
          <Layers className="w-4 h-4 text-gold-400" />
          <span>Flashcards</span>
        </button>
      </div>

      {/* Performance by Category Breakdown */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-gold-400" />
          <span>Desempenho Discriminado por Matéria</span>
        </h2>

        <div className="space-y-3.5 pt-1">
          {(Object.entries(result.categoryStats) as [OfficialCategory, { total: number; correct: number; percentage: number }][])
            .filter(([_, stats]) => stats.total > 0)
            .map(([category, stats]) => {
              const isGood = stats.percentage >= 60;
              const isCritical = stats.percentage < 50;

              return (
                <div key={category} className="space-y-1.5 bg-navy-950/40 p-3 rounded-xl border border-navy-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{category}</span>
                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span className="text-slate-400 text-[11px]">
                        {stats.correct}/{stats.total} acertos
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          isCritical
                            ? 'bg-rose-500/20 text-rose-300'
                            : isGood
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {stats.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-navy-900 h-2.5 rounded-full overflow-hidden border border-navy-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical
                          ? 'bg-rose-500'
                          : isGood
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${stats.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Commented Answer Key Header & Filters */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-navy-800 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-100">Gabarito Comentado com Normas</h2>
            <p className="text-xs text-slate-400">
              Revise cada questão com os fundamentos da LESTA, RLESTA, RIPEAM e NORMAM-211.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-xl border border-navy-700 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-gold-500 text-navy-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todas ({result.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('errors')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterMode === 'errors'
                  ? 'bg-rose-500 text-white'
                  : 'text-rose-400 hover:bg-rose-500/10'
              }`}
            >
              Erros ({wrongAnswersCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterMode === 'correct'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              Acertos ({result.correctCount})
            </button>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-4">
          {filteredQuestionsWithAnswers.map(({ question: q, answer: ans, isCorrect, index }) => (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 md:p-6 space-y-4 transition-all shadow-md ${
                isCorrect
                  ? 'bg-navy-900/90 border-emerald-500/30'
                  : 'bg-navy-900/90 border-rose-500/40'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-navy-950 text-gold-400 border border-navy-800">
                      {q.topic}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Questão {index + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 leading-snug">
                    {index + 1}. {q.question}
                  </h3>
                </div>

                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correto
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5" /> Incorreto
                    </span>
                  )}
                </div>
              </div>

              {/* Illustration if any */}
              {q.image && (
                <div className="max-w-[220px] mx-auto my-2">
                  <NauticalIllustration type={q.image} className="w-full h-32" />
                </div>
              )}

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isUserChoice = ans?.selectedIndex === optIdx;
                  const isCorrectOption = optIdx === q.correctIndex;

                  let style = 'bg-navy-950/50 border-navy-800 text-slate-400';
                  if (isCorrectOption) {
                    style = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isUserChoice && !isCorrectOption) {
                    style = 'bg-rose-500/20 border-rose-500 text-rose-200 line-through';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-xs md:text-sm flex items-start gap-2.5 ${style}`}
                    >
                      <span className="font-mono font-bold w-5 text-center flex-shrink-0">
                        {optionLetters[optIdx]})
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isCorrectOption && (
                        <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Gabarito Oficial
                        </span>
                      )}
                      {isUserChoice && !isCorrectOption && (
                        <span className="text-[11px] font-extrabold text-rose-400 bg-rose-950 px-2 py-0.5 rounded flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Sua Escolha
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation & Norm Reference Card */}
              <div className="bg-navy-950 border border-navy-800 p-4 rounded-xl space-y-2 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-gold-400">Justificativa Técnica:</strong> {q.explanation}
                </p>
                <div className="flex items-center gap-1.5 text-gold-400 font-bold text-[11px] pt-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Fundamentação: {q.normReference}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Readiness Certificate Print/PDF Modal */}
      {showCertificate && (
        <ReadinessCertificate
          result={result}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

