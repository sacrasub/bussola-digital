import React, { useState, useMemo } from 'react';
import { Compass, Eye, ShieldAlert, Lightbulb, Sun, Moon, Volume2, Anchor, HelpCircle } from 'lucide-react';

export type TargetVesselType =
  | 'power_under_50'
  | 'power_over_50'
  | 'towing_under_200'
  | 'towing_over_200'
  | 'not_under_command'
  | 'restricted_maneuver'
  | 'constrained_by_draught'
  | 'anchored_under_50'
  | 'anchored_over_50'
  | 'aground'
  | 'sailing'
  | 'pilot';

interface VesselConfig {
  id: TargetVesselType;
  name: string;
  category: string;
  rule: string;
  description: string;
  dayMarkText: string;
  dayMarkSymbols: string[];
}

export const NightLightsSimulator: React.FC = () => {
  // 0° a 359°:
  // 0° = Vindo de proa contra você (Roda a Roda - você vê a proa dela)
  // 90° = Cruzando e mostrando o bordo de Boreste (você vê a luz verde)
  // 180° = Afastando-se de popa (você é o alcançador - vê a luz de alcançado)
  // 270° = Cruzando e mostrando o bordo de Bombordo (você vê a luz encarnada)
  const [aspectAngle, setAspectAngle] = useState<number>(0);
  const [selectedVessel, setSelectedVessel] = useState<TargetVesselType>('power_under_50');
  const [isUnderway, setIsUnderway] = useState<boolean>(true); // Com seguimento na água
  const [viewMode, setViewMode] = useState<'night' | 'day'>('night');

  const vesselTypes: VesselConfig[] = [
    {
      id: 'power_under_50',
      name: 'Propulsão Mecânica (< 50m)',
      category: 'Regra 23 RIPEAM',
      rule: 'RIPEAM-72 Regra 23(a)',
      description: 'Lancha, iate ou barco a motor com menos de 50m de comprimento em movimento.',
      dayMarkText: 'Nenhuma marca diurna obrigatória (apenas se fundeada ou sob restrição especial).',
      dayMarkSymbols: [],
    },
    {
      id: 'power_over_50',
      name: 'Propulsão Mecânica (≥ 50m)',
      category: 'Regra 23 RIPEAM',
      rule: 'RIPEAM-72 Regra 23(a)(ii)',
      description: 'Navio comercial de grande porte com 50m ou mais. Obriga segunda luz de mastro a ré mais alta.',
      dayMarkText: 'Nenhuma marca especial em movimento normal.',
      dayMarkSymbols: [],
    },
    {
      id: 'towing_under_200',
      name: 'Rebocador (Reboque < 200m)',
      category: 'Regra 24 RIPEAM',
      rule: 'RIPEAM-72 Regra 24(a)',
      description: 'Embarcação rebocando quando o comprimento do reboque for INFERIOR a 200 metros (2 luzes brancas no mastro).',
      dayMarkText: 'Se o reboque for menor que 200m, não é obrigatório losango.',
      dayMarkSymbols: [],
    },
    {
      id: 'towing_over_200',
      name: 'Rebocador (Reboque > 200m)',
      category: 'Regra 24 RIPEAM',
      rule: 'RIPEAM-72 Regra 24(a)(i)',
      description: 'Embarcação rebocando quando o reboque for SUPERIOR a 200 metros (3 luzes brancas no mastro a vante).',
      dayMarkText: 'Marca Diurna: 1 Losango preto (dois cones unidos pelas bases) onde melhor possa ser visto.',
      dayMarkSymbols: ['◆'],
    },
    {
      id: 'not_under_command',
      name: 'Sem Governo (NUC)',
      category: 'Regra 27 RIPEAM',
      rule: 'RIPEAM-72 Regra 27(a)',
      description: 'Avariada (leme quebrado ou máquinas inoperantes). Duas luzes encarnadas verticais de 360°. NUNCA exibe luz de mastro.',
      dayMarkText: 'Marca Diurna: 2 Esferas Pretas na vertical.',
      dayMarkSymbols: ['●', '●'],
    },
    {
      id: 'restricted_maneuver',
      name: 'Capacidade de Manobra Restrita',
      category: 'Regra 27 RIPEAM',
      rule: 'RIPEAM-72 Regra 27(b)',
      description: 'Dragando, lançando cabos submarinos ou em faina que impede manobras rápidas. 3 luzes verticais (Encarnada - Branca - Encarnada).',
      dayMarkText: 'Marca Diurna: 1 Esfera preta sobre 1 Losango preto e outra Esfera preta abaixo (verticais).',
      dayMarkSymbols: ['●', '◆', '●'],
    },
    {
      id: 'constrained_by_draught',
      name: 'Restrita pelo Calado (CBD)',
      category: 'Regra 28 RIPEAM',
      rule: 'RIPEAM-72 Regra 28',
      description: 'Embarcação de grande calado em canal raso. 3 luzes encarnadas verticais de 360° além das luzes de navegação normais.',
      dayMarkText: 'Marca Diurna: 1 Cilindro preto onde melhor possa ser visto.',
      dayMarkSymbols: ['❚'],
    },
    {
      id: 'anchored_under_50',
      name: 'Fundeada (< 50m)',
      category: 'Regra 30 RIPEAM',
      rule: 'RIPEAM-72 Regra 30(a)',
      description: 'Embarcação no ferro de fundeio com menos de 50 metros. Exibe 1 luz circular branca de 360° a vante.',
      dayMarkText: 'Marca Diurna: 1 Esfera Preta na parte de vante.',
      dayMarkSymbols: ['●'],
    },
    {
      id: 'anchored_over_50',
      name: 'Fundeada (≥ 50m)',
      category: 'Regra 30 RIPEAM',
      rule: 'RIPEAM-72 Regra 30(a)(ii)',
      description: 'Embarcação fundeada com 50m ou mais. Exibe 1 luz branca a vante e 1 luz branca mais baixa a ré.',
      dayMarkText: 'Marca Diurna: 1 Esfera Preta na parte de vante.',
      dayMarkSymbols: ['●'],
    },
    {
      id: 'aground',
      name: 'Embarcação Encalhada',
      category: 'Regra 30 RIPEAM',
      rule: 'RIPEAM-72 Regra 30(d)',
      description: 'Presa no fundo/banco de areia. Exibe as luzes de fundeio correspondentes + 2 luzes encarnadas verticais de 360°.',
      dayMarkText: 'Marca Diurna: 3 Esferas Pretas na vertical.',
      dayMarkSymbols: ['●', '●', '●'],
    },
    {
      id: 'sailing',
      name: 'Embarcação a Vela',
      category: 'Regra 25 RIPEAM',
      rule: 'RIPEAM-72 Regra 25',
      description: 'Embarcação navegando somente à vela. Exibe luzes de bordos e alcançado. NUNCA exibe luz de mastro branca!',
      dayMarkText: 'Se ligar o motor simultaneamente, deve exibir 1 cone preto com vértice para baixo.',
      dayMarkSymbols: ['▼'],
    },
    {
      id: 'pilot',
      name: 'Embarcação de Praticagem',
      category: 'Regra 29 RIPEAM',
      rule: 'RIPEAM-72 Regra 29',
      description: 'Em serviço de prático. Exibe 2 luzes verticais de 360° no mastro: Branca sobre Encarnada ("cabelo branco, lábio vermelho").',
      dayMarkText: 'Bandeira "Hotel" (H) do CIS ou identificação de serviço de Praticagem.',
      dayMarkSymbols: ['🚩'],
    },
  ];

  const angleNormalized = ((aspectAngle % 360) + 360) % 360;

  // Setores visíveis baseados no ângulo da embarcação em relação à linha de visada do observador
  // 0° = Roda a Roda / Proa (vê ambos os bordos)
  // 5° a 112.5° = Vê Boreste (luz verde)
  // 112.5° a 247.5° = Vê Popa (luz de alcançado)
  // 247.5° a 355° = Vê Bombordo (luz encarnada)
  const currentSector = useMemo(() => {
    if (angleNormalized >= 355 || angleNormalized <= 5) {
      return 'HEAD_ON'; // Proa frontal
    } else if (angleNormalized > 5 && angleNormalized <= 112.5) {
      return 'STARBOARD'; // Vendo o boreste (luz verde)
    } else if (angleNormalized > 112.5 && angleNormalized < 247.5) {
      return 'STERN'; // Vendo a popa (luz de alcançado)
    } else {
      return 'PORT'; // Vendo o bombordo (luz encarnada)
    }
  }, [angleNormalized]);

  // Estrutura organizada de luzes:
  // 1. mastVerticalLights: luzes de mastro empilhadas verticalmente no topo
  // 2. sideAndSternLights: luzes de bordos ou alcançado na linha do convés
  const lightsConfiguration = useMemo(() => {
    const mastVertical: { id: string; label: string; color: 'white' | 'green' | 'red' | 'yellow'; desc: string }[] = [];
    const lowerDeck: { id: string; label: string; color: 'white' | 'green' | 'red' | 'yellow'; side: 'left' | 'center' | 'right'; desc: string }[] = [];

    const isMastVisible = currentSector !== 'STERN';
    const isSternVisible = currentSector === 'STERN';

    // 1. Fundeada
    if (selectedVessel === 'anchored_under_50') {
      mastVertical.push({ id: 'anc_1', label: 'Luz de Fundeio (360°)', color: 'white', desc: 'Mastro a vante (circular branca)' });
      return { mastVertical, lowerDeck };
    }

    if (selectedVessel === 'anchored_over_50') {
      mastVertical.push(
        { id: 'anc_vante', label: 'Luz de Fundeio Vante (360°)', color: 'white', desc: 'Mastro de vante mais alto' },
        { id: 'anc_re', label: 'Luz de Fundeio Ré (360°)', color: 'white', desc: 'Mastro de ré mais baixo' }
      );
      return { mastVertical, lowerDeck };
    }

    // 2. Encalhada
    if (selectedVessel === 'aground') {
      mastVertical.push(
        { id: 'agr_red1', label: 'Luz Encarnada Superior (360°)', color: 'red', desc: 'Encalhada (mastro superior)' },
        { id: 'agr_red2', label: 'Luz Encarnada Inferior (360°)', color: 'red', desc: 'Encalhada (mastro inferior)' },
        { id: 'anc_white', label: 'Luz Circular de Fundeio (360°)', color: 'white', desc: 'Luz de fundeio obrigatória' }
      );
      return { mastVertical, lowerDeck };
    }

    // 3. Sem Governo (NUC)
    if (selectedVessel === 'not_under_command') {
      mastVertical.push(
        { id: 'nuc_1', label: 'Luz Encarnada Superior (360°)', color: 'red', desc: 'Sem Governo (Mastro)' },
        { id: 'nuc_2', label: 'Luz Encarnada Inferior (360°)', color: 'red', desc: 'Sem Governo (Mastro)' }
      );
      if (isUnderway) {
        if (currentSector === 'HEAD_ON') {
          // Quando de proa: Boreste da outra fica à ESQUERDA da visão do observador, Bombordo da outra fica à DIREITA
          lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'left', desc: 'Bordo direito da outra (sua esquerda)' });
          lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'right', desc: 'Bordo esquerdo da outra (sua direita)' });
        } else if (currentSector === 'STARBOARD') {
          lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'center', desc: 'Costado de Boreste (112,5°)' });
        } else if (currentSector === 'PORT') {
          lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'center', desc: 'Costado de Bombordo (112,5°)' });
        } else if (isSternVisible) {
          lowerDeck.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca)', color: 'white', side: 'center', desc: 'Popa (135°)' });
        }
      }
      return { mastVertical, lowerDeck };
    }

    // 4. Capacidade de Manobra Restrita (RAM)
    if (selectedVessel === 'restricted_maneuver') {
      mastVertical.push(
        { id: 'ram_red1', label: 'Encarnada Superior (360°)', color: 'red', desc: 'Manobra Restrita' },
        { id: 'ram_white', label: 'Branca Central (360°)', color: 'white', desc: 'Manobra Restrita' },
        { id: 'ram_red2', label: 'Encarnada Inferior (360°)', color: 'red', desc: 'Manobra Restrita' }
      );
      if (isUnderway && isMastVisible) {
        mastVertical.push({ id: 'ram_mast', label: 'Luz de Mastro (Branca 225°)', color: 'white', desc: 'Mastro com seguimento' });
      }
      if (isUnderway) {
        if (currentSector === 'HEAD_ON') {
          lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'left', desc: 'Boreste' });
          lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'right', desc: 'Bombordo' });
        } else if (currentSector === 'STARBOARD') {
          lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'center', desc: 'Boreste' });
        } else if (currentSector === 'PORT') {
          lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'center', desc: 'Bombordo' });
        } else if (isSternVisible) {
          lowerDeck.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca)', color: 'white', side: 'center', desc: 'Popa (135°)' });
        }
      }
      return { mastVertical, lowerDeck };
    }

    // 5. Restrita devido ao seu Calado (CBD)
    if (selectedVessel === 'constrained_by_draught') {
      mastVertical.push(
        { id: 'cbd_1', label: 'Encarnada 1 (360°)', color: 'red', desc: 'Restrita pelo Calado' },
        { id: 'cbd_2', label: 'Encarnada 2 (360°)', color: 'red', desc: 'Restrita pelo Calado' },
        { id: 'cbd_3', label: 'Encarnada 3 (360°)', color: 'red', desc: 'Restrita pelo Calado' }
      );
      if (isMastVisible) {
        mastVertical.push({ id: 'cbd_mast', label: 'Luz de Mastro (Branca 225°)', color: 'white', desc: 'Mastro de vante' });
      }
      if (currentSector === 'HEAD_ON') {
        lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'left', desc: 'Boreste' });
        lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'right', desc: 'Bombordo' });
      } else if (currentSector === 'STARBOARD') {
        lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'center', desc: 'Boreste' });
      } else if (currentSector === 'PORT') {
        lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'center', desc: 'Bombordo' });
      } else if (isSternVisible) {
        lowerDeck.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca)', color: 'white', side: 'center', desc: 'Popa (135°)' });
      }
      return { mastVertical, lowerDeck };
    }

    // 6. Embarcação de Praticagem
    if (selectedVessel === 'pilot') {
      mastVertical.push(
        { id: 'pilot_white', label: 'Luz Branca Superior (360°)', color: 'white', desc: 'Prático ("cabelo branco")' },
        { id: 'pilot_red', label: 'Luz Encarnada Inferior (360°)', color: 'red', desc: 'Prático ("lábio vermelho")' }
      );
      if (currentSector === 'HEAD_ON') {
        lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'left', desc: 'Boreste' });
        lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'right', desc: 'Bombordo' });
      } else if (currentSector === 'STARBOARD') {
        lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'center', desc: 'Boreste' });
      } else if (currentSector === 'PORT') {
        lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'center', desc: 'Bombordo' });
      } else if (isSternVisible) {
        lowerDeck.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca)', color: 'white', side: 'center', desc: 'Popa (135°)' });
      }
      return { mastVertical, lowerDeck };
    }

    // 7. Embarcação a Vela (NÃO possui luz de mastro branca!)
    if (selectedVessel === 'sailing') {
      if (currentSector === 'HEAD_ON') {
        lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'left', desc: 'Boreste da vela' });
        lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'right', desc: 'Bombordo da vela' });
      } else if (currentSector === 'STARBOARD') {
        lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde)', color: 'green', side: 'center', desc: 'Costado de Boreste' });
      } else if (currentSector === 'PORT') {
        lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada)', color: 'red', side: 'center', desc: 'Costado de Bombordo' });
      } else if (isSternVisible) {
        lowerDeck.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca)', color: 'white', side: 'center', desc: 'Popa da vela' });
      }
      return { mastVertical, lowerDeck };
    }

    // 8. Propulsão Mecânica e Rebocadores
    if (isMastVisible) {
      if (selectedVessel === 'power_under_50') {
        mastVertical.push({ id: 'mast_1', label: 'Luz de Mastro (Branca 225°)', color: 'white', desc: 'Mastro a vante' });
      } else if (selectedVessel === 'power_over_50') {
        mastVertical.push(
          { id: 'mast_re', label: 'Luz de Mastro de Ré (Branca 225°)', color: 'white', desc: 'Mastro mais alto' },
          { id: 'mast_vante', label: 'Luz de Mastro de Vante (Branca 225°)', color: 'white', desc: 'Mastro mais baixo' }
        );
      } else if (selectedVessel === 'towing_under_200') {
        mastVertical.push(
          { id: 'tow_1', label: 'Luz de Mastro Superior (Branca)', color: 'white', desc: 'Reboque < 200m' },
          { id: 'tow_2', label: 'Luz de Mastro Inferior (Branca)', color: 'white', desc: 'Reboque < 200m' }
        );
      } else if (selectedVessel === 'towing_over_200') {
        mastVertical.push(
          { id: 'tow_1', label: 'Luz de Mastro Superior (Branca)', color: 'white', desc: 'Reboque > 200m' },
          { id: 'tow_2', label: 'Luz de Mastro Central (Branca)', color: 'white', desc: 'Reboque > 200m' },
          { id: 'tow_3', label: 'Luz de Mastro Inferior (Branca)', color: 'white', desc: 'Reboque > 200m' }
        );
      }
    }

    if (currentSector === 'HEAD_ON') {
      lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde 112,5°)', color: 'green', side: 'left', desc: 'Lado direito da outra (sua esquerda)' });
      lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada 112,5°)', color: 'red', side: 'right', desc: 'Lado esquerdo da outra (sua direita)' });
    } else if (currentSector === 'STARBOARD') {
      lowerDeck.push({ id: 'green_side', label: 'Boreste (Verde 112,5°)', color: 'green', side: 'center', desc: 'Boreste da outra (112,5°)' });
    } else if (currentSector === 'PORT') {
      lowerDeck.push({ id: 'red_side', label: 'Bombordo (Encarnada 112,5°)', color: 'red', side: 'center', desc: 'Bombordo da outra (112,5°)' });
    }

    if (isSternVisible) {
      if (selectedVessel === 'towing_under_200' || selectedVessel === 'towing_over_200') {
        // Na popa do reboque: luz amarela verticalmente ACIMA da de alcançado
        lowerDeck.push(
          { id: 'tow_yellow', label: 'Luz de Reboque (Amarela 135°)', color: 'yellow', side: 'center', desc: 'Acima da luz de alcançado' },
          { id: 'stern_white', label: 'Luz de Alcançado (Branca 135°)', color: 'white', side: 'center', desc: 'Popa (135°)' }
        );
      } else {
        lowerDeck.push({ id: 'stern_white', label: 'Luz de Alcançado (Branca 135°)', color: 'white', side: 'center', desc: 'Popa (135°)' });
      }
    }

    return { mastVertical, lowerDeck };
  }, [selectedVessel, currentSector, isUnderway]);

  // Lista plana de luzes ativas para o painel informativo
  const allObservedLights = useMemo(() => {
    return [...lightsConfiguration.mastVertical, ...lightsConfiguration.lowerDeck];
  }, [lightsConfiguration]);

  // Interpretação e Manobra Regulamentar da Apostila (RIPEAM)
  const situationAnalysis = useMemo(() => {
    if (selectedVessel === 'anchored_under_50' || selectedVessel === 'anchored_over_50') {
      return {
        title: 'Embarcação Fundeada no Ferro',
        status: 'FUNDEADA (SEM MOVIMENTO)',
        badgeColor: 'amber',
        action: 'Mantenha resguardo de segurança e passe longe da área de fundeio. A embarcação fundeada não se move.',
        soundSignal: 'Em visibilidade restrita / nevoeiro: 1 toque de sino rápido a vante por 5 segundos a cada 1 minuto (e opcional 1 curto, 1 longo, 1 curto • — • para advertir risco de colisão).',
        risk: 'Baixo se mantido amplo resguardo.',
      };
    }

    if (selectedVessel === 'aground') {
      return {
        title: 'Embarcação Encalhada',
        status: 'EM PERIGO / IMOBILIZADA',
        badgeColor: 'rose',
        action: 'PERIGO DE ENCALHE: Ela está presa no leito ou banco de areia. NÃO se aproxime e altere seu rumo para águas seguras e navegáveis.',
        soundSignal: 'Em visibilidade restrita: 3 badaladas distintas de sino, repique rápido de sino e mais 3 badaladas distintas a cada minuto.',
        risk: 'Crítico: risco de sua embarcação encalhar na mesma pedra/banco.',
      };
    }

    if (selectedVessel === 'not_under_command') {
      return {
        title: 'Embarcação Sem Governo (NUC)',
        status: 'PRIORIDADE MÁXIMA PARA ELA',
        badgeColor: 'rose',
        action: 'Ela está desprovida de comando (avaria de leme ou propulsão) e NÃO PODE DESVIAR. Você tem o DEVER LEGAL de manobrar com antecedência e dar ampla folga (Regra 18).',
        soundSignal: 'Em visibilidade restrita: 1 apito longo seguido de 2 curtos (— • •) a cada 2 minutos.',
        risk: 'Crítico: qualquer aproximação desatenta causará abalroamento.',
      };
    }

    if (selectedVessel === 'restricted_maneuver') {
      return {
        title: 'Capacidade de Manobra Restrita (RAM)',
        status: 'PRIORIDADE PARA ELA',
        badgeColor: 'indigo',
        action: 'Embarcação em faina de dragagem, hidrovia ou cabos submarinos. Você é obrigado a manter-se fora do caminho dela com margem de segurança (Regra 18).',
        soundSignal: 'Em visibilidade restrita: 1 apito longo seguido de 2 curtos (— • •) a cada 2 minutos.',
        risk: 'Elevado.',
      };
    }

    if (selectedVessel === 'constrained_by_draught') {
      return {
        title: 'Restrita devido ao seu Calado (CBD)',
        status: 'PRIORIDADE DE CANAL',
        badgeColor: 'purple',
        action: 'Navio pesado cujo calado não permite sair do eixo do canal. Não atrapalhe sua passagem segura (Regra 28). Deixe o canal livre!',
        soundSignal: 'Em visibilidade restrita: 1 longo e 2 curtos (— • •) a cada 2 minutos.',
        risk: 'Alto em canais estreitos e barras de portos.',
      };
    }

    if (selectedVessel === 'sailing') {
      if (currentSector === 'STERN') {
        return {
          title: 'Embarcação a Vela Sendo Alcançada',
          status: 'VOCÊ É O ALCANÇADOR',
          badgeColor: 'sky',
          action: 'Regra de ouro: A embarcação alcançadora DEVE SEMPRE MANOBRAR, mesmo se a alcançada for lancha a motor e você for veleiro (Regra 13)! Dê resguardo ao ultrapassar.',
          soundSignal: 'Apito de ultrapassagem: 2 longos e 1 curto (por boreste) ou 2 longos e 2 curtos (por bombordo).',
          risk: 'Moderado.',
        };
      }
      return {
        title: 'Embarcação a Vela em Navegação',
        status: 'PREFERÊNCIA PARA O VELEIRO',
        badgeColor: 'teal',
        action: 'Embarcações a motor DEVEM CEDER PASSAGEM a embarcações a vela (Regra 18). Manobre com antecedência e passe por trás (popa) do veleiro.',
        soundSignal: 'Em visibilidade restrita: 1 longo e 2 curtos (— • •) a cada 2 minutos.',
        risk: 'Médio: atenção à velocidade e ao vento do veleiro.',
      };
    }

    // Propulsão Mecânica e Reboque
    switch (currentSector) {
      case 'HEAD_ON':
        return {
          title: 'Situação de "Roda a Roda" (Proa com Proa)',
          status: 'MANOBRA RECÍPROCA OBRIGATÓRIA',
          badgeColor: 'rose',
          action: 'AMBAS AS EMBARCAÇÕES DEVEM GUINAR PARA BORESTE (DIREITA), passando bombordo com bombordo (Regra 14). Soar 1 apito curto!',
          soundSignal: '1 apito curto (•): "Estou guinando para boreste" (duração de 1 segundo).',
          risk: 'Risco iminente de abalroamento frontal se não houver guinada recíproca imediata.',
        };
      case 'STARBOARD':
        return {
          title: 'Rumos Cruzados — Você Vê a Luz VERDE da Outra',
          status: 'VOCÊ TEM A PREFERÊNCIA',
          badgeColor: 'emerald',
          action: 'A outra embarcação avista a sua luz encarnada pelo boreste dela e DEVE MANOBRAR para passar pela sua popa (Regra 15). Mantenha seu rumo e velocidade constantes (Regra 17).',
          soundSignal: 'Acompanhe a manobra da outra. Se ela hesitar, soe 5 apitos curtos de dúvida/alerta!',
          risk: 'Médio: monitore se a marcação na bússola não varia (risco de colisão).',
        };
      case 'PORT':
        return {
          title: 'Rumos Cruzados — Você Vê a Luz ENCARNADA da Outra',
          status: 'VOCÊ DEVE MANOBRAR!',
          badgeColor: 'rose',
          action: 'PERIGO: A outra embarcação está no seu boreste e TEM PREFERÊNCIA. VOCÊ DEVE GUINAR PARA A DIREITA (boreste) e passar pela popa dela com folga (Regras 15 e 16). Proibido cortar a proa!',
          soundSignal: '1 apito curto (•) ao guinar para a direita para demonstrar sua intenção.',
          risk: 'Alto: se não manobrar, ocorrerá abalroamento.',
        };
      case 'STERN':
        return {
          title: 'Situação de Alcançado (Ultrapassagem)',
          status: 'VOCÊ É O ALCANÇADOR',
          badgeColor: 'sky',
          action: 'Você está se aproximando pela popa (setor da luz branca de 135°). VOCÊ DEVE MANTER-SE FORA DO CAMINHO da embarcação alcançada até ultrapassá-la completamente (Regra 13).',
          soundSignal: 'Tenciona ultrapassar: 2 longos e 1 curto (por boreste) ou 2 longos e 2 curtos (por bombordo).',
          risk: 'Moderado: escolha o bordo mais seguro e largo para a manobra.',
        };
    }
  }, [selectedVessel, currentSector]);

  const currentVesselConfig = vesselTypes.find((v) => v.id === selectedVessel) || vesselTypes[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
          <Eye className="w-4 h-4" />
          Simulador Oficial RIPEAM-72 / Apostila Marinha do Brasil
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-slate-100">
          Simulador de Luzes e Marcas Náuticas
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Gire o mostrador de aspecto para enxergar com exatidão a disposição realista das luzes no mar à noite, identificar o tipo de embarcação e aplicar as regras de manobra da Marinha.
        </p>

        {/* View Mode Toggle: Noite vs Dia */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-navy-950 border border-navy-700/80 mt-2">
          <button
            onClick={() => setViewMode('night')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'night'
                ? 'bg-gradient-to-r from-navy-800 to-navy-700 text-gold-400 border border-gold-500/40 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Modo Noturno (Luzes de Navegação)</span>
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'day'
                ? 'bg-amber-500 text-navy-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Modo Diurno (Marcas da Apostila)</span>
          </button>
        </div>
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
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-gold-400" />
              <h2 className="font-extrabold text-sm text-slate-200">
                Mostrador de Aspecto Relativo Náutico
              </h2>
            </div>
            <div className="px-3 py-1 rounded-xl bg-navy-800 border border-navy-700 font-mono text-xs font-bold text-gold-400">
              Aspecto: {angleNormalized.toFixed(0)}°
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
              {/* Starboard Sector (Green arc) */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="50 460" strokeDashoffset="12" opacity="0.3" />
              {/* Port Sector (Red arc) */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="50 460" strokeDashoffset="-120" opacity="0.3" />
              {/* Stern Sector (White arc) */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="#F8FAFC" strokeWidth="4" strokeDasharray="60 460" strokeDashoffset="-50" opacity="0.2" />

              {/* Target Boat in Center:
                  A 0° o barco deve estar apontando PARA BAIXO (em direção ao observador no sul),
                  para que o observador veja a proa frontalmente! Por isso somamos 180°. */}
              <g transform={`rotate(${(angleNormalized + 180) % 360}, 100, 100)`}>
                {/* Vessel Hull silhouette */}
                <path d="M100 65 C115 80 115 125 108 135 C100 138 100 138 92 135 C85 125 85 80 100 65 Z" fill="#1E293B" stroke="#D4AF37" strokeWidth="2.5" />
                {/* Bow pointer */}
                <polygon points="100,55 106,66 94,66" fill="#D4AF37" />
                {/* Center point */}
                <circle cx="100" cy="100" r="5" fill="#D4AF37" />
                {/* Starboard / Port color markers on the vessel itself */}
                <circle cx="112" cy="95" r="3" fill="#10B981" />
                <circle cx="88" cy="95" r="3" fill="#EF4444" />
              </g>

              {/* Observer reference at bottom looking UP towards the target vessel */}
              <circle cx="100" cy="188" r="5" fill="#38BDF8" />
              <path d="M100 185 L100 162" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="3 3" />
              <polygon points="100,158 96,166 104,166" fill="#38BDF8" />
            </svg>

            {/* Sector Tag in Center bottom */}
            <div className="absolute bottom-5 bg-navy-950/95 border border-navy-700 px-3 py-1 rounded-full text-[10px] font-bold text-slate-200 shadow-lg">
              {currentSector === 'HEAD_ON' && 'Proa Frontal — Vindo direto em sua direção'}
              {currentSector === 'STARBOARD' && 'Boreste — Cruzando da esquerda para a direita (vê verde)'}
              {currentSector === 'PORT' && 'Bombordo — Cruzando da direita para a esquerda (vê encarnado)'}
              {currentSector === 'STERN' && 'Popa — Afastando-se de você (vê alcançado)'}
            </div>
          </div>

          {/* Slider & Quick Angle Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Girar Rumo da Embarcação-Alvo:</span>
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
                  {isUnderway ? 'Sim (Exibe bordos e popa)' : 'Não (Apenas luzes verticais de 360°)'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Realistic Night Horizon Visualizer OR Day Marks (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {viewMode === 'night' ? (
            /* Night Horizon Box with Realistic Nautical 2D Staging */
            <div className="bg-slate-950 border border-navy-700 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[300px]">
              {/* Stars & Night Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black pointer-events-none"></div>
              {/* Sea reflection horizon line */}
              <div className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent"></div>

              <span className="absolute top-3 left-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5 z-10">
                <Moon className="w-3 h-3 text-cyan-400" />
                Visão Noturna do Observador
              </span>

              {/* Rendered Physical Lights in Horizon with Realistic 2D Layout */}
              <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full py-6">
                {/* 1. Mastro Central / Vertical Lights Stack */}
                {lightsConfiguration.mastVertical.length > 0 && (
                  <div className="flex flex-col items-center gap-3 mb-4">
                    {lightsConfiguration.mastVertical.map((light) => {
                      let glowColor = 'bg-white shadow-[0_0_24px_8px_rgba(255,255,255,0.7)] border-white';
                      if (light.color === 'green') {
                        glowColor = 'bg-emerald-400 shadow-[0_0_24px_8px_rgba(16,185,129,0.85)] border-emerald-300';
                      } else if (light.color === 'red') {
                        glowColor = 'bg-rose-500 shadow-[0_0_24px_8px_rgba(239,68,68,0.85)] border-rose-400';
                      } else if (light.color === 'yellow') {
                        glowColor = 'bg-amber-400 shadow-[0_0_24px_8px_rgba(245,158,11,0.85)] border-amber-300';
                      }

                      return (
                        <div key={light.id} className="flex flex-col items-center group relative">
                          <div className={`w-5 h-5 rounded-full ${glowColor} border animate-pulse`} style={{ animationDuration: '3s' }}></div>
                          <span className="text-[9px] font-mono text-slate-400 mt-1 whitespace-nowrap bg-black/60 px-1.5 rounded">
                            {light.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 2. Lower Deck Level (Boreste / Bombordo / Alcançado) */}
                {lightsConfiguration.lowerDeck.length > 0 && (
                  <div className="w-full flex items-center justify-around px-6">
                    {lightsConfiguration.lowerDeck.map((light) => {
                      let glowColor = 'bg-white shadow-[0_0_22px_7px_rgba(255,255,255,0.7)] border-white';
                      if (light.color === 'green') {
                        glowColor = 'bg-emerald-400 shadow-[0_0_22px_7px_rgba(16,185,129,0.85)] border-emerald-300';
                      } else if (light.color === 'red') {
                        glowColor = 'bg-rose-500 shadow-[0_0_22px_7px_rgba(239,68,68,0.85)] border-rose-400';
                      } else if (light.color === 'yellow') {
                        glowColor = 'bg-amber-400 shadow-[0_0_22px_7px_rgba(245,158,11,0.85)] border-amber-300';
                      }

                      return (
                        <div key={light.id} className="flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full ${glowColor} border animate-pulse`} style={{ animationDuration: '3s' }}></div>
                          <span className="text-[9px] font-mono text-slate-300 mt-1 whitespace-nowrap bg-black/70 px-1.5 rounded">
                            {light.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Water reflection */}
                <div className="w-44 h-1.5 rounded-full bg-cyan-400/15 blur-sm mt-4"></div>
              </div>

              <div className="relative z-10 text-center text-[10px] text-slate-400 pt-1">
                {allObservedLights.length} feixe(s) de luz captado(s) pelo olho do navegador
              </div>
            </div>
          ) : (
            /* Day Mode: Marcas Diurnas Oficiais da Apostila */
            <div className="bg-gradient-to-b from-sky-950 via-slate-900 to-navy-950 border border-navy-700 rounded-3xl p-5 shadow-2xl relative flex flex-col items-center justify-between min-h-[300px]">
              <span className="self-start text-[10px] font-bold tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" />
                Marcas Diurnas Oficiais (Apostila pág. 26 e 27)
              </span>

              <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-4">
                {currentVesselConfig.dayMarkSymbols.length > 0 ? (
                  <div className="flex flex-col items-center gap-2 bg-black/40 border border-white/10 p-4 rounded-2xl">
                    {currentVesselConfig.dayMarkSymbols.map((sym, idx) => (
                      <div
                        key={idx}
                        className="text-3xl text-slate-900 font-extrabold bg-slate-200 w-12 h-12 rounded-xl flex items-center justify-center border-2 border-slate-700 shadow-lg"
                      >
                        {sym}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-navy-950/70 border border-navy-800 text-center max-w-xs">
                    <Anchor className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-xs text-slate-300">
                      Navegação normal em movimento sem avaria não exige exibição de marcas diurnas especiais no tope.
                    </p>
                  </div>
                )}

                <p className="text-xs text-slate-200 text-center max-w-xs font-medium">
                  {currentVesselConfig.dayMarkText}
                </p>
              </div>

              <div className="text-[10px] text-slate-400 text-center">
                Identificação visual diurna em alta visibilidade
              </div>
            </div>
          )}

          {/* List of Lights Breakdown */}
          <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-lg space-y-2">
            <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-gold-400" />
              Luzes Identificadas pelo Rumo:
            </h3>

            <div className="space-y-1.5">
              {allObservedLights.map((l) => (
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
                  <span className="text-[10px] text-slate-400 font-mono">{l.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decision & Action Card (What to do according to RIPEAM & Apostila) */}
      <div className="bg-navy-900/90 border border-gold-500/30 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-700 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-gold-400" />
            <div>
              <span className="text-[10px] font-extrabold text-gold-400 uppercase tracking-wider block">
                Diagnóstico de Manobra — {currentVesselConfig.rule}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-navy-950 border border-navy-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Manobra Obrigatória Regulamentar:</span>
            <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
              {situationAnalysis.action}
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-2xl bg-navy-950 border border-navy-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-gold-400" />
              Sinais Sonoros da Apostila (Apito):
            </span>
            <p className="text-xs md:text-sm text-gold-300 font-medium leading-relaxed">
              {situationAnalysis.soundSignal}
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-2xl bg-navy-950 border border-navy-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
              Avaliação de Risco:
            </span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {situationAnalysis.risk}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
