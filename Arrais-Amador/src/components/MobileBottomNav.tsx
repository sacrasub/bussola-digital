import React from 'react';
import { ShieldCheck, BookOpen, AlertTriangle, BarChart3, Eye } from 'lucide-react';
import { ActiveTab } from '../types';

interface Props {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenExamModal?: () => void;
  errorCount: number;
  isExamInProgress: boolean;
}

export const MobileBottomNav: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  onOpenExamModal,
  errorCount,
  isExamInProgress,
}) => {
  const handleExamClick = () => {
    if (onOpenExamModal && !isExamInProgress) {
      onOpenExamModal();
    } else {
      onSelectTab('exam');
    }
  };

  return (
    <nav
      aria-label="Navegação Rápida Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-xl border-t border-navy-800/90 shadow-[0_-8px_25px_rgba(0,0,0,0.5)] px-2 py-1.5 safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* 1. Simulados */}
        <button
          onClick={handleExamClick}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative active:scale-95 min-w-[64px] ${
            activeTab === 'exam'
              ? 'text-gold-400 font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'exam'
                ? 'bg-gold-500/20 text-gold-400 ring-1 ring-gold-500/40 shadow-sm'
                : 'bg-transparent text-slate-400'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-bold">Simulados</span>
          {isExamInProgress && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          )}
        </button>

        {/* 2. Treino / Temas */}
        <button
          onClick={() => onSelectTab('study')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-95 min-w-[64px] ${
            activeTab === 'study'
              ? 'text-sky-400 font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'study'
                ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/40 shadow-sm'
                : 'bg-transparent text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-bold">Treino</span>
        </button>

        {/* Atalho Central de Destaque: Luzes 360° */}
        <button
          onClick={() => onSelectTab('lights')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all active:scale-95 ${
            activeTab === 'lights'
              ? 'text-cyan-300 font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'lights'
                ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40 shadow-sm'
                : 'bg-navy-900 border border-navy-800 text-slate-400'
            }`}
          >
            <Eye className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-bold">Luzes 360°</span>
        </button>

        {/* 3. Caderno de Erros */}
        <button
          onClick={() => onSelectTab('errors')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative active:scale-95 min-w-[64px] ${
            activeTab === 'errors'
              ? 'text-rose-400 font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all relative ${
              activeTab === 'errors'
                ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40 shadow-sm'
                : 'bg-transparent text-slate-400'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            {errorCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                {errorCount > 99 ? '99+' : errorCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-bold">Erros</span>
        </button>

        {/* 4. Estatísticas */}
        <button
          onClick={() => onSelectTab('stats')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-95 min-w-[64px] ${
            activeTab === 'stats'
              ? 'text-emerald-400 font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'stats'
                ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40 shadow-sm'
                : 'bg-transparent text-slate-400'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-bold">Estatísticas</span>
        </button>
      </div>
    </nav>
  );
};
