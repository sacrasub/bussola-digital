import fs from 'fs';
import path from 'path';

const questionsPath = path.resolve('public/data/questions.json');
const currentQuestions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

console.log(`Questões antes da integração: ${currentQuestions.length}`);

// As 40 questões formuladas pedagogicamente com padrão oficial, sem citar capitanias específicas ou códigos de prova:
const examQuestions = [
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais Sonoros',
    question: 'Em situação de manobra no visual com outra embarcação, o que significam exatamente dois (2) apitos curtos emitidos por uma embarcação de propulsão mecânica?',
    options: [
      'Estou dando máquinas atrás (marcha a ré)',
      'Estou guinando para bombordo (esquerda)',
      'Estou guinando para boreste (direita)',
      'Estou dando máquinas adiante com velocidade máxima',
      'Estou parando minhas máquinas em emergência'
    ],
    correctIndex: 1,
    explanation: 'De acordo com a Regra 34(a) do RIPEAM-72, em situação de visibilidade mútua, um apito curto significa "estou guinando para boreste", dois apitos curtos significam "estou guinando para bombordo" e três apitos curtos significam "estou dando atrás".',
    normReference: 'RIPEAM-72 Regra 34(a) / Apostila Unidade 3 pág. 33'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais Sonoros em Visibilidade Restrita',
    question: 'Sob nevoeiro, chuva torrencial ou cerração (visibilidade restrita), a emissão de um apito longo em intervalos não superiores a dois (2) minutos identifica:',
    options: [
      'Embarcação fundeada advertindo navio que se aproxima',
      'Embarcação parada e sem seguimento na água',
      'Embarcação rebocando outra embarcação em canal restrito',
      'Embarcação de propulsão mecânica com seguimento navegando na água',
      'Embarcação sem governo parada à deriva'
    ],
    correctIndex: 3,
    explanation: 'Conforme a Regra 35(a) do RIPEAM-72, uma embarcação de propulsão mecânica com seguimento através da água deverá soar a intervalos não superiores a 2 minutos um apito longo. Se estivesse parada sem seguimento, soaria dois apitos longos.',
    normReference: 'RIPEAM-72 Regra 35(a) / Apostila Unidade 3 pág. 34'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Definições Gerais',
    question: 'Para efeitos de aplicação das regras de manobra e preferência do RIPEAM, como é legalmente definida uma "embarcação a vela"?',
    options: [
      'Qualquer embarcação sob vela desde que sua máquina de propulsão, se houver, não esteja em uso',
      'Qualquer embarcação que possua mastros e velas instalados, mesmo operando o motor de centro',
      'Exclusivamente barcos à vela que participem de regatas oficiais em áreas abrigadas',
      'Qualquer veleiro navegando em mar aberto, independentemente do uso concomitante de propulsão mecânica',
      'Embarcações sem cabine com propulsão híbrida operando simultaneamente vela e motor'
    ],
    correctIndex: 0,
    explanation: 'A Regra 3(c) do RIPEAM estabelece que o termo "embarcação a vela" designa qualquer embarcação sob vela, desde que a máquina de propulsão, se houver, não esteja em uso. Se ligar o motor, equipara-se a embarcação a motor.',
    normReference: 'RIPEAM-72 Regra 3(c) / Apostila Unidade 3 pág. 26'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Balizamento Fluvial',
    question: 'Na sinalização cega fixa de vias navegáveis interiores (hidrovias e rios), qual o significado de um painel exibindo o símbolo gráfico de uma cruz ("+")?',
    options: [
      'Recomendação para trocar imediatamente de margem',
      'Bifurcação de canal navegável adiante',
      'Indicação de manter a navegação junto à margem',
      'Seguir a navegação exatamente a meio do canal',
      'Sinal de Perigo Isolado, alertando sobre risco à navegação no local'
    ],
    correctIndex: 4,
    explanation: 'No Regulamento Único de Balizamento Fluvial e Lacustre, o sinal visual cego fixo exibindo o símbolo de uma cruz "+" (frequentemente inscrito em painéis circulares pretos) representa PERIGO ISOLADO.',
    normReference: 'Balizamento Fluvial / Apostila Anexos pág. 70 e 71'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Canal Preferencial',
    question: 'Aproximando-se de uma bifurcação de canal no Sistema IALA B, o navegante identifica uma boia que indica que o canal preferencial (maior profundidade) situa-se a seu BORESTE. Quais são as cores e padrão visual desta boia?',
    options: [
      'Encarnada com uma faixa horizontal amarela no centro',
      'Encarnada com uma faixa horizontal verde no centro',
      'Preta com faixas horizontais amarelas',
      'Verde com uma faixa horizontal encarnada no centro',
      'Amarela e preta com faixas verticais alternadas'
    ],
    correctIndex: 3,
    explanation: 'No Sistema IALA Região B (Brasil), o canal preferencial a BORESTE é sinalizado por boia verde com faixa horizontal encarnada e tope cônico verde. Se o canal preferencial fosse a bombordo, a boia seria encarnada com faixa verde.',
    normReference: 'Sistema IALA B / Apostila Unidade 3 pág. 35'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Espias e Amarração',
    question: 'Como é denominada a espia (cabo de amarração) passada do centro ou bordo da embarcação que sai perpendicularmente em direção ao cais, impedindo o afastamento lateral?',
    options: [
      'Través',
      'Espringue de popa',
      'Lançante de proa',
      'Alheta',
      'Retinida flutuante'
    ],
    correctIndex: 0,
    explanation: 'O Través é a espia passada do meio (ou bordos) perpendicularmente ao cais, sem inclinação a vante ou a ré. Sua função é impedir que a embarcação se afaste transversalmente do cais.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 19'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Nomenclatura do Casco',
    question: 'Assinale a alternativa que correlaciona corretamente as posições e bordos relativos de uma embarcação para quem está a bordo olhando da popa para a proa:',
    options: [
      'Boreste é o lado direito, Bombordo é o lado esquerdo, Avante fica na frente e a Ré fica atrás',
      'Boreste é o lado esquerdo, Bombordo é o lado direito, Avante fica na frente e a Ré fica atrás',
      'Alheta é o lado direito, Bochecha é o lado esquerdo, Costado é a frente da embarcação',
      'Través é o bordo direito, Bombordo é o fundo da quilha, Linha d\'água é a borda livre',
      'Través é o lado direito, Avante é a frente, Calado é a medida da proa até a popa'
    ],
    correctIndex: 0,
    explanation: 'Olhando da popa para a proa: o bordo direito é BORESTE (BE), o bordo esquerdo é BOMBORDO (BB), o sentido para a frente é A VANTE e para trás é A RÉ.',
    normReference: 'Nomenclatura Náutica / Apostila Unidade 2 pág. 15'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Desatracação com Vento',
    question: 'Para desatracar uma embarcação com vento e correnteza incidindo diretamente pela PROA (de vante para ré), qual é o procedimento técnico recomendado?',
    options: [
      'Largar todas as espias simultaneamente e manter o leme estritamente a meio',
      'Largar todas as espias exceto a que diz para vante na popa (espringue de popa), mantendo o leme contrário ao cais e dando máquinas atrás devagar',
      'Largar somente as espias da popa, folgar as da proa e dar máquinas toda força adiante',
      'Manter apenas o lançante de proa e dar marcha a ré rápida contra o cais',
      'Largar as espias da proa mantendo o través de meia-nau tesado ao máximo'
    ],
    correctIndex: 1,
    explanation: 'Com correnteza pela proa, mantém-se o espringue de popa (diz para vante), leme contrário ao cais e máquinas atrás; a corrente ajudará a afastar a proa do cais com segurança e facilidade.',
    normReference: 'Manobras de Atracação / Apostila Unidade 2 pág. 21 (Figura 6)'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Hemorragias',
    question: 'No atendimento inicial a uma vítima que sofreu hemorragia externa abundante, por qual motivo primordial ela deve ser mantida aquecida com agasalhos ou cobertores?',
    options: [
      'Para prevenir e evitar o estado de choque (choque hipovolêmico)',
      'Para interromper diretamente o sangramento arterial profundo',
      'Para elevar a pressão arterial acima dos níveis fisiológicos normais',
      'Para facilitar a dilatação das artérias periféricas feridas',
      'Exclusivamente para evitar dores musculares pós-trauma'
    ],
    correctIndex: 0,
    explanation: 'A perda expressiva de sangue reduz a perfusão tecidual e causa hipotermia precoce, precipitando o estado de choque hipovolêmico. Manter a vítima aquecida e calma é vital.',
    normReference: 'PRISOC / Apostila Unidade 4 pág. 47 e 48'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Sobrevivência no Mar',
    question: 'Em uma balsa salva-vidas homologada, qual é o principal constituinte calórico e nutricional das rações sólidas de emergência destinadas aos náufragos?',
    options: [
      'Proteína desidratada e carne salgada em conserva',
      'Fibras alimentares purificadas para trânsito intestinal',
      'Cloreto de sódio e eletrólitos concentrados',
      'Complexos vitamínicos em cápsulas oleosas',
      'Açúcar (glicose) e compostos de fácil metabolização energética'
    ],
    correctIndex: 4,
    explanation: 'As rações sólidas de sobrevivência são à base de glicose e carboidratos simples (açúcar). O organismo de náufrago gasta menos água metabólica digerindo carboidratos do que proteínas.',
    normReference: 'Salvatagem Náutica / Apostila Unidade 6 pág. 62 e 65'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Medidas Administrativas',
    question: 'Segundo a LESTA e o RLESTA, em qual das seguintes situações a embarcação está sujeita à medida administrativa de APREENSÃO pela Inspeção Naval?',
    options: [
      'Navegar sem a dotação regulamentar de extintores de incêndio ou com estes inoperantes',
      'Ser utilizada comercialmente quando registrada exclusivamente para esporte e recreio',
      'Trafegar em péssimo estado de conservação ou em áreas de segurança proibidas',
      'Ser conduzida por pessoa em estado de embriaguez alcoólica ou sem habilitação',
      'Todas as opções acima configuram motivos legais para apreensão da embarcação'
    ],
    correctIndex: 4,
    explanation: 'Conforme o Art. 16 da LESTA e regulamento na RLESTA, a apreensão da embarcação é aplicada em desvios graves de segurança, uso comercial indevido, embriaguez, condutor inabilitado e tráfego em áreas proibidas.',
    normReference: 'LESTA Art. 16 / RLESTA / Apostila Unidade 1 pág. 10 e 12'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Definições da LESTA',
    question: 'De acordo com a Lei de Segurança do Tráfego Aquaviário (Lei nº 9.537/1997 - LESTA), como é formalmente definido o "Amador"?',
    options: [
      'O navegante experiente habilitado para conduzir pequenas embarcações com finalidade pesqueira comercial',
      'A pessoa jurídica responsável pelo aparelhamento e gestão de embarcações de aluguel',
      'Todo aquele com habilitação certificada pela autoridade marítima para operar embarcações de esporte e recreio, em caráter não profissional',
      'O tripulante certificado pela Capitania para exercer serviços auxiliares e transporte remunerado de turistas',
      'O condutor voluntário de embarcações oficiais do Corpo de Bombeiros e Defesa Civil'
    ],
    correctIndex: 2,
    explanation: 'Art. 2º da LESTA: Amador é todo aquele com habilitação certificada pela autoridade marítima para operar embarcações de esporte e recreio, em caráter não profissional.',
    normReference: 'LESTA Lei nº 9.537/97 Art. 2º / Apostila Unidade 1 pág. 3'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Débitos Decorrentes de Infração',
    question: 'Nos termos da LESTA, a Autoridade Marítima sustará o andamento de qualquer documento ou ato administrativo de interesse de quem estiver em débito decorrente de infração até:',
    options: [
      'A sua efetiva e integral quitação',
      'O decurso do prazo regulamentar de 60 dias corridos',
      'A formalização da alienação ou venda da embarcação',
      'O decurso do prazo administrativo de 12 meses',
      'A emissão do Termo Provisório de Responsabilidade Civil'
    ],
    correctIndex: 0,
    explanation: 'A LESTA estabelece expressamente que a Autoridade Marítima sustará o andamento de qualquer documento ou ato administrativo de interesse de infrator em débito até a sua integral quitação.',
    normReference: 'LESTA Art. 21 / Apostila Unidade 1 pág. 7'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Embarcações Estrangeiras',
    question: 'Caso uma embarcação estrangeira apresente irregularidades que ameacem o meio ambiente, a segurança de navegação ou terceiros, a Autoridade Marítima pode ordená-la a:',
    options: [
      'Substituir compulsoriamente seu comandante e repatriar a tripulação',
      'Sair imediatamente das águas jurisdicionais brasileiras (AJB) ou não entrar no porto',
      'Converter seu registro provisório para a bandeira mercante brasileira',
      'Entregar suas cartas de navegação e aguardar liberação alfandegária',
      'Submeter-se a processo criminal militar perante o Tribunal Marítimo'
    ],
    correctIndex: 1,
    explanation: 'Embarcação estrangeira que apresente risco ou irregularidades graves pode ser impedida de entrar ou sair do porto, intimada a arribar em porto nacional ou ordenada a deixar as águas jurisdicionais.',
    normReference: 'LESTA Art. 17 / Apostila Unidade 1 pág. 14'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Plano de Navegação',
    question: 'Antes de desatracar e suspender para um passeio de lazer náutico, qual procedimento de segurança é mandatório perante a marina ou iate clube?',
    options: [
      'Apresentar cópia autenticada do Cartão de Tripulação de Segurança',
      'Registrar a vistoria periódica expedida pela Capitania dos Portos',
      'Entregar o Plano de Navegação (ou Aviso de Saída e Chegada)',
      'Submeter relatório de análise físico-química de combustível',
      'Apresentar apólice de seguro privada para bens materiais de passageiros'
    ],
    correctIndex: 2,
    explanation: 'Antes de sair para o mar ou rio, o condutor deve entregar na Marina ou Iate Clube o Plano de Navegação (Aviso de Saída e Chegada), permitindo rápido resgate pela Marinha em emergências.',
    normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 14'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Classificação da Navegação',
    question: 'Conforme a RLESTA (Decreto nº 2.596/1998), como é classificada a navegação realizada entre portos ou pontos do território brasileiro utilizando a via marítima ou esta conjugada com vias navegáveis interiores?',
    options: [
      'Navegação ortodrômica oceânica',
      'Navegação de cabotagem',
      'Navegação puramente interior de bacia',
      'Navegação de longo curso internacional',
      'Navegação costeira de travessia polar'
    ],
    correctIndex: 1,
    explanation: 'Navegação de Cabotagem é aquela realizada entre portos ou pontos do território nacional, utilizando a via marítima ou esta e as vias navegáveis interiores.',
    normReference: 'RLESTA Art. 4º / Apostila Unidade 1 pág. 7'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Reincidência de Infrações',
    question: 'Para efeito de dosimetria e agravação de penalidades na RLESTA, em qual intervalo temporal a repetição da mesma infração configura reincidência?',
    options: [
      'Período igual ou inferior a 12 (doze) meses',
      'Período de até 6 (seis) meses a contar do julgamento',
      'Período igual ou inferior a 18 (dezoito) meses',
      'Período de até 3 (três) meses corridos',
      'Período de 24 (vinte e quatro) meses a contar da notificação'
    ],
    correctIndex: 0,
    explanation: 'A reincidência é caracterizada pela repetição da prática da mesma infração em período igual ou inferior a 12 meses, implicando na multiplicação da penalidade por 2, 3 e sucessivamente.',
    normReference: 'RLESTA / Apostila Unidade 1 pág. 8'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Áreas Seletivas e Banhistas',
    question: 'Para efeito de delimitação das áreas seletivas de navegação e proteção de banhistas, como é legalmente definida a "Linha Base"?',
    options: [
      'A linha imaginária traçada a 500 metros dos faróis da costa',
      'A linha da arrebentação das ondas ou onde se inicia o espelho d\'água em rios e lagoas',
      'A linha divisória entre a água salgada e a água doce na desembocadura',
      'A linha que une os marcos de alinhamento geográfico municipal',
      'A linha que marca o calado máximo operacional do porto'
    ],
    correctIndex: 1,
    explanation: 'A Linha Base é a linha de arrebentação das ondas ou, no caso de lagos, lagoas e represas, a margem onde se inicia o espelho d\'água.',
    normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 10'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Processo Administrativo',
    question: 'Lavrado o Auto de Infração pela equipe de Inspeção Naval, quantos dias úteis o autuado possui para apresentar sua defesa escrita?',
    options: [
      '30 (trinta) dias úteis',
      '30 (trinta) dias corridos',
      '60 (sessenta) dias úteis',
      '15 (quinze) dias úteis',
      '7 (sete) dias úteis improrrogáveis'
    ],
    correctIndex: 3,
    explanation: 'O infrator dispõe de 15 (quinze) dias úteis contados do recebimento do auto de infração para protocolar sua defesa perante a autoridade competente.',
    normReference: 'RLESTA / Apostila Unidade 1 pág. 8'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Combustíveis e Comburentes',
    question: 'Qual dos materiais abaixo é classificado como combustível que NÃO possui comburente em sua estrutura íntima, necessitando de oxigênio externo para queimar?',
    options: [
      'Pólvora negra balística',
      'Nitrato de celulose',
      'Clorato de potássio prensado',
      'Madeira',
      'Metal titânio pirofórico'
    ],
    correctIndex: 3,
    explanation: 'A madeira é um combustível sólido comum sem comburente em sua composição; depende do ar atmosférico (oxigênio com concentração mínima de 16%) para queimar. Pólvoras e nitratos já possuem comburente interno.',
    normReference: 'CBINC / Apostila Unidade 5 pág. 53'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Prevenção de Incêndios',
    question: 'Na gestão de segurança e boas práticas de marinharia a bordo de embarcações de lazer, qual é considerado o primeiro e mais eficiente método contra incêndios?',
    options: [
      'Manter baterias sempre descarregadas durante a navegação',
      'Limpar os porões exclusivamente com solventes de petróleo',
      'Substituir o gás GLP por carvão vegetal na cozinha náutica',
      'Desconectar a chave geral do motor com o barco em alta velocidade',
      'A prevenção diária contínua, evitando que as condições propícias ao fogo ocorram'
    ],
    correctIndex: 4,
    explanation: 'O método prioritário e mais eficiente é a PREVENÇÃO: inspeção rotineira de mangueiras de combustível, limpeza de porões, ventilação antes de dar partida e instalação elétrica correta.',
    normReference: 'CBINC / Apostila Unidade 5 pág. 56'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Suporte Básico de Vida',
    question: 'Antes de realizar ventilações artificiais (boca a boca) em uma vítima inconsciente com parada respiratória, qual a primeira conduta obrigatória?',
    options: [
      'Desobstruir as vias aéreas superiores retirando próteses, vômitos ou corpos estranhos',
      'Tampar hermeticamente as narinas sem posicionar o queixo',
      'Verificar se a pressão arterial sistólica está elevada',
      'Aplicar compressas com água fria na região torácica',
      'Higienizar as cavidades orais com solução antisséptica'
    ],
    correctIndex: 0,
    explanation: 'A primeira etapa na análise primária da vítima é abrir e desobstruir as vias aéreas (retirar secreções, dentes soltos, vômito ou objetos) e hiperestender o queixo para o ar passar.',
    normReference: 'PRISOC / Apostila Unidade 4 pág. 41 e 43'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Medidas Lineares da Embarcação',
    question: 'Quais são as principais medidas lineares que expressam a geometria e o dimensionamento do casco de uma embarcação?',
    options: [
      'Boca, calado, quilha e través longitudinal',
      'Boreste, bombordo, alheta e bochecha de proa',
      'Comprimento total, boca, pontal e contorno',
      'Comprimento total, boca, calado aéreo e cavernas',
      'Boca moldada, contorno de quilha, leme e cana'
    ],
    correctIndex: 2,
    explanation: 'As quatro medidas lineares clássicas da arquitetura naval para cálculo de arqueação e porte são: Comprimento Total, Boca (largura de borda a borda), Pontal (altura da quilha ao convés) e Contorno.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 15'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Programa de Habilitação',
    question: 'Dentre as matérias e competências náuticas, qual é requisito fundamental e obrigatório no exame de habilitação para a categoria de Arrais-Amador?',
    options: [
      'Cálculos de navegação astronômica por tábuas e sextante',
      'Operação de sistema de posicionamento dinâmico e ECDIS',
      'O Sistema de Balizamento Marítimo e Fluvial IALA Região B',
      'Instalação e manutenção de rádiofaróis transponder EPIRB de alta potência',
      'Navegação hiperbólica em rotas ortodrômicas de alto-mar'
    ],
    correctIndex: 2,
    explanation: 'O programa oficial para Arrais-Amador (NORMAM-03/211) exige domínio pleno do Sistema de Balizamento IALA B, Regras de Governo do RIPEAM, manobras, segurança e combate a incêndio em navegação interior.',
    normReference: 'NORMAM-03/211 Anexo 5-A / Apostila pág. 2 e 24'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais Sonoros de Apito',
    question: 'Segundo o RIPEAM-72, qual é a duração técnica aproximada de um "apito curto"?',
    options: [
      'De 4 a 6 segundos',
      'De 2 a 3 segundos',
      'Cerca de 3 segundos',
      'Menos de meio segundo',
      'Cerca de 1 segundo'
    ],
    correctIndex: 4,
    explanation: 'Conforme a Regra 32 do RIPEAM: o apito curto tem duração aproximada de 1 segundo; o apito longo dura de 4 a 6 segundos.',
    normReference: 'RIPEAM-72 Regra 32 / Apostila Unidade 3 pág. 33'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Velocidade de Segurança',
    question: 'De acordo com a Regra 6 do RIPEAM, como toda embarcação deve navegar permanentemente a fim de poder manobrar com eficácia e ser parada a distância segura de colisão?',
    options: [
      'Em Velocidade de Segurança, adequada às circunstâncias e condições predominantes',
      'Na velocidade máxima que o motor permitir para desocupar rapidamente o canal',
      'Em zigue-zague contínuo para manter boa visibilidade de proa',
      'Sempre em marcha lenta com o leme travado a bombordo',
      'Em velocidade igual ou superior a 15 nós para vencer as correntes'
    ],
    correctIndex: 0,
    explanation: 'A Regra 6 do RIPEAM determina que toda embarcação deve navegar sempre em "Velocidade de Segurança", de modo que possa realizar manobras eficientes e parar a distância apropriada.',
    normReference: 'RIPEAM-72 Regra 6 / Apostila Unidade 3 pág. 27'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Identificação de Embarcações',
    question: 'Em relação à marcação de nome no costado, para qual tipo de embarcação é dispensada a gravação de nome em letras destacadas?',
    options: [
      'Embarcações estrangeiras em trânsito com passaporte náutico',
      'Embarcações miúdas (dispensadas do nome no costado, mantendo a inscrição no TIEM)',
      'Embarcações de grande porte com arqueação superior a 100 AB',
      'Embarcações comerciais com bandeira brasileira',
      'Balsas de transporte de carga em águas desabrigadas'
    ],
    correctIndex: 1,
    explanation: 'Embarcações miúdas (comprimento até 5m ou até 8m sem cabine com motor até 50HP) são dispensadas de gravar nome no costado, sendo identificadas pelo número de inscrição TIEM.',
    normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 11'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Pavilhão Nacional',
    question: 'Nas embarcações de esporte e recreio brasileiras, em qual situação é expressamente dispensado o uso obrigatório da Bandeira Nacional na popa?',
    options: [
      'Ao cruzar com navios de guerra da Marinha do Brasil',
      'Durante as horas compreendidas entre as 08:00h e o pôr do sol',
      'Em embarcações miúdas navegando em águas interiores',
      'Quando navegando em mar aberto de cabotagem',
      'Ao entrar ou sair de portos estrangeiros de dia'
    ],
    correctIndex: 2,
    explanation: 'A legislação náutica e a NORMAM dispensam as embarcações miúdas da obrigatoriedade do porte e hasteamento do Pavilhão Nacional durante a navegação interior.',
    normReference: 'NORMAM-03/211 / RLESTA / Apostila Unidade 1 pág. 11'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Reanimação Cardiopulmonar',
    question: 'Ao posicionar uma vítima sem pulso e sem movimentos respiratórios para início das manobras de RCP, qual deve ser sua postura no solo?',
    options: [
      'Deitada de costas com o tórax em superfície rígida e plana (decúbito dorsal)',
      'Deitada de bruços para facilitar a drenagem de saliva (decúbito ventral)',
      'Sentada encostada na antepara com pernas dobradas',
      'Deitada de lado em posição lateral de recuperação com tórax elevado',
      'Com o tronco suspenso e a cabeça fletida sobre o peito'
    ],
    correctIndex: 0,
    explanation: 'Para que as compressões torácicas comprimam eficientemente o coração entre o osso esterno e a coluna vertebral, a vítima deve estar em decúbito dorsal (barriga para cima) sobre base rígida.',
    normReference: 'PRISOC / Apostila Unidade 4 pág. 43'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Cabos de Amarração',
    question: 'Como são genericamente chamados todos os cabos de bitola reforçada empregados para amarrar com firmeza a embarcação ao cais, trapiche ou pier?',
    options: [
      'Retinidas',
      'Cabresteiras de bordo',
      'Cordas comuns',
      'Espias',
      'Amarras de ferro'
    ],
    correctIndex: 3,
    explanation: 'No linguajar marinheiro e na arte naval, os cabos principais usados na amarração ao cais, cabeços ou outros navios recebem a denominação técnica de ESPIAS.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 19'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Atracação com Vento Perpendicular',
    question: 'Ao manobrar para atracar ao cais sob a ação de vento ou correnteza perpendiculares empurrando a embarcação em direção ao cais (por barlavento), como se deve aproximar?',
    options: [
      'Em alta velocidade de proa a 90° para furar a marola',
      'Aproximando de ré em ângulo de 45° com motor acelerado',
      'Completamente paralelo ao cais, com velocidade quase nula, deixando a força externa aproximar o casco',
      'Em zigue-zague até a bochecha encostar no cais',
      'Lançando a âncora a vante e puxando o cabo pelo través de ré'
    ],
    correctIndex: 2,
    explanation: 'Na aproximação com vento de barlavento (perpendicular ao cais empurrando para o atracadouro), aproxima-se paralelo, bem devagar, permitindo que a própria força empurre o barco suavemente com defensas prontas.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 20 (Figura 1)'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Categorias de Amadores',
    question: 'Qual é a única Carteira de Habilitação de Amador que pode ser obtida por um menor de 18 anos (a partir dos 8 anos de idade completos)?',
    options: [
      'Arrais-Amador',
      'Motonauta',
      'Mestre-Amador',
      'Capitão-Amador',
      'Veleiro'
    ],
    correctIndex: 4,
    explanation: 'A idade mínima para obtenção da habilitação de Veleiro é de 8 (oito) anos. Para todas as demais categorias de Amador (Motonauta, Arrais-Amador, Mestre e Capitão) exige-se 18 anos completos.',
    normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 9'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Histórico de Agentes Extintores',
    question: 'Qual consagrado gás extintor de incêndio foi banido e proibido para novas instalações e recargas a partir do ano 2000 devido aos severos danos causados à camada de ozônio?',
    options: [
      'Pó Químico Seco PQS',
      'Dióxido de Carbono CO2',
      'Monóxido de Carbono',
      'Gás Nitrogênio criogênico',
      'Gás Halon'
    ],
    correctIndex: 4,
    explanation: 'O Gás Halon (compostos halogenados CFC), embora excelente para abafar e quebrar a reação em cadeia, foi proibido globalmente pelo Protocolo de Montreal por destruir a camada de ozônio.',
    normReference: 'CBINC / Convenções Ambientais / Apostila Unidade 5 pág. 53'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Atribuições do Comandante',
    question: 'Segundo a Lei de Segurança do Tráfego Aquaviário (LESTA), como se designa o tripulante responsável supremo pela operação e manutenção da embarcação em condições de segurança?',
    options: [
      'Chefe de Máquinas',
      'Comandante (ou Mestre, Arrais, Patrão)',
      'Armador Proprietário',
      'Prático Embarcado',
      'Imediato de Segurança'
    ],
    correctIndex: 1,
    explanation: 'Art. 2º da LESTA: Comandante (também denominado Mestre, Arrais ou Patrão) é o tripulante responsável pela operação e manutenção da embarcação, em condições de segurança extensivas à carga e pessoas.',
    normReference: 'LESTA Lei nº 9.537/97 Art. 2º / Apostila Unidade 1 pág. 5'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Homologação de Equipamentos',
    question: 'Para que um colete salva-vidas de procedência estrangeira seja legalmente aceito a bordo de uma embarcação brasileira, qual convenção internacional deve ter homologado seu projeto?',
    options: [
      'Convenção USCG Coastal Guard',
      'Acordo Regional IALA',
      'Convenção STCW de Trabalho Marítimo',
      'Convenção Internacional para a Salvaguarda da Vida Humana no Mar (SOLAS)',
      'Acordo Geral de Tarifas e Comércio GATT'
    ],
    correctIndex: 3,
    explanation: 'Materiais estrangeiros de salvatagem podem ser aceitos pela Diretoria de Portos e Costas (DPC) desde que certificados em conformidade com as exigências da Convenção SOLAS 74/78.',
    normReference: 'SOLAS 74/78 / NORMAM-03/211 / Apostila Unidade 6 pág. 63'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Incêndios Classe D',
    question: 'Um incêndio ocorrido em carga contendo metal combustível (como magnésio, sódio, zinco ou titânio) pertence à Classe D. Qual agente extintor NUNCA deve ser utilizado?',
    options: [
      'Água (sob qualquer forma de jato ou neblina)',
      'Pó seco especial para metais MET-L-X',
      'Compostos granulados de grafite pura',
      'Compostos secos de cloreto de sódio',
      'Pó químico extintor Classe D'
    ],
    correctIndex: 0,
    explanation: 'A aplicação de ÁGUA em metais alcalinos ou combustíveis aquecidos causa decomposição explosiva violenta, gerando gás hidrogênio que inflama imediatamente. Exige-se pó seco tipo MET-L-X.',
    normReference: 'CBINC / Apostila Unidade 5 pág. 53 e 54'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Exercício Profissional Aquaviário',
    question: 'Como se classifica o profissional legalmente certificado pela Autoridade Marítima para exercer profissão a bordo de embarcações, tripulando-as mediante remuneração?',
    options: [
      'Amador esportivo',
      'Armador de cabotagem',
      'Aquaviário',
      'Timoneiro de recreio',
      'Passageiro especial'
    ],
    correctIndex: 2,
    explanation: 'Aquaviário é todo aquele com habilitação certificada pela autoridade marítima para operar embarcações em caráter profissional, diferenciando-se expressamente do Amador.',
    normReference: 'LESTA Lei nº 9.537/97 Art. 2º / Apostila Unidade 1 pág. 4'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Queimaduras',
    question: 'Qual é o sinal característico evidente de uma queimadura de 1º grau (como a queimadura solar superficial)?',
    options: [
      'Presença de flictenas (bolhas d\'água) com plasma',
      'Vermelhidão superficial na pele (eritema) e dor local sem formação de bolhas',
      'Destruição profunda da epiderme e necrose do tecido',
      'Insensibilidade térmica por destruição total das terminações nervosas',
      'Exposição de fáscias musculares e vasos sanguíneos'
    ],
    correctIndex: 1,
    explanation: 'A queimadura de 1º grau atinge apenas a epiderme superficial, produzindo calor, dor e vermelhidão (eritema), SEM bolhas. A formação de bolhas já caracteriza 2º grau.',
    normReference: 'PRISOC / Apostila Unidade 4 pág. 44'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Curvas Cegas em Canais',
    question: 'Navegando em canal estreito ou rio e aproximando-se de uma curva de raio fechado com visibilidade encoberta por morros ou vegetação, ao ouvir um apito longo de outra embarcação vindo no sentido oposto, o que você deve fazer?',
    options: [
      'Acelerar a marcha para cruzar a curva antes da outra embarcação',
      'Soar dois apitos curtos e guinar bruscamente para bombordo',
      'Manter o rumo a meio do canal sem responder',
      'Soar imediatamente cinco apitos rápidos de emergência e parar a máquina',
      'Diminuir a velocidade e responder prontamente com outro apito longo'
    ],
    correctIndex: 4,
    explanation: 'Regra 34(e) do RIPEAM: A embarcação que se aproxima de curva cega ouvindo um apito longo deve responder prontamente com UM APITO LONGO e navegar com prudência e velocidade reduzida.',
    normReference: 'RIPEAM-72 Regra 34(e) / Apostila Unidade 3 pág. 33'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Marcas Diurnas',
    question: 'De acordo com a Regra 30 do RIPEAM, qual marca visual geométrica de cor preta deve ser içada durante o dia na parte de vante de uma embarcação fundeada?',
    options: [
      'Um cilindro preto',
      'Uma esfera preta (balão preto)',
      'Três esferas pretas sobrepostas',
      'Dois cones pretos unidos pelo vértice',
      'Um cone preto com vértice voltado para cima'
    ],
    correctIndex: 1,
    explanation: 'Regra 30(a): Toda embarcação fundeada durante o período diurno deverá exibir no local onde melhor possa ser vista UMA ESFERA PRETA na parte de vante.',
    normReference: 'RIPEAM-72 Regra 30 / Apostila Unidade 3 pág. 32 e 33'
  }
];

