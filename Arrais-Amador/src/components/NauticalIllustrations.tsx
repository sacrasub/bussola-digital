import React from 'react';
import { IllustrationType } from '../types';

interface Props {
  type: IllustrationType;
  showLabel?: boolean;
  className?: string;
}

export const NauticalIllustration: React.FC<Props> = ({
  type,
  showLabel = false,
  className = "w-full max-w-xs h-44 mx-auto",
}) => {
  switch (type) {
    case 'buoy_starboard':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-850/90 rounded-2xl border border-emerald-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Water base */}
            <path d="M10 120 Q50 112 100 120 T190 120" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.7"/>
            <path d="M20 132 Q60 125 110 132 T180 132" stroke="#0284C7" strokeWidth="3" fill="none" opacity="0.5"/>
            {/* Buoy body - conical / pillar green */}
            <polygon points="100,45 135,115 65,115" fill="#10B981" stroke="#047857" strokeWidth="3"/>
            {/* Topmark - Green cone pointing up */}
            <polygon points="100,15 115,40 85,40" fill="#10B981" stroke="#047857" strokeWidth="2"/>
            {/* Light beam indicator */}
            <circle cx="100" cy="15" r="5" fill="#34D399" className="animate-pulse"/>
            {showLabel && (
              <text x="100" y="145" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="bold">
                SINAL DE BORESTE (VERDE / CONE ▲)
              </text>
            )}
          </svg>
        </div>
      );

    case 'buoy_port':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-850/90 rounded-2xl border border-rose-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Water */}
            <path d="M10 120 Q50 112 100 120 T190 120" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.7"/>
            <path d="M20 132 Q60 125 110 132 T180 132" stroke="#0284C7" strokeWidth="3" fill="none" opacity="0.5"/>
            {/* Buoy body - Can / cylindrical red */}
            <rect x="70" y="50" width="60" height="65" rx="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="3"/>
            {/* Topmark - Red cylinder */}
            <rect x="85" y="24" width="30" height="22" rx="2" fill="#EF4444" stroke="#B91C1C" strokeWidth="2"/>
            <circle cx="100" cy="24" r="5" fill="#F87171" className="animate-pulse"/>
            {showLabel && (
              <text x="100" y="145" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontWeight="bold">
                SINAL DE BOMBORDO (ENCARNADO / CILINDRO █)
              </text>
            )}
          </svg>
        </div>
      );

    case 'buoy_isolated_danger':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-850/90 rounded-2xl border border-amber-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Water */}
            <path d="M10 120 Q50 112 100 120 T190 120" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.7"/>
            {/* Body: Black with red horizontal band */}
            <rect x="75" y="55" width="50" height="60" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2"/>
            <rect x="75" y="75" width="50" height="20" fill="#EF4444"/>
            {/* Topmark: Two black spheres */}
            <circle cx="100" cy="40" r="10" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5"/>
            <circle cx="100" cy="18" r="10" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5"/>
            {showLabel && (
              <text x="100" y="145" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="bold">
                PERIGO ISOLADO (2 ESFERAS ●● / Fl(2) B)
              </text>
            )}
          </svg>
        </div>
      );

    case 'buoy_safe_water':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-850/90 rounded-2xl border border-blue-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Water */}
            <path d="M10 120 Q50 112 100 120 T190 120" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.7"/>
            {/* Body: Vertical red and white stripes */}
            <g>
              <rect x="72" y="55" width="56" height="60" rx="3" fill="#F8FAFC"/>
              <rect x="80" y="55" width="12" height="60" fill="#EF4444"/>
              <rect x="108" y="55" width="12" height="60" fill="#EF4444"/>
            </g>
            {/* Topmark: Single red sphere */}
            <circle cx="100" cy="30" r="13" fill="#EF4444" stroke="#991B1B" strokeWidth="2"/>
            {showLabel && (
              <text x="100" y="145" textAnchor="middle" fill="#BAE6FD" fontSize="11" fontWeight="bold">
                ÁGUAS SEGURAS (1 ESFERA ● / FAIXAS VERTICAIS)
              </text>
            )}
          </svg>
        </div>
      );

    case 'buoy_cardinal':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-850/90 rounded-2xl border border-yellow-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Body: Yellow & Black */}
            <rect x="75" y="58" width="50" height="30" fill="#0F172A"/>
            <rect x="75" y="88" width="50" height="30" fill="#FBBF24"/>
            {/* Topmark: 2 black cones pointing up (North) */}
            <polygon points="100,10 112,28 88,28" fill="#0F172A" stroke="#F8FAFC" strokeWidth="1"/>
            <polygon points="100,32 112,50 88,50" fill="#0F172A" stroke="#F8FAFC" strokeWidth="1"/>
            <path d="M10 120 Q50 112 100 120 T190 120" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.7"/>
            {showLabel && (
              <text x="100" y="145" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="bold">
                CARDINAL NORTE (▲▲ 2 CONES PARA CIMA)
              </text>
            )}
          </svg>
        </div>
      );

    case 'buoy_preferred_channel':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-850/90 rounded-2xl border border-emerald-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            <path d="M10 120 Q50 112 100 120 T190 120" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.7"/>
            {/* Body: Green with central Red band */}
            <polygon points="100,45 135,115 65,115" fill="#10B981" stroke="#047857" strokeWidth="2"/>
            <polygon points="88,72 112,72 119,90 81,90" fill="#EF4444"/>
            <polygon points="100,15 115,40 85,40" fill="#10B981"/>
            {showLabel && (
              <text x="100" y="145" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="bold">
                CANAL PREFERENCIAL A BORESTE (Fl(2+1))
              </text>
            )}
          </svg>
        </div>
      );

    case 'nav_lights':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-navy-950 rounded-2xl border border-slate-700 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Boat Hull top-down */}
            <path d="M100,25 Q125,70 125,115 Q100,125 75,115 Q75,70 100,25 Z" fill="#334155" stroke="#64748B" strokeWidth="2"/>
            {/* Masthead light sector (225 deg white towards bow) */}
            <path d="M100,45 L145,15 A55,55 0 0,0 55,15 Z" fill="#F8FAFC" opacity="0.25"/>
            <circle cx="100" cy="45" r="4" fill="#FFFFFF"/>
            {/* Starboard light (Green 112.5 deg) */}
            <path d="M115,65 L155,65 A45,45 0 0,1 125,110 Z" fill="#10B981" opacity="0.4"/>
            <circle cx="115" cy="65" r="4" fill="#10B981"/>
            {/* Port light (Red 112.5 deg) */}
            <path d="M85,65 L45,65 A45,45 0 0,0 75,110 Z" fill="#EF4444" opacity="0.4"/>
            <circle cx="85" cy="65" r="4" fill="#EF4444"/>
            {/* Stern light (White 135 deg) */}
            <path d="M100,115 L135,140 A45,45 0 0,1 65,140 Z" fill="#F8FAFC" opacity="0.3"/>
            <circle cx="100" cy="115" r="4" fill="#FFFFFF"/>
            {showLabel && (
              <text x="100" y="146" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontWeight="bold">
                Mastro: 225° | Bordos: 112,5° | Alcançado: 135°
              </text>
            )}
          </svg>
        </div>
      );

    case 'maneuver_head_on':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-navy-950 rounded-2xl border border-gold-500/40 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Water track */}
            <line x1="100" y1="10" x2="100" y2="135" stroke="#334155" strokeDasharray="4 4"/>
            {/* Boat 1 going DOWN, turning right */}
            <g transform="translate(100, 32)">
              <path d="M0,14 L-6,-14 Q0,-18 6,-14 Z" fill="#38BDF8"/>
              <path d="M0,0 Q15,12 25,25" stroke="#E0A96D" strokeWidth="2.5" fill="none"/>
            </g>
            {/* Boat 2 going UP, turning right */}
            <g transform="translate(100, 110)">
              <path d="M0,-14 L-6,14 Q0,18 6,14 Z" fill="#F59E0B"/>
              <path d="M0,0 Q-15,-12 -25,-25" stroke="#E0A96D" strokeWidth="2.5" fill="none"/>
            </g>
            {showLabel ? (
              <text x="100" y="145" textAnchor="middle" fill="#E0A96D" fontSize="10" fontWeight="bold">
                RODA A RODA: Ambas guinam para Boreste
              </text>
            ) : (
              <text x="100" y="145" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">
                Situação de Manobra
              </text>
            )}
          </svg>
        </div>
      );

    case 'maneuver_crossing':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-navy-950 rounded-2xl border border-gold-500/40 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Crossing paths */}
            <line x1="25" y1="75" x2="175" y2="75" stroke="#334155" strokeDasharray="4 4"/>
            <line x1="100" y1="130" x2="100" y2="20" stroke="#334155" strokeDasharray="4 4"/>
            {/* Boat A heading UP */}
            <g transform="translate(100, 105)">
              <polygon points="0,-12 -6,12 6,12" fill="#38BDF8"/>
              <text x="-12" y="5" fill="#38BDF8" fontSize="10" fontWeight="bold">A</text>
            </g>
            {/* Boat B heading LEFT */}
            <g transform="translate(150, 75) rotate(-90)">
              <polygon points="0,-12 -6,12 6,12" fill="#F59E0B"/>
              <text x="12" y="5" fill="#F59E0B" fontSize="10" fontWeight="bold">B</text>
            </g>
            {showLabel ? (
              <text x="100" y="145" textAnchor="middle" fill="#F87171" fontSize="10" fontWeight="bold">
                RUMOS CRUZADOS: A vê B por Boreste -&gt; A Manobra
              </text>
            ) : (
              <text x="100" y="145" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">
                Rumos Cruzados (Embarcações A e B)
              </text>
            )}
          </svg>
        </div>
      );

    case 'maneuver_overtaking':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-navy-950 rounded-2xl border border-gold-500/40 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Boat A ahead */}
            <g transform="translate(100, 40)">
              <polygon points="0,-12 -6,12 6,12" fill="#38BDF8"/>
              <text x="12" y="4" fill="#38BDF8" fontSize="9">Barco A</text>
            </g>
            {/* Sector 135 aft */}
            <path d="M100,40 L70,95 A60,60 0 0,0 130,95 Z" fill="#64748B" opacity="0.2"/>
            {/* Boat B overtaking */}
            <g transform="translate(115, 110)">
              <polygon points="0,-12 -6,12 6,12" fill="#E0A96D"/>
              <path d="M0,-8 Q-20,-30 -12,-55" stroke="#E0A96D" strokeWidth="2" fill="none"/>
              <text x="12" y="4" fill="#E0A96D" fontSize="9">Barco B</text>
            </g>
            {showLabel ? (
              <text x="100" y="145" textAnchor="middle" fill="#E0A96D" fontSize="10" fontWeight="bold">
                ALCANÇADO: Quem alcança manobra
              </text>
            ) : (
              <text x="100" y="145" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">
                Manobra de Ultrapassagem
              </text>
            )}
          </svg>
        </div>
      );

    case 'fire_triangle':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-navy-950 rounded-2xl border border-rose-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Fire triangle */}
            <polygon points="100,22 165,115 35,115" fill="none" stroke="#F59E0B" strokeWidth="4"/>
            <text x="100" y="16" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">CALOR</text>
            <text x="28" y="130" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">COMBURENTE (O2)</text>
            <text x="168" y="130" textAnchor="middle" fill="#E0A96D" fontSize="10" fontWeight="bold">COMBUSTÍVEL</text>
            {showLabel && (
              <text x="100" y="75" textAnchor="middle" fill="#FDE047" fontSize="10" fontWeight="bold">
                A: Água | B/C: Pó/CO2
              </text>
            )}
          </svg>
        </div>
      );

    case 'day_shape_anchored':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-navy-950 rounded-2xl border border-slate-700 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Boat and black ball */}
            <path d="M30,100 L170,100 L145,125 L55,125 Z" fill="#334155" stroke="#64748B" strokeWidth="2"/>
            <line x1="70" y1="100" x2="70" y2="35" stroke="#94A3B8" strokeWidth="3"/>
            {/* Day shape: One Black Ball */}
            <circle cx="70" cy="45" r="14" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2"/>
            {showLabel ? (
              <text x="100" y="145" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontWeight="bold">
                EMBARCAÇÃO FUNDEADA (1 ESFERA PRETA)
              </text>
            ) : (
              <text x="100" y="145" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">
                Marca Diurna de Navegação
              </text>
            )}
          </svg>
        </div>
      );

    case 'day_shape_not_under_command':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-navy-950 rounded-2xl border border-rose-500/30 ${className}`}>
          <svg viewBox="0 0 200 150" className="w-full h-full">
            <path d="M30,100 L170,100 L145,125 L55,125 Z" fill="#334155" stroke="#64748B" strokeWidth="2"/>
            <line x1="100" y1="100" x2="100" y2="25" stroke="#94A3B8" strokeWidth="3"/>
            {/* 2 Black balls vertical */}
            <circle cx="100" cy="38" r="11" fill="#0F172A" stroke="#EF4444" strokeWidth="2"/>
            <circle cx="100" cy="65" r="11" fill="#0F172A" stroke="#EF4444" strokeWidth="2"/>
            {showLabel ? (
              <text x="100" y="145" textAnchor="middle" fill="#F87171" fontSize="10" fontWeight="bold">
                SEM GOVERNO (2 ESFERAS PRETAS VERTICAIS)
              </text>
            ) : (
              <text x="100" y="145" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">
                Marca Diurna de Navegação
              </text>
            )}
          </svg>
        </div>
      );

    default:
      return null;
  }
};
