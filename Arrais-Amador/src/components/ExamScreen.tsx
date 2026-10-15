import React, { useState } from 'react';
import { Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2, Grid, AlertTriangle, Send, XCircle } from 'lucide-react';
import { Question, ExamAnswer } from '../types';
import { NauticalIllustration } from './NauticalIllustrations';

interface Props {
  questions: Question[];
  currentIndex: number;
  answers: ExamAnswer[];
  timeRemaining: number;
  examTitle?: string;
  onSelectIndex: (index: number) => void;
  onSelectOption: (optionIndex: number) => void;
  onToggleFlag: () => void;
  onFinishExam: () => void;
  onCancelExam: () => void;
}

export const ExamScreen: React.FC<Props> = ({
  questions,
  currentIndex,
  answers,
  timeRemaining,
  examTitle,
  onSelectIndex,
  onSelectOption,
  onToggleFlag,
  onFinishExam,
  onCancelExam,
}) => {
  const [showGridModal, setShowGridModal] = useState<boolean>(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const currentAns = answers[currentIndex];

  if (!currentQ) return null;

  // Format timer HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeRemaining < 15 * 60; // < 15 min
  const answeredCount = answers.filter((a) => a.selectedIndex !== null).length;
  const flaggedCount = answers.filter((a) => a.isFlaggedForReview).length;

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Sticky Header with Timer, Progress & Palette Button */}
      <div className="sticky top-16 z-40 bg-navy-900/95 backdrop-blur-md rounded-2xl p-4 border border-navy-700 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGridModal(true)}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
          >
            <Grid className="w-4 h-4 text-gold-400" />
            <span>Grade ({answeredCount}/{questions.length})</span>
          </button>

          <div className="hidden sm:flex flex-col">
            {examTitle && <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">{examTitle}</span>}
            <span className="text-xs text-slate-400 font-medium">
              Questão <strong className="text-slate-100 font-bold">{currentIndex + 1}</strong> de {questions.length}
            </span>
          </div>
        </div>

        {/* Category Pill */}
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy-800 text-gold-400 border border-gold-500/30">
          {currentQ.topic}
        </span>

        {/* Timer & Buttons */}
        <div className="flex items-center gap-2.5">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border shadow-inner ${
              isTimeCritical
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                : 'bg-navy-800 text-gold-400 border-navy-600'
            }`}
          >
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-400' : 'text-gold-400'}`} />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          <button
            onClick={onCancelExam}
            className="p-1.5 bg-navy-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-navy-700 rounded-xl transition-all"
            title="Cancelar Simulado"
          >
            <XCircle className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md shadow-emerald-900/30 active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Entregar</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden border border-navy-800">
        <div
          className="bg-gradient-to-r from-gold-600 via-gold-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-navy-800/90 rounded-2xl border border-navy-700/80 p-5 md:p-7 shadow-xl space-y-6">
        {/* Header Question Info */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              {currentQ.subtopic || currentQ.topic}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-slate-100 mt-1 leading-snug">
              {currentIndex + 1}. {currentQ.question}
            </h2>
          </div>

          {/* Flag Button */}
          <button
            onClick={onToggleFlag}
            className={`p-2.5 rounded-xl border transition-all active:scale-90 flex-shrink-0 ${
              currentAns?.isFlaggedForReview
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-md'
                : 'bg-navy-900/60 text-slate-400 border-navy-700 hover:text-slate-200'
            }`}
            title="Marcar questão para revisar depois"
          >
            <Flag className={`w-5 h-5 ${currentAns?.isFlaggedForReview ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Optional Nautical Illustration */}
        {currentQ.image && (
          <div className="my-3">
            <NauticalIllustration type={currentQ.image} />
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((optionText, optIdx) => {
            const isSelected = currentAns?.selectedIndex === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => onSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group active:scale-[0.99] ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500/20 to-navy-700/80 border-gold-500 text-slate-100 shadow-md ring-1 ring-gold-500/40'
                    : 'bg-navy-900/60 border-navy-700/70 text-slate-300 hover:bg-navy-700/60 hover:border-navy-600'
                }`}
              >
                {/* Option Letter Circle */}
                <div
                  className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? 'bg-gold-500 text-navy-955 shadow'
                      : 'bg-navy-800 text-slate-300 border border-navy-600 group-hover:border-slate-500'
                  }`}
                >
                  {optionLetters[optIdx] || optIdx + 1}
                </div>

                {/* Option Content */}
                <span className="text-sm md:text-base leading-relaxed pt-0.5 flex-1">
                  {optionText}
                </span>

                {/* Checked Icon */}
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-navy-900 border-navy-800 text-slate-500'
              : 'bg-navy-800 hover:bg-navy-700 text-slate-200 border-navy-600 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {/* Flag status on mobile */}
        {currentAns?.isFlaggedForReview && (
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
            <Flag className="w-3.5 h-3.5 fill-amber-400" />
            Marcada para revisão
          </span>
        )}

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => onSelectIndex(currentIndex + 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-gold-500 hover:bg-gold-400 text-navy-950 transition-all shadow-md shadow-gold-500/20 active:scale-95"
          >
            <span>Próxima</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Finalizar Prova</span>
          </button>
        )}
      </div>

      {/* Grid Palette Modal */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100">Grade de Questões (40 Itens)</h3>
                <p className="text-xs text-slate-400">Clique em qualquer número para ir direto à questão.</p>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-navy-800 px-2.5 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-300 bg-navy-950/60 p-2.5 rounded-xl border border-navy-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
                <span>Respondida</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500 inline-block"></span>
                <span>Revisar ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-navy-800 border border-navy-700 inline-block"></span>
                <span>Pendente ({questions.length - answeredCount})</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 overflow-y-auto p-1 flex-1">
              {questions.map((_, qIdx) => {
                const ans = answers[qIdx];
                const isCurrent = qIdx === currentIndex;
                const isAnswered = ans && ans.selectedIndex !== null;
                const isFlagged = ans && ans.isFlaggedForReview;

                let bgClass = 'bg-navy-800 text-slate-300 border-navy-700 hover:border-slate-500';
                if (isAnswered) {
                  bgClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold';
                }
                if (isFlagged) {
                  bgClass = 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold';
                }
                if (isCurrent) {
                  bgClass += ' ring-2 ring-gold-400 font-black scale-105';
                }

                return (
                  <button
                    key={qIdx}
                    onClick={() => {
                      onSelectIndex(qIdx);
                      setShowGridModal(false);
                    }}
                    className={`h-10 rounded-xl text-xs flex flex-col items-center justify-center border transition-all relative ${bgClass}`}
                  >
                    <span>{qIdx + 1}</span>
                    {isFlagged && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowGridModal(false)}
              className="w-full py-2.5 bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-bold rounded-xl border border-navy-700"
            >
              Voltar à Prova
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-100">Deseja entregar o Simulado Oficial?</h3>
              <p className="text-xs text-slate-400">
                Você respondeu <strong className="text-emerald-400 font-bold">{answeredCount}</strong> de <strong>{questions.length}</strong> questões.
              </p>
            </div>

            {questions.length - answeredCount > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                <span>
                  Atenção: você ainda tem <strong>{questions.length - answeredCount}</strong> questões em branco.
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="py-2.5 rounded-xl border border-navy-700 bg-navy-800 hover:bg-navy-700 text-slate-300 font-bold text-xs"
              >
                Continuar Respondendo
              </button>

              <button
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  onFinishExam();
                }}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30"
              >
                Sim, Finalizar e Ver Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
