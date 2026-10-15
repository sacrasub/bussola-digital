import React, { useState, useMemo } from 'react';
import { Compass, Eye, ShieldAlert, Lightbulb } from 'lucide-react';

export type TargetVesselType =
  | 'power_under_50'
  | 'power_over_50'
  | 'anchored'
  | 'not_under_command'
  | 'restricted_maneuver'
  | 'towing';

interface VesselConfig {
  id: TargetVesselType;
  name: string;
  category: string;
  rule: string;
  description: string;
}

export const NightLightsSimulator: React.FC = () => {
  // Ângulo relativo da embarcação-alvo em relação à proa do observador (0° a 359°)
  // 0° = Vindo proa com proa (você vê a proa dela)
  // 90° = Ela está mostrando o seu bordo de boreste (estibordo)
  // 180° = Você está na popa dela (alcançado)
  // 270° = Ela está mostrando o seu bordo de bombordo
  const [aspectAngle, setAspectAngle] = useState<number>(0);
  const [selectedVessel, setSelectedVessel] = useState<TargetVesselType>('power_under_50');
  const [isUnderway, setIsUnderway] = useState<boolean>(true); // Com seguimento (para sem governo/manobra restrita)

  const vesselTypes: VesselConfig[] = [
    {
      id: 'power_under_50',
      name: 'Propulsão Mecânica (< 50m)',
      category: 'Regra 23 do RIPEAM',
      rule: 'RIPEAM-72 Regra 23(a)',
      description: 'Lancha ou barco a motor com menos de 50 metros de comprimento em movimento.',
    },
    {
      id: 'power_over_50',
      name: 'Propulsão Mecânica (≥ 50m)',
      category: 'Regra 23 do RIPEAM',
      rule: 'RIPEAM-72 Regra 23(a)(ii)',
      description: 'Navio ou grande embarcação comercial com 50m ou mais (duas luzes de mastro alinhadas).',
    },
    {
      id: 'anchored',
      name: 'Embarcação Fundeada (< 50m)',
      category: 'Regra 30 do RIPEAM',
      rule: 'RIPEAM-72 Regra 30(a)',
      description: 'Embarcação em repouso no ferro de fundeio. Exibe luz circular de 360°.',
    },
    {
      id: 'not_under_command',
      name: 'Embarcação Sem Governo (NUC)',
      category: 'Regra 27 do RIPEAM',
      rule: 'RIPEAM-72 Regra 27(a)',
      description: 'Avariada no mar (sem leme ou propulsão). Exibe duas luzes encarnadas verticais de 360°.',
    },
    {
      id: 'restricted_maneuver',
      name: 'Capacidade de Manobra Restrita',
      category: 'Regra 27 do RIPEAM',
      rule: 'RIPEAM-72 Regra 27(b)',
      description: 'Embarcação lançando cabos, dragando ou em faina especial (Encarnada - Branca - Encarnada).',
    },
    {
      id: 'towing',
      name: 'Embarcação Rebocando (< 200m)',
      category: 'Regra 24 do RIPEAM',
      rule: 'RIPEAM-72 Regra 24(a)',
      description: 'Rebocador com comprimento de reboque inferior a 200m (2 mastros verticais + luz amarela na popa).',
    },
  ];

  // Cálculos de setores visíveis com base no aspecto relativo
  // Ângulos do RIPEAM:
  // - Luz de Mastro: arco de 225° na proa (da proa até 112,5° a boreste e 247,5° a bombordo)
  // - Luz de Boreste (Verde): de 0° até 112,5°
  // - Luz de Bombordo (Encarnada): de 247,5° até 360° (0°)
  // - Luz de Alcançado (Popa): arco de 135° na popa (de 112,5° até 247,5°)
  const angleNormalized = ((aspectAngle % 360) + 360) % 360;

  const currentSector = useMemo(() => {
    if (angleNormalized >= 355 || angleNormalized <= 5) {
      return 'HEAD_ON'; // Proa frontal
    } else if (angleNormalized > 5 && angleNormalized <= 112.5) {
      return 'STARBOARD'; // Vendo o boreste (luz verde)
    } else if (angleNormalized > 112.5 && angleNormalized < 247.5) {
      return 'STERN'; // Vendo a popa (luz de alcançado)
    } else {
      return 'PORT'; // Vendo o bombordo (luz vermelha)
    }
  }, [angleNormalized]);

  // Luzes ativas observadas
  const observedLights = useMemo(() => {
    const lights: {
      id: string;
      label: string;
      color: 'white' | 'green' | 'red' | 'yellow';
      type: string;
      position: string;
    }[] = [];

    if (selectedVessel === 'anchored') {
      lights.push({
        id: 'anchor_white',
        label: 'Luz de Fundeio (360°)',
        color: 'white',
        type: 'Circular 360°',
        position: 'Mastro de vante',
      });
      return lights;
    }

    if (selectedVessel === 'not_under_command') {
      lights.push(
        { id: 'nuc_1', label: 'Luz Encarnada Superior (360°)', color: 'red', type: 'Sem Governo', position: 'Mastro superior' },
        { id: 'nuc_2', label: 'Luz Encarnada Inferior (360°)', color: 'red', type: 'Sem Governo', position: 'Mastro inferior' }
      );
      if (isUnderway) {
        if (currentSector === 'HEAD_ON') {
          lights.push(
            { id: 'green_side', label: 'Boreste (Verde)', color: 'green', type: 'Bordos (112,5°)', position: 'Boreste' },
            { id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', type: 'Bordos (112,5°)', position: 'Bombordo' }
          );
        } else if (currentSector === 'STARBOARD') {
          lights.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', type: 'Bordos (112,5°)', position: 'Boreste' });
        } else if (currentSector === 'PORT') {
          lights.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', type: 'Bordos (112,5°)', position: 'Bombordo' });
        } else if (currentSector === 'STERN') {
          lights.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca)', color: 'white', type: 'Popa (135°)', position: 'Popa' });
        }
      }
      return lights;
    }

    if (selectedVessel === 'restricted_maneuver') {
      lights.push(
        { id: 'rm_red1', label: 'Luz Encarnada Superior (360°)', color: 'red', type: 'Manobra Restrita', position: 'Topo do mastro' },
        { id: 'rm_white', label: 'Luz Branca Central (360°)', color: 'white', type: 'Manobra Restrita', position: 'Meio do mastro' },
        { id: 'rm_red2', label: 'Luz Encarnada Inferior (360°)', color: 'red', type: 'Manobra Restrita', position: 'Base do mastro' }
      );
      if (isUnderway) {
        if (currentSector === 'HEAD_ON') {
          lights.push(
            { id: 'mast_1', label: 'Luz de Mastro (Branca)', color: 'white', type: 'Mastro (225°)', position: 'Vante' },
            { id: 'green_side', label: 'Boreste (Verde)', color: 'green', type: 'Bordos (112,5°)', position: 'Boreste' },
            { id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', type: 'Bordos (112,5°)', position: 'Bombordo' }
          );
        } else if (currentSector === 'STARBOARD') {
          lights.push(
            { id: 'mast_1', label: 'Luz de Mastro (Branca)', color: 'white', type: 'Mastro (225°)', position: 'Vante' },
            { id: 'green_side', label: 'Boreste (Verde)', color: 'green', type: 'Bordos (112,5°)', position: 'Boreste' }
          );
        } else if (currentSector === 'PORT') {
          lights.push(
            { id: 'mast_1', label: 'Luz de Mastro (Branca)', color: 'white', type: 'Mastro (225°)', position: 'Vante' },
            { id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', type: 'Bordos (112,5°)', position: 'Bombordo' }
          );
        } else if (currentSector === 'STERN') {
          lights.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca)', color: 'white', type: 'Popa (135°)', position: 'Popa' });
        }
      }
      return lights;
    }

    // Propulsão Mecânica e Rebocando
    const isMastVisible = currentSector !== 'STERN';
    const isSternVisible = currentSector === 'STERN';

    if (isMastVisible) {
      if (selectedVessel === 'power_under_50') {
        lights.push({ id: 'mast_1', label: 'Luz de Mastro (Branca 225°)', color: 'white', type: 'Mastro', position: 'Vante' });
      } else if (selectedVessel === 'power_over_50') {
        lights.push(
          { id: 'mast_1', label: 'Luz de Mastro de Vante (Branca 225°)', color: 'white', type: 'Mastro mais baixo', position: 'Vante' },
          { id: 'mast_2', label: 'Luz de Mastro de Ré (Branca 225°)', color: 'white', type: 'Mastro mais alto', position: 'Ré' }
        );
      } else if (selectedVessel === 'towing') {
        lights.push(
          { id: 'tow_1', label: 'Luz de Mastro Superior (Branca)', color: 'white', type: 'Reboque (<200m)', position: 'Mastro topo' },
          { id: 'tow_2', label: 'Luz de Mastro Inferior (Branca)', color: 'white', type: 'Reboque (<200m)', position: 'Mastro base' }
        );
      }
    }

    if (currentSector === 'HEAD_ON') {
      lights.push(
        { id: 'green_side', label: 'Boreste (Verde 112,5°)', color: 'green', type: 'Bordos', position: 'Lado direito da outra' },
        { id: 'red_side', label: 'Bombordo (Encarnada 112,5°)', color: 'red', type: 'Bordos', position: 'Lado esquerdo da outra' }
      );
    } else if (currentSector === 'STARBOARD') {
      lights.push({ id: 'green_side', label: 'Boreste (Verde 112,5°)', color: 'green', type: 'Bordos', position: 'Boreste' });
    } else if (currentSector === 'PORT') {
      lights.push({ id: 'red_side', label: 'Bombordo (Encarnada 112,5°)', color: 'red', type: 'Bordos', position: 'Bombordo' });
    }

    if (isSternVisible) {
      lights.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca 135°)', color: 'white', type: 'Popa', position: 'Popa' });
      if (selectedVessel === 'towing') {
        lights.push({ id: 'tow_yellow', label: 'Luz de Reboque (Amarela 135°)', color: 'yellow', type: 'Popa Reboque', position: 'Acima do alcançado' });
      }
    }

    return lights;
  }, [selectedVessel, currentSector, isUnderway]);

  // Interpretação e Manobra Regulamentar
  const situationAnalysis = useMemo(() => {
    if (selectedVessel === 'anchored') {
      return {
        title: 'Embarcação Fundeada',
        status: 'FUNDEADA',
        badgeColor: 'amber',
        action: 'Mantenha resguardo seguro. Não há risco de manobra repentina por parte da embarcação fundeada.',
        risk: 'Baixo se mantido resguardo visual.',
      };
    }

    if (selectedVessel === 'not_under_command') {
      return {
        title: 'Embarcação Sem Governo (NUC)',
        status: 'PRIORIDADE MÁXIMA PARA ELA',
        badgeColor: 'rose',
        action: 'Ela NÃO consegue manobrar. VOCÊ É OBRIGADO a manobrar com antecedência e dar amplo resguardo (Regra 18).',
        risk: 'Crítico: risco imediato se não houver desvio proativo.',
      };
    }

    if (selectedVessel === 'restricted_maneuver') {
      return {
        title: 'Capacidade de Manobra Restrita',
        status: 'PRIORIDADE PARA ELA',
        badgeColor: 'indigo',
        action: 'Embarcação em trabalho especial. Você deve manter-se fora do caminho dela com ampla folga (Regra 18).',
        risk: 'Elevado.',
      };
    }

    switch (currentSector) {
      case 'HEAD_ON':
        return {
          title: 'Situação de "Roda a Roda" (Proa com Proa)',
          status: 'MANOBRA RECÍPROCA OBRIGATÓRIA',
          badgeColor: 'rose',
          action: 'AMBAS as embarcações DEVEM GUINAR PARA BORESTE (direita), passando bombordo com bombordo (Regra 14). Soar 1 apito curto!',
          risk: 'Altíssimo risco de abalroamento frontal se não houver guinada imediata.',
        };
      case 'STARBOARD':
        return {
          title: 'Rumos Cruzados — Você Vê a Luz VERDE',
          status: 'VOCÊ TEM A PREFERÊNCIA',
          badgeColor: 'emerald',
          action: 'A outra embarcação avista a sua luz vermelha pelo boreste dela e DEVE MANOBRAR para passar pela sua popa. Mantenha seu rumo e velocidade (Regra 17).',
          risk: 'Médio: acompanhe a marcação na bússola; se ela não manobrar, aja preventivamente.',
        };
      case 'PORT':
        return {
          title: 'Rumos Cruzados — Você Vê a Luz ENCARNADA (Vermelha)',
          status: 'VOCÊ DEVE MANOBRAR!',
          badgeColor: 'rose',
          action: 'PERIGO: A outra embarcação está no seu boreste e TEM PREFERÊNCIA. Você deve manobrar para a direita e passar pela popa dela (Regra 15 e 16).',
          risk: 'Alto: corte de proa proibido!',
        };
      case 'STERN':
        return {
          title: 'Situação de Alcançado (Ultrapassagem)',
          status: 'VOCÊ É O ALCANÇADOR',
          badgeColor: 'sky',
          action: 'Você está se aproximando pela popa (setor da luz branca de 135°). VOCÊ DEVE MANTER-SE FORA DO CAMINHO da alcançada até ultrapassá-la completamente (Regra 13).',
          risk: 'Moderado: escolha o bordo mais seguro e dê resguardo.',
        };
    }
  }, [selectedVessel, currentSector]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
          <Eye className="w-4 h-4" />
          Simulador Interativo 360° RIPEAM
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-slate-100">
          Simulador de Luzes e Marcas Noturnas
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Gire o mostrador náutico de 0° a 360° para visualizar exatamente o que você enxerga à noite na água, identificar o tipo de embarcação e aplicar as Regras de Manobra da Marinha.
        </p>
      </div>

      {/* Vessel Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {vesselTypes.map((v) => {
          const isSelected = selectedVessel === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setSelectedVessel(v.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-br from-navy-800 to-navy-700 border-gold-500 shadow-md ring-2 ring-gold-500/20'
                  : 'bg-navy-900/80 border-navy-700/70 hover:bg-navy-800 text-slate-300'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-gold-400' : 'text-slate-400'}`}>
                {v.category}
              </span>
              <span className="font-bold text-xs text-slate-100 line-clamp-2">
                {v.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: 360° Compass Dial & Relative Aspect Control (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-gold-400" />
              <h2 className="font-extrabold text-sm text-slate-200">
                Mostrador de Aspecto Relativo
              </h2>
            </div>
            <div className="px-3 py-1 rounded-xl bg-navy-800 border border-navy-700 font-mono text-xs font-bold text-gold-400">
              Ângulo: {angleNormalized.toFixed(0)}°
            </div>
          </div>

          {/* Circular Compass Visualizer */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
            {/* Outer Compass Rose Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-navy-700 opacity-60"></div>
            <div className="absolute inset-2 rounded-full border border-navy-600/50"></div>

            {/* Quadrant Markers */}
            <span className="absolute top-1 text-[11px] font-extrabold text-slate-300">0° PROA</span>
            <span className="absolute right-1 text-[11px] font-extrabold text-emerald-400">90° BORESTE</span>
            <span className="absolute bottom-1 text-[11px] font-extrabold text-slate-300">180° POPA</span>
            <span className="absolute left-1 text-[11px] font-extrabold text-rose-400">270° BOMBORDO</span>

            {/* Sector Arcs (SVG) */}
            <svg viewBox="0 0 200 200" className="w-full h-full pointer-events-none">
              {/* Starboard Sector (Green arc: 5° to 112.5°) */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="50 460" strokeDashoffset="12" opacity="0.3" />
              {/* Port Sector (Red arc: 247.5° to 355°) */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="50 460" strokeDashoffset="-120" opacity="0.3" />
              {/* Stern Sector (White arc: 112.5° to 247.5°) */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="#F8FAFC" strokeWidth="4" strokeDasharray="60 460" strokeDashoffset="-50" opacity="0.2" />

              {/* Target Boat in Center with dynamic rotation */}
              <g transform={`rotate(${angleNormalized}, 100, 100)`}>
                {/* Vessel Hull silhouette pointing up */}
                <path d="M100 65 C115 80 115 125 108 135 C100 138 100 138 92 135 C85 125 85 80 100 65 Z" fill="#1E293B" stroke="#D4AF37" strokeWidth="2.5" />
                {/* Proa pointer */}
                <polygon points="100,55 106,66 94,66" fill="#D4AF37" />
                <circle cx="100" cy="100" r="5" fill="#D4AF37" />
              </g>

              {/* Observer reference at bottom pointing up towards center */}
              <circle cx="100" cy="188" r="4" fill="#38BDF8" />
              <path d="M100 185 L100 165" stroke="#38BDF8" strokeWidth="2" strokeDasharray="2 2" />
            </svg>

            {/* Sector Tag in Center bottom */}
            <div className="absolute bottom-4 bg-navy-950/90 border border-navy-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-300">
              {currentSector === 'HEAD_ON' && 'Proa Frontal (Roda a Roda)'}
              {currentSector === 'STARBOARD' && 'Boreste (Você vê o verde)'}
              {currentSector === 'PORT' && 'Bombordo (Você vê o encarnado)'}
              {currentSector === 'STERN' && 'Popa (Você é alcançador)'}
            </div>
          </div>

          {/* Slider & Quick Angle Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Girar Rumo da Embarcação:</span>
              <span className="font-mono text-gold-400">{angleNormalized}°</span>
            </div>

            <input
              type="range"
              min="0"
              max="359"
              step="1"
              value={angleNormalized}
              onChange={(e) => setAspectAngle(Number(e.target.value))}
              className="w-full accent-gold-500 bg-navy-800 rounded-lg cursor-pointer h-2"
            />

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {[
                { label: 'Proa (0°)', angle: 0 },
                { label: 'Boreste 45°', angle: 45 },
                { label: 'Través Boreste (90°)', angle: 90 },
                { label: 'Popa (180°)', angle: 180 },
                { label: 'Través Bombordo (270°)', angle: 270 },
                { label: 'Bombordo 315°', angle: 315 },
              ].map((btn) => (
                <button
                  key={btn.angle}
                  onClick={() => setAspectAngle(btn.angle)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                    angleNormalized === btn.angle
                      ? 'bg-gold-500 text-navy-950 border-gold-400 shadow'
                      : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Toggle Seguimento (para NUC e Manobra Restrita) */}
            {(selectedVessel === 'not_under_command' || selectedVessel === 'restricted_maneuver') && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950 border border-navy-800 mt-2">
                <span className="text-xs text-slate-300 font-semibold">
                  A embarcação está com seguimento na água?
                </span>
                <button
                  onClick={() => setIsUnderway(!isUnderway)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                    isUnderway
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-navy-800 text-slate-400 border-navy-700'
                  }`}
                >
                  {isUnderway ? 'Sim (Exibe bordos/popa)' : 'Não (Apenas verticais)'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Night Sea Visualizer & Observed Lights (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Night Horizon Box */}
          <div className="bg-slate-950 border border-navy-700 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
            {/* Stars & Night Backdrop */}
            <div className="absolute inset-0 bg-radial-at-c from-slate-900/60 to-black pointer-events-none"></div>
            {/* Sea reflection line */}
            <div className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

            <span className="absolute top-3 left-4 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
              Visão Noturna do Observador
            </span>

            {/* Rendered Physical Lights in Horizon */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 py-8">
              {/* Silhouette outline */}
              <div className="relative flex items-center justify-center gap-6 min-h-[100px]">
                {observedLights.map((light, index) => {
                  let glowColor = 'bg-white shadow-[0_0_25px_8px_rgba(255,255,255,0.7)]';
                  let ringColor = 'border-white';
                  if (light.color === 'green') {
                    glowColor = 'bg-emerald-400 shadow-[0_0_25px_8px_rgba(16,185,129,0.8)]';
                    ringColor = 'border-emerald-300';
                  } else if (light.color === 'red') {
                    glowColor = 'bg-rose-500 shadow-[0_0_25px_8px_rgba(239,68,68,0.8)]';
                    ringColor = 'border-rose-400';
                  } else if (light.color === 'yellow') {
                    glowColor = 'bg-amber-400 shadow-[0_0_25px_8px_rgba(245,158,11,0.8)]';
                    ringColor = 'border-amber-300';
                  }

                  return (
                    <div key={light.id || index} className="flex flex-col items-center space-y-2">
                      <div className={`w-5 h-5 rounded-full ${glowColor} border ${ringColor} animate-pulse`} style={{ animationDuration: '3s' }}></div>
                      <span className="text-[10px] font-mono text-slate-300 whitespace-nowrap">
                        {light.position}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Water reflection */}
              <div className="w-36 h-2 rounded-full bg-cyan-400/10 blur-sm"></div>
            </div>

            <div className="absolute bottom-2 text-center text-[10px] text-slate-300">
              {observedLights.length} feixe(s) de luz captado(s) pelo olho do navegador
            </div>
          </div>

          {/* List of Lights Breakdown */}
          <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-lg space-y-2">
            <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-gold-400" />
              Luzes Identificadas pelo Rumo:
            </h3>

            <div className="space-y-1.5">
              {observedLights.map((l) => (
                <div key={l.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-navy-950/70 border border-navy-800">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        l.color === 'green'
                          ? 'bg-emerald-400'
                          : l.color === 'red'
                          ? 'bg-rose-500'
                          : l.color === 'yellow'
                          ? 'bg-amber-400'
                          : 'bg-slate-100'
                      }`}
                    ></span>
                    <span className="font-bold text-slate-200">{l.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{l.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decision & Action Card (What to do according to RIPEAM) */}
      <div className="bg-navy-900/90 border border-gold-500/30 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-700 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-gold-400" />
            <div>
              <span className="text-[10px] font-extrabold text-gold-400 uppercase tracking-wider block">
                Diagnóstico de Manobra — {vesselTypes.find((v) => v.id === selectedVessel)?.rule}
              </span>
              <h2 className="text-lg md:text-xl font-black text-slate-100">
                {situationAnalysis.title}
              </h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-black bg-gold-500/20 text-gold-300 border border-gold-500/40 uppercase">
            {situationAnalysis.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-navy-950 border border-navy-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Manobra Obrigatória Regulamentar:</span>
            <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
              {situationAnalysis.action}
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-2xl bg-navy-950 border border-navy-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Avaliação de Risco:</span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {situationAnalysis.risk}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
