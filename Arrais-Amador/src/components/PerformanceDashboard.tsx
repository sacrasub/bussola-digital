import React, { useState } from 'react';
import { BarChart3, Award, AlertTriangle, RotateCcw, Trash2, ChevronRight, TrendingUp, Printer } from 'lucide-react';
import { ExamResult, OfficialCategory } from '../types';
import { ReadinessCertificate } from './ReadinessCertificate';

interface Props {
  history: ExamResult[];
  wrongQuestionIds: number[];
  onStartErrorsMode: () => void;
  onClearHistory: () => void;
  onSelectHistoricalResult: (result: ExamResult) => void;
  onStartExam: () => void;
}

export const PerformanceDashboard: React.FC<Props> = ({
  history,
  wrongQuestionIds,
  onStartErrorsMode,
  onClearHistory,
  onSelectHistoricalResult,
  onStartExam,
}) => {
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const totalExams = history.length;
  const officialExams = history.filter(
    (h) =>
      h.mode === 'official' ||
      h.mode === 'MODO_OFICIAL_ARRAIS' ||
      h.mode === 'MODO_OFICIAL_MOTONAUTA' ||
      h.mode === 'MODO_SPRINT_DESAFIO'
  );
  const approvedCount = officialExams.filter((h) => h.isApproved).length;
  const passRate = officialExams.length > 0 ? Math.round((approvedCount / officialExams.length) * 100) : 0;

  const averageScore =
    totalExams > 0
      ? Math.round(history.reduce((acc, h) => acc + h.scorePercentage, 0) / totalExams)
      : 0;

  const bestScore =
    totalExams > 0 ? Math.max(...history.map((h) => h.scorePercentage)) : 0;

  // Aggregate Category performance across all exams
  const categoryTotals: Record<OfficialCategory, { total: number; correct: number }> = {
    'RIPEAM': { total: 0, correct: 0 },
    'Balizamento': { total: 0, correct: 0 },
    'Legislação Náutica': { total: 0, correct: 0 },
    'Manobra, Atracação e Fundeio': { total: 0, correct: 0 },
    'Primeiros Socorros, Salvatagem e Incêndio': { total: 0, correct: 0 },
    'Motonauta': { total: 0, correct: 0 },
  };


  history.forEach((h) => {
    (Object.keys(h.categoryStats) as OfficialCategory[]).forEach((cat) => {
      if (categoryTotals[cat] && h.categoryStats[cat]) {
        categoryTotals[cat].total += h.categoryStats[cat].total;
        categoryTotals[cat].correct += h.categoryStats[cat].correct;
      }
    });
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Progresso do Aluno
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
            Painel de Desempenho & Estatísticas
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {totalExams > 0 && (
            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center gap-1.5 text-xs text-white bg-emerald-600 hover:bg-emerald-500 font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-md shadow-emerald-900/30 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Exportar Relatório / Certificado (PDF)</span>
            </button>
          )}

          {totalExams > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Deseja realmente limpar todo o histórico de simulados salvos?')) {
                  onClearHistory();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-2 rounded-xl transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Histórico</span>
            </button>
          )}
        </div>
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-navy-900 border border-navy-700/80 p-4 rounded-2xl shadow-lg space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Simulados Feitos</span>
          <p className="text-2xl md:text-3xl font-extrabold text-slate-100">{totalExams}</p>
          <span className="text-[10px] text-slate-400 block">{officialExams.length} oficiais</span>
        </div>

        <div className="bg-navy-900 border border-navy-700/80 p-4 rounded-2xl shadow-lg space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Taxa de Aprovação</span>
          <p className={`text-2xl md:text-3xl font-extrabold ${passRate >= 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {passRate}%
          </p>
          <span className="text-[10px] text-slate-400 block">{approvedCount} aprovações</span>
        </div>

        <div className="bg-navy-900 border border-navy-700/80 p-4 rounded-2xl shadow-lg space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Média Geral</span>
          <p className="text-2xl md:text-3xl font-extrabold text-gold-400">{averageScore}%</p>
          <span className="text-[10px] text-slate-400 block">Melhor: {bestScore}%</span>
        </div>

        <div className="bg-navy-900 border border-navy-700/80 p-4 rounded-2xl shadow-lg space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Caderno de Erros</span>
          <p className="text-2xl md:text-3xl font-extrabold text-rose-400">{wrongQuestionIds.length}</p>
          <span className="text-[10px] text-slate-400 block">questões a revisar</span>
        </div>
      </div>

      {/* Caderno de Erros Callout */}
      {wrongQuestionIds.length > 0 && (
        <div className="bg-gradient-to-r from-rose-950/50 to-navy-900 border border-rose-500/40 p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/30 text-rose-400 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Caderno de Erros ({wrongQuestionIds.length} Questões Pendentes)
              </h3>
              <p className="text-xs text-slate-300">
                Treine especificamente as questões que você errou em simulados anteriores para fixar o conteúdo.
              </p>
            </div>
          </div>

          <button
            onClick={onStartErrorsMode}
            className="w-full sm:w-auto px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Treinar Caderno de Erros</span>
          </button>
        </div>
      )}

      {/* Aggregate Category Performance */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gold-400" />
          <span>Aproveitamento Histórico por Matéria</span>
        </h2>

        <div className="space-y-3 pt-1">
          {(Object.entries(categoryTotals) as [OfficialCategory, { total: number; correct: number }][]).map(
            ([cat, totals]) => {
              const pct = totals.total > 0 ? Math.round((totals.correct / totals.total) * 100) : 0;
              const isGood = pct >= 60;
              const isCritical = pct > 0 && pct < 50;

              return (
                <div key={cat} className="space-y-1.5 bg-navy-950/40 p-3 rounded-xl border border-navy-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{cat}</span>
                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span className="text-slate-400 text-[11px]">
                        {totals.correct}/{totals.total} acertos
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
                        {pct}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-navy-900 h-2.5 rounded-full overflow-hidden border border-navy-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical ? 'bg-rose-500' : isGood ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* History Log List */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-gold-400" />
          <span>Histórico de Tentativas</span>
        </h2>

        {history.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-xs text-slate-400">Você ainda não realizou nenhum simulado.</p>
            <button
              onClick={onStartExam}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold text-xs rounded-xl shadow-md"
            >
              Realizar Primeiro Simulado Oficial
            </button>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {history.map((h, idx) => {
              const d = new Date(h.date);
              const formattedDate = `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

              return (
                <div
                  key={h.id || idx}
                  onClick={() => onSelectHistoricalResult(h)}
                  className="bg-navy-950/60 hover:bg-navy-800/80 border border-navy-800 hover:border-navy-600 p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        h.isApproved
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {h.scorePercentage}%
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">
                          {h.mode === 'official' ? 'Simulado Oficial (40 Q.)' : 'Modo Treino'}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                            h.isApproved ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                          }`}
                        >
                          {h.isApproved ? 'APROVADO' : 'REPROVADO'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{formattedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-mono hidden sm:inline">
                      {h.correctCount}/{h.totalQuestions} acertos
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <ReadinessCertificate
          history={history}
          categoryTotals={categoryTotals}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

