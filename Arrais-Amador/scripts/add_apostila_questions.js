import fs from 'fs';
import path from 'path';

const questionsPath = path.resolve('public/data/questions.json');
const currentQuestions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

console.log(`Questões existentes: ${currentQuestions.length}`);

const newApostilaQuestions = [
  // --- UNIDADE 1: LEGISLAÇÃO, MULTAS E PRAZOS ---
  {
    topic: 'Legislação Náutica',
    subtopic: 'Infrações e Multas',
    question: 'De acordo com a RLESTA (Decreto nº 2.596/98), a infração por conduzir embarcação sem habilitação está enquadrada em qual grupo de multa?',
    options: [
      'Grupo A (R$ 40,00 a R$ 200,00)',
      'Grupo C (R$ 40,00 a R$ 800,00)',
      'Grupo E (R$ 40,00 a R$ 2.200,00)',
      'Grupo G (R$ 80,00 a R$ 3.200,00)'
    ],
    correctIndex: 2,
    explanation: 'Conduzir embarcação sem habilitação acarreta pena de MULTA do Grupo E (de R$ 40,00 a R$ 2.200,00), além da apreensão da embarcação.',
    normReference: 'RLESTA Art. 18 / Apostila Unidade 1 pág. 4 e 8'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Infrações e Multas',
    question: 'Qual é a infração passível da mais alta pena de multa prevista na RLESTA (Grupo G, de R$ 80,00 a R$ 3.200,00)?',
    options: [
      'Navegar com habilitação vencida há mais de 30 dias',
      'Excesso de lotação (passageiros) ou excesso de carga autorizada',
      'Falta de apito ou buzina em barco com menos de 5 metros',
      'Deixar de marcar o nome da embarcação na popa'
    ],
    correctIndex: 1,
    explanation: 'O excesso de passageiros (lotação) ou de carga é passível da mais alta pena de multa, classificada no Grupo G (de R$ 80,00 a R$ 3.200,00), com interrupção imediata da viagem.',
    normReference: 'RLESTA / Apostila Unidade 1 pág. 4 e Quadro de Infrações pág. 74'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Processo Administrativo',
    question: 'Após o recebimento do Auto de Infração, qual é o prazo concedido ao infrator para apresentar sua defesa prévia?',
    options: [
      '5 dias corridos',
      '10 dias úteis',
      '15 dias úteis',
      '30 dias corridos'
    ],
    correctIndex: 2,
    explanation: 'O infrator, após o recebimento do auto de infração, dispõe de 15 dias úteis para apresentar sua defesa perante a Capitania, Delegacia ou Agência.',
    normReference: 'RLESTA / Apostila Unidade 1 pág. 8'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Processo Administrativo',
    question: 'Caso o infrator não concorde com a penalidade imposta e queira interpor recurso à autoridade superior, qual o prazo e a exigência de pagamento?',
    options: [
      '5 dias úteis, não sendo exigido o depósito prévio da multa',
      '15 dias úteis, sendo obrigatório o depósito antecipado do valor total da multa',
      '30 dias corridos com caução de 50% do valor',
      '10 dias úteis com fiança bancária homologada'
    ],
    correctIndex: 0,
    explanation: 'O infrator disporá de 5 dias úteis para interpor recurso à autoridade superior. Se a pena for de multa, NÃO será exigido o depósito prévio para interposição do recurso.',
    normReference: 'RLESTA / Apostila Unidade 1 pág. 8'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Validade de Documentos',
    question: 'Qual é o prazo de validade da Carteira de Habilitação de Amador (CHA) para pessoas com idade igual ou superior a 65 anos?',
    options: [
      '2 anos',
      '5 anos',
      '10 anos',
      'Indeterminada, com exame bienal'
    ],
    correctIndex: 1,
    explanation: 'Para amadores com idade inferior a 65 anos, a CHA tem validade de 10 anos. Para amadores com idade igual ou superior a 65 anos, a validade da CHA é reduzida para 5 anos.',
    normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 11'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Validade de Documentos',
    question: 'Qual é a validade do Título de Inscrição de Embarcação (TIE) e do Seguro Obrigatório DPEM, respectivamente?',
    options: [
      'TIE: 10 anos; DPEM: 5 anos',
      'TIE: 5 anos; DPEM: 12 meses (1 ano)',
      'TIE: 2 anos; DPEM: 24 meses',
      'TIE: indeterminada; DPEM: semestral'
    ],
    correctIndex: 1,
    explanation: 'De acordo com as Normas da Autoridade Marítima, o TIE tem validade de 5 anos e o Seguro Obrigatório de Danos Pessoais (DPEM) tem validade de 12 meses (1 ano).',
    normReference: 'NORMAM / Apostila Unidade 1 pág. 11'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Cancelamento de Inscrição',
    question: 'Uma embarcação sujeita a vistorias terá sua inscrição ou registro compulsoriamente cancelado quando tiver seu paradeiro ignorado por mais de:',
    options: [
      '6 meses',
      '1 ano',
      '2 anos (ou 3 anos para embarcações sujeitas a vistorias)',
      '5 anos ininterruptos'
    ],
    correctIndex: 2,
    explanation: 'Embarcações com paradeiro ignorado por mais de 2 anos (e embarcações sujeitas a vistorias com paradeiro ignorado por mais de 3 anos) têm suas inscrições canceladas.',
    normReference: 'LESTA / Apostila Unidade 1 pág. 5 e 11'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Áreas de Segurança',
    question: 'A que distância mínima de instalações militares e de plataformas de exploração de petróleo é proibido o tráfego e fundeio de embarcações?',
    options: [
      '100 metros de militares e 200 metros de plataformas',
      '200 metros de militares e 500 metros de plataformas de petróleo',
      '500 metros de militares e 1.000 metros de plataformas',
      '1.000 metros para ambas as instalações'
    ],
    correctIndex: 1,
    explanation: 'É proibido o tráfego e fundeio a menos de 200 metros de instalações militares e a menos de 500 metros das unidades estacionárias de produção de petróleo (plataformas).',
    normReference: 'NORMAM / Apostila Unidade 1 pág. 8'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Áreas Seletivas',
    question: 'Ao aproximar-se da praia para fundear, qual é a velocidade máxima permitida e o ângulo de aproximação em relação à linha base?',
    options: [
      'Velocidade máxima de 8 nós, aproximando-se paralelo à praia',
      'Velocidade não superior a 3 nós, em trajetória perpendicular à linha base',
      'Velocidade livre, contanto que mantenha distância de 50 metros de banhistas',
      'Velocidade constante de 5 nós em zigue-zague'
    ],
    correctIndex: 1,
    explanation: 'Toda aproximação para fundeio na faixa de praia deve ser feita em ângulo perpendicular à linha base e com velocidade não superior a três (3) nós, preservando a segurança dos banhistas.',
    normReference: 'NORMAM / Apostila Unidade 1 pág. 8'
  },

  // --- UNIDADE 2: MANOBRA, ESTABILIDADE E ÂNCORAS ---
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Estabilidade',
    question: 'Como são denominados, respectivamente, o movimento de oscilação vertical no sentido longitudinal (proa-popa) e o movimento de oscilação lateral (bordo a bordo)?',
    options: [
      'Balanço e Deriva',
      'Caturro (ou arfagem) e Balanço',
      'Guinada e Cabeceio',
      'Abatimento e Caimento'
    ],
    correctIndex: 1,
    explanation: 'Caturro ou arfagem é a oscilação vertical longitudinal (proa-popa); Balanço é o movimento de oscilação lateral de um bordo para o outro.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 14'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Estabilidade',
    question: 'Em relação ao comportamento do balanço da embarcação, o que indica um balanço rápido e um balanço lento?',
    options: [
      'Balanço rápido indica excesso de peso no convés; balanço lento indica estabilidade perfeita',
      'Balanço rápido demonstra boa estabilidade; balanço lento indica estabilidade deficiente',
      'Ambos indicam risco imediato de emborcamento',
      'Balanço rápido indica navio leve; balanço lento indica água doce'
    ],
    correctIndex: 1,
    explanation: 'Um balanço rápido demonstra que a embarcação possui grande altura metacêntrica e boa estabilidade; já um balanço lento indica estabilidade deficiente.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 14'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Trim e Compasso',
    question: 'Quando a embarcação apresenta calado de ré maior que o calado de vante, diz-se que ela está:',
    options: [
      'Trimada ou em águas parelhas',
      'Abicada',
      'Derrabada',
      'Adriçada'
    ],
    correctIndex: 2,
    explanation: 'Quando o calado a ré é maior que o calado a vante, a embarcação está derrabada. Quando o calado a vante é maior, está abicada. Quando iguais, está trimada (em águas parelhas).',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 14'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Deformações do Casco',
    question: 'A concentração excessiva de pesos nas extremidades (proa e popa), provocando arqueamento do casco com convexidade para cima, denomina-se:',
    options: [
      'Contra-alquebramento',
      'Alquebramento',
      'Banda',
      'Adernação'
    ],
    correctIndex: 1,
    explanation: 'Alquebramento ocorre pelo excesso de pesos na proa e popa (convexidade para cima). Contra-alquebramento ocorre pelo excesso de peso no centro (meia-nau), encurvando para baixo.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 14'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Estabilidade',
    question: 'Qual fenômeno prejudica gravemente a estabilidade transversal quando tanques de combustível ou água estão parcialmente cheios?',
    options: [
      'Efeito de águas rasas',
      'Efeito de superfície livre',
      'Convecção de lastro',
      'Deslocamento aparente'
    ],
    correctIndex: 1,
    explanation: 'O efeito de superfície livre ocorre com tanques pela metade ou água solta no porão; ao adernar, o líquido se desloca para o mesmo lado, aumentando a inclinação e o risco de emborcar.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 15'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Leme e Propulsão',
    question: 'Teoricamente, o efeito máximo do leme é obtido aos 45°. Porém, na prática náutica, o ângulo de efeito máximo útil não ultrapassa:',
    options: [
      '15 graus',
      '20 graus',
      '35 graus',
      '60 graus'
    ],
    correctIndex: 2,
    explanation: 'Teoricamente o efeito máximo do leme ocorre a 45°, mas na prática o efeito máximo útil não passa dos 35° para ambos os bordos.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 16'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Dois Hélices',
    question: 'Numa embarcação de dois hélices, ao se dar marcha a ré em um motor e marcha adiante no outro com a mesma rotação, qual será a tendência da proa?',
    options: [
      'A proa tenderá a girar para o mesmo bordo do hélice que dá ré',
      'A proa tenderá a girar para o bordo do hélice que dá vante',
      'A embarcação se deslocará em linha reta para ré',
      'A embarcação adernará fortemente sem mudar o rumo'
    ],
    correctIndex: 0,
    explanation: 'Quando em embarcação de dois hélices um dá ré e o outro adiante com a mesma rotação, a embarcação tende a girar a proa para o mesmo bordo do hélice que dá ré.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 16'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Espias de Amarração',
    question: 'Qual espia tem a função específica de evitar que a embarcação atracada se afaste lateralmente do cais?',
    options: [
      'Lançante de proa',
      'Espringue de popa',
      'Través',
      'Boça de reboque'
    ],
    correctIndex: 2,
    explanation: 'O través é a espia passada perpendicularmente ao cais a partir da meia-nau, tendo a função de evitar que a embarcação se afaste lateralmente do cais.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 17'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Espias de Amarração',
    question: 'Quais espias têm a função de impedir que a embarcação atracada caia para a ré e caia para a vante, respectivamente?',
    options: [
      'Lançante de proa (evita cair a ré) e Espringue de proa (evita cair a vante)',
      'Través de proa e Través de popa',
      'Boça e Arinque',
      'Barrilete e Retinida'
    ],
    correctIndex: 0,
    explanation: 'O lançante de proa impede a embarcação de cair para a ré; o espringue de proa impede a embarcação de cair para a vante.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 17'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Âncoras',
    question: 'Qual é a característica marcante da âncora Bruce em comparação com a Danforth?',
    options: [
      'Não possui poder de unhar em lama ou areia',
      'Necessita de um filame mínimo de apenas 3 vezes a profundidade (quase a metade do cabo da Danforth)',
      'É feita exclusivamente de madeira e chumbo',
      'É desmontável e flutuante'
    ],
    correctIndex: 1,
    explanation: 'A âncora Bruce unha com grande força e precisa de um filame mínimo de apenas 3 vezes a profundidade, enquanto a Danforth requer cerca de 5 vezes a profundidade.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 20'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Âncoras',
    question: 'Qual âncora não serve para prender a embarcação ao fundo, mas tem a finalidade de reduzir a velocidade de deriva durante mau tempo e em balsas salva-vidas?',
    options: [
      'Âncora Danforth',
      'Âncora Garatéia',
      'Âncora Flutuante (ou Drogue)',
      'Âncora Cogumelo'
    ],
    correctIndex: 2,
    explanation: 'A âncora flutuante (Drogue ou âncora de mau tempo) é mantida na água para oferecer resistência hidrodinâmica e reduzir a deriva provocada por vento e corrente.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 21'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Terminologia Náutica',
    question: 'A manobra efetuada para manter a proa chegada ao vento para aguentar o mau tempo, com pouco seguimento e formando uma esteira de calma, chama-se:',
    options: [
      'Navegar à matroca',
      'Correr com o tempo',
      'Capear (pôr a embarcação à capa)',
      'Garrar o ferro'
    ],
    correctIndex: 2,
    explanation: 'Capear (ou pôr à capa) é manter a proa chegada ao vento e ao mar com o mínimo de seguimento para aguentar o temporal de proa.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 21'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Nós e Voltas',
    question: 'Qual nó é indicado para unir dois cabos de bitolas (espessuras) diferentes ou prender um chicote a um olhal?',
    options: [
      'Nó direito',
      'Nó de escota',
      'Nó de catau',
      'Volta do fiel'
    ],
    correctIndex: 1,
    explanation: 'O nó de escota é utilizado para emendar dois cabos de bitolas desiguais ou prender o chicote a uma alça/olhal. O nó direito serve apenas para cabos de bitolas iguais.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 22'
  },
  {
    topic: 'Manobra, Atracação e Fundeio',
    subtopic: 'Nós e Voltas',
    question: 'Para encurtar temporariamente um cabo ou isolar uma parte puída (coçada) que sofreu desgaste por atrito, utiliza-se o:',
    options: [
      'Lais de guia',
      'Nó de catau',
      'Nó direito',
      'Volta da ribeira'
    ],
    correctIndex: 1,
    explanation: 'O nó de catau tem a função de encurtar um cabo ou ocultar/isolar um trecho enfraquecido e puído sem cortá-lo.',
    normReference: 'Arte Naval / Apostila Unidade 2 pág. 22'
  },

  // --- UNIDADE 3: NAVEGAÇÃO, SINAIS E BALIZAMENTO FLUVIAL ---
  {
    topic: 'Balizamento',
    subtopic: 'Balizamento Fluvial',
    question: 'Na sinalização fluvial brasileira, como são definidas a margem direita e a margem esquerda de um rio?',
    options: [
      'Margem direita é a leste e margem esquerda é a oeste',
      'Margem direita e esquerda são definidas na direção de quem sobe o rio (jusante para montante)',
      'Margem direita fica ao lado direito e margem esquerda ao lado esquerdo de quem desce o rio (de montante para jusante)',
      'A definição depende das marés da foz'
    ],
    correctIndex: 2,
    explanation: 'Na navegação fluvial, a margem esquerda fica ao lado esquerdo e a margem direita ao lado direito de quem desce o rio (olhando no sentido da correnteza, de montante para jusante).',
    normReference: 'Balizamento Fluvial / Apostila Unidade 3 pág. 36 e 37'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Balizamento Fluvial',
    question: 'Descendo um rio navegável (sentido montante para jusante), quais cores de boias devem ser deixadas por boreste e por bombordo, respectivamente?',
    options: [
      'Boia encarnada por boreste e verde por bombordo',
      'Boia verde por boreste e boia encarnada por bombordo',
      'Boia amarela por boreste e preta por bombordo',
      'Ambas devem ser deixadas por bombordo'
    ],
    correctIndex: 1,
    explanation: 'Descendo o rio (de montante para jusante), a margem direita tem sinalização verde e a esquerda encarnada; logo, o navegante deixa a boia verde por boreste e a encarnada por bombordo.',
    normReference: 'Balizamento Fluvial / Apostila Unidade 3 pág. 36 e 69'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Balizamento Fluvial',
    question: 'Pela tradicional "Lei do Rio", quando duas embarcações navegam em rumos opostos, qual delas tem a preferência e como devem se posicionar?',
    options: [
      'A que sobe o rio tem preferência e navega pelo meio',
      'A que desce a favor da correnteza posiciona-se no meio do rio e tem preferência de passagem',
      'A menor sempre tem preferência sobre a maior',
      'Ambas devem guinar para bombordo parando as máquinas'
    ],
    correctIndex: 1,
    explanation: 'A embarcação que navega a favor da correnteza (descendo o rio) deve posicionar-se no meio do rio (talvegue) e tem preferência de passagem; a que sobe navega pela sua margem direita.',
    normReference: 'Lei do Rio / Apostila Unidade 3 pág. 36'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais Sonoros de Ultrapassagem',
    question: 'Em um canal estreito, qual é o sinal sonoro emitido por uma embarcação que tenciona ultrapassar outra pelo bordo de BORESTE da alcançada?',
    options: [
      'Um apito curto',
      'Dois apitos longos seguidos de um apito curto',
      'Dois apitos longos seguidos de dois apitos curtos',
      'Dois apitos curtos seguidos de um longo'
    ],
    correctIndex: 1,
    explanation: 'Regra 34(c): Dois apitos longos seguidos de um curto significam: "Tenciono ultrapassá-lo por seu boreste". Dois longos seguidos de dois curtos significam ultrapassagem por bombordo.',
    normReference: 'RIPEAM Regra 34(c) / Apostila Unidade 3 pág. 31'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais Sonoros de Ultrapassagem',
    question: 'Qual é o sinal sonoro emitido pela embarcação alcançada para indicar sua CONCORDÂNCIA com a ultrapassagem em canal estreito?',
    options: [
      'Três apitos curtos',
      'Dois apitos longos',
      'Um apito longo, um curto, um longo e um curto (— • — •)',
      'Cinco apitos curtos'
    ],
    correctIndex: 2,
    explanation: 'A embarcação alcançada indica concordância soando sucessivamente: um longo, um curto, um longo e um curto (código Morse letra C).',
    normReference: 'RIPEAM Regra 34(c) / Apostila Unidade 3 pág. 31'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais de Perigo',
    question: 'Qual dos seguintes NÃO é um sinal de perigo e pedido de socorro reconhecido pelo RIPEAM?',
    options: [
      'A palavra MAYDAY transmitida por radiotelefonia',
      'Movimentos contínuos com os braços para cima e para baixo',
      'Dois apitos curtos emitidos em intervalos de 5 minutos',
      'Bandeira quadrada com uma esfera (ou objeto semelhante) acima ou abaixo dela'
    ],
    correctIndex: 2,
    explanation: 'Sinais de perigo incluem MAYDAY, fumaça laranja, foguetes de estrela vermelha, código NC, braços para cima e para baixo, e bandeira com esfera. Dois apitos curtos significam guinada para bombordo.',
    normReference: 'RIPEAM Anexo IV / Apostila Unidade 3 pág. 35 e 36'
  },

  // --- UNIDADE 4: PRIMEIROS SOCORROS ---
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Primeiros Socorros',
    question: 'De acordo com a apostila da Marinha, a que taxa de compressão torácica deve ser realizada a massagem cardíaca em uma vítima de parada?',
    options: [
      '40 a 50 compressões por minuto',
      'Cerca de 100 compressões por minuto',
      '150 a 180 compressões por minuto',
      '20 compressões por minuto'
    ],
    correctIndex: 1,
    explanation: 'A massagem cardíaca externa deve ser realizada a uma frequência média de 100 compressões por minuto sobre a metade inferior do osso esterno.',
    normReference: 'Primeiros Socorros / Apostila Unidade 4 pág. 41'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Primeiros Socorros',
    question: 'Qual tipo de queimadura atinge a epiderme e derme, apresentando como sintoma característico a formação de bolhas d’água (flictenas)?',
    options: [
      'Queimadura de 1º Grau',
      'Queimadura de 2º Grau',
      'Queimadura de 3º Grau',
      'Queimadura de 4º Grau'
    ],
    correctIndex: 1,
    explanation: 'A queimadura de 2º grau afeta a epiderme e parte da derme, caracterizando-se por vermelhidão, dor intensa e formação de bolhas (flictenas). 1º grau não forma bolhas e 3º grau causa necrose.',
    normReference: 'Primeiros Socorros / Apostila Unidade 4 pág. 42'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Primeiros Socorros',
    question: 'Na avaliação da extensão de queimaduras corporais, a palma da mão da própria vítima corresponde a aproximadamente qual percentual de sua área corporal?',
    options: [
      '1% da superfície corporal',
      '5% da superfície corporal',
      '9% da superfície corporal',
      '18% da superfície corporal'
    ],
    correctIndex: 0,
    explanation: 'A regra prática estabelece que a área da palma da mão da vítima equivale a aproximadamente 1% da sua superfície corporal total.',
    normReference: 'Primeiros Socorros / Apostila Unidade 4 pág. 43'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Primeiros Socorros',
    question: 'Quando é indicado o uso de torniquete e qual é o procedimento obrigatório quanto ao seu desaperto periódico?',
    options: [
      'Em qualquer sangramento no rosto, desapertando a cada 1 hora',
      'Apenas em casos extremos de amputação ou esmagamento de membros, desapertando gradualmente a cada 15 minutos',
      'Em fraturas expostas da costela, mantendo apertado por 24 horas',
      'Em picadas de animais marinhos no pé, sem nunca afrouxar'
    ],
    correctIndex: 1,
    explanation: 'O torniquete é restrito a amputações e esmagamentos de braço ou coxa. Deve-se anotar a hora e desapertá-lo gradualmente a cada 15 minutos para oxigenar os tecidos.',
    normReference: 'Primeiros Socorros / Apostila Unidade 4 pág. 45 e 46'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Primeiros Socorros',
    question: 'A hipotermia ocorre quando a temperatura central do corpo humano cai abaixo de:',
    options: [
      '37°C',
      '35°C',
      '32°C',
      '28°C'
    ],
    correctIndex: 1,
    explanation: 'Considera-se hipotermia quando a temperatura central cai abaixo de 35°C. Ela é responsável por grande parte dos óbitos de náufragos e vítimas de afogamento em águas frias.',
    normReference: 'Primeiros Socorros / Apostila Unidade 4 pág. 47'
  },

  // --- UNIDADE 6: SALVATAGEM E HOMEM AO MAR ---
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Homem ao Mar',
    question: 'Qual manobra de resgate de homem ao mar consiste em guinar 70° para o bordo da queda e depois inverter todo o leme, retornando exatamente sobre a esteira do barco?',
    options: [
      'Curva de Williamson',
      'Curva de Boutakow',
      'Curva de Anderson',
      'Manobra Yankee'
    ],
    correctIndex: 1,
    explanation: 'A Curva de Boutakow consiste em guinar 70° para o bordo da queda e depois inverter o leme para o bordo oposto, retornando na mesma esteira do hélice. É uma das mais usadas a motor.',
    normReference: 'Arte Naval / Apostila Unidade 6 pág. 58 e 59'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Homem ao Mar',
    question: 'Qual manobra de homem ao mar é a mais recomendada para situações em que a vítima ESTÁ NO VISUAL em boas condições de visibilidade?',
    options: [
      'Curva de Anderson (guinada direta de 180°)',
      'Curva de Williamson (guinada de 60°)',
      'Curva de Boutakow (guinada de 70°)',
      'Fundeio imediato de proa'
    ],
    correctIndex: 0,
    explanation: 'A Curva de Anderson é recomendada quando o homem está no visual: guina-se 180° para o bordo da queda, reduzindo máquinas para quebrar o seguimento ao se aproximar.',
    normReference: 'Arte Naval / Apostila Unidade 6 pág. 58'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Homem ao Mar',
    question: 'Ao aproximar a embarcação para efetuar o recolhimento do náufrago da água, por qual bordo a vítima deve ser posicionada em relação ao vento?',
    options: [
      'Por barlavento, para que o vento empurre a vítima contra o casco',
      'Por sotavento, ficando a embarcação a barlavento formando uma proteção de calma',
      'Exatamente na linha da hélice em marcha a ré',
      'Pela proa com seguimento veloz'
    ],
    correctIndex: 1,
    explanation: 'Em todas as manobras, deve-se deixar o homem por sotavento (entre a bochecha e o través), parando a cerca de 10 metros, usando o costado do barco como anteparo de proteção.',
    normReference: 'Arte Naval / Apostila Unidade 6 pág. 59'
  },
  {
    topic: 'Primeiros Socorros, Salvatagem e Incêndio',
    subtopic: 'Sobrevivência no Mar',
    question: 'A bordo de uma balsa salva-vidas, qual é a regra rígida quanto ao consumo de água potável pelos náufragos?',
    options: [
      'Beber o máximo possível nas primeiras horas de abandono',
      'Não ministrar água no primeiro dia (primeiras 24h); a partir do segundo dia, racionar 700 ml por náufrago/dia',
      'Misturar 50% de água doce com 50% de água do mar para render',
      'Consumir apenas quando sentir muita sede'
    ],
    correctIndex: 1,
    explanation: 'A água da balsa não deve ser ministrada no primeiro dia. Do segundo dia em diante, cada náufrago deve consumir cerca de 700 ml/dia. Nunca beber água do mar nem urina.',
    normReference: 'Sobrevivência no Mar / Apostila Unidade 6 pág. 60 e 63'
  },

  // --- UNIDADE 7: COMUNICAÇÕES NÁUTICAS ---
  {
    topic: 'Legislação Náutica',
    subtopic: 'Comunicações Náuticas',
    question: 'Qual é o canal internacional de socorro, chamada e trânsito inicial em VHF marítimo e sua frequência correspondente em MHz?',
    options: [
      'Canal 68 (156,425 MHz)',
      'Canal 16 (156,800 MHz)',
      'Canal 70 (156,525 MHz)',
      'Canal 12 (156,600 MHz)'
    ],
    correctIndex: 1,
    explanation: 'O Canal 16 em VHF opera na frequência de 156,800 MHz e é o canal internacional obrigatório de socorro, segurança e chamada inicial da Marinha.',
    normReference: 'Comunicações / Apostila Unidade 7 pág. 65 e 66'
  },
  {
    topic: 'Legislação Náutica',
    subtopic: 'Comunicações Náuticas',
    question: 'Por que é expressamente PROIBIDA a transmissão de voz (radiotelefonia) no Canal 70 de VHF marítimo (156,525 MHz)?',
    options: [
      'Porque é um canal reservado exclusivamente para os canais de TV aberta',
      'Porque é um canal digital exclusivo para Chamada Seletiva Digital (DSC)',
      'Porque é o canal exclusivo de conversas privadas entre marinas',
      'Porque causa interferência nos sonares dos submarinos'
    ],
    correctIndex: 1,
    explanation: 'O Canal 70 (156,525 MHz) é reservado estritamente para dados de Chamada Seletiva Digital (DSC) de emergência e rotina. É terminantemente proibido transmitir voz nesse canal.',
    normReference: 'Comunicações / Apostila Unidade 7 pág. 66'
  },

  // --- MOTONAUTA E REGRAS DA NORMAM-212 ---
  {
    topic: 'Motonauta',
    subtopic: 'Segurança em Jet-Ski',
    question: 'Quanto ao transporte de crianças em motos aquáticas (jet-ski), qual é a regra fixada pelas Normas da Autoridade Marítima?',
    options: [
      'É permitido para qualquer idade se estiver vestindo colete',
      'É proibido o transporte de crianças com idade inferior a 7 anos; de 7 a 12 anos podem ser conduzidas na garupa com autorização',
      'É proibido até os 16 anos completos',
      'A criança pode viajar sentada na frente do condutor desde que segure o guidom'
    ],
    correctIndex: 1,
    explanation: 'É proibido transportar crianças menores de 7 anos em motos aquáticas e bananas boat. Entre 7 e 12 anos podem na garupa (nunca na frente), com autorização dos pais e alcançando os apoios de pé.',
    normReference: 'NORMAM-212 / Apostila Unidade 1 pág. 12'
  },
  {
    topic: 'Motonauta',
    subtopic: 'Reboque de Banana-Boat',
    question: 'Para uma moto aquática realizar o reboque de banana-boat comercial, quais requisitos são exigidos do piloto e da capacidade do jet?',
    options: [
      'Basta ser Arrais-Amador em jet de 2 lugares',
      'Capacidade mínima de 3 lugares (condutor, observador e espaço livre), piloto habilitado como Motonauta E Aquaviário, e espelhos retrovisores',
      'Qualquer moto aquática de 1 lugar com espelho retrovisor pequeno',
      'Apenas embarcações de grande porte podem rebocar banana-boat'
    ],
    correctIndex: 1,
    explanation: 'Para reboque de banana-boat por moto aquática: o jet deve ter no mínimo 3 lugares (condutor, observador e vaga de resgate), condutor habilitado como motonauta e aquaviário, e espelho de grande ângulo.',
    normReference: 'NORMAM-212 / Apostila Unidade 1 pág. 11 e 12'
  }
];

let nextId = currentQuestions.reduce((max, q) => Math.max(max, q.id || 0), 0) + 1;

newApostilaQuestions.forEach(q => {
  currentQuestions.push({
    id: nextId++,
    topic: q.topic,
    subtopic: q.subtopic,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    normReference: q.normReference,
    image: null,
    answer: q.correctIndex,
    reference: q.normReference
  });
});

fs.writeFileSync(questionsPath, JSON.stringify(currentQuestions, null, 2), 'utf8');
console.log(`Questões adicionadas com sucesso! Novo total: ${currentQuestions.length}`);
