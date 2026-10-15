import React, { useState } from 'react';
import { Compass, BookOpen, Layers, Award, ShieldCheck, Menu, X, Wifi, WifiOff, GraduationCap, Eye, Presentation } from 'lucide-react';
import { ActiveTab } from '../types';

interface Props {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  errorCount: number;
  isExamInProgress: boolean;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  errorCount,
  isExamInProgress,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { id: 'home', label: 'Início', icon: <Compass className="w-4 h-4" /> },
    { id: 'slides', label: 'Slides', icon: <Presentation className="w-4 h-4 text-gold-400" />, badge: 'Aulas' },
    { id: 'concepts', label: 'Aprender', icon: <GraduationCap className="w-4 h-4" />, badge: 'Teoria' },
    { id: 'lights', label: 'Luzes 360°', icon: <Eye className="w-4 h-4 text-cyan-400" />, badge: 'Novo' },
    { id: 'study', label: 'Treinar', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'exam', label: 'Simulado', icon: <ShieldCheck className="w-4 h-4" />, badge: isExamInProgress ? 'EM CURSO' : 'Provas' },
    { id: 'flashcards', label: 'Cards & Som', icon: <Layers className="w-4 h-4" /> },
    { id: 'stats', label: 'Desempenho', icon: <Award className="w-4 h-4" />, badge: errorCount > 0 ? `${errorCount} Erros` : undefined },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    if (isExamInProgress && activeTab === 'exam' && tab !== 'exam') {
      if (!window.confirm('Existe um simulado oficial em andamento. Deseja realmente sair da tela da prova?')) {
        return;
      }
    }
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleGoToPortal = () => {
    if (isExamInProgress) {
      if (!window.confirm('Existe um simulado em andamento. Deseja sair para o Portal Principal?')) {
        return;
      }
    }
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-navy-800 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand — clicável, volta ao portal principal */}
          <a
            href="/"
            onClick={(e) => {
              if (isExamInProgress) {
                e.preventDefault();
                handleGoToPortal();
              }
            }}
            title="Voltar ao Portal Principal — Bússola Digital"
            className="flex items-center gap-3 cursor-pointer group select-none no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-400 p-0.5 shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-gold-500 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-100 group-hover:text-gold-400 transition-colors">
                  Bússola Digital
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-400 border border-gold-500/30">
                  ARRAIS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium group-hover:text-slate-300 transition-colors">
                Normas 2026 • Marinha do Brasil
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-navy-800 text-gold-400 shadow-sm border border-navy-700'
                      : 'text-slate-300 hover:text-white hover:bg-navy-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-gold-500 text-navy-950'
                          : 'bg-navy-800 text-slate-400 border border-navy-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status */}
          <div className="flex items-center gap-2">
            {/* Botão Portal Principal — desktop */}
            <a
              href="/"
              onClick={(e) => {
                if (isExamInProgress) {
                  e.preventDefault();
                  handleGoToPortal();
                }
              }}
              title="Portal Principal — Amador & Profissional"
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-navy-700 bg-navy-900 text-slate-400 hover:text-gold-400 hover:border-gold-500/40 hover:bg-navy-800 transition-all duration-200 no-underline group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Portal</span>
            </a>

            {/* PWA offline indicator */}
            <div
              className={`hidden sm:flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                isOnline
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
              title={isOnline ? 'App conectado e sincronizado' : 'Modo Offline PWA ativo'}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{isOnline ? 'Online (PWA)' : 'Offline Ativo'}</span>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-navy-900 border border-navy-700 text-slate-300 hover:text-white"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-b border-navy-800 px-4 py-3 space-y-1 animate-fade-in">
          {/* Link portal no topo do drawer mobile */}
          <a
            href="/"
            onClick={(e) => {
              if (isExamInProgress) {
                e.preventDefault();
                handleGoToPortal();
              }
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-slate-400 hover:bg-navy-900 hover:text-gold-400 transition-all no-underline border border-navy-800 hover:border-gold-500/30 mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>← Voltar ao Portal Principal</span>
          </a>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gold-500 text-navy-950 shadow-md font-extrabold'
                    : 'text-slate-200 hover:bg-navy-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-navy-950 text-gold-400' : 'bg-navy-900 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
