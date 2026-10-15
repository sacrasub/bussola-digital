// Script to generate and append 90 official nautical questions to questions.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsPath = path.resolve(__dirname, '../public/data/questions.json');

const currentQuestions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
let nextId = Math.max(...currentQuestions.map(q => q.id)) + 1;

console.log(`Current questions count: ${currentQuestions.length}, starting nextId: ${nextId}`);

const newQuestions = [
  // ==========================================
  // 1. RIPEAM (40 QUESTÕES: IDs 295 a 334)
  // ==========================================
  {
    topic: 'RIPEAM',
    subtopic: 'Roda a Roda (Regra 14)',
    question: 'Durante o dia em mar aberto, duas embarcações a propulsão mecânica aproximam-se em rumos diretamente opostos com risco de colisão. Conforme o RIPEAM-72, qual a ação manobra regulamentar?',
    options: [
      'Ambas devem guinar para boreste, de modo a passarem bombordo com bombordo',
      'Ambas devem guinar para bombordo, passando boreste com boreste',
      'A embarcação de menor tonelagem deve manobrar para boreste e a maior mantém o rumo',
      'Apenas a embarcação que avistar a outra primeiro deve manobrar'
    ],
    correctIndex: 0,
    explanation: 'A Regra 14 do RIPEAM (Situação de Roda a Roda) determina categoricamente que ambas as embarcações a propulsão mecânica devem guinar para boreste, passando bombordo com bombordo.',
    normReference: 'RIPEAM-72 Regra 14 (Situação de Roda a Roda)',
    image: 'maneuver_head_on'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Roda a Roda Noturno (Regra 14)',
    question: 'À noite, um navegador avista pela sua proa as luzes de mastro alinhadas e simultaneamente as luzes verde e encarnada de outra embarcação. Qual situação isso caracteriza e o que fazer?',
    options: [
      'Situação de roda a roda; deve guinar imediatamente para boreste',
      'Situação de rumos cruzados; deve manter o rumo e a velocidade',
      'Situação de alcançado; deve diminuir a velocidade',
      'Embarcação sem governo; deve parar as máquinas'
    ],
    correctIndex: 0,
    explanation: 'Avistar ambas as luzes de bordos (verde e vermelha) simultaneamente indica que a outra embarcação está vindo diretamente contra a sua proa (roda a roda). Manobra: guinar para boreste.',
    normReference: 'RIPEAM-72 Regra 14(b)',
    image: 'maneuver_head_on'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Rumos Cruzados (Regra 15)',
    question: 'Em situação de rumos cruzados entre duas lanchas a motor em águas abertas, qual embarcação tem a preferência de passagem?',
    options: [
      'A embarcação que avistar a outra por seu próprio bombordo tem a preferência e deve manter rumo e velocidade',
      'A embarcação que avistar a outra por seu próprio boreste tem a preferência',
      'A embarcação que estiver com maior velocidade sempre tem a preferência',
      'A embarcação que navega a favor da correnteza'
    ],
    correctIndex: 0,
    explanation: 'Regra 15 do RIPEAM: Quando duas embarcações a propulsão mecânica cruzam com risco de abalroamento, aquela que tem a outra por boreste deve desviar. Logo, quem vê a outra por bombordo mantém o rumo (tem a preferência).',
    normReference: 'RIPEAM-72 Regra 15 (Situação de Rumos Cruzados)',
    image: 'maneuver_crossing'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Rumos Cruzados - Manobra (Regra 15 e 16)',
    question: 'Ao navegar de lancha, você avista uma embarcação a motor aproximando-se pelo seu setor de boreste (sua direita) em rumo de colisão. Como você deve agir?',
    options: [
      'Você deve manobrar, alterando o rumo (preferencialmente para boreste) ou reduzindo a velocidade para passar pela popa da outra embarcação',
      'Você deve acelerar para cruzar na frente da proa da outra embarcação',
      'Você mantém seu rumo inalterado porque está navegando em canal',
      'Você deve dar ré imediatamente sem alterar o leme'
    ],
    correctIndex: 0,
    explanation: 'Se a outra embarcação vem pelo seu boreste, você é a embarcação obrigada a manobrar (Regra 15 e 16). Deve manobrar com antecedência e firmeza, evitando cortar a proa da outra.',
    normReference: 'RIPEAM-72 Regras 15 e 16 (Ação da Embarcação Obrigada a Manobrar)',
    image: 'maneuver_crossing'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Embarcação Alcançada (Regra 13)',
    question: 'Como se define tecnicamente uma situação de ultrapassagem (embarcação alcançada) segundo o RIPEAM-72?',
    options: [
      'Quando uma embarcação aproxima-se de outra vindo de uma direção superior a 22,5 graus para ré do través (setor de sua luz de alcançado)',
      'Quando uma embarcação navega mais rápido a menos de 100 metros de distância',
      'Quando duas embarcações navegam no mesmo rumo paralelamente',
      'Quando uma lancha cruza a esteira de outra a menos de 50 metros'
    ],
    correctIndex: 0,
    explanation: 'A Regra 13 define que uma embarcação é considerada alcançadora quando se aproxima de outra vindo de um setor maior que 22,5° para ré do través desta, enxergando à noite apenas a luz branca de popa/alcançado.',
    normReference: 'RIPEAM-72 Regra 13(b) (Embarcação Alcançada)',
    image: 'maneuver_overtaking'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Dever na Ultrapassagem (Regra 13)',
    question: 'Uma lancha rápida a motor aproxima-se pela popa de um veleiro para ultrapassá-lo. Quem tem o dever de manobrar para manter-se fora do caminho?',
    options: [
      'A lancha (embarcação alcançadora), pois qualquer embarcação que alcance outra deve manter-se fora do seu caminho',
      'O veleiro, pois a lancha tem maior velocidade de governo',
      'O veleiro, porque embarcações a vela não podem manobrar em canais',
      'Ambas devem guinar 90 graus para bordos opostos'
    ],
    correctIndex: 0,
    explanation: 'Regra de Ouro da Regra 13(a): "Toda embarcação que alcance qualquer outra deverá manter-se fora do caminho da alcançada". A regra de ultrapassagem se sobrepõe inclusive à preferência de barcos a vela!',
    normReference: 'RIPEAM-72 Regra 13(a)',
    image: 'maneuver_overtaking'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luzes de Navegação (Regra 21)',
    question: 'Qual é o setor de visibilidade e a cor regulamentar da luz de alcançado (popa) de uma embarcação?',
    options: [
      'Cor branca, com setor ininterrupto de 135 graus voltado para a popa',
      'Cor branca, com setor ininterrupto de 360 graus visível em todo o horizonte',
      'Cor amarela, com setor ininterrupto de 225 graus voltado para ré',
      'Cor encarnada, com setor ininterrupto de 112,5 graus'
    ],
    correctIndex: 0,
    explanation: 'A luz de alcançado (popa) é uma luz branca que projeta seu feixe num setor de 135 graus (67,5 graus para cada bordo a partir da popa).',
    normReference: 'RIPEAM-72 Regra 21(c)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luzes de Bordos (Regra 21)',
    question: 'Quais são as cores e setores das luzes de bordos em uma embarcação de esporte e recreio?',
    options: [
      'Verde a boreste e encarnada a bombordo, ambas com setor de 112,5 graus a partir da proa',
      'Encarnada a boreste e verde a bombordo, ambas com setor de 180 graus',
      'Ambas verdes com setor de 135 graus',
      'Branca a boreste e amarela a bombordo com setor de 90 graus'
    ],
    correctIndex: 0,
    explanation: 'Boreste (direita) = Verde; Bombordo (esquerda) = Encarnada (vermelha). Ambas possuem setor de 112,5° contados a partir da proa até 22,5° para ré do través.',
    normReference: 'RIPEAM-72 Regra 21(b)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luz de Mastro (Regra 21)',
    question: 'Qual o arco de horizonte e a cor da luz de mastro de uma embarcação a propulsão mecânica em movimento?',
    options: [
      'Luz branca com setor de 225 graus, visível desde a proa até 22,5 graus para ré do través em ambos os bordos',
      'Luz branca com setor de 360 graus visível em todo o horizonte',
      'Luz amarela com setor de 180 graus',
      'Luz verde com setor de 112,5 graus'
    ],
    correctIndex: 0,
    explanation: 'A luz de mastro é branca e cobre um arco de horizonte de 225 graus na proa (112,5° para cada bordo a partir da linha de centro da proa).',
    normReference: 'RIPEAM-72 Regra 21(a)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luzes de Embarcação Fundeada (Regra 30)',
    question: 'Uma embarcação de esporte e recreio com menos de 50 metros de comprimento, quando fundeada à noite, deve exibir obrigatoriamente:',
    options: [
      'Uma luz branca visível em todo o horizonte (360 graus) no local mais visível (geralmente na proa)',
      'As luzes de bordos verde e encarnada piscando alternadamente',
      'Duas luzes encarnadas em linha vertical no mastro',
      'Apenas a luz de alcançado amarela na popa'
    ],
    correctIndex: 0,
    explanation: 'Regra 30(a): Embarcação fundeada com menos de 50 metros deve exibir onde melhor possa ser vista uma luz branca visível em todo o horizonte (luz de fundeio de 360°).',
    normReference: 'RIPEAM-72 Regra 30(a)',
    image: 'day_shape_anchored'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Marcas Diurnas de Fundeio (Regra 30)',
    question: 'Durante o dia, qual marca uma embarcação fundeada deve exibir obrigatoriamente no mastro de vante?',
    options: [
      'Uma esfera preta',
      'Dois cones pretos unidos pelos vértices',
      'Um cilindro preto',
      'Duas esferas pretas sobrepostas'
    ],
    correctIndex: 0,
    explanation: 'Embarcação fundeada de dia deve içar uma esfera preta na parte de vante (Regra 30).',
    normReference: 'RIPEAM-72 Regra 30(a)',
    image: 'day_shape_anchored'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Embarcação Sem Governo (Regra 27)',
    question: 'Uma embarcação que se encontra sem governo (avariada e incapaz de manobrar), à noite, deve exibir verticalmente:',
    options: [
      'Duas luzes encarnadas visíveis em todo o horizonte (360 graus)',
      'Duas luzes brancas de mastro alinhadas',
      'Três luzes verdes em triângulo',
      'Uma luz encarnada e uma luz verde sobrepostas'
    ],
    correctIndex: 0,
    explanation: 'Regra 27(a): Uma embarcação sem governo deve exibir duas luzes encarnadas em linha vertical visíveis em todo o horizonte (360°). De dia, exibe duas esferas pretas verticais.',
    normReference: 'RIPEAM-72 Regra 27(a)',
    image: 'day_shape_not_under_command'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Marca Diurna Sem Governo (Regra 27)',
    question: 'Qual é a marca diurna que identifica uma embarcação sem governo?',
    options: [
      'Duas esferas pretas dispostas em linha vertical no mastro',
      'Dois losangos pretos sobrepostos',
      'Um cone preto com o vértice para baixo',
      'Uma bandeira amarela quadrada'
    ],
    correctIndex: 0,
    explanation: 'Regra 27(a)(ii): Duas esferas pretas dispostas verticalmente indicam embarcação sem governo ("Not Under Command").',
    normReference: 'RIPEAM-72 Regra 27(a)',
    image: 'day_shape_not_under_command'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Capacidade de Manobra Restrita (Regra 27)',
    question: 'Quais luzes verticais identificam uma embarcação com capacidade de manobra restrita (draga ou faina de cabos submarinos)?',
    options: [
      'Três luzes em linha vertical: Encarnada - Branca - Encarnada (360 graus)',
      'Três luzes encarnadas verticais',
      'Três luzes brancas verticais',
      'Duas luzes verdes e uma branca no centro'
    ],
    correctIndex: 0,
    explanation: 'Regra 27(b): Embarcação com capacidade de manobra restrita exibe verticalmente: Encarnada no topo, Branca no meio e Encarnada na base.',
    normReference: 'RIPEAM-72 Regra 27(b)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais de Manobra em Visibilidade Boa (Regra 34)',
    question: 'Ao avistar outra embarcação e efetuar uma guinada para BORESTE, qual sinal sonoro regulamentar deve ser emitido pelo apito?',
    options: [
      '1 apito curto (duração de cerca de 1 segundo)',
      '2 apitos curtos',
      '3 apitos curtos',
      '1 apito longo de 4 a 6 segundos'
    ],
    correctIndex: 0,
    explanation: 'Regra 34(a): 1 apito curto significa "Estou guinando para boreste".',
    normReference: 'RIPEAM-72 Regra 34(a)',
    image: 'sound_signals'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinais de Manobra - Bombordo (Regra 34)',
    question: 'Qual é o significado sonoro emitido por uma embarcação a motor ao soar 2 APITOS CURTOS?',
    options: [
      'Estou guinando para bombordo',
      'Estou dando atrás com as máquinas',
      'Estou fundeado em nevoeiro',
      'Peço passagem pelo seu canal'
    ],
    correctIndex: 0,
    explanation: 'Regra 34(a): 2 apitos curtos significam "Estou guinando para bombordo".',
    normReference: 'RIPEAM-72 Regra 34(a)',
    image: 'sound_signals'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinal de Máquinas Dando Atrás (Regra 34)',
    question: 'O sinal de 3 APITOS CURTOS emitido por uma embarcação indica:',
    options: [
      'Minhas máquinas estão dando atrás (marcha a ré engatada)',
      'Estou manobrando para boreste',
      'Estou desgovernado no canal',
      'Estou fundeando minha âncora'
    ],
    correctIndex: 0,
    explanation: 'Regra 34(a): 3 apitos curtos significam "Minhas máquinas estão dando atrás".',
    normReference: 'RIPEAM-72 Regra 34(a)',
    image: 'sound_signals'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinal de Dúvida ou Perigo (Regra 34)',
    question: 'Quando uma embarcação não compreende as intenções de manobra de outra ou duvida de sua ação para evitar colisão, qual sinal deve emitir?',
    options: [
      'No mínimo 5 apitos curtos e rápidos',
      '1 apito longo contínuo',
      '3 apitos longos e espaçados',
      '2 apitos curtos seguidos de 1 longo'
    ],
    correctIndex: 0,
    explanation: 'Regra 34(d): Sinal de dúvida ou perigo imediato consiste em no mínimo 5 apitos curtos e rápidos.',
    normReference: 'RIPEAM-72 Regra 34(d)',
    image: 'sound_signals'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Curva em Canal Estreito (Regra 34)',
    question: 'Ao aproximar-se de uma curva cega em um rio ou canal estreito com visão obstruída, qual sinal sonoro o comandante deve emitir?',
    options: [
      '1 apito longo (4 a 6 segundos), devendo ser respondido com 1 longo por quem estiver do outro lado',
      '2 apitos curtos rápidos',
      '3 apitos longos sucessivos',
      'Tocar o sino continuamente por 5 segundos'
    ],
    correctIndex: 0,
    explanation: 'Regra 34(e): Na aproximação de curva ou trecho cego de canal, a embarcação deve emitir 1 apito longo, que deve ser respondido do mesmo modo por qualquer embarcação que se aproxime do outro lado.',
    normReference: 'RIPEAM-72 Regra 34(e)',
    image: 'sound_signals'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Cerração / Nevoeiro - Com Seguimento (Regra 35)',
    question: 'Em visibilidade restrita (nevoeiro/cerração), uma embarcação de propulsão mecânica navegando COM SEGUIMENTO deve soar:',
    options: [
      '1 apito longo a intervalos não superiores a 2 minutos',
      '2 apitos longos a cada 1 minuto',
      '1 apito curto e 1 longo a cada 3 minutos',
      '5 apitos curtos a cada 30 segundos'
    ],
    correctIndex: 0,
    explanation: 'Regra 35(a): Uma embarcação de propulsão mecânica com seguimento navegando em cerração deve emitir 1 apito longo em intervalos não superiores a 2 minutos.',
    normReference: 'RIPEAM-72 Regra 35(a)',
    image: 'sound_signals'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Cerração - Parada Sob Máquinas (Regra 35)',
    question: 'Em visibilidade restrita, uma embarcação a motor sob máquinas, porém PARADA E SEM SEGUIMENTO, deve emitir:',
    options: [
      '2 apitos longos consecutivos separados por intervalo de cerca de 2 segundos, a intervalos não superiores a 2 minutos',
      '1 apito longo a cada 5 minutos',
      '3 apitos curtos a cada 2 minutos',
      'Badaladas de sino na proa e no gongo na popa'
    ],
    correctIndex: 0,
    explanation: 'Regra 35(b): Embarcação a propulsão mecânica em cerração, parada e sem seguimento, deve soar 2 apitos longos consecutivos (com intervalo de 2s entre eles) a cada 2 minutos.',
    normReference: 'RIPEAM-72 Regra 35(b)',
    image: 'sound_signals'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Hierarquia de Preferência (Regra 18)',
    question: 'Entre uma lancha a motor, um barco pesqueiro rebocando redes de arrasto e um veleiro navegando à vela, qual é a ordem decrescente de preferência de passagem?',
    options: [
      '1º Barco de pesca, 2º Veleiro, 3º Lancha a motor',
      '1º Lancha a motor, 2º Veleiro, 3º Barco de pesca',
      '1º Veleiro, 2º Lancha a motor, 3º Barco de pesca',
      'Todos possuem igual preferência e devem guinar para boreste'
    ],
    correctIndex: 0,
    explanation: 'Regra 18 do RIPEAM: Barcos em faina de pesca têm preferência sobre veleiros, e veleiros têm preferência sobre embarcações de propulsão mecânica convencionais.',
    normReference: 'RIPEAM-72 Regra 18',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Veleiro a Motor (Regra 18)',
    question: 'Um veleiro içou suas velas, porém está navegando com seu motor de centro engatado e em funcionamento. Perante as regras do RIPEAM, como ele é classificado?',
    options: [
      'É considerado estritamente uma embarcação a propulsão mecânica, perdendo os privilégios de barco a vela',
      'Continua tendo preferência de veleiro porque as velas estão desfraldadas',
      'É considerado embarcação sem governo',
      'É considerado embarcação especial com prioridade máxima'
    ],
    correctIndex: 0,
    explanation: 'Conforme a Regra 3(c) e 25(e), um barco a vela navegando com propulsão mecânica operando é considerado embarcação a propulsão mecânica para todos os efeitos de manobra e preferência.',
    normReference: 'RIPEAM-72 Regra 3(c) e Regra 25(e)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Veleiro de Dia com Motor (Regra 25)',
    question: 'Durante o dia, qual marca uma embarcação a vela navegando também a motor deve exibir obrigatoriamente na parte de vante?',
    options: [
      'Um cone preto com o vértice voltado para baixo',
      'Uma esfera preta',
      'Dois cones com os vértices unidos',
      'Um cilindro preto'
    ],
    correctIndex: 0,
    explanation: 'Regra 25(e): Uma embarcação navegando a vela e simultaneamente a motor deve exibir a vante, onde melhor possa ser visto, um cone com o vértice apontado para baixo.',
    normReference: 'RIPEAM-72 Regra 25(e)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Canais Estreitos (Regra 9)',
    question: 'Ao navegar ao longo de um canal estreito ou via de acesso balizada, qual lado da via uma embarcação deve manter?',
    options: [
      'O limite exterior do canal que estiver a seu boreste (lado direito), tão próximo quanto for seguro',
      'O centro exato do canal onde a profundidade é maior',
      'O limite de bombordo (lado esquerdo) para facilitar ultrapassagens',
      'O lado que apresentar menor ondulação'
    ],
    correctIndex: 0,
    explanation: 'Regra 9(a): Em canais estreitos, as embarcações devem se manter tão próximas do limite exterior do canal que estiver a seu boreste quanto for seguro.',
    normReference: 'RIPEAM-72 Regra 9(a) (Canais Estreitos)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Velocidade de Segurança (Regra 6)',
    question: 'O que define a "velocidade de segurança" segundo a Regra 6 do RIPEAM?',
    options: [
      'Aquela que possibilita à embarcação tomar medidas apropriadas para evitar colisão e parar a uma distância adequada às circunstâncias',
      'Navegar sempre abaixo de 10 nós em qualquer situação',
      'A velocidade máxima indicada pelo manual do estaleiro da lancha',
      'Navegar na metade da rotação máxima dos motores'
    ],
    correctIndex: 0,
    explanation: 'Velocidade de segurança é aquela que permite ação eficaz para evitar colisão e parar na distância compatível com a visibilidade, estado do mar, vento e tráfego local.',
    normReference: 'RIPEAM-72 Regra 6 (Velocidade de Segurança)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Vigilância Adequada (Regra 5)',
    question: 'Qual é a obrigação de vigilância de qualquer embarcação segundo o RIPEAM-72?',
    options: [
      'Manter vigilância visual e auditiva apropriada e constante, utilizando todos os meios disponíveis em todo o tempo',
      'Vigiar apenas pela proa com binóculo durante o dia',
      'Ligar o piloto automático e delegar a visão a passageiros',
      'Manter vigilância apenas quando a velocidade for superior a 15 nós'
    ],
    correctIndex: 0,
    explanation: 'Regra 5: Toda embarcação deve manter vigilância constante, visual e auditiva, para avaliar plenamente a situação e o risco de abalroamento.',
    normReference: 'RIPEAM-72 Regra 5 (Vigilância)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Risco de Abalroamento (Regra 7)',
    question: 'Como um condutor pode comprovar praticamente se existe risco de abalroamento com outra embarcação que se aproxima?',
    options: [
      'Verificando se a marcação da agulha (azimute) da outra embarcação não se altera de modo apreciável enquanto a distância diminui',
      'Observando se a outra embarcação emite sinais sonoros',
      'Verificando se a velocidade do vento está aumentando',
      'Comparando o comprimento de ambas as embarcações'
    ],
    correctIndex: 0,
    explanation: 'Regra 7(d)(i): Haverá risco evidente de colisão se a marcação na bússola da embarcação que se aproxima permanecer constante enquanto a distância se reduz.',
    normReference: 'RIPEAM-72 Regra 7(d)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luzes de Reboque (Regra 24)',
    question: 'À noite, uma embarcação rebocando outra, cujo comprimento do reboque (da popa do rebocador à popa do rebocado) SEJA INFERIOR A 200 METROS, deve exibir:',
    options: [
      'Duas luzes brancas de mastro em linha vertical (mais luzes de bordos e alcançado)',
      'Três luzes brancas de mastro em linha vertical',
      'Uma luz encarnada e uma luz verde verticais',
      'Duas luzes amarelas giratórias'
    ],
    correctIndex: 0,
    explanation: 'Regra 24(a): Se o reboque medir até 200 metros, exibe 2 luzes brancas verticais de mastro. Se ultrapassar 200 metros, exibe 3 luzes brancas verticais.',
    normReference: 'RIPEAM-72 Regra 24(a)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luz Amarela de Reboque (Regra 24)',
    question: 'Qual é a característica da luz amarela exibida na popa de uma embarcação engajada em operação de reboque?',
    options: [
      'Luz amarela com o mesmo setor de visibilidade da luz de alcançado (135 graus), posicionada verticalmente acima desta',
      'Luz amarela de 360 graus piscante',
      'Luz amarela de proa com setor de 225 graus',
      'Luz estroboscópica de salvamento'
    ],
    correctIndex: 0,
    explanation: 'Regra 24(a)(iv): A luz de reboque é amarela com arco de 135° na popa, situada acima da luz de alcançado.',
    normReference: 'RIPEAM-72 Regra 24(a)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luz de Embarcação a Remo (Regra 25)',
    question: 'Uma embarcação pequena a remos (caiaque, bote) navegando à noite deve ter a bordo e pronta para uso:',
    options: [
      'Uma lanterna elétrica manual que emita luz branca, acendida com tempo suficiente para evitar colisão',
      'Luzes fixas de bordos a bateria de 12 volts',
      'Um sinalizador pirotécnico de paraquedas',
      'Uma luz encarnada fixa na proa'
    ],
    correctIndex: 0,
    explanation: 'Regra 25(d)(ii): Embarcação miúda a remo pode dispensar luzes fixas, desde que tenha lanterna com luz branca pronta para ser mostrada a tempo de evitar colisão.',
    normReference: 'RIPEAM-72 Regra 25(d)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luzes de Embarcação Piloto (Regra 29)',
    question: 'Quais luzes verticais de topo identificam uma lancha de prático (embarcação de prático em serviço)?',
    options: [
      'Duas luzes em linha vertical: Branca sobre Encarnada ("Branca a cabeleira, vermelha a bandeira")',
      'Duas luzes encarnadas sobrepostas',
      'Verde sobre Branca',
      'Encarnada sobre Verde'
    ],
    correctIndex: 0,
    explanation: 'Regra 29(a): Embarcação de prático em serviço exibe duas luzes no mastro em linha vertical: Branca no topo e Encarnada na base.',
    normReference: 'RIPEAM-72 Regra 29(a)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Luzes de Pesca com Redes de Arrasto (Regra 26)',
    question: 'Uma embarcação engajada na pesca de arrasto exibe à noite no mastro:',
    options: [
      'Verde sobre Branca em linha vertical visíveis em todo o horizonte',
      'Branca sobre Encarnada em linha vertical',
      'Duas luzes encarnadas em linha vertical',
      'Luz amarela intermitente'
    ],
    correctIndex: 0,
    explanation: 'Regra 26(b): Pesca de arrasto exibe Verde sobre Branca ("Verde mar, branca a espumar").',
    normReference: 'RIPEAM-72 Regra 26(b)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Pesca Sem Arrasto (Regra 26)',
    question: 'Embarcação em faina de pesca comum (sem arrasto, ex: espinhel ou linhas) exibe verticalmente:',
    options: [
      'Encarnada sobre Branca em linha vertical',
      'Verde sobre Branca em linha vertical',
      'Branca sobre Encarnada em linha vertical',
      'Duas esferas pretas'
    ],
    correctIndex: 0,
    explanation: 'Regra 26(c): Pesca que não de arrasto exibe Encarnada sobre Branca ("Vermelha a boia, branca a linha").',
    normReference: 'RIPEAM-72 Regra 26(c)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Sinal de Embarcação Encalhada (Regra 30)',
    question: 'Uma embarcação encalhada deve exibir à noite, além das luzes de fundeio correspondentes:',
    options: [
      'Duas luzes encarnadas em linha vertical visíveis em 360 graus',
      'Duas luzes verdes em linha vertical',
      'Três luzes brancas em triângulo',
      'Uma luz azul rotativa'
    ],
    correctIndex: 0,
    explanation: 'Regra 30(d): Embarcação encalhada deve exibir as luzes de fundeio e, adicionalmente, onde melhor possam ser vistas, 2 luzes encarnadas verticais (de dia, 3 esferas pretas verticais).',
    normReference: 'RIPEAM-72 Regra 30(d)',
    image: 'nav_lights'
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Marca Diurna de Embarcação Encalhada (Regra 30)',
    question: 'Durante o dia, qual marca uma embarcação encalhada deve exibir no mastro?',
    options: [
      'Três esferas pretas dispostas em linha vertical',
      'Duas esferas pretas verticais',
      'Um cone com vértice para cima',
      'Dois losangos pretos'
    ],
    correctIndex: 0,
    explanation: 'Regra 30(d)(ii): Três esferas pretas verticais identificam embarcação encalhada de dia.',
    normReference: 'RIPEAM-72 Regra 30(d)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Preferência entre Barcos a Vela (Regra 12)',
    question: 'Quando dois veleiros se aproximam com risco de colisão e recebem o vento em BORDOS DIFERENTES, quem deve manobrar?',
    options: [
      'O veleiro que receber o vento por BOMBORDO deve se manter fora do caminho do veleiro que recebe o vento por boreste',
      'O veleiro que estiver a sotavento deve manobrar',
      'O veleiro mais longo deve desviar',
      'Ambos devem entrar em roda a roda'
    ],
    correctIndex: 0,
    explanation: 'Regra 12(a)(i): Quando recebem vento em bordos diferentes, o veleiro com vento por bombordo deve manobrar e desviar do veleiro com vento por boreste.',
    normReference: 'RIPEAM-72 Regra 12(a)(i)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Veleiros com Vento no Mesmo Bordo (Regra 12)',
    question: 'Quando dois veleiros recebem o vento PELO MESMO BORDO com risco de colisão, quem deve se manter fora do caminho?',
    options: [
      'O veleiro que estiver a BARLAVENTO deve se manter fora do caminho do veleiro a SOTAVENTO',
      'O veleiro a sotavento deve manobrar para o barlavento',
      'O veleiro mais rápido deve guinar para bombordo',
      'O veleiro que estiver com a vela mestra içada'
    ],
    correctIndex: 0,
    explanation: 'Regra 12(a)(ii): Se ambos recebem o vento pelo mesmo bordo, a embarcação que estiver a barlavento (lado de onde sopra o vento) deve desviar da que estiver a sotavento.',
    normReference: 'RIPEAM-72 Regra 12(a)(ii)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Ação da Embarcação que Tem Preferência (Regra 17)',
    question: 'Em uma situação onde a sua embarcação possui a preferência de passagem perante outra, qual é a sua conduta inicial obrigatória?',
    options: [
      'Manter seu rumo e sua velocidade inalterados, acompanhando attentamente a atitude da outra',
      'Acelerar imediatamente para passar logo antes do perigo',
      'Guinar imediatamente para bombordo',
      'Emitir 5 apitos longos e parar as máquinas'
    ],
    correctIndex: 0,
    explanation: 'Regra 17(a)(i): A embarcação que tem preferência deve inicialmente manter seu rumo e sua velocidade para permitir que a manobradora execute sua ação.',
    normReference: 'RIPEAM-72 Regra 17(a)',
    image: null
  },
  {
    topic: 'RIPEAM',
    subtopic: 'Ação Extrema para Evitar Colisão (Regra 17)',
    question: 'Se a embarcação com preferência notar que a outra NÃO está tomando as medidas cabíveis para evitar colisão, o que a Regra 17 determina?',
    options: [
      'Ela própria deve manobrar por sua própria iniciativa da melhor forma para ajudar a evitar o abalroamento',
      'Deve manter o rumo mesmo que colida, pois a culpa jurídica é da outra',
      'Deve soltar a âncora imediatamente em qualquer profundidade',
      'Deve desligar as luzes de navegação'
    ],
    correctIndex: 0,
    explanation: 'Regra 17(a)(ii) e 17(b): A preferência nunca concede direito de colisão. Caso a manobradora falhe, a que tem preferência é obrigada a agir para salvar a embarcação.',
    normReference: 'RIPEAM-72 Regra 17(b)',
    image: null
  },

  // ==========================================
  // 2. BALIZAMENTO IALA REGIÃO B (30 QUESTÕES: IDs 335 a 364)
  // ==========================================
  {
    topic: 'Balizamento',
    subtopic: 'Sentido Convencional do Balizamento',
    question: 'No Sistema de Balizamento IALA Região B (adotado no Brasil), qual é a regra do "Sentido Convencional do Balizamento" ao entrar em um porto ou subir um rio?',
    options: [
      'Quem entra no porto ou sobe o rio deixa os sinais de BORESTE (VERDES) por seu boreste e BOMBORDO (ENCARNADOS) por seu bombordo',
      'Quem sobe o rio deixa os sinais vermelhos a boreste',
      'Quem desce o rio deixa os verdes a boreste',
      'O sentido do balizamento independe da foz ou nascente'
    ],
    correctIndex: 0,
    explanation: 'Regra de ouro IALA Região B: Entrando do mar para o porto ou subindo rio (da foz para a nascente): BORESTE = VERDE (fica a boreste) e BOMBORDO = ENCARNADO (fica a bombordo).',
    normReference: 'Sistema IALA B / NORMAM-211 Anexo 5-H',
    image: 'buoy_starboard'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Descida de Rio / Saída de Porto',
    question: 'Ao SAIR de um porto brasileiro em direção ao mar aberto (descendo o canal), por qual bordo o condutor deve deixar uma boia ENCARNADA (vermelha cilíndrica)?',
    options: [
      'Deve deixá-la por seu BORESTE (estibordo/lado direito da lancha)',
      'Deve deixá-la por seu bombordo',
      'Deve passar por cima da boia',
      'Deve ignorá-la porque sinais só valem na subida'
    ],
    correctIndex: 0,
    explanation: 'Na descida do rio ou saída de porto, as regras se invertem em relação à embarcação: a boia encarnada (que fica no bordo esquerdo de quem sobe) ficará à direita (boreste) de quem desce em direção ao mar.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_port'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Lateral de Boreste (IALA B)',
    question: 'Quais são as características completas (cor, formato de boia, marca de tope e cor da luz) do sinal lateral de BORESTE no IALA B?',
    options: [
      'Cor verde, formato cônico/pilar/charuto, marca de tope: um cone verde com vértice para cima, luz verde',
      'Cor encarnada, formato cilíndrico, marca de tope cilíndrica, luz encarnada',
      'Cor amarela, formato esférico, marca em X, luz amarela',
      'Preto e vermelho, duas esferas pretas, luz branca'
    ],
    correctIndex: 0,
    explanation: 'Sinal de Boreste (IALA B): Verde, corpo cônico ou pilar, tope em cone verde ponta para cima, luz verde com qualquer ritmo exceto Fl(2+1).',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_starboard'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Lateral de Bombordo (IALA B)',
    question: 'Quais são as características (cor, formato e marca de tope) do sinal lateral de BOMBORDO no IALA B?',
    options: [
      'Cor encarnada (vermelha), formato cilíndrico (can), marca de tope: um cilindro encarnado, luz encarnada',
      'Cor verde, formato cônico, marca em cone verde',
      'Cor branca e encarnada em faixas verticais, tope esférico',
      'Cor preta e amarela, dois cones pretos'
    ],
    correctIndex: 0,
    explanation: 'Sinal de Bombordo (IALA B): Encarnado, formato cilíndrico (ou charuto/pilar), tope cilíndrico encarnado e luz encarnada.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_port'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Canal Preferencial a Boreste',
    question: 'Ao subir um canal, você avista uma boia com cor VERMELHA tendo uma FAIXA HORIZONTAL VERDE no meio. Qual é o significado desta boia?',
    options: [
      'Canal Preferencial a BORESTE (o canal principal segue pelo lado de boreste da boia; bombordo da boia é o canal secundário)',
      'Canal Preferencial a Bombordo',
      'Perigo isolado intransponível',
      'Águas seguras para banho'
    ],
    correctIndex: 0,
    explanation: 'Boia encarnada com faixa verde central indica Canal Preferencial a Boreste (o canal preferencial fica à direita da boia para quem sobe). A cor do tope e do corpo principal dita o bordo do canal principal.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_preferred_channel'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Canal Preferencial a Bombordo',
    question: 'Uma boia VERDE com uma FAIXA HORIZONTAL ENCARNADA (vermelha) no centro indica:',
    options: [
      'Canal Preferencial a BOMBORDO (o canal principal segue deixando a boia por seu boreste)',
      'Canal Preferencial a Boreste',
      'Submarino submerso',
      'Área de fundeio de lanchas'
    ],
    correctIndex: 0,
    explanation: 'Boia verde com faixa encarnada indica que o canal principal segue pelo lado de bombordo da boia (Canal Preferencial a Bombordo). Seu ritmo luminoso é Fl(2+1)G.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_preferred_channel'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Ritmo Luminoso de Canal Preferencial',
    question: 'Qual é a característica do lampejo luminoso das boias de canal preferencial (modificação de canal)?',
    options: [
      'Grupo de lampejos compostos (2 + 1 lampejos)',
      'Lampejo contínuo rápido de 60 por minuto',
      'Isoluminoso com períodos iguais de luz e escuridão',
      'Luz fixa ininterrupta'
    ],
    correctIndex: 0,
    explanation: 'Sinais de canal preferencial emitem luz verde ou encarnada com ritmo luminoso característico de grupo de lampejos compostos: Fl(2+1).',
    normReference: 'Sistema IALA B',
    image: 'buoy_preferred_channel'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Boia de Perigo Isolado',
    question: 'Quais são as cores, a marca de tope e a cor da luz de uma boia de PERIGO ISOLADO?',
    options: [
      'Cores PRETA com uma ou mais faixas horizontais ENCARNADAS; tope de DUAS ESFERAS PRETAS superpostas; luz BRANCA com grupo de 2 lampejos Fl(2)',
      'Faixas verticais vermelhas e brancas com uma esfera vermelha',
      'Toda amarela com marca em cruz amarela',
      'Verde e amarela em faixas com luz verde fixa'
    ],
    correctIndex: 0,
    explanation: 'Perigo Isolado: Marca um obstáculo pontual com águas navegáveis ao seu redor. Pintura preta com faixas encarnadas, tope de 2 esferas pretas superpostas e luz branca em lampejos em grupo de 2 [Fl(2) B].',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_isolated_danger'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Navegação Próxima a Perigo Isolado',
    question: 'Como um navegador deve proceder ao avistar uma boia de Perigo Isolado?',
    options: [
      'Pode navegar ao redor da boia por qualquer quadrante, desde que mantenha resguardo seguro do obstáculo sinalizado',
      'Deve passar obrigatoriamente deixando-a por boreste',
      'Deve parar e lançar âncora a 10 metros',
      'Deve navegar apenas pelo quadrante norte da boia'
    ],
    correctIndex: 0,
    explanation: 'A boia de perigo isolado fica fundeada diretamente sobre ou junto ao perigo, e há águas navegáveis em toda a sua volta. O navegador pode passar por qualquer bordo mantendo distância de segurança.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_isolated_danger'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal de Águas Seguras',
    question: 'Quais são a pintura, a marca de tope e a cor da luz do sinal de ÁGUAS SEGURAS (meio de canal)?',
    options: [
      'Faixas VERTICAIS brancas e encarnadas; tope de UMA ESFERA ENCARNADA; luz BRANCA (isofásica, ocultação ou letra "A" em Morse)',
      'Faixas horizontais pretas e amarelas com duas esferas',
      'Toda azul com tope cilíndrico',
      'Preta com faixa branca e tope em cone'
    ],
    correctIndex: 0,
    explanation: 'Sinal de Águas Seguras possui faixas verticais brancas e encarnadas, tope de uma esfera encarnada e luz branca (ritmos: isofásica, ocultação, 1 lampejo longo a cada 10s ou código Morse "A" . -).',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_safe_water'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Utilidade de Águas Seguras',
    question: 'Onde normalmente se posicionam os sinais de Águas Seguras?',
    options: [
      'Em acessos de barras de portos, águas profundas de aproximação ou linha central de canais navegáveis',
      'Em cima de pedras rasas submersas',
      'Delimitando áreas exclusivas de banhistas a 50 metros da praia',
      'Marcando cabos de fibra ótica submarinos'
    ],
    correctIndex: 0,
    explanation: 'Sinais de águas seguras indicam que há águas navegáveis em todo o entorno, sendo usados como ponto de aterrissagem, início de canal de entrada ou eixo de canal.',
    normReference: 'Sistema IALA B',
    image: 'buoy_safe_water'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Especial',
    question: 'Qual a cor de corpo, marca de tope e cor da luz de uma boia de SINAL ESPECIAL (área militar, cabos submarinos, tubulações)?',
    options: [
      'Cor AMARELA; marca de tope: uma cruz amarela em forma de "X"; luz AMARELA',
      'Cor azul e branca; marca em triângulo; luz branca',
      'Cor laranja com tope em esfera preta',
      'Cor verde com faixa preta e luz vermelha'
    ],
    correctIndex: 0,
    explanation: 'Sinais especiais são totalmente amarelos, possuem tope em cruz de Santo André ("X") amarela e luz amarela com ritmo qualquer diferente dos demais sinais.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Cardinal Norte',
    question: 'Quais são as marcas de tope e as cores do sinal CARDINAL NORTE?',
    options: [
      'Dois cones pretos superpostos apontando AMBOS PARA CIMA; metade superior PRETA e inferior AMARELA; luz branca com lampejos muito rápidos ou rápidos contínuos',
      'Dois cones com vértices para baixo; preto embaixo e amarelo em cima',
      'Dois cones com bases unidas; amarelo no centro',
      'Duas esferas pretas superpostas'
    ],
    correctIndex: 0,
    explanation: 'Cardinal Norte: Ambos os cones apontam para cima (Norte = ▲▲). Pintura: preto em cima (onde apontam os cones) e amarelo embaixo. As águas mais profundas e seguras estão ao NORTE do sinal.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_cardinal'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Navegação em Cardinal Norte',
    question: 'Ao encontrar um sinal Cardinal Norte no mar, por onde o condutor deve navegar?',
    options: [
      'Deve passar ao NORTE da boia (entre a boia e o quadrante Norte, onde as águas são seguras)',
      'Deve passar ao Sul da boia',
      'Deve contornar a boia pelo Leste obrigatoriamente',
      'Deve manter a boia encostada no bordo de boreste'
    ],
    correctIndex: 0,
    explanation: 'A regra fundamental dos sinais cardinais: O quadrante seguro de navegação é aquele que dá nome ao sinal! No Cardinal Norte, deve-se navegar ao NORTE do sinal.',
    normReference: 'Sistema IALA B',
    image: 'buoy_cardinal'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Cardinal Sul',
    question: 'Quais são as características dos cones de tope e luz do sinal CARDINAL SUL?',
    options: [
      'Dois cones pretos com vértices apontando AMBOS PARA BAIXO; luz branca com 6 lampejos rápidos (ou muito rápidos) seguidos de 1 lampejo longo',
      'Dois cones apontando para cima; luz branca contínua',
      'Dois cones unidos pelas pontas; luz branca de 9 lampejos',
      'Dois cones unidos pelas bases; luz amarela'
    ],
    correctIndex: 0,
    explanation: 'Cardinal Sul: Cones apontam para baixo (Sul = ▼▼). Luz branca com ritmo de relógio analógico na posição 6 horas: 6 lampejos rápidos seguidos de 1 longo [Q(6) + LFl 15s].',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_cardinal'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Cardinal Leste',
    question: 'Como são dispostos os cones de tope e qual o ritmo da luz do sinal CARDINAL LESTE?',
    options: [
      'Dois cones pretos UNIDOS PELAS BASES (formando um losango); luz branca com grupo de 3 lampejos (posição 3 horas do relógio)',
      'Dois cones unidos pelos vértices; 9 lampejos',
      'Dois cones apontando para cima; 1 lampejo contínuo',
      'Uma esfera e um cone'
    ],
    correctIndex: 0,
    explanation: 'Cardinal Leste: Cones unidos pelas bases (▲ sobre ▼). Luz branca em grupos de 3 lampejos (lembra a posição 3 horas no relógio). Navega-se ao LESTE do sinal.',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_cardinal'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Cardinal Oeste',
    question: 'Quais as características dos cones de tope e o ritmo de luz do sinal CARDINAL OESTE?',
    options: [
      'Dois cones pretos UNIDOS PELOS VÉRTICES (formando uma ampulheta); luz branca com grupo de 9 lampejos (posição 9 horas do relógio)',
      'Dois cones unidos pelas bases; 3 lampejos',
      'Dois cones apontando para baixo; 6 lampejos',
      'Dois cilindros pretos superpostos'
    ],
    correctIndex: 0,
    explanation: 'Cardinal Oeste: Cones unidos pelas pontas/vértices (▼ sobre ▲, formato de taça ou ampulheta). Luz branca em grupo de 9 lampejos rápidos (posição 9 horas no mostrador).',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: 'buoy_cardinal'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal de Novo Perigo',
    question: 'Qual a sinalização de um perigo recentemente ocorrido e ainda não registrado nas cartas náuticas (boia de Novo Perigo)?',
    options: [
      'Listras verticais amarelas e azuis; marca de tope de cruz amarela vertical/reta; luz alternada azul e amarela',
      'Totalmente preta com luz vermelha intermitente',
      'Listras horizontais brancas e verdes',
      'Totalmente laranja fosforescente'
    ],
    correctIndex: 0,
    explanation: 'A boia de Novo Perigo (Emergency Wreck Marking Buoy) possui faixas verticais amarelas e azuis, tope de cruz amarela vertical e luz alternando lampejos azul e amarelo.',
    normReference: 'Sistema IALA B / Diretrizes DPC',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Numeração das Boias Laterais',
    question: 'Em um canal balizado, como se dá a numeração sequencial das boias a partir da entrada da barra (subindo o canal)?',
    options: [
      'As boias de BORESTE recebem números ÍMPARES crescentes e as de BOMBORDO números PARES crescentes',
      'Boreste recebe números pares e bombordo números ímpares',
      'Todas as boias recebem numeração sequencial mista',
      'As boias nunca são numeradas, apenas identificadas por letras'
    ],
    correctIndex: 0,
    explanation: 'No IALA Região B, a numeração cresce a partir da foz/barra para montante: BORESTE = Números ÍMPARES (1, 3, 5...); BOMBORDO = Números PARES (2, 4, 6...).',
    normReference: 'Sistema IALA B / NORMAM-211',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Farol - Alcance Geográfico',
    question: 'O que é o "alcance geográfico" de um farol náutico?',
    options: [
      'A maior distância na qual a luz pode ser avistada em função da curvatura da terra e das alturas do farol e do observador',
      'A distância máxima que o feixe de lâmpada ilumina independentemente da curvatura terrestre',
      'O alcance sonoro de sua buzina em milhas',
      'A distância mínima para não encalhar nas pedras do farol'
    ],
    correctIndex: 0,
    explanation: 'Alcance geográfico é o limite visual imposto pela curvatura da Terra, dependendo da elevação do foco de luz do farol e da altura do olho do navegador sobre o nível do mar.',
    normReference: 'Navegação e Balizamento / DPC',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Farol - Alcance Luminoso',
    question: 'O "alcance luminoso" de um farol é determinado por quais fatores?',
    options: [
      'Pela intensidade luminosa (potência da lâmpada) do farol e pela visibilidade meteorológica local',
      'Pela altura do mastro do observador',
      'Pela profundidade do canal de acesso',
      'Pelo estado da maré cheia ou vazante'
    ],
    correctIndex: 0,
    explanation: 'Alcance luminoso é a distância máxima teórica que o brilho da luz atinge considerando apenas a potência do refletor e o coeficiente de transparência atmosférica (nevoeiro/chuva).',
    normReference: 'Navegação Costeira e Balizamento',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Lateral Cego',
    question: 'O que significa quando um sinal de balizamento é classificado como "sinal cego"?',
    options: [
      'É um sinal fixo ou flutuante que não possui luz noturna instalada (visível apenas de dia)',
      'É uma boia que se desprendeu da poita de fundeio',
      'É um farol avariado que teve sua lâmpada queimada',
      'É uma boia submersa de pesquisa'
    ],
    correctIndex: 0,
    explanation: 'Sinal cego é a denominação oficial para balizas ou boias desprovidas de aparelho de iluminação noturna, sendo empregadas para navegação visual diurna.',
    normReference: 'Sistema IALA B / Terminologia Náutica',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Boia Deslocada ou Apagada',
    question: 'Ao constatar que uma boia de canal está apagada à noite ou nitidamente deslocada de sua posição original, qual o dever do comandante?',
    options: [
      'Comunicar imediatamente o fato à Capitania dos Portos, Delegacia ou Agência da jurisdição',
      'Rebocar a boia com sua lancha de volta para o canal',
      'Ignorar o fato e continuar a navegação sem avisar ninguém',
      'Fundeá-la junto à praia mais próxima'
    ],
    correctIndex: 0,
    explanation: 'Qualquer anomalia no balizamento (boia apagada, avariada ou garreando fora de posição) deve ser prontamente comunicada à Autoridade Marítima para expedição de Aviso aos Navegantes.',
    normReference: 'LESTA Lei 9.537/97 e NORMAM-211',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Balizamento de Águas Interiores',
    question: 'Em rios e hidrovias navegáveis do interior do Brasil, as margens são identificadas como:',
    options: [
      'Margem direita e margem esquerda, determinadas por um observador olhando de montante para jusante (olhando da nascente para a foz)',
      'Margem norte e margem sul independentemente do fluxo do rio',
      'Margem de boreste e margem de bombordo olhando da foz para a nascente',
      'Margem comercial e margem de lazer'
    ],
    correctIndex: 0,
    explanation: 'Regra fluvial oficial: A margem direita e a margem esquerda de um curso d\'água são definidas olhando-se de montante (nascente) para jusante (foz/mar).',
    normReference: 'NORMAM-211 e Balizamento Fluvial Brasileiro',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Sinal Fluvial de Perigo',
    question: 'No balizamento de hidrovias interiores, placas retangulares com um "X" vermelho ou faixas indicam:',
    options: [
      'Indicação de perigo, obstáculo submerso ou proibição de passagem junto à margem sinalizada',
      'Ponto ideal para atracação de lanchas esportivas',
      'Local para fundeio de recreio',
      'Autorização de velocidade máxima liberada'
    ],
    correctIndex: 0,
    explanation: 'Placas e sinais marginais com cruzes ou faixas vermelhas em hidrovias alertam sobre obstruções, pedras ou margens críticas não navegáveis.',
    normReference: 'Balizamento Fluvial / NORMAM-211',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Luz Rápida Fl(Q)',
    question: 'A sigla "Q" ou "VQ" inscrita ao lado de uma boia na carta náutica refere-se a:',
    options: [
      'Luz rápida (Quick Flash) ou muito rápida (Very Quick Flash)',
      'Luz que acende a cada 15 minutos',
      'Sinal sonoro de quarto de milha',
      'Boia de qualidade questionável'
    ],
    correctIndex: 0,
    explanation: 'Q = Quick Flash (lampejo rápido de 50 a 79 lampejos por minuto); VQ = Very Quick Flash (80 a 159 lampejos por minuto), comumente usado em cardinais.',
    normReference: 'Simbologia de Cartas Náuticas / DHN',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Cor do Tope e da Boia de Boreste',
    question: 'Se a marca de tope de uma boia de boreste se desprender por acidente, como o marinheiro a identifica durante o dia?',
    options: [
      'Pela cor verde do corpo e formato cônico da boia ou de sua superestrutura',
      'Pelo som que a boia emite ao bater na água',
      'Apenas esperando o anoitecer para ver a cor da lâmpada',
      'Pelo tamanho das correntes de fundeio'
    ],
    correctIndex: 0,
    explanation: 'O sistema IALA prevê redundância: a cor verde e o corpo cônico garantem a identificação diurna mesmo na ausência eventual da marca de tope.',
    normReference: 'Sistema IALA B',
    image: 'buoy_starboard'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Tope Cilíndrico',
    question: 'A marca de tope em forma de CILINDRO é exclusiva de qual sinal no IALA B?',
    options: [
      'Sinal lateral de bombordo',
      'Sinal lateral de boreste',
      'Sinal de águas seguras',
      'Sinal cardinal oeste'
    ],
    correctIndex: 0,
    explanation: 'O cilindro ("can") vermelho é a marca de tope padronizada exclusivamente para o sinal lateral de bombordo.',
    normReference: 'Sistema IALA B',
    image: 'buoy_port'
  },
  {
    topic: 'Balizamento',
    subtopic: 'Boia de Amarração e Desembarque',
    question: 'Uma boia branca com faixa azul horizontal instalada em uma enseada destina-se tipicamente a:',
    options: [
      'Amarração de embarcações (poita de amarração autorizada)',
      'Sinal de perigo militar de tiro real',
      'Marca de canal preferencial profundo',
      'Delimitação de rede de pesca artesanal'
    ],
    correctIndex: 0,
    explanation: 'Boias de amarração/poita destinam-se a prender embarcações sem lançar âncora no leito marinho, sendo identificadas com padronização diferenciada dos sinais de auxílio à navegação.',
    normReference: 'NORMAM-211 Cap. 2',
    image: null
  },
  {
    topic: 'Balizamento',
    subtopic: 'Farolete e Farol',
    question: 'Qual a principal diferença prática entre um Farol e um Farolete na sinalização náutica?',
    options: [
      'O farol possui grande estrutura e alcance luminoso superior a 10 milhas; o farolete possui menor porte e alcance luminoso de até 10 milhas náuticas',
      'Farol é sempre flutuante e farolete é fixo em terra',
      'Farolete só funciona de dia e farol à noite',
      'Farolete tem luz vermelha e farol luz verde'
    ],
    correctIndex: 0,
    explanation: 'Faróis são estruturas de grande alcance instaladas em pontos estratégicos da costa. Farolete é um auxílio luminoso menor, de alcance inferior a 10 milhas náuticas.',
    normReference: 'Manual de Auxílios à Navegação / DHN',
    image: null
  },

  // ==========================================
  // 3. MOTONAUTA & NORMAM-212 / 211 (20 QUESTÕES: IDs 365 a 384)
  // ==========================================
  {
    topic: 'Motonauta',
    subtopic: 'Distância Mínima da Praia (NORMAM-212)',
    question: 'A que distância mínima da linha de arrebentação das ondas ou de praias com banhistas é permitida a navegação e tráfego de moto aquática (jet-ski)?',
    options: [
      'A mais de 200 metros da linha base da praia ou da linha de arrebentação',
      'A mais de 50 metros da praia',
      'A mais de 500 metros em qualquer circunstância',
      'A 20 metros, desde que devagar'
    ],
    correctIndex: 0,
    explanation: 'A NORMAM-212 e NORMAM-211 determinam que embarcações motorizadas e motos aquáticas só podem navegar a mais de 200 metros de distância da praia/arrebentação, visando proteger a integridade física de banhistas.',
    normReference: 'NORMAM-212/DPC e NORMAM-211 Cap. 1',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Acesso e Saída de Praias (NORMAM-212)',
    question: 'Como deve ser realizada a manobra de aproximação ou saída de uma praia com moto aquática para colocação ou retirada na carreta?',
    options: [
      'Em velocidade mínima de governo (não superior a 3 nós), em trajetória perpendicular à praia e utilizando os canais de balizamento de acesso específicos',
      'Em alta velocidade para que o jet-ski não encalhe na areia',
      'Navegando em zigue-zague ao longo da orla',
      'Em marcha a ré com motor acelerado'
    ],
    correctIndex: 0,
    explanation: 'O acesso ou saída da praia deve ser feito estritamente em velocidade de segurança (até 3 nós), em ângulo de 90° (perpendicular) em relação à linha da praia e utilizando canal de saída se houver.',
    normReference: 'NORMAM-212/DPC Art. 0115',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Chave de Segurança / Corta-Circuito',
    question: 'Qual o uso regulamentar e obrigatório da chave de segurança (chave de corte de ignição com cordão) em motos aquáticas?',
    options: [
      'Deve estar obrigatoriamente presa ao punho, colete ou vestimenta do condutor durante todo o período de funcionamento da moto aquática',
      'Pode ficar solta no porta-luvas da moto aquática',
      'Deve ficar presa à manopla do acelerador',
      'Só é necessária quando houver passageiro na garupa'
    ],
    correctIndex: 0,
    explanation: 'A chave de corte com cordão espiral (lanyard) desliga o motor caso o condutor caia na água. É de uso obrigatório afixado ao corpo do condutor em todo momento de operação.',
    normReference: 'NORMAM-212/DPC e NORMAM-211',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Colete Salva-Vidas em Jet-Ski',
    question: 'Qual a exigência quanto ao colete salva-vidas para o condutor e passageiro de moto aquática?',
    options: [
      'Uso OBRIGATÓRIO de colete salva-vidas homologado pela DPC, permanentemente VESTIDO por todos os ocupantes',
      'O colete pode ser guardado no compartimento interno de carga',
      'Apenas o condutor precisa vestir, o passageiro pode segurar na mão',
      'O colete só é exigido para menores de 18 anos'
    ],
    correctIndex: 0,
    explanation: 'Ao contrário de lanchas onde os coletes podem ficar estivados, em moto aquática o uso do colete salva-vidas homologado é PERMANENTE e VESTIDO por todos os ocupantes.',
    normReference: 'NORMAM-212/DPC e NORMAM-211',
    image: 'first_aid'
  },
  {
    topic: 'Motonauta',
    subtopic: 'Navegação Noturna de Moto Aquática',
    question: 'O que estabelece a Autoridade Marítima (NORMAM-212) quanto à navegação noturna de motos aquáticas?',
    options: [
      'É ESTRITAMENTE PROIBIDA a navegação de moto aquática no período noturno (do pôr do sol ao nascer do sol)',
      'É permitida desde que o condutor use lanterna de cabeça',
      'É permitida apenas em lagoas e represas calmas',
      'É permitida instalando farol de milha no casco'
    ],
    correctIndex: 0,
    explanation: 'A NORMAM-212/DPC proíbe peremptoriamente a navegação de motos aquáticas à noite, em virtude da ausência de luzes de navegação regulamentares e alto risco de colisão.',
    normReference: 'NORMAM-212/DPC Art. 0112',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Idade Mínima para Conduzir Moto Aquática',
    question: 'Qual a idade mínima para conduzir moto aquática e obter a habilitação de Motonauta (MTA)?',
    options: [
      '18 anos completos',
      '16 anos com autorização por escrito dos pais',
      '21 anos',
      '14 anos com colete especial'
    ],
    correctIndex: 0,
    explanation: 'Para conduzir qualquer embarcação a motor de esporte e recreio, inclusive moto aquática, é obrigatório ter no mínimo 18 anos completos.',
    normReference: 'LESTA Lei 9.537/97 e NORMAM-211',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Transporte de Crianças em Jet-Ski',
    question: 'Segundo a regulamentação atual da Marinha do Brasil, qual a regra sobre transporte de crianças como passageiras em motos aquáticas?',
    options: [
      'É proibido transportar crianças menores de 7 anos em motos aquáticas, e a criança transportada deve conseguir apoiar os pés e segurar-se com firmeza',
      'É permitido qualquer idade desde que no colo do piloto',
      'É permitido a partir de 2 anos com colete salva-vidas infantil',
      'Crianças nunca podem andar de jet-ski sob nenhuma hipótese'
    ],
    correctIndex: 0,
    explanation: 'A NORMAM-212/DPC veda expressamente o transporte de crianças menores de 7 anos. Crianças acima de 7 anos só podem ir na garupa (nunca na frente do piloto) conseguindo apoiar os pés.',
    normReference: 'NORMAM-212/DPC Art. 0116',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Posição do Passageiro',
    question: 'Onde o passageiro de uma moto aquática deve obrigatoriamente se posicionar durante a navegação?',
    options: [
      'Atrás do condutor (na garupa), segurando-se no corpo do condutor ou nas alças próprias do assento',
      'Na frente do condutor, entre o condutor e o guidão',
      'Sentado na proa de pernas para fora',
      'Em pé nas laterais da plataforma'
    ],
    correctIndex: 0,
    explanation: 'É proibido posicionar passageiros à frente do condutor (entre o piloto e o guidão). O passageiro deve sempre se posicionar na garupa, atrás do piloto.',
    normReference: 'NORMAM-212/DPC',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Limite de Lotação',
    question: 'A lotação máxima de passageiros de uma moto aquática é definida por qual documento?',
    options: [
      'Pelo Título de Inscrição da Embarcação (TIE/TIEM) e placa do fabricante do jet-ski',
      'Pela quantidade de coletes que couberem no bagageiro',
      'Sempre 3 pessoas para qualquer jet-ski',
      'Pelo peso somado ser menor que 500 kg'
    ],
    correctIndex: 0,
    explanation: 'A lotação autorizada consta expressamente na placa do fabricante e no documento de inscrição (TIE/TIEM) emitido pela Capitania dos Portos.',
    normReference: 'NORMAM-211 e NORMAM-212',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Efeito do Acelerador no Leme a Jato',
    question: 'Em uma moto aquática com propulsão hidrojato convencional, o que acontece com a capacidade de manobrar (governo) quando o condutor SOLTA COMPLETAMENTE O ACELERADOR?',
    options: [
      'A moto aquática PERDE TOTALMENTE OU QUASE TOTALMENTE A CAPACIDADE DE VIRAR, continuando a seguir em linha reta por inércia',
      'A moto aquática freia bruscamente parando em 2 metros',
      'A moto aquática vira com o dobro de facilidade',
      'O leme mecânico assume o controle automaticamente'
    ],
    correctIndex: 0,
    explanation: 'Fundamental para segurança de motonautas: o direcionamento do jet-ski depende do jato d\'água propelido pelo motor. Sem acelerar, não há fluxo de jato e o leme não responde!',
    normReference: 'NORMAM-212/DPC Anexo Didático',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Reboque de Boias e Pranchas',
    question: 'Para rebocar bóias infláveis tipo "banana boat", pranchas ou esqui aquático com moto aquática, o que é exigido regulamentarmente?',
    options: [
      'Moto aquática com capacidade mínima de 3 pessoas, equipada com retrovisores ou tendo a bordo um observador voltado para a ré além do piloto',
      'Qualquer jet-ski monoposto de 1 lugar',
      'Autorização prévia do prefeito da cidade',
      'Navegar a mais de 30 nós'
    ],
    correctIndex: 0,
    explanation: 'Para reboque de esportes aquáticos, a moto aquática deve ter no mínimo 3 lugares (piloto + observador + espaço para resgatar o esquiador) e retrovisores.',
    normReference: 'NORMAM-212/DPC e NORMAM-211',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Consumo de Bebidas Alcoólicas',
    question: 'Qual é o limite legal de alcoolemia permitido pela Autoridade Marítima (Lei de Segurança do Tráfego Aquaviário) para conduzir embarcações?',
    options: [
      'TOLERÂNCIA ZERO (zero miligramas de álcool por litro de ar alveolar), sujeitando o infrator à retenção da embarcação, suspensão da CHA e multa',
      'Até duas cervejas ou 0,2 mg/L',
      'O mesmo limite tolerado pelo Código de Trânsito antigo',
      'Bebida alcoólica só é proibida em alto-mar'
    ],
    correctIndex: 0,
    explanation: 'A LESTA e a NORMAM aplicam tolerância zero para uso de álcool e substâncias psicoativas por condutores de qualquer embarcação aquaviária.',
    normReference: 'LESTA Lei 9.537/97 Art. 22 / NORMAM-211',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Áreas Proibidas para Motonautas',
    question: 'Em quais locais é expressamente proibido o tráfego de motos aquáticas?',
    options: [
      'A menos de 200m de praias com banhistas, áreas de segurança de instalações portuárias/militares, proximidades de canais de navios e áreas de proteção ambiental restritas',
      'Apenas em represas de usinas hidrelétricas',
      'Em qualquer local que tenha água salgada',
      'Em baías com profundidade superior a 10 metros'
    ],
    correctIndex: 0,
    explanation: 'Motos aquáticas não podem navegar em áreas de banhistas (< 200m), áreas sob jurisdição militar, proximidades de plataformas e canais com tráfego denso comercial.',
    normReference: 'NORMAM-212/DPC e NORMAM-211',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Manobras Perigosas e Acrobáticas',
    question: 'A prática de manobras perigosas, como saltar marolas e esteiras de grandes embarcações a curta distância ("wake jumping"), é classificada pela Marinha como:',
    options: [
      'Infração grave às normas de segurança aquaviária, passível de apreensão da moto aquática e suspensão da habilitação',
      'Manobra esportiva incentivada pelas Capitanias',
      'Permitida desde que o condutor use capacete',
      'Infração leve com advertência apenas verbal'
    ],
    correctIndex: 0,
    explanation: 'Cruzar ou saltar esteiras de outras embarcações em movimento a menos de 50 metros coloca em risco a vida humana e constitui infração grave com apreensão.',
    normReference: 'NORMAM-212/DPC e RLESTA Dec. 2.596/98',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Cruzamento com Embarcações Maiores',
    question: 'Ao pilotar um jet-ski e aproximar-se de uma lancha ou veleiro em canal restrito, qual é a atitude prudente de navegação?',
    options: [
      'Reduzir a velocidade, afastar-se dando amplo resguardo e nunca cortar a proa da outra embarcação',
      'Acelerar a fundo para cruzar antes que a lancha passe',
      'Passar rente ao costado da lancha para aproveitar a sombra de vento',
      'Girar 360 graus ao redor da lancha'
    ],
    correctIndex: 0,
    explanation: 'A moto aquática possui extrema manobrabilidade e menor porte. Em canais ou próximo a embarcações maiores, deve manter distância segura e velocidade controlada.',
    normReference: 'RIPEAM-72 Regra 9 e NORMAM-212',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Documentos de Porte Obrigatório',
    question: 'Quais documentos devem ser obrigatoriamente portados pelo condutor durante a navegação em moto aquática?',
    options: [
      'Carteira de Habilitação de Amador válida (MTA, ARA ou superior) e o TIE/TIEM original ou digital da embarcação',
      'Apenas documento de identidade com foto (RG)',
      'Nota fiscal de compra do jet-ski',
      'Atestado de vacinação'
    ],
    correctIndex: 0,
    explanation: 'É obrigatório portar a habilitação (MTA ou Arrais/Motonauta) e o documento de registro da moto aquática (TIE/TIEM) válidos (ou acessíveis no app oficial Gov.br).',
    normReference: 'NORMAM-211 Cap. 1',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Desvirando a Moto Aquática',
    question: 'Em caso de capotamento (virar de cabeça para baixo) da moto aquática na água, em qual sentido o condutor deve desvirá-la?',
    options: [
      'Exclusivamente no sentido indicado pelo adesivo do fabricante localizado na popa (geralmente sentido horário), para evitar entrada de água no motor',
      'Em qualquer sentido aleatório',
      'Sempre puxando pela proa',
      'Nunca deve desvirar na água, deve esperar o reboque'
    ],
    correctIndex: 0,
    explanation: 'Desvirar a moto aquática no sentido incorreto faz a água entrar pelo duto de escapamento direto nos cilindros do motor (calço hidráulico). Deve-se seguir a etiqueta da popa.',
    normReference: 'Manuais Técnicos e NORMAM-212',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Abastecimento Seguro',
    question: 'Durante o abastecimento de combustível de uma moto aquática, qual medida de segurança é indispensável?',
    options: [
      'Motor desligado, chave de corte desconectada, sem pessoas a bordo e proibido fumar nas imediações',
      'Manter o motor ligado em marcha lenta para circular o combustível',
      'Abastecer com o passageiro sentado no jet-ski',
      'Ligar a bomba de porão elétrica durante o abastecimento'
    ],
    correctIndex: 0,
    explanation: 'Combustível volátil (gasolina) apresenta alto risco de explosão. Motor desligado, sem chaves engatadas, sem celulares ou cigarros e moto aquática desocupada.',
    normReference: 'NORMAM-211 Prevenção de Incêndio',
    image: 'fire_triangle'
  },
  {
    topic: 'Motonauta',
    subtopic: 'Inspeção Pré-Navegação',
    question: 'Antes de colocar a moto aquática na água, qual verificação do casco é crucial para evitar naufrágio?',
    options: [
      'Verificar se os bujões (tampões de dreno) de popa estão devidamente rosqueados e vedados',
      'Verificar a pressão dos pneus da carreta',
      'Passar cera náutica na quilha',
      'Remover o extintor de incêndio do compartimento'
    ],
    correctIndex: 0,
    explanation: 'O esquecimento de rosquear os bujões de dreno da popa é a principal causa de alagamento e naufrágio de motos aquáticas nos primeiros minutos de navegação.',
    normReference: 'NORMAM-212/DPC',
    image: null
  },
  {
    topic: 'Motonauta',
    subtopic: 'Extintor de Incêndio',
    question: 'Qual é a dotação de extintor de incêndio para motos aquáticas segundo a NORMAM-211/212?',
    options: [
      '1 extintor de incêndio portátil classe B e C (geralmente pó químico BC), com indicador de pressão na faixa verde de carga, acondicionado no alojamento próprio',
      'Não é obrigatório extintor em jet-ski',
      'Apenas extintor de água pressurizada classe A',
      '2 extintores de CO2 de 10 kg cada'
    ],
    correctIndex: 0,
    explanation: 'Motos aquáticas devem portar 1 extintor de incêndio tipo BC de pó químico dentro da validade e com manômetro na faixa verde, acomodado no suporte do estaleiro.',
    normReference: 'NORMAM-211 Cap. 4 e NORMAM-212',
    image: 'fire_triangle'
  }
];

// Combine, assigning sequential IDs and ensure answer & reference fields exist
const formattedNewQuestions = newQuestions.map((q, idx) => {
  const id = nextId + idx;
  return {
    id,
    topic: q.topic,
    subtopic: q.subtopic,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    answer: q.correctIndex,
    explanation: q.explanation,
    normReference: q.normReference,
    reference: q.normReference,
    image: q.image || null
  };
});

// Also ensure all existing questions have `answer` and `reference`
const updatedCurrent = currentQuestions.map(q => ({
  ...q,
  answer: q.answer !== undefined ? q.answer : q.correctIndex,
  reference: q.reference !== undefined ? q.reference : q.normReference
}));

const finalQuestions = [...updatedCurrent, ...formattedNewQuestions];

fs.writeFileSync(questionsPath, JSON.stringify(finalQuestions, null, 2), 'utf8');

console.log(`Successfully added ${formattedNewQuestions.length} new questions!`);
console.log(`New total questions count: ${finalQuestions.length}`);

// Print stats by category
const stats = {};
finalQuestions.forEach(q => {
  stats[q.topic] = (stats[q.topic] || 0) + 1;
});
console.log('Updated Questions by Category:', stats);
