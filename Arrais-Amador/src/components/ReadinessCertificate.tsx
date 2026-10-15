import React from 'react';
import { Compass, Printer, X, CheckCircle2, AlertTriangle, BarChart3 } from 'lucide-react';
import { ExamResult, OfficialCategory } from '../types';

interface Props {
  result?: ExamResult | null;
  history?: ExamResult[];
  categoryTotals?: Record<OfficialCategory, { total: number; correct: number }>;
  onClose: () => void;
}

export const ReadinessCertificate: React.FC<Props> = ({
  result,
  history = [],
  categoryTotals,
  onClose,
}) => {
  const isSingleResult = Boolean(result);

  // Dados consolidados se não for resultado único
  const totalExams = history.length;
  const averageScore =
    totalExams > 0
      ? Math.round(history.reduce((acc, h) => acc + h.scorePercentage, 0) / totalExams)
      : 0;

  const scorePercentage = isSingleResult ? result!.scorePercentage : averageScore;
  const isApprovedOfficial = scorePercentage >= 50;
  const isFullyReady = scorePercentage >= 70; // Padrão de segurança recomendado para ir à Capitania

  const examTitle = isSingleResult
    ? result?.examTitle || (result?.mode === 'MODO_OFICIAL_MOTONAUTA' ? 'Simulado Oficial Motonauta' : 'Simulado Oficial Arrais-Amador')
    : `Certificado Consolidado (${totalExams} Simulados)`;

  const emissionDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const emissionTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const certCode = `BD-${isSingleResult ? result!.id.slice(-6).toUpperCase() : 'HIST-' + Date.now().toString().slice(-6)}`;

  // Disciplinas e aproveitamentos
  const categoriesData: { category: OfficialCategory; total: number; correct: number; percentage: number }[] = [];

  if (isSingleResult && result?.categoryStats) {
    (Object.keys(result.categoryStats) as OfficialCategory[]).forEach((cat) => {
      const st = result.categoryStats[cat];
      if (st && st.total > 0) {
        categoriesData.push({
          category: cat,
          total: st.total,
          correct: st.correct,
          percentage: st.percentage,
        });
      }
    });
  } else if (categoryTotals) {
    (Object.keys(categoryTotals) as OfficialCategory[]).forEach((cat) => {
      const st = categoryTotals[cat];
      if (st && st.total > 0) {
        categoriesData.push({
          category: cat,
          total: st.total,
          correct: st.correct,
          percentage: Math.round((st.correct / st.total) * 100),
        });
      }
    });
  }

  // Identifica matérias com rendimento abaixo de 70% para recomendação
  const weakCategories = categoriesData.filter((c) => c.percentage < 70);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Modal Actions Bar (hidden when printing) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold text-sm shadow-xl active:scale-95 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Salvar em PDF</span>
        </button>
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-navy-900/90 text-slate-300 hover:text-white border border-navy-700 active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Printable Certificate Page */}
      <div
        id="certificate-print-area"
        className="w-full max-w-3xl bg-slate-900 print:bg-white text-slate-100 print:text-slate-900 border-2 border-gold-500/50 print:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative my-auto print:shadow-none print:m-0 print:p-8"
      >
        {/* Certificate Border Frame */}
        <div className="border border-gold-500/30 print:border-slate-400 rounded-2xl p-5 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-navy-800 print:border-slate-300 pb-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-navy-950 print:bg-white rounded-[14px] flex items-center justify-center">
                <Compass className="w-7 h-7 text-gold-500" />
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-400 print:text-amber-700">
                Bússola Digital Náutica • Preparatório para Amadores
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100 print:text-slate-900">
                CERTIFICADO DE PRONTIDÃO NÁUTICA
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Avaliação de Desempenho e Simulação para Exame da Capitania dos Portos (DPC)
              </p>
            </div>
          </div>

          {/* Statement & Candidate Status */}
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed max-w-xl mx-auto">
              Certificamos que o candidato concluiu com registro a avaliação técnica preparatória referente ao{' '}
              <strong className="text-gold-400 print:text-slate-900 font-bold">{examTitle}</strong>, em conformidade com as exigências teóricas da{' '}
              <strong className="text-slate-100 print:text-slate-900">NORMAM-211/DPC, NORMAM-212/DPC, RIPEAM-72</strong> e da{' '}
              <strong className="text-slate-100 print:text-slate-900">LESTA (Lei 9.537/97)</strong>.
            </p>

            {/* Big Status Badge */}
            <div
              className={`p-4 rounded-2xl border text-center space-y-1 max-w-lg mx-auto ${
                isFullyReady
                  ? 'bg-emerald-950/60 print:bg-emerald-50 border-emerald-500/50 print:border-emerald-600 text-emerald-300 print:text-emerald-800'
                  : isApprovedOfficial
                  ? 'bg-amber-950/60 print:bg-amber-50 border-amber-500/50 print:border-amber-600 text-amber-300 print:text-amber-800'
                  : 'bg-rose-950/60 print:bg-rose-50 border-rose-500/50 print:border-rose-600 text-rose-300 print:text-rose-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {isFullyReady ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 print:text-emerald-700" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
                <span className="text-xs font-black uppercase tracking-wider">
                  {isFullyReady
                    ? 'APTO PARA O EXAME OFICIAL DA MARINHA'
                    : isApprovedOfficial
                    ? 'APROVADO NO ÍNDICE MÍNIMO (RECOMENDA-SE REVISÃO)'
                    : 'EM PREPARAÇÃO (ÍNDICE INSUFICIENTE)'}
                </span>
              </div>
              <p className="text-[11px] opacity-90">
                Aproveitamento Aferido:{' '}
                <strong className="font-extrabold text-sm">{scorePercentage}%</strong>{' '}
                {isSingleResult && `(${result?.correctCount} acertos de ${result?.totalQuestions} questões)`}
              </p>
            </div>
          </div>

          {/* Performance by Subject Table */}
          {categoriesData.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-slate-300 print:text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-gold-400 print:text-amber-700" />
                <span>Desempenho por Matéria Obrigatória:</span>
              </h3>

              <div className="border border-navy-800 print:border-slate-300 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-navy-950 print:bg-slate-100 text-slate-400 print:text-slate-700 font-bold border-b border-navy-800 print:border-slate-300">
                    <tr>
                      <th className="p-2 sm:px-3">Disciplina Avaliada</th>
                      <th className="p-2 sm:px-3 text-center">Questões</th>
                      <th className="p-2 sm:px-3 text-center">Acertos</th>
                      <th className="p-2 sm:px-3 text-right">Aproveitamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-800 print:divide-slate-200">
                    {categoriesData.map((cat) => (
                      <tr key={cat.category} className="print:text-slate-800">
                        <td className="p-2 sm:px-3 font-semibold">{cat.category}</td>
                        <td className="p-2 sm:px-3 text-center text-slate-400 print:text-slate-600">{cat.total}</td>
                        <td className="p-2 sm:px-3 text-center font-bold text-slate-200 print:text-slate-900">{cat.correct}</td>
                        <td className="p-2 sm:px-3 text-right">
                          <span
                            className={`font-black text-xs ${
                              cat.percentage >= 70
                                ? 'text-emerald-400 print:text-emerald-700'
                                : cat.percentage >= 50
                                ? 'text-amber-400 print:text-amber-700'
                                : 'text-rose-400 print:text-rose-700'
                            }`}
                          >
                            {cat.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recommendations Block */}
          <div className="p-3.5 rounded-xl bg-navy-950/70 print:bg-slate-50 border border-navy-800 print:border-slate-300 space-y-1.5 text-xs">
            <span className="font-bold text-gold-400 print:text-amber-800 block">
              Recomendações Pedagógicas para o Exame Real:
            </span>
            {weakCategories.length > 0 ? (
              <p className="text-slate-300 print:text-slate-700 text-[11px] leading-relaxed">
                Recomenda-se reforço nos módulos:{' '}
                <strong>{weakCategories.map((w) => w.category).join(', ')}</strong> com revisão de flashcards e resolução de simulados temáticos antes de agendar a prova presencial.
              </p>
            ) : (
              <p className="text-emerald-300 print:text-emerald-800 text-[11px]">
                Excelente domínio em todos os módulos examinados! O candidato demonstra segurança técnica nos conceitos de RIPEAM, Balizamento IALA B e Segurança da Navegação.
              </p>
            )}
          </div>

          {/* Verification Code, Metadata & Signatures */}
          <div className="border-t border-navy-800 print:border-slate-300 pt-4 flex flex-wrap items-end justify-between gap-4 text-[10px] text-slate-400 print:text-slate-600">
            <div className="space-y-0.5 font-mono">
              <p>Código de Verificação: <strong className="text-slate-200 print:text-slate-900">{certCode}</strong></p>
              <p>Emitido em: {emissionDate} às {emissionTime}</p>
              <p>Plataforma: Bússola Digital — Simulado Arrais-Amador PWA</p>
            </div>

            <div className="text-right space-y-1">
              <div className="w-40 border-b border-slate-600 print:border-slate-400 mx-auto"></div>
              <p className="font-bold text-slate-300 print:text-slate-800 text-center">
                Bússola Digital Náutica
              </p>
              <p className="text-[9px] text-center text-slate-400 print:text-slate-600">
                Validação de Formação Teórica
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
