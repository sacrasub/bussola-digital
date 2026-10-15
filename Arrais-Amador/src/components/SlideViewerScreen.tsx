import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Grid,
  X,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  Compass
} from 'lucide-react';
import { SlideLesson, OfficialCategory } from '../types';

interface Props {
  onStartStudyWithCategory?: (category: OfficialCategory) => void;
}

export const SlideViewerScreen: React.FC<Props> = ({ onStartStudyWithCategory }) => {
  const [lessons, setLessons] = useState<SlideLesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('aula-1');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGridOpen, setIsGridOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Load slides data from public/data/slides.json
  useEffect(() => {
    fetch('./data/slides.json')
      .then((res) => res.json())
      .then((data: SlideLesson[]) => {
        setLessons(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar slides:', err);
        setIsLoading(false);
      });
  }, []);

  const currentLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  const slides = currentLesson?.slides || [];
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  const goToNextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  const selectLesson = (id: string) => {
    const target = lessons.find((l) => l.id === id);
    if (target?.isUpcoming) return;
    setSelectedLessonId(id);
    setCurrentSlideIndex(0);
    setIsPlaying(false);
    setIsGridOpen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if grid or modal is typing
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isGridOpen) {
        setIsGridOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, isGridOpen]);

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying && totalSlides > 0) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNextSlide();
      }, 6000);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, goToNextSlide, totalSlides]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch((err) => console.log(err));
    } else {
      document.exitFullscreen?.().catch((err) => console.log(err));
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Carregando acervo de slides e aulas oficiais...</p>
      </div>
    );
  }

  const progressPercent = totalSlides > 0 ? Math.round(((currentSlideIndex + 1) / totalSlides) * 100) : 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-700/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Aulas Oficiais Arrais-Amador
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
            Apresentações de Slides Náuticos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Material visual didático completo em alta definição para estudo e projeção em sala.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGridOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-800/80 hover:bg-navy-700 border border-navy-700 text-slate-200 text-xs font-semibold transition-all"
            title="Ver grade de todos os slides"
          >
            <Grid className="w-4 h-4 text-gold-400" />
            <span className="hidden sm:inline">Índice de Slides</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 text-gold-300 text-xs font-semibold transition-all"
            title="Tela Cheia (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {lessons.map((lesson) => {
          const isSelected = lesson.id === selectedLessonId;
          const isUpcoming = lesson.isUpcoming;

          return (
            <button
              key={lesson.id}
              onClick={() => selectLesson(lesson.id)}
              disabled={isUpcoming}
              className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                isUpcoming
                  ? 'bg-navy-950/40 border-navy-800/60 opacity-60 cursor-not-allowed'
                  : isSelected
                  ? 'bg-gradient-to-br from-navy-850 to-navy-800 border-gold-500/50 shadow-lg shadow-gold-500/10 ring-1 ring-gold-500/30'
                  : 'bg-navy-900/60 hover:bg-navy-850 border-navy-700/60 hover:border-navy-600 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-gold-400' : 'text-slate-400'}`}>
                    Dia {lesson.day}
                  </span>
                  {isUpcoming ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Em breve
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">
                      {lesson.totalSlides} slides
                    </span>
                  )}
                </div>
                <h4 className={`text-xs sm:text-sm font-bold line-clamp-1 ${isSelected ? 'text-slate-100' : 'text-slate-200'}`}>
                  {lesson.title.replace(/^Dia \d+ — /, '')}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {lesson.category}
                </p>
              </div>

              {isSelected && (
                <div className="mt-2.5 pt-2 border-t border-gold-500/20 flex items-center justify-between text-[10px] text-gold-400 font-semibold">
                  <span>Aula ativa</span>
                  <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Slide Presentation Stage */}
      <div
        ref={containerRef}
        className={`relative rounded-2xl overflow-hidden bg-black/90 border border-navy-700/80 shadow-2xl transition-all ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none flex flex-col justify-between' : ''
        }`}
      >
        {/* Fullscreen Header Bar */}
        {isFullscreen && (
          <div className="bg-navy-950/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-navy-700/60 z-30">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                {currentLesson?.title}
              </span>
              <p className="text-[11px] text-slate-400">{currentLesson?.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300 bg-navy-800 px-2.5 py-1 rounded-lg border border-navy-700">
                {currentSlideIndex + 1} / {totalSlides}
              </span>
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Slide Stage Area with Aspect Ratio */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full flex items-center justify-center select-none bg-gradient-to-b from-navy-950 to-black ${
            isFullscreen ? 'flex-1 overflow-hidden' : 'aspect-[16/9] min-h-[260px] md:min-h-[460px]'
          }`}
        >
          {currentSlide ? (
            <img
              src={currentSlide.image}
              alt={`Slide ${currentSlide.number} - ${currentLesson?.title}`}
              className="max-w-full max-h-full object-contain pointer-events-none transition-opacity duration-200"
              loading="eager"
            />
          ) : (
            <div className="text-center p-8 text-slate-400">
              <Compass className="w-12 h-12 text-gold-500/40 mx-auto mb-2 animate-spin" />
              <p className="text-sm">Nenhum slide disponível no momento.</p>
            </div>
          )}

          {/* Left Arrow Button */}
          <button
            onClick={goToPrevSlide}
            aria-label="Slide anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-navy-900/70 hover:bg-gold-500 hover:text-navy-950 backdrop-blur-md text-white border border-white/10 hover:border-gold-400 transition-all shadow-xl hover:scale-110 group z-20"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNextSlide}
            aria-label="Próximo slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-navy-900/70 hover:bg-gold-500 hover:text-navy-950 backdrop-blur-md text-white border border-white/10 hover:border-gold-400 transition-all shadow-xl hover:scale-110 group z-20"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Subtle Progress Bar atop Stage */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
            <div
              className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Player Bottom Control Strip */}
        <div className="bg-navy-950/95 backdrop-blur-md px-4 py-3 border-t border-navy-800/80 flex flex-wrap items-center justify-between gap-3 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
                isPlaying
                  ? 'bg-gold-500 text-navy-950 border-gold-400'
                  : 'bg-navy-900 hover:bg-navy-800 text-slate-200 border-navy-700'
              }`}
              title={isPlaying ? 'Pausar apresentação automática' : 'Iniciar apresentação contínua'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pausar' : 'Apresentar'}</span>
            </button>

            <span className="text-xs font-semibold text-slate-300">
              Slide <strong className="text-gold-400">{currentSlideIndex + 1}</strong> de {totalSlides}
              <span className="text-slate-500 ml-1.5 hidden sm:inline">({progressPercent}%)</span>
            </span>
          </div>

          {/* Quick Slider Scrubber */}
          <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 mx-4">
            <input
              type="range"
              min={0}
              max={Math.max(0, totalSlides - 1)}
              value={currentSlideIndex}
              onChange={(e) => setCurrentSlideIndex(Number(e.target.value))}
              className="w-full h-1.5 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGridOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-navy-700/80 text-slate-300 text-xs font-medium flex items-center gap-1.5"
            >
              <Grid className="w-3.5 h-3.5 text-gold-400" />
              <span>Ver todos</span>
            </button>

            {!isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-navy-700/80 text-slate-300"
                title="Tela Cheia"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Slide Context and Actions Card */}
      <div className="bg-navy-900/60 rounded-2xl border border-navy-700/60 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gold-400 font-semibold mb-1">
            <Calendar className="w-4 h-4" />
            <span>Módulo de Formação Teórica ({currentLesson?.instructor})</span>
          </div>
          <h3 className="text-base font-bold text-slate-100">{currentLesson?.title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{currentLesson?.subtitle}</p>
        </div>

        {onStartStudyWithCategory && (
          <button
            onClick={() => onStartStudyWithCategory(currentLesson.category as OfficialCategory)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all shrink-0"
          >
            <span>Praticar Questões deste Tema</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Grid Thumbnails Modal / Drawer */}
      {isGridOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-navy-700 pb-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Grid className="w-5 h-5 text-gold-400" />
                Índice Completo de Slides — {currentLesson?.title}
              </h3>
              <p className="text-xs text-slate-400">Clique em qualquer miniatura para navegar direto para o slide.</p>
            </div>
            <button
              onClick={() => setIsGridOpen(false)}
              className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1">
            {slides.map((s, idx) => {
              const isCurrent = idx === currentSlideIndex;
              return (
                <button
                  key={s.number}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setIsGridOpen(false);
                  }}
                  className={`group relative rounded-xl overflow-hidden border text-left transition-all aspect-[16/9] bg-navy-950 ${
                    isCurrent
                      ? 'border-gold-500 ring-2 ring-gold-500/40 shadow-lg shadow-gold-500/20'
                      : 'border-navy-700 hover:border-gold-400/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={s.image}
                    alt={`Slide ${s.number}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white border border-white/20">
                    {s.number}
                  </div>
                  {isCurrent && (
                    <div className="absolute inset-0 bg-gold-500/10 pointer-events-none flex items-center justify-center">
                      <span className="px-2 py-0.5 rounded bg-gold-500 text-navy-950 text-[10px] font-extrabold shadow">
                        Atual
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
