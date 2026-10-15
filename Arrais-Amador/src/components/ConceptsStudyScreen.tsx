import React, { useState } from 'react';
import { Compass, Anchor, ShieldCheck, Flame, BookOpen, Volume2, Award, ArrowRight, Search, CheckCircle2, ChevronDown, ChevronUp, Ship } from 'lucide-react';
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
    { id: 'RIPEAM', title: '1. RIPEAM (Manobras & Luzes)', icon: <Compass className="w-5 h-5 text-sky-400" />, color: 'sky' },
    { id: 'Balizamento', title: '2. Balizamento IALA Região B', icon: <Anchor className="w-5 h-5 text-emerald-400" />, color: 'emerald' },
    { id: 'Legislação Náutica', title: '3. Legislação & NORMAM-211', icon: <ShieldCheck className="w-5 h-5 text-amber-400" />, color: 'amber' },
    { id: 'Manobra, Atracação e Fundeio', title: '4. Manobra & Fundeio', icon: <Anchor className="w-5 h-5 text-indigo-400" />, color: 'indigo' },
    { id: 'Primeiros Socorros, Salvatagem e Incêndio', title: '5. Salvatagem & Incêndio', icon: <Flame className="w-5 h-5 text-rose-400" />, color: 'rose' },
    { id: 'Motonauta', title: '6. Motonauta (Jet-Ski / NORMAM-212)', icon: <Ship className="w-5 h-5 text-cyan-400" />, color: 'cyan' },
  ];

  const conceptsData: Record<OfficialCategory, ConceptItem[]> = {
    'RIPEAM': [
      {
        id: 'c-ripeam-preferencia',
        title: 'Hierarquia e Preferência de Passagem entre Embarcações',
        subtitle: 'Regra 18 do RIPEAM',
        summary: 'Nem todas as embarcações possuem a mesma capacidade de manobra. A regra geral estabelece quem deve ceder passagem a quem.',
        bulletPoints: [
          '1º lugar (Máxima preferência): Embarcação SEM GOVERNO (avariada, sem propulsão/leme).',
          '2º lugar: Embarcação com CAPACIDADE DE MANOBRA RESTRITA (dragas, lançando cabos, navios de pesquisa).',
          '3º lugar: Embarcação CONDICIONADA PELO SEU CALADO (em canais estreitos).',
          '4º lugar: Embarcação em fainas de PESCA (com redes/linhas na água).',
          '5º lugar: Embarcação a VELA (veleiros sem motor acionado).',
          '6º lugar (Menor preferência): Embarcação de PROPULSÃO MECÂNICA (lanchas, barcos a motor).',
          '7º lugar: Hidroaviões e WIGs na água devem se manter fora do caminho de todas as embarcações.'
        ],
        normReference: 'RIPEAM-72 Regra 18',
        examTip: 'Um veleiro NAVEGANDO A MOTOR perde a preferência de barco a vela e passa a ser considerado embarcação a propulsão mecânica!'
      },
      {
        id: 'c-ripeam-roda-a-roda',
        title: 'Situação de "Roda a Roda" (Proa com Proa)',
        subtitle: 'Regra 14 do RIPEAM',
        summary: 'Quando duas embarcações a propulsão mecânica se aproximam em rumos diretamente opostos com risco de abalroamento.',
        bulletPoints: [
          'Manobra Obrigatória: AMBAS DEVEM GUINAR PARA BORESTE (direita).',
          'Passagem: Passam bombordo com bombordo (esquerda com esquerda).',
          'À noite: Ambas avistam a luz de mastro e AMBAS AS LUZES DE BORDOS (verde e vermelha) uma da outra.'
        ],
        normReference: 'RIPEAM-72 Regra 14',
        examTip: 'Cuidado com pegadinhas: nunca guine para bombordo em situação de roda a roda!',
        illustration: 'maneuver_head_on'
      },
      {
        id: 'c-ripeam-rumos-cruzados',
        title: 'Situação de Rumos Cruzados',
        subtitle: 'Regra 15 do RIPEAM',
        summary: 'Quando duas embarcações a propulsão mecânica cruzam seus caminhos com risco de colisão.',
        bulletPoints: [
          'Regra de Ouro: A embarcação que AVISTAR A OUTRA PELO SEU BORESTE (direita) DEVE MANOBRAR e manter-se fora do caminho.',
          'A embarcação obrigada a manobrar deve evitar cruzar a proa da outra.',
          'Mnemônico Noturno: Quem vê a luz verde (boreste da outra) tem preferência e segue o rumo; quem vê a luz encarnada (bombordo da outra) deve manobrar!'
        ],
        normReference: 'RIPEAM-72 Regra 15',
        examTip: 'A embarcação com preferência deve manter seu rumo e velocidade, mas DEVE MANOBRAR caso a outra não o faça para evitar o acidente.',
        illustration: 'maneuver_crossing'
      },
      {
        id: 'c-ripeam-alcancado',
        title: 'Situação de Ultrapassagem (Alcançado)',
        subtitle: 'Regra 13 do RIPEAM',
        summary: 'Toda embarcação que se aproxima de outra vindo de uma direção a mais de 22,5° a ré do seu través.',
        bulletPoints: [
          'A EMBARCAÇÃO ALCANÇADA SEMPRE TEM PREFERÊNCIA.',
          'A embarcação ALCANÇADORA (que ultrapassa) deve manobrar e se manter afastada até que a ultrapassagem esteja 100% concluída.',
          'À noite, a embarcação alcançadora avista APENAS a luz branca de alcançado (popa) da outra, sem ver as luzes de bordos.'
        ],
        normReference: 'RIPEAM-72 Regra 13',
        examTip: 'Mesmo que um veleiro esteja alcançando uma lancha a motor, o veleiro alcançador DEVE MANOBRAR para dar passagem!',
        illustration: 'maneuver_overtaking'
      },
      {
        id: 'c-ripeam-luzes',
        title: 'Luzes de Navegação e Arcos de Visibilidade',
        subtitle: 'Regra 21 do RIPEAM',
        summary: 'Luzes regulamentares que devem ser exibidas do pôr ao nascer do sol e em períodos de visibilidade restrita.',
        bulletPoints: [
          'Luz de Mastro: Branca, setor horizontal de 225° voltada para a proa (vante).',
          'Luz de BORESTE: VERDE, setor horizontal de 112,5° voltada para o bordo direito.',
          'Luz de BOMBORDO: ENCARNADA (Vermelha), setor de 112,5° voltada para o bordo esquerdo.',
          'Luz de Alcançado (Popa): Branca, setor horizontal de 135° voltada para a ré.',
          'Luz de Fundeio: Branca, visível em 360° (circular em todo o horizonte).'
        ],
        normReference: 'RIPEAM-72 Regra 21 e 22',
        examTip: 'A soma dos arcos de bordos (112,5° + 112,5°) é igual ao arco da luz de mastro (225°)! E 225° + 135° (alcançado) = 360°!',
        illustration: 'nav_lights'
      },
      {
        id: 'c-ripeam-marcas',
        title: 'Marcas Diurnas de Navegação',
        subtitle: 'Regras 27 e 30 do RIPEAM',
        summary: 'Símbolos pretos geométricos exibidos durante o dia para sinalizar a condição operacional da embarcação.',
        bulletPoints: [
          'Embarcação FUNDEADA: 1 Esfera Preta (balão preto) a vante.',
          'Embarcação SEM GOVERNO: 2 Esferas Pretas verticais sobrepostas (●●).',
          'Embarcação com CAPACIDADE DE MANOBRA RESTRITA: Esfera / Losango / Esfera (● ♦ ●).',
          'Embarcação ENCALHADA: 3 Esferas Pretas verticais sobrepostas (●●●).',
          'Veleiro navegando A MOTOR: 1 Cone Preto apontado para baixo (▼).'
        ],
        normReference: 'RIPEAM-72 Regras 27 e 30',
        examTip: 'Atenção especial: 1 esfera preta = fundeada; 2 esferas pretas = sem governo!',
        illustration: 'day_shape_anchored'
      },
      {
        id: 'c-ripeam-apitos',
        title: 'Sinais Sonoros de Manobra e Advertência',
        subtitle: 'Regra 34 do RIPEAM',
        summary: 'Apitos sonoros emitidos por apito ou buzina náutica para comunicar ações e intenções imediatas.',
        bulletPoints: [
          '1 Apito Curto (• / 1 seg): "Estou guinando para BORESTE (direita)".',
          '2 Apitos Curtos (••): "Estou guinando para BOMBORDO (esquerda)".',
          '3 Apitos Curtos (•••): "Estou DANDO ATRÁS (marcha a ré)".',
          '5 ou mais Apitos Curtos e Rápidos: "SINAL DE DÚVIDA / PERIGO (não entendi sua manobra)".',
          '1 Apito Longo (— / 4 a 6 seg): Curvas cegas em rios/canais estreitos.',
          'Cerração (Em movimento): 1 Apito Longo a cada 2 minutos.',
          'Cerração (Máquinas paradas): 2 Apitos Longos a cada 2 minutos.'
        ],
        normReference: 'RIPEAM-72 Regra 34 e 35',
        examTip: 'Toque nos botões de áudio abaixo para ouvir e memorizar os sons reais de cada apito!',
        soundSignal: 'short_1',
        soundLabel: '1 Apito Curto (Boreste)'
      }
    ],

    'Balizamento': [
      {
        id: 'c-baliz-conceito',
        title: 'Sistema IALA Região B (Adotado no Brasil)',
        subtitle: 'Sentido Convencional de Balizamento',
        summary: 'O balizamento marítimo e fluvial no Brasil segue a Região B da IALA. O sentido de referência é quem ENTRA DO MAR PARA O PORTO (subindo o rio).',
        bulletPoints: [
          'Sentido Convencional: Da foz para a nascente / Do mar aberto para o interior do porto.',
          'Sinal Lateral de BORESTE: Cor VERDE, formato cônico/pilar, tope cone verde apontado para cima (▲).',
          'Sinal Lateral de BOMBORDO: Cor ENCARNADA (vermelha), formato cilíndrico/cego, tope cilindro encarnado (█).',
          'Ao ENTRAR no porto: Deixe os sinais VERDES a boreste (direita) e ENCARNADOS a bombordo (esquerda).',
          'Ao SAIR do porto: A regra se inverte visualmente!'
        ],
        normReference: 'Manual de Balizamento IALA B / NORMAM-211',
        examTip: 'Mnemônico infalível: "Entrando no porto no Brasil, verde na direita (boreste) e vermelho na esquerda (bombordo)".',
        illustration: 'buoy_starboard'
      },
      {
        id: 'c-baliz-perigo-isolado',
        title: 'Sinal de Perigo Isolado',
        subtitle: 'Obstáculo Pontual com Água Navegável ao Redor',
        summary: 'Indica um perigo localizado (pedra, casco soçobrado) que possui águas seguras e navegáveis em toda a sua volta.',
        bulletPoints: [
          'Cores: PRETA com uma ou mais faixas horizontais ENCARNADAS.',
          'Tope: DUAS ESFERAS PRETAS sobrepostas na vertical (●●).',
          'Luz Noturna: Branca lampejante em grupo de 2 lampejos [Fl(2)].',
          'Formato: Pilar ou charuto.'
        ],
        normReference: 'Sistema IALA B',
        examTip: 'Tope com 2 esferas pretas no balizamento = PERIGO ISOLADO (grupo de 2 lampejos brancos).',
        illustration: 'buoy_isolated_danger'
      },
      {
        id: 'c-baliz-aguas-seguras',
        title: 'Sinal de Águas Seguras',
        subtitle: 'Meio de Canal e Entrada de Barra',
        summary: 'Indica que há águas navegáveis e profundas em todo o seu redor (ex: início de aproximação de barra).',
        bulletPoints: [
          'Cores: FAIXAS VERTICAIS ENCARNADAS E BRANCAS.',
          'Tope: UMA ESFERA ENCARNADA única (●).',
          'Luz Noturna: Branca (isofásica, ocultação ou letra "A" em código Morse: • —).'
        ],
        normReference: 'Sistema IALA B',
        examTip: 'Não confunda: faixas verticais vermelhas e brancas = ÁGUAS SEGURAS; faixas horizontais pretas e vermelhas = PERIGO ISOLADO.',
        illustration: 'buoy_safe_water'
      },
      {
        id: 'c-baliz-cardinais',
        title: 'Sinais Cardinais (Norte, Sul, Leste, Oeste)',
        subtitle: 'Quadrantes Seguros de Navegação',
        summary: 'Indica o quadrante a partir do sinal onde se encontram as águas mais profundas e seguras.',
        bulletPoints: [
          'CARDINAL NORTE (N): 2 Cones pretos para CIMA (▲▲). Cores: Preto em cima, Amarelo embaixo. Luz: Lampejos brancos contínuos muito rápidos.',
          'CARDINAL SUL (S): 2 Cones pretos para BAIXO (▼▼). Cores: Amarelo em cima, Preto embaixo. Luz: 6 lampejos rápidos + 1 longo (relógio 6h).',
          'CARDINAL LESTE (E): Cones unidos pelas BASES (▲▼). Cores: Preto com faixa amarela. Luz: 3 lampejos rápidos (relógio 3h).',
          'CARDINAL OESTE (W): Cones unidos pelos VÉRTICES (▼▲). Cores: Amarelo com faixa preta. Luz: 9 lampejos rápidos (relógio 9h).'
        ],
        normReference: 'Sistema IALA B',
        examTip: 'Lembre-se do mostrador do relógio analógico para as luzes: Leste = 3h (3 flashes), Sul = 6h (6 flashes + 1 longo), Oeste = 9h (9 flashes), Norte = 12h (contínuo)!',
        illustration: 'buoy_cardinal'
      },
      {
        id: 'c-baliz-preferencial',
        title: 'Sinais de Canal Preferencial (Bifurcação)',
        subtitle: 'Canal Principal à Direita ou Esquerda',
        summary: 'Indica a existência de uma bifurcação e qual dos dois canais é a rota recomendada/preferencial.',
        bulletPoints: [
          'Canal Preferencial a BORESTE: Boia VERDE com faixa ENCARNADA horizontal no centro. Tope cone verde. Luz verde Fl(2+1).',
          'Canal Preferencial a BOMBORDO: Boia ENCARNADA com faixa VERDE horizontal no centro. Tope cilindro vermelho. Luz vermelha Fl(2+1).'
        ],
        normReference: 'Sistema IALA B',
        examTip: 'A cor dominante da boia indica o bordo do canal preferencial!',
        illustration: 'buoy_preferred_channel'
      }
    ],

    'Legislação Náutica': [
      {
        id: 'c-legis-categorias',
        title: 'Categorias de Amadores e Limites de Navegação',
        subtitle: 'NORMAM-211/DPC Atualizada 2026',
        summary: 'A Carteira de Habilitação de Amador (CHA) habilita o cidadão a conduzir embarcações de esporte e recreio em caráter não-comercial.',
        bulletPoints: [
          '1. Veleiro (VLA): Embarcações a vela sem motor nos limites da navegação interior.',
          '2. Motonauta (MTA): Exclusivo para conduzir MOTO AQUÁTICA (jet-ski) em navegação interior.',
          '3. ARRAIS-AMADOR (ARA): Embarcações a motor nos limites da NAVEGAÇÃO INTERIOR (rios, lagos, represas, canais, baías e enseadas), EXCETO moto aquática!',
          '4. Mestre-Amador (MSA): Navegação COSTEIRA (até 20 milhas náuticas da costa).',
          '5. Capitão-Amador (CPA): Navegação OCEÂNICA / ALTO-MAR (sem limite de afastamento).'
        ],
        normReference: 'NORMAM-211/DPC (Atualização Portaria DPC 200/2026)',
        examTip: 'PEGADINHA CLÁSSICA: O Arrais-Amador NÃO está habilitado para pilotar jet-ski sem possuir a categoria de Motonauta na CHA!'
      },
      {
        id: 'c-legis-documentos',
        title: 'Documentos Obrigatórios a Bordo',
        subtitle: 'Fiscalização da Inspeção Naval',
        summary: 'Quais documentos devem ser mantidos e apresentados aos agentes da Capitania dos Portos durante a navegação.',
        bulletPoints: [
          '1. CHA (Carteira de Habilitação de Amador): Do condutor, válida (formato físico ou digital pelo Gov.br).',
          '2. TIE ou TIEM: Título de Inscrição da Embarcação emitido pela Capitania/Delegacia.',
          '3. Comprovante do Seguro Obrigatório (DPEM, quando exigível).',
          'Atenção: A regularidade da embarcação (TIE) é responsabilidade do PROPRIETÁRIO; a condução legal e segura é responsabilidade do CONDUTOR.'
        ],
        normReference: 'LESTA Lei 9.537/97 / NORMAM-211',
        examTip: 'CHA digital no aplicativo do Gov.br possui a mesma validade jurídica do documento impresso conforme a atualização 2026.'
      },
      {
        id: 'c-legis-penalidades',
        title: 'Infrações e Penalidades Administrativas',
        subtitle: 'LESTA (Lei 9.537/97) e RLESTA (Decreto 2.596/98)',
        summary: 'Sanções aplicadas pela Autoridade Marítima no caso de descumprimento das regras de segurança aquaviária.',
        bulletPoints: [
          'Penalidades principais: Multa, Suspensão da CHA (até 120 dias) e Cancelamento da CHA.',
          'Conduzir em estado de EMBRIAGUEZ ou sob efeito de substâncias tóxicas: Multa e suspensão da CHA por até 120 dias; reincidência acarreta cancelamento da CHA.',
          'Medidas Administrativas imediatas da fiscalização: Apreensão da embarcação, Retenção da embarcação e Interrupção da singradura.'
        ],
        normReference: 'LESTA Art. 16 a 22 / RLESTA',
        examTip: 'Não confunda penalidade (decisão de processo administrativo) com medida administrativa (ação preventiva no ato da abordagem).'
      }
    ],

    'Manobra, Atracação e Fundeio': [
      {
        id: 'c-manob-espias',
        title: 'Espias e Cabos de Amarração no Cais',
        subtitle: 'Arte Naval e Manobras de Porto',
        summary: 'Cabos utilizados para prender a embarcação com segurança ao cais ou píer flutuante.',
        bulletPoints: [
          'Lançamento de Vante: Cabo da proa dizendo para vante (impede o navio de recuar).',
          'Lançamento de Ré: Cabo da popa dizendo para ré (impede o navio de avançar).',
          'Espringue de Vante: Cabo da proa dizendo para ré.',
          'Espringue de Ré: Cabo da popa dizendo para vante.',
          'Través de Vante e Ré: Cabos perpendiculares ao cais (impedem a embarcação de se afastar lateralmente).'
        ],
        normReference: 'Manual de Arte Naval',
        examTip: 'Para atracar com correnteza, a melhor aproximação é SEMPRE contra a correnteza (montante), para manter controle do leme.'
      },
      {
        id: 'c-manob-helice',
        title: 'Efeitos de Leme e Rotação do Hélice',
        subtitle: 'Hélice de Passo Direito (Rotação Horária em Marcha Avante)',
        summary: 'Comportamento da proa e popa dependendo da rotação do hélice e da marcha selecionada.',
        bulletPoints: [
          'Hélice de Passo Direito em MARCHA AVANTE: A popa tende levemente para boreste e a proa para bombordo.',
          'Hélice de Passo Direito em MARCHA A RÉ: Efeito acentuado! A popa guina com força para BOMBORDO e a proa para BORESTE.',
          'Em marcha a ré com velocidade zero, o leme tem pouca eficácia até o navio ganhar seguimento a ré.'
        ],
        normReference: 'Manobras de Embarcações',
        examTip: 'Em prova da Capitania: "Hélice de passo direito dando atrás, a popa vai para bombordo e a proa vai para boreste lentamente".'
      },
      {
        id: 'c-manob-fundeio',
        title: 'Fundeio e Amarras (Âncoras)',
        subtitle: 'Técnicas de Lançamento e Tipos de Ferros',
        summary: 'Como imobilizar a embarcação com segurança no fundo do corpo hídrico.',
        bulletPoints: [
          'Comprimento de cabo/corrente recomendado: De 3 a 5 vezes a profundidade do local (em mau tempo, até 7 vezes).',
          'Manobra de fundear: Aproe ao vento/corrente, corte o seguimento a vante e largue o ferro enquanto a embarcação dá marcha a ré lenta para "unhar" a âncora.',
          'Tipos de âncoras comuns: Danforth (areia/lama), Bruce (universal), Arado (CQR) e Almirantado.'
        ],
        normReference: 'Arte Naval / Fundeio',
        examTip: 'Nunca lance a âncora navegando em velocidade para a frente, sob risco de danificar o casco ou capotar a embarcação!'
      }
    ],

    'Primeiros Socorros, Salvatagem e Incêndio': [
      {
        id: 'c-cbinc-classes',
        title: 'Classes de Incêndio e Extintores Recomendados',
        subtitle: 'Combate a Incêndio a Bordo (CBINC)',
        summary: 'A escolha do extintor correto depende diretamente da natureza do combustível em chamas.',
        bulletPoints: [
          'CLASSE A (Materiais Sólidos que deixam cinzas: madeira, tecido, papel, fibra): Extintor de ÁGUA PRESSURIZADA ou ESPUMA (resfriamento).',
          'CLASSE B (Líquidos Inflamáveis: gasolina, óleo diesel, solventes, tintas): Extintor de PÓ QUÍMICO SECO (PQS), CO2 ou ESPUMA (abafamento).',
          'CLASSE C (Equipamentos Elétricos Energizados: baterias, painéis, geradores): Extintor de GÁS CARBÔNICO (CO2) ou PÓ QUÍMICO.',
          'REGRA CRÍTICA: NUNCA USAR ÁGUA EM INCÊNDIO CLASSE C! A água conduz eletricidade e causará choque fatal!'
        ],
        normReference: 'CBINC / NORMAM-211',
        examTip: 'Atenção máxima: fogo em painel elétrico = CLASSE C (usar CO2 ou Pó; água é terminantemente proibida).',
        illustration: 'fire_triangle'
      },
      {
        id: 'c-prisoc-rcp',
        title: 'Reanimação Cardiopulmonar (RCP) e Primeiros Socorros',
        subtitle: 'Protocolo de Suporte Básico de Vida',
        summary: 'Procedimento imediato em caso de parada cardiorrespiratória (vítima inconsciente e sem respirar).',
        bulletPoints: [
          'Protocolo Oficial: 30 COMPRESSÕES TORÁCICAS para 2 VENTILAÇÕES (relação 30:2).',
          'Frequência de compressão: 100 a 120 compressões por minuto no terço inferior do esterno.',
          'Profundidade: 5 a 6 cm no adulto.',
          'Queimaduras de 1º/2º grau: Lavar apenas com água corrente limpa e fria. NUNCA aplicar pasta de dente, manteiga ou gelo.',
          'Hemorragias graves: Compressão direta com pano limpo e elevação do membro.'
        ],
        normReference: 'Manual de Primeiros Socorros Marinha (PRISOC)',
        examTip: 'Relação de RCP na prova da Marinha é SEMPRE 30:2!'
      },
      {
        id: 'c-salvat-homem-mar',
        title: 'Procedimentos de Homem ao Mar e Salvatagem',
        subtitle: 'Equipamentos de Segurança Obrigatórios',
        summary: 'Ações imediatas para resgate de tripulante que caiu nas águas.',
        bulletPoints: [
          '1ª Ação Imediata: Lançar a boia circular com retinida/fumígeno para o bordo da queda e GRITAR "Homem ao mar!".',
          'Vigilância: NUNCA perder a vítima de vista (designar um tripulante com foco exclusivo nela).',
          'Bandeira no mastro: Içar a BANDEIRA OSCAR (dividida diagonalmente em vermelho e amarelo).',
          'Coletes Salva-Vidas: Devem estar em local acessível e de fácil visualização (nunca amarrados ou trancados em baús).'
        ],
        normReference: 'Salvatagem Náutica / NORMAM-211',
        examTip: 'A bandeira internacional que sinaliza Homem ao Mar é a Bandeira "OSCAR" (letra O).'
      }
    ],
    'Motonauta': [
      {
        id: 'c-motonauta-regras-basicas',
        title: 'Regras Fundamentais de Segurança para Motonautas',
        subtitle: 'NORMAM-212/DPC e NORMAM-211',
        summary: 'Diretrizes legais e de tráfego para a condução segura de motos aquáticas (jet-skis) em águas nacionais.',
        bulletPoints: [
          'Distância de Praias: É PROIBIDO navegar a menos de 200 metros da arrebentação de praias ou áreas de banhistas.',
          'Aproximação/Saída de Praias: Estritamente em canal balizado, em velocidade de segurança (até 3 nós) e perpendicular (90°) à praia.',
          'Navegação Noturna: É TERMINANTEMENTE PROIBIDA a navegação de motos aquáticas à noite (do pôr ao nascer do sol).',
          'Chave de Corte (Lanyard): OBRIGATÓRIA e presa permanentemente ao corpo ou colete do condutor.',
          'Colete Salva-Vidas: Uso PERMANENTE e VESTIDO por todos os ocupantes (homologado pela DPC).',
          'Idade e Habilitação: Mínimo 18 anos e carteira MTA (Motonauta) ou ARA/superior com averbação MTA.'
        ],
        normReference: 'NORMAM-212/DPC Art. 0110 a 0116',
        examTip: 'Atenção máxima: o jet-ski depende do jato do motor para virar! Se você soltar totalmente o acelerador, PERDE O GOVERNO (capacidade de manobra) imediatamente.'
      },
      {
        id: 'c-motonauta-passageiros-reboque',
        title: 'Transporte de Passageiros e Reboque de Esportes',
        subtitle: 'Limites de Lotação e Cuidados Especiais',
        summary: 'Exigências regulamentares para transporte de terceiros e reboque de boias/esqui.',
        bulletPoints: [
          'Crianças: Proibido menores de 7 anos. Acima de 7 anos, devem conseguir apoiar os pés e segurar-se na garupa.',
          'Posição do Passageiro: SEMPRE atrás do piloto (na garupa). NUNCA à frente do piloto entre o corpo e o guidão.',
          'Reboque de Bóias/Esqui: Exige jet-ski com capacidade mínima de 3 lugares + retrovisores ou observador para a ré.',
          'Capotamento: Desvirar a moto aquática exclusivamente no sentido indicado pelo fabricante na popa (evita calço hidráulico no motor).',
          'Alcoolemia: TOLERÂNCIA ZERO (LESTA Lei 9.537/97).'
        ],
        normReference: 'NORMAM-212/DPC e NORMAM-211 Cap. 1 e 4',
        examTip: 'Em caso de capotamento da moto aquática, consulte o adesivo na popa antes de girá-la na água!'
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
          Apostila Interativa de Conceitos Náuticos
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-100 tracking-tight">
          Aprenda a Teoria Antes de Fazer o Simulado
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Navegue pelos módulos estruturados, confira esquemas visuais didáticos, ouça os sinais sonoros e domine as normas da Marinha do Brasil.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setExpandedConceptId(null);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-b from-navy-800 to-navy-750 border-gold-500 ring-2 ring-gold-500/30 shadow-lg'
                  : 'bg-navy-900/80 border-navy-700/80 hover:bg-navy-800/60'
              }`}
            >
              <div className="p-2 rounded-xl bg-navy-950/80 border border-navy-800 w-fit">
                {cat.icon}
              </div>
              <span className={`text-xs font-extrabold leading-snug ${isSelected ? 'text-gold-400' : 'text-slate-200'}`}>
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
            placeholder="Pesquisar conceito ou norma..."
            className="w-full bg-navy-950 border border-navy-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onStartPractice(selectedCategory === 'ALL' ? 'RIPEAM' : selectedCategory as OfficialCategory)}
            className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 text-navy-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>{selectedCategory === 'ALL' ? 'Praticar Questões (Simulado Completo)' : 'Praticar Questões deste Módulo'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

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
                      Regras Essenciais & Procedimentos
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
          Faça um Simulado no formato exigido pela Capitania dos Portos: 40 questões balanceadas pela matriz da prova e cronômetro de 120 minutos.
        </p>
        <button
          onClick={onGoToExam}
          className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 text-navy-950 font-black text-sm rounded-2xl shadow-xl shadow-gold-500/25 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Iniciar Simulado no Formato da Capitania</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
