import React, { useState } from 'react';
import { Compass, Anchor, ShieldCheck, Flame, BookOpen, Volume2, Award, ArrowRight, Search, CheckCircle2, ChevronDown, ChevronUp, Ship, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { OfficialCategory } from '../types';
import { NauticalIllustration } from './NauticalIllustrations';
import { soundSignals } from '../services/soundSignals';

interface Props {
  onStartPractice: (topic: OfficialCategory) => void;
  onGoToExam: () => void;
}

interface ConceptItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  bulletPoints: string[];
  normReference: string;
  examTip: string;
  illustration?: 'maneuver_head_on' | 'maneuver_crossing' | 'maneuver_overtaking' | 'nav_lights' | 'day_shape_anchored' | 'day_shape_not_under_command' | 'buoy_starboard' | 'buoy_port' | 'buoy_isolated_danger' | 'buoy_safe_water' | 'buoy_cardinal' | 'buoy_preferred_channel' | 'fire_triangle';
  soundSignal?: string;
  soundLabel?: string;
}

type CategoryTab = OfficialCategory | 'ALL';

export const ConceptsStudyScreen: React.FC<Props> = ({ onStartPractice, onGoToExam }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>('RIPEAM');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const [dhnModal, setDhnModal] = useState<{ title: string; src: string; desc: string; code: string; rule: string } | null>(null);

  const officialCategories: OfficialCategory[] = [
    'RIPEAM',
    'Balizamento',
    'Legislação Náutica',
    'Manobra, Atracação e Fundeio',
    'Primeiros Socorros, Salvatagem e Incêndio',
    'Motonauta',
  ];

  const categories: { id: CategoryTab; title: string; icon: React.ReactNode; color: string }[] = [
    { id: 'ALL', title: '📚 Todos os Módulos', icon: <BookOpen className="w-5 h-5 text-gold-400" />, color: 'gold' },
    { id: 'RIPEAM', title: '1. RIPEAM (Regras & Luzes)', icon: <Compass className="w-5 h-5 text-sky-400" />, color: 'sky' },
    { id: 'Balizamento', title: '2. Balizamento Marítimo & Fluvial', icon: <Anchor className="w-5 h-5 text-emerald-400" />, color: 'emerald' },
    { id: 'Legislação Náutica', title: '3. Legislação & LESTA / RLESTA', icon: <ShieldCheck className="w-5 h-5 text-amber-400" />, color: 'amber' },
    { id: 'Manobra, Atracação e Fundeio', title: '4. Manobra, Nós & Âncoras', icon: <Anchor className="w-5 h-5 text-indigo-400" />, color: 'indigo' },
    { id: 'Primeiros Socorros, Salvatagem e Incêndio', title: '5. Salvatagem, Socorros & Fogo', icon: <Flame className="w-5 h-5 text-rose-400" />, color: 'rose' },
    { id: 'Motonauta', title: '6. Motonauta, Resgate & Rádio', icon: <Ship className="w-5 h-5 text-cyan-400" />, color: 'cyan' },
  ];

  const conceptsData: Record<OfficialCategory, ConceptItem[]> = {
    'RIPEAM': [
      {
        id: 'c-ripeam-preferencia',
        title: 'Hierarquia e Preferência de Passagem entre Embarcações',
        subtitle: 'Unidade 3 da Apostila – Regra 18 do RIPEAM',
        summary: 'Nem todas as embarcações possuem a mesma capacidade de manobra. A regra geral estabelece quem deve ceder passagem a quem.',
        bulletPoints: [
          '1º lugar (Máxima preferência): Embarcação SEM GOVERNO (avariada na máquina ou leme).',
          '2º lugar: Embarcação com CAPACIDADE DE MANOBRA RESTRITA (dragas, lançamento de cabos submarinos, pesquisas).',
          '3º lugar: Embarcação CONDICIONADA PELO SEU CALADO (em canais estreitos navegáveis).',
          '4º lugar: Embarcação em fainas de PESCA com redes ou linhas de arrasto (pesca de anzol não conta).',
          '5º lugar: Embarcação a VELA (sob vela, desde que o motor não esteja acionado).',
          '6º lugar (Menor preferência): Embarcação de PROPULSÃO MECÂNICA (lanchas, barcos a motor em geral).',
          'Hidroaviões na água devem se manter bem afastados de qualquer embarcação.'
        ],
        normReference: 'RIPEAM-72 Regra 18 / Apostila Unidade 3 pág. 29',
        examTip: 'ATENÇÃO EM PROVA: Um barco a vela navegando com o motor ligado perde seus privilégios de vela e passa a ter as obrigações de um barco a motor!'
      },
      {
        id: 'c-ripeam-roda-a-roda',
        title: 'Situação de Roda a Roda (Proa com Proa)',
        subtitle: 'Unidade 3 da Apostila – Regra 14 do RIPEAM',
        summary: 'Quando duas embarcações de propulsão mecânica aproximam-se em rumos diretamente opostos com perigo de colisão.',
        bulletPoints: [
          'Manobra Obrigatória: AMBAS DEVEM GUINAR PARA BORESTE (direita).',
          'Modo de Passagem: Passam bombordo com bombordo (esquerda com esquerda).',
          'Identificação Noturna: Ambas avistam a luz de mastro e AMBAS AS LUZES DE BORDOS (verde e encarnada) da outra simultaneamente.',
          'Em caso de qualquer dúvida se a situação é ou não de roda a roda, assuma que ela existe e guine para boreste.'
        ],
        normReference: 'RIPEAM-72 Regra 14 / Apostila Unidade 3 pág. 28',
        examTip: 'Na situação de roda a roda, NUNCA guine para bombordo! Ambas guinam para boreste (direita).',
        illustration: 'maneuver_head_on'
      },
      {
        id: 'c-ripeam-rumos-cruzados',
        title: 'Situação de Rumos Cruzados',
        subtitle: 'Unidade 3 da Apostila – Regra 15 do RIPEAM',
        summary: 'Quando duas embarcações a propulsão mecânica navegam em direções que se cruzam com risco de abalroamento.',
        bulletPoints: [
          'Regra Fundamental: A embarcação que avistar a outra pelo seu BORESTE (lado direito) DEVE MANOBRAR e manter-se fora do caminho.',
          'A embarcação que deve manobrar deve evitar cruzar pela proa da outra.',
          'A embarcação com preferência (que avista a outra por bombordo / vê a luz verde da outra) deve, em princípio, manter seu rumo e velocidade.',
          'Se a que deve manobrar não o fizer a tempo, a de preferência DEVE agir para evitar a colisão inevitável.'
        ],
        normReference: 'RIPEAM-72 Regra 15 / Apostila Unidade 3 pág. 28',
        examTip: 'Mnemônico noturno: se você vê a luz ENCARNADA pelo seu boreste, pare/manobre! Se você vê a luz VERDE, você tem preferência.',
        illustration: 'maneuver_crossing'
      },
      {
        id: 'c-ripeam-alcancado',
        title: 'Situação de Ultrapassagem (Embarcação Alcançadora)',
        subtitle: 'Unidade 3 da Apostila – Regra 13 do RIPEAM',
        summary: 'Toda embarcação que se aproxima de outra vindo de uma direção a mais de 22,5° para ré do través dessa última.',
        bulletPoints: [
          'A EMBARCAÇÃO ALCANÇADA SEMPRE TEM PREFERÊNCIA ABSOLUTA.',
          'A embarcação alcançadora (que vem com maior velocidade ultrapassando) DEVE MANOBRAR e manter-se safa até concluir a ultrapassagem.',
          'Aspecto noturno: A alcançadora avista APENAS a luz branca de alcançado (luz de popa, 135°), sem ver as luzes verde ou encarnada de bordos.',
          'Esta regra se aplica até mesmo a um veleiro que esteja alcançando um barco a motor: o veleiro alcançador deve manobrar!'
        ],
        normReference: 'RIPEAM-72 Regra 13 / Apostila Unidade 3 pág. 27',
        examTip: 'O ângulo de ultrapassagem na prova é SEMPRE "mais de 22,5° para ré do través".',
        illustration: 'maneuver_overtaking'
      },
      {
        id: 'c-ripeam-veleiros-regras',
        title: 'Regras entre Veleiros e Mnemônico "Direita, Desvia"',
        subtitle: 'Oceanopedia / Regras 12 e 18 do RIPEAM',
        summary: 'Critérios de preferência de passagem entre embarcações a vela e a regra de ouro "Direita, Desvia".',
        bulletPoints: [
          'Ventos em Bordos Diferentes: O veleiro que receber o vento por BORESTE tem direito de passagem. O que receber o vento por bombordo DEVE DESVIAR ("Direita, Desvia").',
          'Ventos no Mesmo Bordo: Se ambos recebem o vento pelo mesmo bordo, o veleiro de SOTAVENTO tem preferência de passagem sobre o de barlavento.',
          'Regra do Barlavento: A embarcação a barlavento (de onde sopra o vento) deve sempre manter-se fora do caminho da que está a sotavento.',
          'Lancha a Motor x Veleiro: Barco a motor sempre deve desviar de veleiro em navegação (Regra 18).',
          'Exceção de Ultrapassagem: Se o veleiro for o ALCANÇADOR (ultrapassando por trás), o veleiro é obrigado a manobrar (Regra 13)!',
          'Veleiro navegando a motor: Perde todos os privilégios de vela e equipara-se a lancha a motor (de dia exibe 1 cone com vértice para baixo).'
        ],
        normReference: 'RIPEAM-72 Regras 12, 13 e 18 / Oceanopedia / DHN-0614',
        examTip: 'Macete prático da Capitania: Vento por bordos diferentes = boreste tem preferência ("Direita, Desvia"). Vento do mesmo bordo = sotavento tem preferência!'
      },
      {
        id: 'c-ripeam-luzes',
        title: 'Luzes de Navegação e Arcos de Visibilidade',
        subtitle: 'Unidade 3 da Apostila – Regras 21 e 22 do RIPEAM',
        summary: 'Luzes obrigatórias do pôr ao nascer do sol e em condições de visibilidade restrita (nevoeiro, chuva).',
        bulletPoints: [
          'Luz de Mastro: Branca contínua sobre o eixo longitudinal, visível em setor de 225° (da proa até 22,5° para ré do través de ambos os bordos).',
          'Luz de BORESTE: VERDE contínua, visível em setor de 112,5° (da proa até 22,5° para ré do través de boreste).',
          'Luz de BOMBORDO: ENCARNADA (Vermelha) contínua, visível em setor de 112,5°.',
          'Luz de Alcançado (Popa): Branca contínua, visível em setor de 135° voltada para a ré (67,5° para cada bordo a partir da popa).',
          'Luz de Reboque: Amarela contínua, com as mesmas características e setor de 135° da luz de alcançado, posicionada acima desta.',
          'Luz de Fundeio: Branca contínua, visível em 360° em todo o horizonte.'
        ],
        normReference: 'RIPEAM-72 Regras 21 e 22 / Apostila Unidade 3 pág. 30',
        examTip: 'A soma dos dois bordos (112,5° + 112,5°) é igual à luz de mastro (225°). A soma de mastro (225°) + alcançado (135°) fecha o círculo de 360°!',
        illustration: 'nav_lights'
      },
      {
        id: 'c-ripeam-marcas',
        title: 'Marcas Diurnas de Navegação (Período Diurno)',
        subtitle: 'Unidade 3 da Apostila – Regras 27 e 30 do RIPEAM',
        summary: 'Símbolos pretos geométricos (esferas, cones e cilindros) exibidos onde melhor possam ser vistos durante o dia.',
        bulletPoints: [
          'Embarcação FUNDEADA: 1 Esfera Preta na parte de vante.',
          'Embarcação SEM GOVERNO: 2 Esferas Pretas verticais sobrepostas (●●).',
          'Embarcação com CAPACIDADE DE MANOBRA RESTRITA: Esfera / Losango (dois cones unidos pela base) / Esfera (● ♦ ●).',
          'Embarcação ENCALHADA: 3 Esferas Pretas verticais sobrepostas (●●●).',
          'Embarcação em FAINA DE REBOQUE: 2 Cones pretos unidos pelas bases (losango) onde melhor possa ser visto.',
          'Embarcação RESTRITA DEVIDO AO CALADO: 1 Cilindro preto vertical.',
          'Veleiro navegando sob propulsão mecânica: 1 Cone preto apontando o vértice para baixo (▼).'
        ],
        normReference: 'RIPEAM-72 Regras 27, 28 e 30 / Apostila Unidade 3 pág. 32 e 33',
        examTip: 'Pergunta muito comum: 1 esfera preta = fundeada; 2 esferas pretas = sem governo; 3 esferas pretas = encalhada!',
        illustration: 'day_shape_anchored'
      },
      {
        id: 'c-ripeam-apitos',
        title: 'Sinais Sonoros de Manobra e Advertência',
        subtitle: 'Unidade 3 da Apostila – Regra 34 do RIPEAM',
        summary: 'Emissões sonoras de apito ou buzina (curto = ~1 seg; longo = 4 a 6 seg) em águas à vista desimpedida.',
        bulletPoints: [
          '1 Apito Curto (•): "Estou guinando para BORESTE (direita)".',
          '2 Apitos Curtos (••): "Estou guinando para BOMBORDO (esquerda)".',
          '3 Apitos Curtos (•••): "Estou DANDO ATRÁS (marcha a ré)".',
          '2 Apitos Longos + 1 Curto (—— •): "Tenciono ultrapassá-lo por seu boreste".',
          '2 Apitos Longos + 2 Curtos (—— ••): "Tenciono ultrapassá-lo por seu bombordo".',
          '1 Longo, 1 Curto, 1 Longo, 1 Curto (— • — •): Concordo com sua ultrapassagem.',
          '5 ou mais Apitos Curtos e Rápidos: "NÃO ENTENDI SUAS INTENÇÕES DE MANOBRA / SINAL DE PERIGO".',
          '1 Apito Longo (—): Ao aproximar-se de curva cega de rio ou canal estreito (respondido com outro apito longo).'
        ],
        normReference: 'RIPEAM-72 Regra 34 / Apostila Unidade 3 pág. 33',
        examTip: 'Em curvas de rios com morros ou matas que ocultam embarcações, soa-se 1 apito longo de advertência!',
        soundSignal: 'short_1',
        soundLabel: '1 Apito Curto (Boreste)'
      },
      {
        id: 'c-ripeam-cerração',
        title: 'Sinais Sonoros em Visibilidade Restrita (Cerração e Neblina)',
        subtitle: 'Unidade 3 da Apostila – Regra 35 do RIPEAM',
        summary: 'Sinais que devem ser emitidos compulsoriamente a cada 2 minutos quando a visão é prejudicada.',
        bulletPoints: [
          'Barco a motor COM SEGUIMENTO: 1 Apito Longo em intervalos de no máximo 2 minutos.',
          'Barco a motor SOB MÁQUINAS, MAS PARADO SEM SEGUIMENTO: 2 Apitos Longos (intervalo de ~2 seg entre eles) a cada 2 minutos.',
          'Sem Governo, Manobra Restrita, Calado Restrito, Vela, Pesca ou Reboque: 1 Longo seguido de 2 Curtos (— ••) a cada 2 minutos.',
          'Embarcação Fundeada: 1 Curto, 1 Longo e 1 Curto (• — •) para advertir risco de abalroamento, mais toques de sino.',
          'Embarcação Encalhada: 3 badaladas distintas de sino, sino batido rápido, gongo e 3 badaladas de sino.'
        ],
        normReference: 'RIPEAM-72 Regra 35 / Apostila Unidade 3 pág. 34',
        examTip: 'Cuidado com a pegadinha: 1 longo a cada 2 min = com seguimento; 2 longos a cada 2 min = parada sem seguimento!'
      }
    ],

    'Balizamento': [
      {
        id: 'c-baliz-conceito',
        title: 'Sistema IALA Região B (Adotado no Brasil)',
        subtitle: 'Unidade 3 da Apostila – Direção Convencional do Balizamento',
        summary: 'O balizamento marítimo e fluvial no Brasil segue a Região B da International Association of Lighthouse Authorities.',
        bulletPoints: [
          'Direção Convencional: Do mar para o porto / Da foz para a nascente (subindo o rio / de jusante para montante).',
          'Sinal Lateral de BORESTE: Cor ENCARNADA (Vermelha), formato cônico, pilar ou charuto. Luz encarnada. Numeração ÍMPAR.',
          'Sinal Lateral de BOMBORDO: Cor VERDE, formato cilíndrico, pilar ou charuto. Luz verde. Numeração PAR.',
          'Mnemônico da Marinha: "O marinheiro entra no porto solteiro e sai casado!"',
          'ENTRANDO NO PORTO: Luzes do barco NÃO casam com as boias (deixa encarnada por boreste e verde por bombordo).',
          'SAINDO DO PORTO: Luzes do barco CASAM com as boias (verde com verde a boreste, encarnada com encarnada a bombordo).'
        ],
        normReference: 'Sistema IALA B / Apostila Unidade 3 pág. 34 a 36',
        examTip: 'No Brasil (IALA B), as boias encarnadas recebem numeração ÍMPAR e as boias verdes numeração PAR, a partir do número 1 na entrada!',
        illustration: 'buoy_starboard'
      },
      {
        id: 'c-baliz-formatos-detalhados',
        title: 'Morfologia dos Sinais Laterais IALA-B (DHN e Oceanopedia)',
        subtitle: 'Quadro IALA Região B – Formatos Canônicos de Boias e Balizas',
        summary: 'Os 3 formatos geométricos construtivos padronizados pela Marinha do Brasil para os sinais laterais de canal.',
        bulletPoints: [
          'Sinal Lateral de BOMBORDO (VERDE): Formato CILÍNDRICO (Can), Boia PILAR com tope cilíndrico ou BALIZA/ESTACA (Spar) com tope cilíndrico verde. Numeração PAR.',
          'Sinal Lateral de BORESTE (ENCARNADO): Formato CÔNICO, Boia PILAR com tope cônico (vértice para cima) ou BALIZA/ESTACA (Spar) com tope cônico encarnado. Numeração ÍMPAR.',
          'Reconhecimento à distância: Mesmo com tinta desbotada pelo sol, o marinheiro identifica o sinal pela forma geométrica de seu tope (cilindro = bombordo; cone = boreste).',
          'Mnemônico RRR (Red Right Return): "Vermelha à direita (boreste) ao retornar/entrar no porto".',
          'Barco Arrumado x Desarrumado: O barco sai do porto arrumado (luzes casam com as boias: verde a BE, vermelha a BB). Ao voltar, entra desarrumado (luz verde a BE vê boia vermelha, luz vermelha a BB vê boia verde).'
        ],
        normReference: 'Sistema IALA B / Diretoria de Hidrografia e Navegação (DHN) / Oceanopedia',
        examTip: 'Tope cilíndrico é exclusivo de BOMBORDO (verde); tope cônico com vértice para cima é exclusivo de BORESTE (encarnado)!'
      },
      {
        id: 'c-baliz-preferencial',
        title: 'Sinais de Canal Preferencial (Bifurcação de Canais)',
        subtitle: 'Unidade 3 da Apostila – Sinais Laterais Modificados',
        summary: 'Quando um canal navegável se bifurca em dois, as boias indicam qual rota é a preferencial (mais profunda).',
        bulletPoints: [
          'Canal Preferencial a BORESTE: Boia VERDE com uma faixa horizontal ENCARNADA no centro. Luz verde com ritmo Fl(2+1).',
          'Canal Preferencial a BOMBORDO: Boia ENCARNADA com uma faixa horizontal VERDE no centro. Luz encarnada com ritmo Fl(2+1).',
          'A cor predominante do corpo da boia define para qual bordo fica o canal principal e preferencial!'
        ],
        normReference: 'Sistema IALA B / Apostila Unidade 3 pág. 35',
        examTip: 'Pergunta clássica de prova: "Boia verde com faixa encarnada" indica canal preferencial a BORESTE!',
        illustration: 'buoy_preferred_channel'
      },
      {
        id: 'c-baliz-perigo-isolado',
        title: 'Sinal de Perigo Isolado',
        subtitle: 'Unidade 3 da Apostila – Obstáculo Pontual',
        summary: 'Instalado sobre ou junto a um perigo com águas navegáveis em toda a sua volta (ex: pedra, casco soçobrado).',
        bulletPoints: [
          'Cores do Casco: PRETO com uma ou mais faixas horizontais ENCARNADAS.',
          'Tope Diurno: DUAS ESFERAS PRETAS sobrepostas verticalmente (●●).',
          'Luz Noturna: Branca lampejante com grupo de DOIS lampejos [Fl(2)].',
          'Novos Perigos não cartografados: Devem ser balizados com balizamento DOBRADO (dois sinais idênticos).'
        ],
        normReference: 'Sistema IALA B / Apostila Unidade 3 pág. 36',
        examTip: 'Tope com 2 esferas pretas no balizamento = PERIGO ISOLADO (luz branca em grupo de 2 lampejos).',
        illustration: 'buoy_isolated_danger'
      },
      {
        id: 'c-baliz-aguas-seguras',
        title: 'Sinal de Águas Seguras',
        subtitle: 'Unidade 3 da Apostila – Entrada de Barra e Meio de Canal',
        summary: 'Indica que há águas profundas e navegáveis em todas as direções ao redor do sinal.',
        bulletPoints: [
          'Cores do Casco: FAIXAS VERTICAIS ENCARNADAS E BRANCAS alternadas.',
          'Tope Diurno: UMA ESFERA ENCARNADA única (●).',
          'Luz Noturna: Branca contínua, isofásica, de ocultação ou emitindo a letra "A" em Código Morse (• —).'
        ],
        normReference: 'Sistema IALA B / Apostila Unidade 3 pág. 36',
        examTip: 'Não confunda: faixas verticais vermelhas/brancas = ÁGUAS SEGURAS; faixas horizontais pretas/vermelhas = PERIGO ISOLADO.',
        illustration: 'buoy_safe_water'
      },
      {
        id: 'c-baliz-cardinais',
        title: 'Sinais Cardinais (Norte, Sul, Leste, Oeste)',
        subtitle: 'Unidade 3 da Apostila – Quadrantes Livres de Perigo',
        summary: 'Indicam o quadrante da rosa-dos-ventos em que a embarcação deve navegar para estar livre de obstáculos.',
        bulletPoints: [
          'SINAL NORTE (N): 2 Cones pretos com VÉRTICES PARA CIMA (▲▲). Cores: Preto sobre Amarelo. Luz branca contínua rápida ininterrupta.',
          'SINAL SUL (S): 2 Cones pretos com VÉRTICES PARA BAIXO (▼▼). Cores: Amarelo sobre Preto. Luz branca com 6 lampejos rápidos + 1 longo (relógio 6 horas).',
          'SINAL LESTE (E): 2 Cones pretos unidos pelas BASES (▲▼). Cores: Preto com larga faixa amarela no centro. Luz: 3 lampejos rápidos (relógio 3 horas).',
          'SINAL OESTE (W): 2 Cones pretos unidos pelos VÉRTICES (▼▲). Cores: Amarelo com larga faixa preta no centro. Luz: 9 lampejos rápidos (relógio 9 horas).',
          'As pontas dos cones apontam para onde fica a faixa preta no casco da boia!'
        ],
        normReference: 'Sistema IALA B / Apostila Unidade 3 pág. 37',
        examTip: 'Mnemônico do Relógio: Leste = 3 horas (3 flashes), Sul = 6 horas (6 flashes), Oeste = 9 horas (9 flashes), Norte = 12 horas (flashes contínuos)!',
        illustration: 'buoy_cardinal'
      },
      {
        id: 'c-baliz-fluvial',
        title: 'Balizamento Fluvial, Lacustre e a "Lei do Rio"',
        subtitle: 'Unidade 3 da Apostila e Anexos – Navegação em Rios',
        summary: 'Regras específicas para rios onde as margens e a correnteza impõem comportamentos de governo especiais.',
        bulletPoints: [
          'Margem Direita: Margem situada à direita de quem DESCE O RIO (sentido montante para jusante). Sinalizada com cor e LUZ VERDE.',
          'Margem Esquerda: Margem situada à esquerda de quem desce o rio. Sinalizada com cor e LUZ ENCARNADA.',
          'Descendo o Rio (montante para jusante): Deixa boias verdes por BORESTE e encarnadas por BOMBORDO.',
          'Lei do Rio: A embarcação que vem A FAVOR DA CORRENTEZA (descendo) tem preferência e navega pelo meio do rio (talvegue). A que sobe deve navegar junto à margem direita em áreas mais calmas.',
          'Sinal "+" em rio: Perigo Isolado. Sinal "H": Seguir meio do canal. Sinal "X": Mudar/Trocar de margem.',
          'Sinalização em Pontes: Vão principal com luz rápida branca no centro. Pilar com triângulo vermelho = tráfego à direita de quem sobe; pilar com quadrado verde = tráfego à esquerda de quem sobe.'
        ],
        normReference: 'Balizamento Fluvial / Apostila Unidade 3 pág. 38-39 e Anexos pág. 68-73',
        examTip: 'Na navegação fluvial, quem desce o rio a favor da correnteza SEMPRE tem preferência sobre quem sobe!'
      }
    ],

    'Legislação Náutica': [
      {
        id: 'c-legis-lesta-competencias',
        title: 'LESTA, RLESTA e Competências da Autoridade Marítima',
        subtitle: 'Unidade 1 da Apostila – Base Legal da Segurança Aquaviária',
        summary: 'A segurança da navegação em águas nacionais rege-se pela Lei nº 9.537/97 (LESTA) e Decreto nº 2.596/98 (RLESTA).',
        bulletPoints: [
          'Autoridade Marítima Brasileira: Exercida pelo Comandante da Marinha do Brasil.',
          'Diretoria de Portos e Costas (DPC): Nível Nacional. Estabelece normas técnicas e de procedimentos (NORMAM).',
          'Capitanias dos Portos (CP), Delegacias (DL) e Agências (AG): Nível Regional/Local. Fiscalizam o tráfego e lavram autos de infração.',
          'Municípios: Competência exclusiva para ordenar o uso do solo das praias (separando área de banhistas e de esportes aquáticos).',
          'Inspeção Naval: Atividade de cunho administrativo da Marinha que fiscaliza o cumprimento das normas sem fins de blitz policial.'
        ],
        normReference: 'LESTA Lei nº 9.537/97 Art. 3º e 4º / Apostila Unidade 1 pág. 3',
        examTip: 'Quem aplica multas e fiscaliza embarcações na água é a Capitania dos Portos (DPC/MB); os municípios ordenam a faixa de areia da praia.'
      },
      {
        id: 'c-legis-categorias',
        title: 'Categorias de Amadores e Limites de Navegação',
        subtitle: 'Unidade 1 da Apostila – NORMAM-03/211/DPC',
        summary: 'Habilitações para conduzir embarcações de esporte e recreio em caráter estritamente não-profissional.',
        bulletPoints: [
          'Veleiro: Pequenas embarcações a vela sem motor em navegação interior. Idade mínima: 8 anos.',
          'Motonauta (MTA): Exclusivo para conduzir MOTO AQUÁTICA (jet-ski) em navegação interior. Idade mínima: 18 anos.',
          'Arrais-Amador (ARA): Embarcações a motor em navegação interior (rios, lagos, lagoas, baías, enseadas e canais), EXCETO moto aquática! Idade mínima: 18 anos.',
          'Mestre-Amador (MSA): Navegação costeira (dentro dos limites de visibilidade da costa, até 20 milhas náuticas).',
          'Capitão-Amador (CPA): Navegação oceânica sem qualquer restrição geográfica (alto-mar internacional).'
        ],
        normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 9',
        examTip: 'PEGADINHA FREQUENTE: Arrais-Amador NÃO PODE pilotar moto aquática se não tiver a habilitação de Motonauta averbada!'
      },
      {
        id: 'c-legis-documentos-validade',
        title: 'Documentos Obrigatórios e Prazos de Validade',
        subtitle: 'Unidade 1 da Apostila – Prazos da NORMAM-03',
        summary: 'Documentos que devem estar a bordo e seus respectivos prazos de renovação periódica.',
        bulletPoints: [
          'Carteira de Habilitação de Amador (CHA): Validade de 10 anos para amadores até 64 anos. Validade de 5 anos para quem tem 65 anos ou mais.',
          'Título de Inscrição da Embarcação (TIE ou TIEM): Validade de 5 anos, renovável na Capitania.',
          'Seguro Obrigatório DPEM: Validade de 12 meses (1 ano). Obrigatório para todas as embarcações sujeitas a inscrição.',
          'Termo de Responsabilidade: Assinado pelo proprietário garantindo as boas condições operacionais do barco.',
          'Nota Fiscal de Compra: Substitui o TIE/registro provisoriamente por até 15 dias para tráfego inicial.'
        ],
        normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 11 e 12',
        examTip: 'Memorize para a prova: CHA = 10 anos (ou 5 se >= 65 anos); TIE = 5 anos; Seguro DPEM = 12 meses!'
      },
      {
        id: 'c-legis-distancias-velocidades',
        title: 'Distâncias de Segurança da Orla, Velocidades e Esqui Aquático',
        subtitle: 'NORMAM-03/211 / Oceanopedia – Regras Gerais de Trânsito na Água',
        summary: 'Limites oficiais de afastamento de praias, limites de velocidade e regras de segurança para reboque esportivo.',
        bulletPoints: [
          'Distância da Praia no Mar: Barcos a motor devem manter distância mínima de 200 METROS da linha base da praia. Veleiros e barcos a remo: distância mínima de 100 METROS.',
          'Distância da Praia em Água Doce (Rios e Lagos): Os limites se reduzem à metade: 100 METROS para barcos a motor e 50 METROS para veleiros e remo.',
          'Aproximação da Praia: Permitida apenas em baixa velocidade, na perpendicular à praia e no canal demarcado pelo município para embarque e desembarque.',
          'Velocidade Segura: Máximo de 3 NÓS nas proximidades de marinas, clubes náuticos e áreas de banhistas.',
          'Distância de Instalações Estratégicas: Manter distância mínima de 200 METROS de instalações militares, hidrelétricas, usinas nucleares e navios atracados.',
          'Reboque de Esquiador Aquático: Obrigatório a bordo o piloto + 1 AUXILIAR OBSERVADOR voltado para a ré. A embarcação deve ter capacidade para pelo menos 3 PESSOAS.',
          'Bandeira Nacional: Obrigatória na popa em embarcações maiores de 5 metros de comprimento, hasteada das 8h ao pôr do sol.'
        ],
        normReference: 'NORMAM-03/211 Cap. 1 / Oceanopedia / Marinha do Brasil',
        examTip: 'Cai muito em prova: 200m da praia a motor; 3 nós em marinas; esquiador exige lotação mínima de 3 pessoas (piloto + observador + esquiador)!'
      },
      {
        id: 'c-legis-prazos-processo',
        title: 'Prazos do Processo Administrativo e Cancelamentos',
        subtitle: 'Unidade 1 da Apostila – LESTA e RLESTA',
        summary: 'Prazos legais para defesa de infrações, recursos e cancelamento de registro de embarcações.',
        bulletPoints: [
          'Defesa Prévia do Auto de Infração: 15 (quinze) DIAS ÚTEIS após o recebimento da notificação.',
          'Interposição de Recurso: 5 (cinco) DIAS ÚTEIS à autoridade superior (NÃO exige depósito prévio do valor da multa).',
          'Prazo de Inscrição após a compra: 15 dias para iates/grandes ou 60 dias para miúdas e médio porte.',
          'Cancelamento por paradeiro ignorado: 2 anos (ou 3 anos para embarcações sujeitas a vistorias de arqueação/CSN).',
          'Reabilitação de CHA cancelada: O infrator pode requerer nova habilitação após decorrido o prazo mínimo de 2 anos.',
          'Reincidência: Prática da mesma falta no período de 12 meses (penalidade multiplicada por 2, 3 e sucessivamente).'
        ],
        normReference: 'RLESTA Art. 19 a 25 / Apostila Unidade 1 pág. 5, 8 e 9',
        examTip: 'Defesa = 15 dias úteis; Recurso = 5 dias úteis (sem exigência de caução da multa)!'
      },
      {
        id: 'c-legis-multas-tabela',
        title: 'Tabela de Multas da RLESTA (Grupos A ao G)',
        subtitle: 'Unidade 1 da Apostila e Anexo de Infrações',
        summary: 'Valores das multas aplicáveis aos infratores das normas da Autoridade Marítima.',
        bulletPoints: [
          'Grupo A: R$ 40,00 a R$ 200,00 (habilitação desatualizada, falta de marcas no casco).',
          'Grupo B: R$ 40,00 a R$ 400,00 (não portar habilitação, luzes de navegação em desacordo).',
          'Grupo C: R$ 40,00 a R$ 800,00 (excesso de velocidade, dotação incompleta de bordo).',
          'Grupo D: R$ 40,00 a R$ 1.600,00 (trafegar em área de banhistas, descumprir RIPEAM, dano a sinal náutico).',
          'Grupo E: R$ 40,00 a R$ 2.200,00 (CONDUZIR EMBARCAÇÃO SEM HABILITAÇÃO, alteração nas características sem autorização).',
          'Grupo F: R$ 80,00 a R$ 2.800,00 (transporte irregular de carga perigosa ou sobre o convés).',
          'Grupo G: R$ 80,00 a R$ 3.200,00 (MAIOR PENA: EXCESSO DE LOTAÇÃO de passageiros ou excesso de carga autorizada).'
        ],
        normReference: 'RLESTA Quadro de Infrações / Apostila pág. 8 e 74',
        examTip: 'A maior multa (Grupo G, até R$ 3.200) é para excesso de lotação de passageiros! Sem habilitação é Grupo E (até R$ 2.200).'
      },
      {
        id: 'c-legis-areas-seletivas',
        title: 'Áreas Seletivas de Navegação e Áreas de Segurança',
        subtitle: 'Unidade 1 da Apostila – Proteção a Banhistas e Instalações',
        summary: 'Limites métricos de afastamento das praias e de pontos estratégicos na navegação interior.',
        bulletPoints: [
          '100 metros da linha base: Limite onde podem trafegar embarcações a REMOS e a VELA.',
          '200 metros da linha base: Embarcações de PROPULSÃO A MOTOR só podem trafegar além de 200 metros.',
          'Aproximação de Praias para Fundeio: Estritamente PERPENDICULAR à praia e com velocidade não superior a 3 NÓS.',
          'Velocidade em rampas, marinas e flutuantes: Máximo de 5 nós.',
          'Áreas de Segurança (FUNDEIO E TRÁFEGO PROIBIDOS): 200m de instalações militares; 500m de plataformas de petróleo; canais de acesso e fundeadouros de navios mercantes.'
        ],
        normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 10',
        examTip: 'Embarcação motorizada a menos de 200m da praia é infração grave: multa e apreensão do barco!'
      },
      {
        id: 'c-legis-comandante',
        title: 'Poderes e Deveres do Comandante a Bordo',
        subtitle: 'Unidade 1 da Apostila – LESTA Art. 8º a 11',
        summary: 'O Comandante (Arrais, Mestre ou Patrão) é a autoridade suprema e o tripulante responsável pela segurança a bordo.',
        bulletPoints: [
          'Autoridade Suprema: Todos a bordo (tripulação, passageiros e profissionais não tripulantes) estão subordinados a ele.',
          'Competência Notarial a Bordo: Registrar nascimentos e óbitos em viagem, celebrar casamentos in extremis e lavrar testamentos.',
          'Poderes de Polícia: Pode ordenar desembarque de qualquer pessoa, prender e algemar em camarote quem colocar em risco a segurança e determinar ALIJAMENTO de carga (jogar ao mar para evitar naufrágio).',
          'Dever de Socorro: O socorro à vida humana no mar é obrigatório por lei. O salvamento de bens materiais fica a critério do comandante.',
          'Comunicação Obrigatória: Deve informar à Capitania qualquer alteração de sinalização, perigos na água ou acidentes náuticos.'
        ],
        normReference: 'LESTA Lei nº 9.537/97 / Apostila Unidade 1 pág. 5 e 6',
        examTip: 'O Comandante tem poder legal para prender e lavrar termo de nascimento e óbito durante a singradura!'
      }
    ],

    'Manobra, Atracação e Fundeio': [
      {
        id: 'c-manob-casco-medidas',
        title: 'Corpos, Partes da Embarcação e Medidas Lineares',
        subtitle: 'Unidade 2 da Apostila – Terminologia Náutica Básica',
        summary: 'Nomenclatura oficial das estruturas do casco e dimensões geométricas regulamentares.',
        bulletPoints: [
          'Boreste (BE): Lado direito de quem olha da popa para a proa. Bombordo (BB): Lado esquerdo.',
          'Proa: Parte da frente. Popa: Parte de trás. Meia-nau: Região central que divide os corpos de vante e ré.',
          'Bochechas: Partes curvas do costado próximas à PROA (bochecha de BE e bochecha de BB).',
          'Alhetas: Partes curvas do costado próximas à POPA (alheta de BE e alheta de BB).',
          'Comprimento: Distância longitudinal proa-popa. Boca: Largura transversal medida de borda a borda.',
          'Calado: Altura vertical da quilha (fundo) até a linha d\'água flutuando.',
          'Borda Livre: Distância vertical entre a linha d\'água (superfície) e o convés principal.',
          'Pontal (ou pontal moldado): Medida vertical entre o convés principal e a quilha (Pontal = Calado + Borda Livre).',
          'Obras Vivas (Carena): Parte submersa do casco. Obras Mortas: Parte do casco que fica fora da água.'
        ],
        normReference: 'Arte Naval / Apostila Unidade 2 pág. 15',
        examTip: 'Cuidado em prova: Calado é da quilha à linha d\'água; Pontal é da quilha até o convés principal!'
      },
      {
        id: 'c-manob-estabilidade',
        title: 'Estabilidade, Movimentos do Barco e Distribuição de Pesos',
        subtitle: 'Unidade 2 da Apostila – Estabilidade Básica e Flutuação',
        summary: 'Equilíbrio da embarcação perante as forças de gravidade e empuxo na água.',
        bulletPoints: [
          'Caturro ou Arfagem: Movimento de oscilação vertical longitudinal (proa-popa).',
          'Balanço: Movimento de oscilação lateral de um bordo para o outro (BB a BE).',
          'Balanço Rápido: Demonstra BOA estabilidade (barco responde prontamente).',
          'Balanço Lento: Indica ESTABILIDADE DEFICIENTE (perigo de emborcar).',
          'Trim ou Compasso: Diferença entre os calados de proa e popa.',
          'Trimada (águas parelhas): Calado de vante igual ao calado de ré.',
          'Derrabada: Calado a ré maior que calado a vante (muito peso na popa).',
          'Abicada: Calado a vante maior que calado a ré (muito peso na proa).',
          'Alquebramento: Peso nas extremidades (proa e popa) -> casco curva com convexidade para CIMA.',
          'Contra-alquebramento: Peso concentrado no centro (meia-nau) -> casco curva com convexidade para BAIXO (risco de quebrar ao meio).',
          'Efeito de Superfície Livre: Líquido solto em tanques pela metade ou água acumulada no porão se desloca para o bordo inclinado acentuando a banda perigosamente.'
        ],
        normReference: 'Arte Naval / Apostila Unidade 2 pág. 16 e 17',
        examTip: 'Balanço rápido = boa estabilidade; Balanço lento = má estabilidade! Alquebramento = curva para cima (pesos na proa e popa).'
      },
      {
        id: 'c-manob-leme-helice',
        title: 'Efeitos Combinados do Leme e do Hélice',
        subtitle: 'Unidade 2 da Apostila – Governo e Hélices de Passo Direito',
        summary: 'A ação do fluxo hidrodinâmico das pás do hélice e da porta do leme no deslocamento da proa e da popa.',
        bulletPoints: [
          'Partes do Leme: Madre (eixo de giro), Cana (barra de manobra) e Porta do leme (superfície sobre a qual a água faz pressão). Governaduras: dobradiças de fixação.',
          'Efeito Máximo do Leme: Teoricamente 45°, mas na prática atinge seu efeito máximo em torno de 35° de inclinação.',
          'Hélice de Passo Direito (Giro Horário para a direita):',
          '• Marcha a VANTE partindo do repouso: Proa guina lentamente para BOMBORDO.',
          '• Marcha a VANTE com seguimento: Proa guina lentamente para BORESTE.',
          '• Marcha a RÉ (dando atrás): Proa guina sempre para BORESTE e a popa guina com força para BOMBORDO.',
          'Embarcações com DOIS HÉLICES: Para atracar, aproximam-se com ângulo de 20° com o cais. Se um motor der adiante e o outro a ré com rotações iguais, a proa gira para o bordo do motor que dá a ré!'
        ],
        normReference: 'Arte Naval / Apostila Unidade 2 pág. 18 e Quadro pág. 25',
        examTip: 'Hélice de passo direito dando marcha a ré: a popa puxa para bombordo e a proa vai para BORESTE!'
      },
      {
        id: 'c-manob-espias',
        title: 'Espias e Cabos de Amarração ao Cais',
        subtitle: 'Unidade 2 da Apostila – Atracação e Desatracação',
        summary: 'Função de cada espia para segurar a embarcação na posição correta junto aos cabeços do cais.',
        bulletPoints: [
          '① Lançante de Proa: Passado da proa dirigindo-se para vante -> EVITA QUE A EMBARCAÇÃO CAIA A RÉ.',
          '② Espringue de Proa: Passado da proa dirigindo-se para ré -> EVITA QUE A EMBARCAÇÃO CAIA A VANTE.',
          '③ Través: Passado do meio perpendicularmente sem inclinação -> EVITA QUE A EMBARCAÇÃO SE AFASTE DO CAIS.',
          '④ Espringue de Popa: Passado da popa dirigindo-se para vante -> IMPEDE QUE A EMBARCAÇÃO CAIA A RÉ.',
          '⑤ Lançante de Popa: Passado da popa dirigindo-se para ré -> IMPEDE QUE A EMBARCAÇÃO CAIA A VANTE.',
          'Buzinas: Peças na borda para guiar as espias. Cabeços: Peças metálicas no cais onde se amarram as espias.'
        ],
        normReference: 'Arte Naval / Apostila Unidade 2 pág. 19',
        examTip: 'Memorize: Lançante de proa segura a ré; Espringue de proa segura a vante; Través segura o afastamento lateral!'
      },
      {
        id: 'c-manob-atracar-desatracar',
        title: 'Manobras de Atracação e Desatracação sob Vento e Corrente',
        subtitle: 'Unidade 2 da Apostila – Procedimentos Práticos',
        summary: 'Técnicas de abordagem ao cais respeitando as condições meteorológicas e de maré.',
        bulletPoints: [
          'Melhor Momento: Atracar no estofo da maré (maré parada, sem corrente). Aproximação em ângulo oblíquo contra corrente.',
          'Vento Perpendicular por Barlavento (empurrando para o cais): Aproximar em paralelo, bem devagar, quase parando; o próprio vento encosta o casco com defensas prontas.',
          'Vento Perpendicular por Sotavento (afastando do cais): Aproximar em ângulo de 45°, passar espringue de proa, leme para fora e máquina devagar adiante para colar a popa.',
          'Vento Paralelo ao cais: Aproximar contra a correnteza em ângulo de 30°, passar lançante de proa e cortar máquinas.',
          'Desatracação com Vento pela Proa: Largar tudo exceto o espringue de popa (diz para vante), leme contrário ao cais e marcha a ré para abrir a proa.',
          'Desatracação com Vento pela Popa: Largar tudo exceto espringue de proa, leme na direção do cais e máquinas adiante para abrir a popa.'
        ],
        normReference: 'Arte Naval / Apostila Unidade 2 pág. 20 e 21',
        examTip: 'Para pegar uma boia flutuante: aproar contra vento/corrente com pouco seguimento e usar o CROQUE (haste com gancho).'
      },
      {
        id: 'c-manob-ancoras-fundeio',
        title: 'Âncoras, Fundeio e Expressões Marinheiras',
        subtitle: 'Unidade 2 da Apostila – Tipos de Ferros e Filame',
        summary: 'Como fundear e suspender com segurança, características de âncoras e vocabulário técnico.',
        bulletPoints: [
          'Filame: Comprimento de amarra lançado. Condições normais: no mínimo 3 vezes a profundidade do local. Mau tempo/demorado: 5 a 7 vezes a profundidade.',
          'Âncora Danforth: Mais comum em esporte e recreio, partes móveis, ideal para areia, lama e cascalho. Requer filame de 5 vezes a profundidade.',
          'Âncora Bruce: Grande poder de fixação em areia e lama, requer filame menor (3 vezes a profundidade). Difícil de arrancar em pedras.',
          'Âncora Arado (CQR): Excelente em areia/lama, muito segura em mudanças de direção de vento/correnteza.',
          'Âncora Garatéia: Feita com tubos de ferro, ideal para fundos de pedra e corais em barcos menores de 5m.',
          'Âncora Cogumelo: Em amarrações fixas e lama pesada; retenção fraca para barcos grandes.',
          'Âncora Flutuante (Drogue): NÃO serve para fundear no fundo; fica na água para desacelerar a deriva em mau tempo.',
          'Boia de Arinque: Pequena boia que marca o local exato onde a âncora unhou no fundo.',
          'Vocabulário: Unhar (âncora prender firme no fundo), Garrar (âncora arrastando sem segurar), Suspender (recolher a âncora do fundo), À Matroca (derivar solto com vento/maré), Capear (proa ao vento aguentando o temporal), Tença (qualidade do fundo marinho).'
        ],
        normReference: 'Arte Naval / Apostila Unidade 2 pág. 21 a 23',
        examTip: 'A âncora flutuante (drogue) não toca o fundo! Sua finalidade exclusiva é reduzir a deriva da embarcação em temporal.'
      },
      {
        id: 'c-manob-nos-voltas',
        title: 'Nós e Voltas de Marinharia',
        subtitle: 'Unidade 2 da Apostila – Manuseio de Cabos',
        summary: 'Nós essenciais para a faina marinheira a bordo de embarcações.',
        bulletPoints: [
          'Chicote: Ponta extrema do cabo. Seio: Meio do cabo. Retinida: Cabo fino auxiliar para lançamento de boias.',
          'Nó Direito: Usado para unir dois cabos de bitolas IGUAIS. NÃO corre e desfaz-se com facilidade quando aliviado.',
          'Nó Torto: Confunde-se com o nó direito, mas com voltas invertidas. CORRE e aperta indevidamente.',
          'Nó de Escota: Usado para unir dois cabos de bitolas DIFERENTES ou um chicote a um olhal/alça.',
          'Lais de Guia: O nó mais importante da marinharia! Forma uma alça/balso que não corre nem aperta. Usado para amarrar ao arganeu de boia.',
          'Nó de Catau: Usado para encurtar temporariamente um cabo ou isolar uma parte puída (coçada/gasta).',
          'Nó de Pescador: Usado para emendar cabos e linhas de pesca finas.',
          'Volta do Fiel: Usada para fixar um chicote em mastro, verga, cunho ou cabeço.',
          'Volta da Ribeira: Usada para amarrar e içar objetos compridos como mastros, pranchas e vergas.'
        ],
        normReference: 'Arte Naval / Apostila Unidade 2 pág. 24',
        examTip: 'Para unir cabos de bitolas iguais use o NÓ DIREITO; para bitolas diferentes use o NÓ DE ESCOTA!'
      }
    ],

    'Primeiros Socorros, Salvatagem e Incêndio': [
      {
        id: 'c-cbinc-fogo',
        title: 'O Triângulo do Fogo e Métodos de Extinção',
        subtitle: 'Unidade 5 da Apostila – Princípios Básicos do Fogo',
        summary: 'Para haver fogo são necessários 3 elementos: Combustível, Comburente e Temperatura de Ignição.',
        bulletPoints: [
          'Combustível: Todo material capaz de entrar em combustão (sólido, líquido ou gasoso).',
          'Comburente: O elemento ativador químico, sendo o Oxigênio atmosférico (21% no ar). Abaixo de 16% de oxigênio a chama não se mantém (o carvão é exceção, queima a 9%).',
          'Temperatura de Ignição: Quantidade de calor suficiente para liberar vapores e gerar queima.',
          'Ponto de Fulgor: Temperatura mínima na qual o líquido desprende vapores que inflamam com faísca externa, mas não sustentam o fogo.',
          'Ponto de Combustão: Temperatura na qual o combustível desprende vapores que continuam queimando mesmo retirando a faísca.',
          'Ponto de Ignição: Temperatura na qual o combustível inflama espontaneamente sem fonte externa.',
          'Métodos de Extinção: Abafamento (eliminar ou reduzir o oxigênio abaixo de 16%), Resfriamento (reduzir o calor com água) e Quebra da Reação em Cadeia (agentes químicos em nível molecular).'
        ],
        normReference: 'CBINC / Apostila Unidade 5 pág. 51 e 52',
        examTip: 'Ao reduzir o oxigênio para menos de 16%, o fogo apaga por ABAFAMENTO; ao reduzir o calor, apaga por RESFRIAMENTO.',
        illustration: 'fire_triangle'
      },
      {
        id: 'c-cbinc-classes',
        title: 'Classes de Incêndio e Extintores Portáteis',
        subtitle: 'Unidade 5 da Apostila – Classificação Oficial e Símbolos',
        summary: 'O agente extintor correto depende da classe do material em combustão.',
        bulletPoints: [
          'Classe A (Sólidos que deixam cinzas e brasas: madeira, tecido, papel): Agente ideal é ÁGUA (resfriamento). Símbolo: Triângulo VERDE com letra A.',
          'Classe B (Líquidos e gases inflamáveis: gasolina, diesel, solventes, óleos): Agente ideal é ESPUMA (abafamento), CO2 ou Pó Químico. Jatos de água são PROIBIDOS (espalham o combustível líquido). Símbolo: Quadrado VERMELHO com letra B.',
          'Classe C (Equipamentos elétricos ENERGIZADOS: geradores, painéis, baterias): Agente ideal é CO2 (não deixa resíduos) ou Pó Químico. ÁGUA É PROIBIDA (conduz eletricidade gerando choque fatal). Símbolo: Círculo AZUL com letra C.',
          'Classe D (Metais combustíveis: magnésio, titânio, zinco, sódio): Agente exclusivo é PÓ SECO MET-L-X. NUNCA USAR ÁGUA (reação explosiva violenta). Símbolo: Estrela AMARELA com letra D.',
          'Operação: Retirar a trava de segurança, acionar o gatilho e direcionar o jato para a BASE DAS CHAMAS.'
        ],
        normReference: 'CBINC / Apostila Unidade 5 pág. 53 e 54',
        examTip: 'Para classe C (elétrico energizado): CO2 ou Pó; NUNCA água! Para classe B (gasolina/diesel): espuma ou pó; nunca jato de água!',
        illustration: 'fire_triangle'
      },
      {
        id: 'c-prisoc-avaliacao',
        title: 'Avaliação Primária da Vítima e Chamados de Socorro',
        subtitle: 'Unidade 4 da Apostila – Suporte Básico de Vida',
        summary: 'Sequência rigorosa de atendimento imediato em sinistros a bordo (Art. 135 do Código Penal: omissão de socorro é crime).',
        bulletPoints: [
          'Telefones de Emergência: SAMU 192 | Bombeiros 193 | Salvamento Marítimo SAR 185 | Rádio VHF Canal 16.',
          'Passo 1 da Avaliação Primária: Desobstruir vias aéreas superiores e estabilizar a coluna cervical.',
          'Passo 2: Verificar respiração (olhar movimentos do tórax, ouvir e sentir o ar na face por 10 segundos).',
          'Passo 3: Verificar circulação sanguínea (sentir pulsação no pescoço - artéria carótida).',
          'Passo 4: Avaliar nível de consciência e resposta a estímulos sonoros e táteis.',
          'Passo 5: Proteção da vítima contra intempéries e hipotermia.'
        ],
        normReference: 'PRISOC / Apostila Unidade 4 pág. 40 e 41',
        examTip: 'A primeira atitude com uma vítima inconsciente é sempre a desobstrução das vias aéreas com controle cervical!'
      },
      {
        id: 'c-prisoc-pcr-afogamento',
        title: 'Ressuscitação Cardiopulmonar (RCP) e Afogamento',
        subtitle: 'Unidade 4 da Apostila – Parada Cardiorrespiratória',
        summary: 'Compressões torácicas e ventilações de emergência.',
        bulletPoints: [
          'Posição da Vítima: Deitada em superfície rígida e plana de costas (decúbito dorsal - barriga para cima).',
          'Ponto de Compressão: Extremidade inferior do osso vertical central do peito (osso esterno).',
          'Frequência: Média de 100 compressões torácicas por minuto, afundando o esterno de 5 a 6 cm.',
          'Ciclo oficial da apostila: Iniciar com respirações e manter compressões torácicas com ventilações intercaladas.',
          'Afogamento: NUNCA perder tempo tentando retirar água dos pulmões da vítima! Iniciar imediatamente a desobstrução e RCP.',
          'Informar ao médico assistente se o afogamento ocorreu em água doce, salgada ou piscina.'
        ],
        normReference: 'PRISOC / Apostila Unidade 4 pág. 42 e 43',
        examTip: 'Em afogado desacordado sem respirar, NUNCA gaste tempo virando para tirar água do pulmão: inicie a RCP imediatamente!'
      },
      {
        id: 'c-prisoc-queimaduras',
        title: 'Queimaduras, Fraturas e Hemorragias',
        subtitle: 'Unidade 4 da Apostila – Traumatismos a Bordo',
        summary: 'Condutas corretas para lesões térmicas, fraturas ósseas e perda sanguínea.',
        bulletPoints: [
          'Queimadura 1º Grau: Atinge só a epiderme; vermelhidão e dor no local, SEM bolhas.',
          'Queimadura 2º Grau: Atinge epiderme e derme; vermelhidão intensa e FORMAÇÃO DE BOLHAS.',
          'Queimadura 3º Grau: Atinge tecidos profundos com NECROSE (morte celular).',
          'Queimadura 4º Grau: Destruição total até o tecido ósseo ("indolor" por destruição das fibras nervosas).',
          'Regra da Palma da Mão: A palma da mão da vítima equivale a cerca de 1% da sua área corporal.',
          'Tratamento de Queimaduras: Apenas água fria limpa. NUNCA passar pasta de dente, manteiga, óleo ou furar bolhas.',
          'Hemorragia Arterial: Sangue vermelho vivo em JATOS FORTES sincronizados aos batimentos cardíacos. É a mais perigosa.',
          'Hemorragia Venosa: Sangue vermelho escuro, escoando de forma contínua e lenta.',
          'Hemostasia: Compressão direta com pano grosso limpo. Torniquetes são EXCLUSIVOS para amputações/esmagamentos de braço ou coxa, devendo ser desapertados de 15 em 15 minutos!',
          'Fraturas: Imobilizar com talas rígidas ultrapassando as articulações acima e abaixo da fratura, amarrando em 4 pontos.'
        ],
        normReference: 'PRISOC / Apostila Unidade 4 pág. 44 a 47',
        examTip: 'Sangue vermelho vivo em jatos fortes = HEMORRAGIA ARTERIAL! O torniquete só pode ser colocado no braço ou na coxa e aliviado a cada 15 min.'
      },
      {
        id: 'c-salvat-coletes-boias',
        title: 'Coletes Salva-Vidas e Boias Circulares',
        subtitle: 'Unidade 6 da Apostila – Dotações Regulamentares da DPC',
        summary: 'Equipamentos individuais e primários de salvatagem para esporte e recreio.',
        bulletPoints: [
          'Colete Classe I (SOLAS): Para Navegação Oceânica (alto-mar). Possui lâmpada de acionamento automático por água salgada e fitas refletivas.',
          'Colete Classe II: Para Navegação Costeira. Mesma flutuabilidade do Classe I, possui fitas refletivas, mas NÃO possui lâmpada.',
          'Colete Classe III: Para Navegação Interior (rios, lagos, represas e baías). Sem fitas refletivas.',
          'Colete Classe IV: Para trabalhos na borda do cais/navio.',
          'Colete Classe V: Homologado para esportes de velocidade e moto aquática (uso VESTIDO OBRIGATÓRIO).',
          'Boias Salva-Vidas: Embarcações miúdas são dispensadas. Médio porte até 12m: 1 boia. Médio porte acima de 12m: 2 boias. Grande porte: 2 boias.',
          'Retinida Flutuante: Pelo menos uma das boias deve possuir retinida com 30 metros de comprimento (ou 20 metros para navegação interior).'
        ],
        normReference: 'NORMAM-03/211 / Apostila Unidade 6 pág. 57 a 60',
        examTip: 'Apenas os coletes Classe I e II possuem fitas refletivas! Na moto aquática, o uso do colete Classe V vestido é OBRIGATÓRIO.'
      }
    ],

    'Motonauta': [
      {
        id: 'c-motonauta-normam',
        title: 'Regras Fundamentais de Navegação com Moto Aquática',
        subtitle: 'Unidade 1 da Apostila – NORMAM-03 e NORMAM-212',
        summary: 'Diretrizes de segurança para a condução legal de moto aquática (jet-ski).',
        bulletPoints: [
          'Habilitação Obrigatória: Categoria de MOTONAUTA (MTA) ou carteira de Arrais/Mestre/Capitão com averbação MTA.',
          'Horário de Navegação: EXCLUSIVAMENTE DIURNO (do nascer ao pôr do sol). É terminantemente proibido pilotar moto aquática à noite (não possui luzes de navegação).',
          'Afastamento de Praias: Proibido trafegar a menos de 200 metros da linha base em áreas com banhistas.',
          'Aproximação de Praias: Permitida apenas para saída ou retorno, em ângulo perpendicular à praia, em canal balizado e em velocidade não superior a 3 nós.',
          'Chave de Segurança (Lanyard): Deve ser OBRIGATORIAMENTE fixada ao pulso ou colete do condutor.',
          'Colete Salva-Vidas: Todos os ocupantes devem estar permanentemente VESTIDOS com coletes Classe V homologados.',
          'Transporte de Crianças: Proibido menores de 7 anos. Entre 7 e 12 anos, somente na garupa (atrás do piloto) acompanhadas ou autorizadas, conseguindo apoiar os pés e segurar-se com firmeza.'
        ],
        normReference: 'NORMAM-03/212 / Apostila Unidade 1 pág. 13 e 14',
        examTip: 'A moto aquática não tem leme! Se você cortar o acelerador, a turbina não sopra água e você perde todo o poder de manobra.'
      },
      {
        id: 'c-motonauta-reboque-equipamentos',
        title: 'Reboque com Jet-Ski e Prescrições Especiais',
        subtitle: 'Unidade 1 da Apostila – Banana-Boat e Práticas Esportivas',
        summary: 'Requisitos técnicos e legais para reboque de boias e esqui.',
        bulletPoints: [
          'Capacidade Mínima: A moto aquática para reboque deve ter capacidade mínima de TRÊS (3) LUGARES (Condutor, Observador olhando para trás e o passageiro rebocado).',
          'Espelhos Retrovisores: Devem possuir grande campo angular para o piloto acompanhar o reboque.',
          'Banana-Boat rebocada: Número máximo limitado a 5 passageiros por dispositivo.',
          'Qualificação para Banana-Boat: O condutor deve ser habilitado como Aquaviário além de Motonauta; o observador pode ser amador ou aquaviário.',
          'Nunca conduza passageiro na frente do piloto (entre seu corpo e o guidão)!'
        ],
        normReference: 'NORMAM-03 / Apostila Unidade 1 pág. 13 e 14',
        examTip: 'Para rebocar boia ou esqui, o jet-ski precisa ter capacidade mínima de 3 LUGARES!'
      },
      {
        id: 'c-salvat-homem-mar-curvas',
        title: 'Manobras de Resgate de Homem ao Mar',
        subtitle: 'Unidade 6 da Apostila – Boutakow, Williamson e Anderson',
        summary: 'Procedimentos padronizados para resgate de náufrago na água.',
        bulletPoints: [
          'Curva de BOUTAKOW: Guinar 70° para o bordo da queda e depois inverter todo o leme para o outro bordo até atingir o rumo oposto. Característica: RETORNA EXATAMENTE SOBRE A ESTEIRA deixada pelo hélice. Muito usada em barcos a motor.',
          'Curva de WILLIAMSON: Guinar 60° para o bordo da queda e depois inverter o leme até o rumo recíproco. Recomendada para MAR GROSSO, À NOITE ou QUANDO O NÁUFRAGO NÃO ESTÁ NO VISUAL.',
          'Curva de ANDERSON: Guinada contínua de 180° para o bordo da queda. Recomendada para quando o náufrago ESTÁ NO VISUAL.',
          'Manobra "Y" (Yankee): Para ÁGUAS RESTRITAS (guinada rápida e máquina toda força a ré).',
          'Aproximação Final de Recolhimento: O navio deve posicionar-se deixando o homem por SOTAVENTO (o barco protege a vítima do vento), parando a cerca de 10 metros.'
        ],
        normReference: 'Salvatagem Náutica / Apostila Unidade 6 pág. 60 e 61',
        examTip: 'A manobra que retorna a embarcação exatamente em cima da esteira é a CURVA DE BOUTAKOW (guinada a 70°)!'
      },
      {
        id: 'c-salvat-abandono-balsa',
        title: 'Abandono de Embarcação e Vida na Balsa Salva-Vidas',
        subtitle: 'Unidade 6 da Apostila – Sobrevivência e Racionamento',
        summary: 'Técnicas de salto na água e regras vitais de racionamento em balsas infláveis.',
        bulletPoints: [
          'Salto na Água: Saltar sempre por BARLAVENTO (lado de onde sopra o vento, longe de manchas de óleo que derivam para sotavento).',
          'Postura de Salto: De pé ("pés primeiro"), pernas esticadas e cruzadas, braços segurando o colete e protegendo cabeça e genitais. NUNCA pular de cabeça!',
          'Balsa Salva-Vidas: Cabo de disparo aciona a ampola de CO2 inflando a balsa em 30 segundos. Só cortar o cabo de ligação quando todos estiverem embarcados.',
          'RACIONAMENTO DE ÁGUA: NÃO BEBER NENHUMA ÁGUA NAS PRIMEIRAS 24 HORAS (1º dia). A partir do 2º dia: consumir 700 ml de água potável por dia.',
          'REGRA DE SOBREVIVÊNCIA: NUNCA BEBER ÁGUA DO MAR, NUNCA BEBER URINA e NUNCA INGERIR BEBIDAS ALCOÓLICAS (causam insuficiência renal fulminante e aceleram a morte por desidratação).',
          'Pirotécnicos de Bordo: Foguete com paraquedas (luz vermelha, 30.000 candelas por 40 seg, noturno); Facho manual vermelho (15.000 candelas por 60 seg, noturno); Fumígeno flutuante laranja (fumaça por 3 a 15 min, diurno).'
        ],
        normReference: 'SOLAS / Apostila Unidade 6 pág. 61 a 66',
        examTip: 'Na balsa salva-vidas, NÃO se bebe água no primeiro dia! A partir do 2º dia, a cota é de 700 ml/dia. Água do mar e urina são proibidas.'
      },
      {
        id: 'c-comunic-vhf-cis',
        title: 'Comunicações Náuticas, Frequências e Bandeiras CIS',
        subtitle: 'Unidade 7 da Apostila e Anexos – Procedimentos de Rádio',
        summary: 'Equipamentos transceptores VHF/HF e Código Internacional de Sinais.',
        bulletPoints: [
          'VHF Canal 16 (156,800 MHz): Canal internacional de Chamada, Socorro, Urgência e Segurança. Escuta permanente obrigatória navegando.',
          'VHF Canal 70 (156,525 MHz): Exclusivo para Chamada Seletiva Digital (DSC). É TERMINANTEMENTE PROIBIDA A TRANSMISSÃO DE VOZ (radiotelefonia) no canal 70!',
          'Potência do VHF fixo: Mínimo 25 Watts. Portátil: autonomia mínima 4 horas, ciclo 1:9 (1 min transmitindo, 9 ouvindo).',
          'HF SSB: Frequência 2.182 kHz (socorro internacional curta distância) e 4.125 kHz (socorro Atlântico Sul longa distância).',
          'Bandeira ALFA (Azul e Branca fendida): "Tenho mergulhador na água; mantenha-se bem afastado e a baixa velocidade".',
          'Bandeira BRAVO (Vermelha): "Estou carregando, descarregando ou transportando carga perigosa".',
          'Bandeira OSCAR (Diagonal Amarela e Vermelha): "Homem ao Mar!".'
        ],
        normReference: 'ANATEL / Apostila Unidade 7 pág. 65 a 68 e Anexo CIS pág. 69',
        examTip: 'É proibido transmitir voz no Canal 70 (exclusivo DSC)! Canal 16 (156,8 MHz) é o canal universal de socorro e chamada.'
      }
    ]
  };

  const handlePlaySound = async (signalKey: string) => {
    setIsPlayingAudio(signalKey);
    soundSignals.playSignalByType(signalKey);
    setTimeout(() => {
      setIsPlayingAudio(null);
    }, 2000);
  };

  const allConcepts = officialCategories.flatMap((cat) => conceptsData[cat]);
  const sourceList = selectedCategory === 'ALL' ? allConcepts : conceptsData[selectedCategory as OfficialCategory];

  const activeConcepts = sourceList.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.bulletPoints.some((b) => b.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-extrabold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          Apostila Oficial Interativa – Arrais-Amador e Motonauta
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-100 tracking-tight">
          Teoria Completa das 7 Unidades da Apostila
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Conteúdo oficial baseado na LESTA, RLESTA, RIPEAM-72 e NORMAM-03/211/212. Estude os conceitos, confira esquemas gráficos, ouça apitos e domine as manobras e penalidades.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setExpandedConceptId(null);
              }}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-b from-navy-800 to-navy-750 border-gold-500 ring-2 ring-gold-500/30 shadow-lg'
                  : 'bg-navy-900/80 border-navy-700/80 hover:bg-navy-800/60'
              }`}
            >
              <div className="p-1.5 rounded-xl bg-navy-950/80 border border-navy-800 w-fit">
                {cat.icon}
              </div>
              <span className={`text-[11px] font-extrabold leading-snug ${isSelected ? 'text-gold-400' : 'text-slate-200'}`}>
                {cat.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-navy-900/90 border border-navy-700 p-3.5 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar conceito, norma, multa ou manobra..."
            className="w-full bg-navy-950 border border-navy-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onStartPractice(selectedCategory === 'ALL' ? 'RIPEAM' : selectedCategory as OfficialCategory)}
            className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 text-navy-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>{selectedCategory === 'ALL' ? 'Praticar Banco Completo (466 Questões)' : 'Praticar Questões deste Módulo'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quadros Oficiais DHN Marinha do Brasil */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 p-4 md:p-5 rounded-3xl space-y-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-700/80 pb-2.5">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-gold-400" />
            <h3 className="text-xs md:text-sm font-extrabold text-slate-100 uppercase tracking-wider">
              Quadros Oficiais da Diretoria de Hidrografia e Navegação (DHN / Marinha do Brasil)
            </h3>
          </div>
          <span className="text-[10px] text-gold-400 font-bold bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
            Fonte: DHN & Oceanopedia
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-left">
          {[
            {
              id: 'dhn-614',
              title: 'Quadro I: Regras de Governo',
              code: 'DHN-0614-2',
              src: './images/dhn/dhn-0614-regras-governo.webp',
              desc: 'Regras 9 a 19 do RIPEAM: Canais estreitos, separação de tráfego, ultrapassagem, roda a roda e rumos cruzados.',
              rule: 'RIPEAM Regras 9 a 19'
            },
            {
              id: 'dhn-615',
              title: 'Quadro II: Luzes e Marcas',
              code: 'DHN-0615-2',
              src: './images/dhn/dhn-0615-luzes-marcas.webp',
              desc: 'Regras 21 a 31 do RIPEAM: Setores de visibilidade das luzes, luzes de mastro, bordos, reboque e marcas diurnas.',
              rule: 'RIPEAM Regras 21 a 31'
            },
            {
              id: 'dhn-616',
              title: 'Quadro III: Sinais Sonoros',
              code: 'DHN-0616-3',
              src: './images/dhn/dhn-0616-sinais-sonoros.webp',
              desc: 'Regras 32 a 35 do RIPEAM: Apitos de manobra, ultrapassagem, curva de rio e sinais em visibilidade restrita (sinos e gongos).',
              rule: 'RIPEAM Regras 32 a 35'
            },
            {
              id: 'dhn-bombordo',
              title: 'Sinais de Bombordo (Verde)',
              code: 'IALA Região B',
              src: './images/dhn/sinais-bombordo-iala-b.webp',
              desc: 'Morfologia dos sinais de bombordo: Boia cilíndrica (can), boia pilar e baliza/estaca (spar) com tope cilíndrico.',
              rule: 'Sistema IALA B'
            },
            {
              id: 'dhn-boreste',
              title: 'Sinais de Boreste (Encarnado)',
              code: 'IALA Região B',
              src: './images/dhn/sinais-boreste-iala-b.webp',
              desc: 'Morfologia dos sinais de boreste: Boia cônica, boia pilar e baliza/estaca (spar) com tope cônico com vértice para cima.',
              rule: 'Sistema IALA B'
            }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setDhnModal(item)}
              className="p-3 rounded-2xl bg-navy-950 border border-navy-800 hover:border-gold-500/50 hover:bg-navy-900 transition-all text-left group flex flex-col justify-between gap-2 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-extrabold text-gold-400 mb-1">
                  <span>{item.code}</span>
                  <Maximize2 className="w-3 h-3 text-slate-400 group-hover:text-gold-400 transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-gold-300 leading-snug line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <span className="text-[10px] text-sky-400 font-semibold inline-flex items-center gap-1">
                <span>Ver Cartaz em HD</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Visualizador de Cartazes DHN em Alta Definicao */}
      {dhnModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-4 md:p-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-navy-700 pb-3 mb-3">
            <div>
              <span className="text-xs font-extrabold text-gold-400 uppercase tracking-wider">
                {dhnModal.code} — {dhnModal.rule}
              </span>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                {dhnModal.title}
              </h3>
              <p className="text-xs text-slate-300">{dhnModal.desc}</p>
            </div>
            <button
              onClick={() => setDhnModal(null)}
              className="p-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-slate-950/80 rounded-2xl border border-navy-800 flex items-center justify-center p-2 relative">
            <img
              src={dhnModal.src}
              alt={dhnModal.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Diretoria de Hidrografia e Navegação — Marinha do Brasil</span>
            <button
              onClick={() => setDhnModal(null)}
              className="px-4 py-1.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow hover:bg-gold-400"
            >
              Fechar Visualização
            </button>
          </div>
        </div>
      )}

      {/* Concepts List */}
      <div className="space-y-4">
        {activeConcepts.map((concept) => {
          const isExpanded = expandedConceptId === concept.id || searchQuery.trim().length > 0;

          return (
            <div
              key={concept.id}
              className="bg-navy-900/90 border border-navy-700/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 transition-all hover:border-navy-600"
            >
              {/* Card Title Header */}
              <div
                onClick={() => setExpandedConceptId(isExpanded ? null : concept.id)}
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-400">
                    {concept.subtitle}
                  </span>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-100 flex items-center gap-2">
                    {concept.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-0.5">
                    {concept.summary}
                  </p>
                </div>

                <button className="p-2 rounded-xl bg-navy-950 text-slate-400 hover:text-slate-200 flex-shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="space-y-5 pt-2 border-t border-navy-800 animate-fade-in">
                  {/* Visual Illustration if available */}
                  {concept.illustration && (
                    <div className="my-3">
                      <NauticalIllustration type={concept.illustration} showLabel={true} />
                    </div>
                  )}

                  {/* Sound Trigger if available */}
                  {concept.soundSignal && (
                    <div className="bg-sky-950/40 border border-sky-500/30 p-4 rounded-2xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Volume2 className="w-5 h-5 text-sky-400 animate-pulse" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-100">Exemplo Sonoro de Apito</h4>
                          <span className="text-[11px] text-sky-300">{concept.soundLabel || 'Sinal Sonoro RIPEAM'}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handlePlaySound(concept.soundSignal!)}
                        disabled={isPlayingAudio === concept.soundSignal}
                        className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-navy-950 font-extrabold text-xs rounded-xl shadow active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlayingAudio === concept.soundSignal ? 'Emitindo Som...' : 'Tocar Apito'}</span>
                      </button>
                    </div>
                  )}

                  {/* Key Bullet Points */}
                  <div className="bg-navy-950/70 border border-navy-800/80 p-4 md:p-5 rounded-2xl space-y-2.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Regras Essenciais & Procedimentos Práticos
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-200">
                      {concept.bulletPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed pl-2 border-l-2 border-gold-500/40">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gold Exam Tip */}
                  <div className="bg-gradient-to-r from-gold-500/10 via-navy-950 to-navy-950 border border-gold-500/40 p-4 rounded-2xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-gold-400 font-extrabold text-xs uppercase tracking-wider">
                      <Award className="w-4 h-4" />
                      <span>Dica de Ouro para a Prova da Marinha</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {concept.examTip}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1">
                      Fundamento: <strong className="text-slate-300">{concept.normReference}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to Exam */}
      <div className="bg-gradient-to-r from-navy-800 via-navy-850 to-navy-800 border border-gold-500/40 p-6 md:p-8 rounded-3xl text-center space-y-4 shadow-2xl">
        <h3 className="text-xl md:text-2xl font-black text-slate-100">
          Sentindo-se preparado para testar seus conhecimentos?
        </h3>
        <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto">
          Faça um Simulado Oficial no padrão da Capitania dos Portos: 40 questões balanceadas pela matriz de conhecimento e cronômetro de 120 minutos.
        </p>
        <button
          onClick={onGoToExam}
          className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 text-navy-950 font-black text-sm rounded-2xl shadow-xl shadow-gold-500/25 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Iniciar Simulado Oficial de 40 Questões</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
