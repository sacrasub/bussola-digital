import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Shuffle, Sparkles, Award } from 'lucide-react';
import { Flashcard } from '../types';
import { soundSignals } from '../services/soundSignals';
import { NauticalIllustration } from './NauticalIllustrations';

interface Props {
  flashcards: Flashcard[];
}

export const FlashcardsScreen: React.FC<Props> = ({ flashcards }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  // Load mastered state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bussola_flashcards_mastered_v1');
    if (saved) {
      try {
        setMasteredIds(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao ler flashcards mastered', e);
      }
    }
  }, []);

  const categories = [
    { id: 'ALL', label: 'Todos os Cards' },
    { id: 'Sinais Sonoros', label: 'Sinais Sonoros (Áudio)' },
    { id: 'Balizamento IALA B', label: 'Balizamento IALA B' },
    { id: 'Luzes e Marcas', label: 'Luzes & Marcas' },
    { id: 'Regras de Manobra', label: 'Regras de Manobra' },
    { id: 'Combate a Incêndio', label: 'Combate a Incêndio' },
    { id: 'Primeiros Socorros', label: 'Primeiros Socorros' },
    { id: 'Legislação Náutica', label: 'Legislação 2026' },
  ];

  const filteredCards =
    selectedCategory === 'ALL'
      ? flashcards
      : flashcards.filter((f) => f.category === selectedCategory);

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  const handlePlaySound = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard || isPlayingSound) return;

    setIsPlayingSound(true);
    if (currentCard.soundDuration) {
      await soundSignals.playSequence(currentCard.soundDuration);
    } else if (currentCard.signalType) {
      soundSignals.playSignalByType(currentCard.signalType);
    }
    setIsPlayingSound(false);
  };

  const toggleMastered = (cardId: string, isMastered: boolean) => {
    let updated: string[];
    if (isMastered) {
      updated = Array.from(new Set([...masteredIds, cardId]));
    } else {
      updated = masteredIds.filter((id) => id !== cardId);
    }
    setMasteredIds(updated);
    localStorage.setItem('bussola_flashcards_mastered_v1', JSON.stringify(updated));
    handleNext();
  };

  if (!currentCard) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4">
        <p className="text-slate-400">Nenhum flashcard encontrado nesta categoria.</p>
        <button
          onClick={() => setSelectedCategory('ALL')}
          className="px-4 py-2 bg-gold-500 text-navy-950 font-bold rounded-xl text-xs"
        >
          Ver Todos os Flashcards
        </button>
      </div>
    );
  }

  const isCurrentMastered = masteredIds.includes(currentCard.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Fixação Rápida & Memorização Náutica
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Flashcards Interativos com Áudio
        </h1>
        <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
          Toque no cartão para girar e ver a resposta oficial. Ouça os apitos náuticos reais sintetizados pela Web Audio API.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gold-500 text-navy-950 border-gold-400 shadow-md'
                  : 'bg-navy-900/80 text-slate-400 border-navy-700 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Card Container with 3D Flip */}
      <div className="perspective-1000 min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-xl h-full p-6 md:p-8 rounded-3xl border cursor-pointer transition-all duration-500 transform shadow-2xl relative flex flex-col justify-between select-none ${
            isFlipped
              ? 'bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border-gold-500/60 ring-1 ring-gold-500/30'
              : 'bg-gradient-to-br from-navy-900 via-navy-850 to-navy-800 border-navy-700/80 hover:border-gold-500/40'
          }`}
        >
          {/* Top Bar inside card */}
          <div className="flex items-center justify-between border-b border-navy-700/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                {currentCard.category}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {currentIndex + 1} / {filteredCards.length}
              </span>
            </div>

            {/* Sound Button if sound available */}
            {(currentCard.soundDuration || currentCard.signalType) && (
              <button
                onClick={handlePlaySound}
                disabled={isPlayingSound}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingSound ? 'animate-bounce text-sky-400' : ''}`} />
                <span>{isPlayingSound ? 'Tocando Apito...' : 'Ouvir Apito'}</span>
              </button>
            )}
          </div>

          {/* Center Card Content */}
          <div className="py-5 text-center space-y-4">
            {!isFlipped ? (
              // FRONT OF CARD (Question without giving away answer in graphic)
              <div className="space-y-3 animate-fade-in">
                <h3 className="text-lg md:text-xl font-bold text-slate-100">
                  {currentCard.title}
                </h3>
                {currentCard.subtitle && (
                  <p className="text-xs text-gold-400 font-medium">{currentCard.subtitle}</p>
                )}

                {currentCard.imageType && (
                  <div className="max-w-[180px] mx-auto my-1">
                    <NauticalIllustration type={currentCard.imageType} showLabel={false} className="w-full h-28" />
                  </div>
                )}

                <p className="text-sm md:text-base text-slate-200 max-w-md mx-auto leading-relaxed pt-1 font-medium">
                  {currentCard.front}
                </p>
              </div>
            ) : (
              // BACK OF CARD (ANSWER with full illustrated labels)
              <div className="space-y-3 animate-fade-in">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Resposta & Regra Náutica
                </span>

                {currentCard.imageType && (
                  <div className="max-w-[180px] mx-auto my-1">
                    <NauticalIllustration type={currentCard.imageType} showLabel={true} className="w-full h-28" />
                  </div>
                )}

                <div className="bg-navy-950/90 border border-gold-500/30 p-4 rounded-2xl">
                  <p className="text-sm md:text-base font-bold text-slate-100 whitespace-pre-line leading-relaxed">
                    {currentCard.back}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-gold-400 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>{currentCard.normReference}</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Flip Hint */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-navy-700/60 pt-3">
            <span className="flex items-center gap-1 text-[11px]">
              <RotateCw className="w-3.5 h-3.5 text-gold-400" />
              Toque no card para {isFlipped ? 'voltar à pergunta' : 'ver resposta'}
            </span>

            {isCurrentMastered && (
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Dominado
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Controls & Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 rounded-xl transition-all active:scale-95 shadow"
            title="Card Anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleShuffle}
            className="p-3 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 rounded-xl transition-all active:scale-95 shadow"
            title="Embaralhar"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="p-3 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 rounded-xl transition-all active:scale-95 shadow"
            title="Próximo Card"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Self Assessment Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => toggleMastered(currentCard.id, false)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all active:scale-95"
          >
            <XCircle className="w-4 h-4" />
            <span>Revisar Mais</span>
          </button>

          <button
            onClick={() => toggleMastered(currentCard.id, true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Já Dominei!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