// Inserir garantindo que não haja repetições e que os IDs continuem em sequência
let maxId = currentQuestions.reduce((acc, q) => Math.max(acc, q.id), 0);
let addedCount = 0;

for (const q of examQuestions) {
  // Verificar se uma pergunta idêntica já existe
  const exists = currentQuestions.some(cq => 
    cq.question.trim().toLowerCase() === q.question.trim().toLowerCase() ||
    (cq.question.toLowerCase().includes(q.subtopic.toLowerCase()) && cq.explanation === q.explanation)
  );

  if (!exists) {
    maxId++;
    currentQuestions.push({
      id: maxId,
      ...q
    });
    addedCount++;
  }
}

console.log(`Novas questões adicionadas: ${addedCount}`);
console.log(`Total final de questões: ${currentQuestions.length}`);

// Gravar no arquivo questions.json do React e no dist
fs.writeFileSync(questionsPath, JSON.stringify(currentQuestions, null, 2), 'utf8');

const distQuestionsPath = path.resolve('../arrais/data/questions.json');
if (fs.existsSync(distQuestionsPath)) {
  fs.writeFileSync(distQuestionsPath, JSON.stringify(currentQuestions, null, 2), 'utf8');
  console.log(`Atualizado também em ${distQuestionsPath}`);
}
