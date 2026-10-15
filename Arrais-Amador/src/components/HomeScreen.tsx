import React from 'react';
import { Compass, BookOpen, Layers, AlertTriangle, Award, ShieldCheck, Anchor, ArrowRight, Zap, GraduationCap, Eye, Ship, Timer } from 'lucide-react';

interface Props {
  onStartOfficialExam: () => void;
  onStartMotonautaExam: () => void;
  onStartSprintExam: () => void;
  onGoToLights: () => void;
  onGoToConcepts: () => void;
  onGoToStudy: () => void;
  onGoToFlashcards: () => void;
  onStartErrorsMode: () => void;
  errorCount: number;
  totalQuestions: number;
  totalFlashcards: number;
}

export const HomeScreen: React.FC<Props> = ({
  onStartOfficialExam,
  onStartMotonautaExam,
  onStartSprintExam,
  onGoToLights,
  onGoToConcepts,
  onGoToStudy,
  onGoToFlashcards,
  onStartErrorsMode,
  errorCount,
  totalQuestions,
  totalFlashcards,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-800 border border-navy-700/80 p-6 md:p-10 shadow-2xl overflow-hidden">
        {/* Decorative Compass watermark */}
        <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
          <Compass className="w-80 h-80 text-gold-500" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Normas Atualizadas 2026
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              ✓ 100% Gratuito & Offline (PWA)
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
              Prepare-se para o Exame de <span className="text-gold-400">Arrais-Amador & Motonauta</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Plataforma preparatória com teoria completa e <strong className="text-slate-100">{totalQuestions} questões</strong> oficiais comentadas pela LESTA, RLESTA, RIPEAM, IALA Região B, NORMAM-211 e NORMAM-212/DPC.
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartOfficialExam}
              className="px-6 py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold text-sm shadow-xl shadow-gold-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-navy-950" />
              <span>Simulado Arrais (40 Q.)</span>
            </button>

            <button
              onClick={onStartMotonautaExam}
              className="px-5 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Ship className="w-4 h-4" />
              <span>Simulado Motonauta (20 Q.)</span>
            </button>

            <button
              onClick={onGoToLights}
              className="px-5 py-3.5 rounded-2xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-600 font-bold text-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Luzes 360° RIPEAM</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Feature Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-gold-400" />
          <span>Jornada de Aprendizado Náutico</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Aprender Conceitos */}
          <div
            onClick={onGoToConcepts}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-sky-500/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-base group-hover:text-sky-400 transition-colors">
                  1. Aprender Teoria
                </h3>
                <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-500/30">
                  Novo
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Apostila interativa com todos os conceitos-chave, ilustrações didáticas, áudio de apitos e dicas de ouro para a prova.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Ver Conceitos <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Modo Treino */}
          <div
            onClick={onGoToStudy}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-emerald-500/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-100 text-base group-hover:text-emerald-400 transition-colors">
                2. Modo Treino
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estude por matéria com gabarito imediato, comentários normativos e fundamentação jurídica a cada clique.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Escolher Matéria <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Flashcards & Áudio */}
          <div
            onClick={onGoToFlashcards}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-indigo-500/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-100 text-base group-hover:text-indigo-400 transition-colors">
                3. Flashcards 3D & Som
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Memorização rápida em 3D de balizamento, luzes de navegação e simulador de apitos náuticos reais.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Ver {totalFlashcards} Cards <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4: Simulado Oficial Arrais */}
          <div
            onClick={onStartOfficialExam}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-gold-500/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-100 text-base group-hover:text-gold-400 transition-colors">
                4. Simulado Arrais-Amador
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                40 questões balanceadas pela matriz oficial DPC, 120 minutos e aprovação com nota ≥ 50%.
              </p>
            </div>
            <span className="text-xs font-bold text-gold-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Começar Prova Oficial <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 5: Simulado Motonauta */}
          <div
            onClick={onStartMotonautaExam}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-cyan-500/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Ship className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-base group-hover:text-cyan-400 transition-colors">
                  5. Prova Motonauta
                </h3>
                <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  20 Q.
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                20 questões focadas em moto aquática, NORMAM-212, regras de praias, chave de corte e limites de segurança.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Simulado Jet-Ski <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 6: Sprint Desafio */}
          <div
            onClick={onStartSprintExam}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-amber-500/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Timer className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-base group-hover:text-amber-400 transition-colors">
                  6. Sprint Desafio
                </h3>
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  40 min
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                20 questões rápidas sorteadas de todo o banco para testar seu raciocínio contra o relógio.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Iniciar Sprint <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 7: Simulador de Luzes 360° */}
          <div
            onClick={onGoToLights}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-cyan-400/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                  7. Luzes 360° RIPEAM
                </h3>
                <span className="text-[10px] uppercase font-bold text-cyan-300 bg-cyan-400/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                  Interativo
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gire o mostrador para simular o que se enxerga à noite nos rumos cruzados, roda a roda e ultrapassagem.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Abrir Simulador 360° <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 8: Caderno de Erros */}
          <div
            onClick={errorCount > 0 ? onStartErrorsMode : onStartOfficialExam}
            className="bg-navy-900/90 hover:bg-navy-800/90 border border-navy-700/80 hover:border-rose-500/50 p-6 rounded-2xl transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 active:scale-98 md:col-span-2"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-100 text-base group-hover:text-rose-400 transition-colors">
                Caderno de Erros Personalizado
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {errorCount > 0
                  ? `Você possui ${errorCount} questões com erro anterior salvas para revisar e sanar dúvidas.`
                  : 'Nenhum erro salvo ainda! O sistema isola automaticamente qualquer erro para remediação rápida.'}
              </p>
            </div>
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              {errorCount > 0 ? `Refazer ${errorCount} Erros` : 'Iniciar Simulado'} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* High-Yield Maritime Quick Reference Cheat Sheet */}
      <div className="bg-navy-900/80 border border-navy-700/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <Anchor className="w-5 h-5 text-gold-400" />
            <span>Guia Rápido de Memorização (Pegadinhas Frequentes da Capitania)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Resumo dos tópicos com maior incidência histórica nas provas de Arrais-Amador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Box 1 */}
          <div className="bg-navy-950/70 border border-navy-800 p-4 rounded-2xl space-y-2">
            <span className="font-bold text-gold-400 uppercase tracking-wider block">
              1. Balizamento IALA Região B (Brasil)
            </span>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Entrada de Canal:</strong> Verde a Boreste (direita) e Encarnado a Bombordo (esquerda).</li>
              <li>• <strong>Perigo Isolado:</strong> 2 esferas pretas no tope, luz branca Fl(2).</li>
              <li>• <strong>Águas Seguras:</strong> Faixas verticais brancas e vermelhas, 1 esfera encarnada.</li>
            </ul>
          </div>

          {/* Box 2 */}
          <div className="bg-navy-950/70 border border-navy-800 p-4 rounded-2xl space-y-2">
            <span className="font-bold text-sky-400 uppercase tracking-wider block">
              2. Sinais Sonoros de Manobra
            </span>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>1 curto (•):</strong> Guino para Boreste (direita).</li>
              <li>• <strong>2 curtos (••):</strong> Guino para Bombordo (esquerda).</li>
              <li>• <strong>3 curtos (•••):</strong> Dando atrás (marcha a ré).</li>
              <li>• <strong>5 curtos rápidos:</strong> Dúvida / perigo iminente.</li>
            </ul>
          </div>

          {/* Box 3 */}
          <div className="bg-navy-950/70 border border-navy-800 p-4 rounded-2xl space-y-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider block">
              3. Regras de Manobra (RIPEAM)
            </span>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Roda a Roda:</strong> Ambas guinam para Boreste (BB com BB).</li>
              <li>• <strong>Rumos Cruzados:</strong> Quem vê o outro por Boreste deve manobrar.</li>
              <li>• <strong>Alcançado:</strong> A alcançada tem preferência total.</li>
            </ul>
          </div>

          {/* Box 4 */}
          <div className="bg-navy-950/70 border border-navy-800 p-4 rounded-2xl space-y-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block">
              4. Legislação & Normas 2026
            </span>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Arrais-Amador:</strong> Navegação interior (exceto moto aquática).</li>
              <li>• <strong>Motonauta:</strong> Exclusivo para moto aquática (jet-ski).</li>
              <li>• <strong>CHA Digital:</strong> Emitida com Gov.br (NORMAM-211/2026).</li>
            </ul>
          </div>

          {/* Box 5 */}
          <div className="bg-navy-950/70 border border-navy-800 p-4 rounded-2xl space-y-2">
            <span className="font-bold text-rose-400 uppercase tracking-wider block">
              5. Combate a Incêndio (CBINC)
            </span>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Classe A (Sólidos):</strong> Extintor de Água / Espuma.</li>
              <li>• <strong>Classe B (Líquidos):</strong> Extintor de Pó / CO2 / Espuma.</li>
              <li>• <strong>Classe C (Elétrico):</strong> CO2 ou Pó (PROIBIDO ÁGUA!).</li>
            </ul>
          </div>

          {/* Box 6 */}
          <div className="bg-navy-950/70 border border-navy-800 p-4 rounded-2xl space-y-2">
            <span className="font-bold text-indigo-400 uppercase tracking-wider block">
              6. Primeiros Socorros & Salvatagem
            </span>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>RCP Adulto:</strong> 30 compressões : 2 ventilações (100-120/min).</li>
              <li>• <strong>Homem ao Mar:</strong> Lançar boia com cabo, nunca perder de vista.</li>
              <li>• <strong>Bandeira Oscar:</strong> Sinaliza resgate de homem ao mar.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
