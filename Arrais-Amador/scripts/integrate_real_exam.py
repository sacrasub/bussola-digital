# -*- coding: utf-8 -*-
import json
import re

# 40 Questions from Capitania Fluvial de Tabatinga (Exame Oficial Arrais-Amador)
# Cleaned, accented Portuguese, with exact options, answers, explanations and norm references.

REAL_EXAM_QUESTIONS = [
    {
        "order": 1,
        "topic": "RIPEAM",
        "subtopic": "Sinais Sonoros de Manobra",
        "question": "Dois apitos curtos significam:",
        "options": [
            "estou dando máquinas atrás",
            "estou guinando para bombordo",
            "estou guinando para boreste",
            "estou dando máquinas adiante",
            "estou parando máquinas"
        ],
        "correctIndex": 1,
        "explanation": "No RIPEAM (Regra 34a), sinais de manobra em vista um do outro com propulsão mecânica: 1 apito curto = guino para boreste; 2 apitos curtos = guino para bombordo; 3 apitos curtos = estou dando atrás.",
        "normReference": "RIPEAM-72 Regra 34(a)"
    },
    {
        "order": 2,
        "topic": "RIPEAM",
        "subtopic": "Sinais Sonoros em Visibilidade Restrita",
        "question": "Um apito longo de dois em dois minutos significa:",
        "options": [
            "embarcação fundeada, em visibilidade restrita",
            "embarcação parada, em visibilidade restrita",
            "embarcação rebocando outra, em visibilidade restrita",
            "embarcação com propulsão mecânica com seguimento, em visibilidade restrita",
            "embarcação rebocando outra"
        ],
        "correctIndex": 3,
        "explanation": "No RIPEAM (Regra 35a), em visibilidade restrita, uma embarcação de propulsão mecânica com seguimento (em movimento) deve soar a intervalos não superiores a 2 minutos um apito longo.",
        "normReference": "RIPEAM-72 Regra 35(a)"
    },
    {
        "order": 3,
        "topic": "RIPEAM",
        "subtopic": "Definições Gerais",
        "question": "O termo \"embarcação a vela\" designa:",
        "options": [
            "qualquer embarcação sob vela desde que sua máquina de propulsão, se houver, não esteja em uso",
            "somente as embarcações a vela que possam navegar com essa propulsão",
            "somente as embarcações à vela que estejam navegando",
            "qualquer embarcação de vela, navegando, independente de sua propulsão",
            "qualquer embarcação à vela"
        ],
        "correctIndex": 0,
        "explanation": "Segundo o RIPEAM (Regra 3c), 'embarcação de vela' é qualquer embarcação sob vela, desde que sua máquina propulsora, caso exista, não esteja em funcionamento. Se o motor estiver ligado, equipara-se a embarcação a motor.",
        "normReference": "RIPEAM-72 Regra 3(c)"
    },
    {
        "order": 4,
        "topic": "Balizamento",
        "subtopic": "Balizamento Fluvial e Hidroviário",
        "question": "No balizamento de uma hidrovia um sinal \"+\" significa:",
        "options": [
            "trocar de margem",
            "bifurcação de canal",
            "manter a navegação na margem",
            "seguir meio do canal",
            "perigo"
        ],
        "correctIndex": 4,
        "explanation": "No Regulamento de Balizamento Hidroviário Fluvial Nacional da Marinha do Brasil, o sinal gráfico em cruz (+) afixado em margens ou placas indica perigo isolado / pedral a evitar.",
        "normReference": "NORMAM e Balizamento Hidroviário Fluvial da Marinha do Brasil"
    },
    {
        "order": 5,
        "topic": "Balizamento",
        "subtopic": "Canais Preferenciais IALA-B",
        "question": "Quando um navegante vem se aproximando de uma bifurcação de canal e se depara com um balizamento de duas cores, e verifica que a maior profundidade está no canal a seu boreste, quais seriam as duas cores vistas pelo navegante?",
        "options": [
            "Encarnada, com uma faixa horizontal amarela.",
            "Encarnada, com uma faixa horizontal verde.",
            "Preta e amarela.",
            "Verde, com uma faixa horizontal encarnada.",
            "Preta e encarnada."
        ],
        "correctIndex": 3,
        "explanation": "No Sistema IALA Região B (Brasil), quando o canal preferencial/principal está a BORESTE da boia, a boia deve ser deixada a bombordo da embarcação, exibindo cor VERDE com uma larga faixa horizontal ENCARNADA no centro.",
        "normReference": "Sistema de Balizamento Marítimo IALA Região B / NORMAM"
    },
    {
        "order": 6,
        "topic": "Manobra e Navegação",
        "subtopic": "Espias e Amarração",
        "question": "Espia que sai da embarcação perpendicularmente ao cais:",
        "options": [
            "través",
            "espringue de popa",
            "lançante de proa",
            "alheta",
            "retinida"
        ],
        "correctIndex": 0,
        "explanation": "O través é a espia passada perpendicularmente (formando um ângulo reto de 90°) entre a embarcação e o cais, servindo para impedir o afastamento lateral do casco.",
        "normReference": "Manual de Marinharia e Manobra / NORMAM"
    },
    {
        "order": 7,
        "topic": "Manobra e Navegação",
        "subtopic": "Nomenclatura Náutica",
        "question": "Qual das correlações abaixo está totalmente correta?",
        "options": [
            "Boreste é o lado direito da embarcação, bombordo é o lado esquerdo da embarcação, avante fica na frente, a ré fica atrás.",
            "Boreste é o lado esquerdo da embarcação, bombordo é o lado direito da embarcação, avante fica na frente, e a ré fica atrás.",
            "Alheta é um dos bordos da embarcação, boreste é o lado direito da embarcação, bombordo é o lado esquerdo da embarcação.",
            "Través é um dos bordos da embarcação, boreste é o lado direito da embarcação, bombordo é o lado esquerdo da embarcação.",
            "Través é o lado direito da embarcação, avante é a parte da frente da embarcação, a ré é a parte de trás da embarcação."
        ],
        "correctIndex": 0,
        "explanation": "Olhando da popa para a proa: Boreste (BE) é o bordo direito; Bombordo (BB) é o bordo esquerdo; Avante / vante é a direção da frente (proa); A ré é a direção de trás (popa).",
        "normReference": "Nomenclatura Náutica Oficial da Marinha do Brasil"
    },
    {
        "order": 8,
        "topic": "Manobra e Navegação",
        "subtopic": "Desatracação",
        "question": "Para se largar de um cais, com vento e corrente pela proa, deverei:",
        "options": [
            "largar todas as espias e manter o leme a meio",
            "largar todas as espias, exceto a que diz para vante, na popa, mantendo o leme contrário ao cais",
            "largar somente as espias da popa e folgar as da proa, mantendo o leme para o mesmo bordo do cais",
            "largar todas as espias, exceto a que diz para vante, na proa, com o leme a meio",
            "largar todas as espias, exceto a que diz para ré, na popa, mantendo o leme contrário ao cais"
        ],
        "correctIndex": 1,
        "explanation": "Com vento e correnteza pela proa, larga-se todas as espias exceto o espringue de popa (espia que diz para vante na popa) e carrega-se o leme contrário ao cais dando máquinas à ré, para que a corrente abra a proa com segurança.",
        "normReference": "Apostila Oficial de Arrais-Amador Unidade 2 / NORMAM"
    },
    {
        "order": 9,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Hemorragia e Choque",
        "question": "A vítima de hemorragia deve ser aquecida para:",
        "options": [
            "evitar o estado de choque",
            "evitar sangramento",
            "aumentar a pressão sanguínea",
            "melhorar seu conforto",
            "alimentar o calor"
        ],
        "correctIndex": 0,
        "explanation": "A perda volumétrica de sangue em hemorragias graves compromete a termorregulação do organismo e pode desencadear rapidamente o choque hipovolêmico com hipotermia. Manter a vítima aquecida previne o agravamento do choque.",
        "normReference": "Manual de Primeiros Socorros no Mar / NORMAM"
    },
    {
        "order": 10,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Sobrevivência e Rações",
        "question": "As rações modernas têm principalmente em sua composição:",
        "options": [
            "proteína",
            "fibras",
            "sal",
            "vitaminas",
            "açúcar"
        ],
        "correctIndex": 4,
        "explanation": "Rações de sobrevivência de náufragos são ricas em carboidratos/açúcares (energia imediata). Evitam excesso de proteínas e sal, pois a digestão proteica e a excreção de sais aumentam drasticamente a perda de água corporal pela urina.",
        "normReference": "Convenção SOLAS / Equipamentos de Salvatagem NORMAM"
    },
    {
        "order": 11,
        "topic": "Legislação Náutica",
        "subtopic": "Penalidades e Apreensão",
        "question": "É passível de ocorrer a apreensão da embarcação, quando:",
        "options": [
            "estiver sem a dotação de extintores",
            "for utilizada comercialmente",
            "estiver em péssimo estado de conservação",
            "trafegar em áreas de segurança",
            "todas as demais opções"
        ],
        "correctIndex": 4,
        "explanation": "Conforme a Lei 9.537/97 (LESTA Art. 17) e RLESTA, a apreensão da embarcação pode ocorrer por navegação em área proibida/segurança, estado de navegabilidade precário, desvio de finalidade (recreio usado comercialmente) ou falta de itens críticos de salvatagem e incêndio.",
        "normReference": "Lei 9.537/97 (LESTA) Art. 17 / RLESTA Dec. 2.596/98"
    },
    {
        "order": 12,
        "topic": "Legislação Náutica",
        "subtopic": "Definição de Amador",
        "question": "Todo aquele com habilitação certificada pela autoridade marítima para operar embarcações de esporte e recreio, em caráter não-profissional, é:",
        "options": [
            "semiprofissional",
            "armador",
            "amador",
            "aquaviário",
            "tripulante"
        ],
        "correctIndex": 2,
        "explanation": "Segundo o Art. 2º, inciso V da Lei 9.537/97 (LESTA), Amador é todo aquele com habilitação certificada pela Autoridade Marítima para operar embarcações de esporte e/ou recreio, em caráter exclusivamente não profissional.",
        "normReference": "LESTA Lei 9.537/97 Art. 2º, V"
    },
    {
        "order": 13,
        "topic": "Legislação Náutica",
        "subtopic": "Processo Administrativo",
        "question": "A autoridade marítima sustará o andamento de qualquer documento ou ato administrativo de interesse de quem estiver em débito decorrente de infração até:",
        "options": [
            "sua quitação",
            "60 dias",
            "sua venda",
            "12 meses",
            "a regularização da embarcação"
        ],
        "correctIndex": 0,
        "explanation": "Conforme o Regulamento da LESTA (RLESTA Art. 38), a Autoridade Marítima sustará o andamento de qualquer documento ou ato administrativo de interesse do infrator até a comprovação da quitação total da multa decorrente de penalidade.",
        "normReference": "RLESTA Dec. 2.596/98 Art. 38"
    },
    {
        "order": 14,
        "topic": "Legislação Náutica",
        "subtopic": "Segurança do Tráfego Aquaviário",
        "question": "A embarcação estrangeira que apresentar irregularidades representando ameaça de danos ao meio ambiente, à tripulação, a terceiros ou à segurança do tráfego aquaviário, pode ser ordenada a:",
        "options": [
            "repatriar a tripulação",
            "sair das águas jurisdicionais",
            "pagar uma multa estipulada pela autoridade marítima",
            "assinar um termo de responsabilidade",
            "entrar em quarentena"
        ],
        "correctIndex": 1,
        "explanation": "De acordo com a LESTA (Art. 16, parágrafo único e Art. 18), a embarcação estrangeira em situação irregular que cause perigo ao meio ambiente ou à navegação pode ser impedida de entrar ou ordenada a desocupar e sair imediatamente das Águas Jurisdicionais Brasileiras (AJB).",
        "normReference": "LESTA Lei 9.537/97 Art. 16 e 18"
    },
    {
        "order": 15,
        "topic": "Legislação Náutica",
        "subtopic": "Documentos e Despacho",
        "question": "É obrigatória sua apresentação, antes de sair para navegar:",
        "options": [
            "Cartão de Tripulação de Segurança",
            "relação de passageiros e tripulação",
            "plano de navegação",
            "relatório de qualidade de combustível",
            "relação de passageiros"
        ],
        "correctIndex": 2,
        "explanation": "Antes de suspender, o Comandante de embarcação de esporte e recreio deve apresentar ou registrar o Aviso de Saída / Plano de Navegação na marina, clube náutico ou Capitania dos Portos (NORMAM-03/211 Cap. 1).",
        "normReference": "NORMAM-03/211 Cap. 1"
    },
    {
        "order": 16,
        "topic": "Legislação Náutica",
        "subtopic": "Navegação e Tipos de Tráfego",
        "question": "Segundo a RLESTA a navegação realizada entre portos ou pontos do território brasileiro, utilizando a via marítima ou esta e as vias navegáveis interiores é:",
        "options": [
            "ortodrômica",
            "cabotagem",
            "interior",
            "longo curso",
            "loxodrômica"
        ],
        "correctIndex": 1,
        "explanation": "Conforme a LESTA e RLESTA Art. 3º, inciso I: Navegação de Cabotagem é a realizada entre portos ou pontos do território brasileiro, utilizando a via marítima ou esta e as vias navegáveis interiores. (Longo curso é entre portos brasileiros e estrangeiros).",
        "normReference": "RLESTA Dec. 2.596/98 Art. 3º / LESTA Art. 2º"
    },
    {
        "order": 17,
        "topic": "Legislação Náutica",
        "subtopic": "Reincidência de Infrações",
        "question": "A reincidência, para efeito de gradação das penalidades da RLESTA, é:",
        "options": [
            "a repetição da prática da mesma infração em um período igual ou inferior a doze meses",
            "a repetição da prática da mesma infração em um período igual ou inferior a seis meses",
            "a repetição da prática da mesma infração em um período igual ou inferior a dezoito meses",
            "a repetição da prática da mesma infração em um período igual ou inferior a três meses",
            "a repetição da prática da mesma infração em um período igual ou inferior a vinte e quatro meses"
        ],
        "correctIndex": 0,
        "explanation": "Segundo o RLESTA (Art. 21): Considera-se reincidência a repetição da prática da mesma infração em um período igual ou inferior a doze meses, contado da data em que a decisão administrativa se tornou definitiva.",
        "normReference": "RLESTA Dec. 2.596/98 Art. 21"
    },
    {
        "order": 18,
        "topic": "Legislação Náutica",
        "subtopic": "Áreas de Segurança e Banhistas",
        "question": "A linha de arrebentação das ondas, ou no caso de lagos e lagoas onde se inicia o espelho d'água, é chamada de:",
        "options": [
            "Linha do espelho",
            "Linha base",
            "Linha d'água",
            "Linha de arrebentação",
            "Linha da maré"
        ],
        "correctIndex": 1,
        "explanation": "A 'linha base' é a linha de arrebentação das ondas ou o início do espelho d'água em rios e lagos, a partir da qual se estabelecem os limites e distâncias de segurança (200m a motor no mar, 100m em rios e lagos) conforme a NORMAM-03/211.",
        "normReference": "NORMAM-03/211 Cap. 1"
    },
    {
        "order": 19,
        "topic": "Legislação Náutica",
        "subtopic": "Prazos de Defesa",
        "question": "Após lavrado o auto de infração, o infrator disporá de:",
        "options": [
            "30 (trinta) dias úteis de prazo para apresentar sua defesa",
            "30 (trinta) dias corridos de prazo para apresentar sua defesa",
            "60 (sessenta) dias úteis de prazo para apresentar sua defesa",
            "15 (quinze) dias úteis de prazo para apresentar sua defesa",
            "7 (sete) dias úteis para apresentar sua defesa"
        ],
        "correctIndex": 3,
        "explanation": "Conforme o RLESTA (Art. 26), lavrado o auto de infração, o infrator disporá do prazo de 15 (quinze) dias úteis para apresentar sua defesa prévia perante a Capitania dos Portos ou Capitania Fluvial.",
        "normReference": "RLESTA Dec. 2.596/98 Art. 26"
    },
    {
        "order": 20,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Teoria do Fogo",
        "question": "Um exemplo de combustível sem comburente seria:",
        "options": [
            "Oxigênio",
            "Carbono",
            "Nitrogênio",
            "Madeira",
            "Hidrogênio"
        ],
        "correctIndex": 3,
        "explanation": "Na teoria do fogo (triângulo/tetraedro do fogo), combustível é o material físico suscetível de oxidação (ex: madeira, papel, óleo), enquanto o comburente é o elemento que reage e sustenta a combustão (oxigênio).",
        "normReference": "Combate a Incêndio / NORMAM"
    },
    {
        "order": 21,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Prevenção de Incêndios",
        "question": "A melhor forma de se combater um incêndio a bordo é:",
        "options": [
            "não utilizar gasolina na propulsão das embarcações",
            "evitar acúmulo de sujeira nos porões do barco",
            "evitar o uso de gás de cozinha",
            "manter os depósitos de combustíveis fechados",
            "a prevenção, evitando que ele ocorra"
        ],
        "correctIndex": 4,
        "explanation": "A melhor e mais eficaz técnica de controle de incêndios náuticos é a PREVENÇÃO, eliminando vazamentos de combustível, revisando a fiação elétrica e evitando que os três elementos do fogo se unam.",
        "normReference": "Apostila Oficial de Arrais-Amador Unidade 4 / NORMAM"
    },
    {
        "order": 22,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Parada Cardiorrespiratória",
        "question": "Antes de aplicar respiração artificial numa vítima com parada respiratória é recomendável:",
        "options": [
            "desobstruir as vias aéreas superiores",
            "desobstruir a saída de ar pelo nariz",
            "verificar se os batimentos cardíacos estão muito rápidos",
            "verificar se a pressão arterial está alta",
            "limpar a boca da vítima de possíveis bactérias antes de soprar a sua boca"
        ],
        "correctIndex": 0,
        "explanation": "O primeiro passo em suporte básico de vida antes de qualquer ventilação artificial é garantir a perviedade da via aérea (desobstruir as vias aéreas superiores, retirando próteses, vômito e hiperestendendo o queixo/cabeça).",
        "normReference": "Manual de Primeiros Socorros Náuticos / NORMAM"
    },
    {
        "order": 23,
        "topic": "Manobra e Navegação",
        "subtopic": "Dimensões da Embarcação",
        "question": "As medidas lineares de uma embarcação são:",
        "options": [
            "boca, calado, quilha e través",
            "boreste, bombordo, boca e proa",
            "comprimento total, boca, pontal e contorno",
            "comprimento total, boca, pontal e longarinas",
            "boca, contorno, calado e proa"
        ],
        "correctIndex": 2,
        "explanation": "As dimensões lineares principais definidas pela arqueação e construção naval para registro de embarcações são: Comprimento Total (LOA), Boca Moldada (largura máxima), Pontal Moldado (altura do fundo ao convés) e Contorno.",
        "normReference": "Manual de Construção Naval e Nomenclatura / NORMAM"
    },
    {
        "order": 24,
        "topic": "Balizamento",
        "subtopic": "Competências de Arrais",
        "question": "Com relação ao Arrais-Amador é correto afirmar que o (a) habilitado (a) deverá ter conhecimentos sobre:",
        "options": [
            "noções de funcionamento de EPIRB",
            "noções de estabilidade de embarcações",
            "GPS e DGPS",
            "o sistema de balizamento IALA B",
            "navegação astronômica"
        ],
        "correctIndex": 3,
        "explanation": "O conteúdo programático da prova teórica de Arrais-Amador (NORMAM-03/211) exige domínio completo das regras de balizamento cego e luminoso da IALA Região B (sinais laterais, cardinais, perigo isolado, águas seguras e especiais).",
        "normReference": "NORMAM-03/211 Anexo 1-B"
    },
    {
        "order": 25,
        "topic": "RIPEAM",
        "subtopic": "Sinais Sonoros e Duração",
        "question": "De acordo com o Regulamento Internacional Para Evitar Abalroamentos no Mar (RIPEAM), um apito curto deverá ter uma duração de tempo aproximada de:",
        "options": [
            "quatro a seis segundos",
            "dois segundos",
            "três segundos",
            "meio segundo",
            "um segundo"
        ],
        "correctIndex": 4,
        "explanation": "RIPEAM Regra 32(b): O termo 'apito curto' significa um som com duração de cerca de 1 (um) segundo. (Já o apito longo dura de 4 a 6 segundos).",
        "normReference": "RIPEAM-72 Regra 32(b)"
    },
    {
        "order": 26,
        "topic": "RIPEAM",
        "subtopic": "Velocidade Segura",
        "question": "De acordo com o Regulamento Internacional Para Evitar Abalroamentos no Mar (RIPEAM), de forma a possibilitar a ação apropriada e eficaz para evitar abalroamento, bem como para ser parada a uma distância apropriada, cada embarcação deverá proceder:",
        "options": [
            "a uma velocidade segura",
            "a atualização das cartas náuticas",
            "sempre alertando as demais embarcações",
            "sempre guinando para boreste",
            "a manutenção mecânica da embarcação"
        ],
        "correctIndex": 0,
        "explanation": "RIPEAM Regra 6 (Velocidade Segura): Toda embarcação deverá navegar em velocidade segura em todo momento, de modo que possa realizar manobras eficazes para evitar colisões e parar na distância compatível com as circunstâncias.",
        "normReference": "RIPEAM-72 Regra 6"
    },
    {
        "order": 27,
        "topic": "Legislação Náutica",
        "subtopic": "Identificação e Inscrição",
        "question": "É facultativo marcar (afixar ou pintar) o nome do barco no costado para apenas:",
        "options": [
            "as embarcações estrangeiras em águas nacionais",
            "as embarcações miúdas",
            "os barcos de fiscalização da Autoridade Marítima",
            "as embarcações para fins comerciais",
            "os barcos de órgãos oficiais do governo"
        ],
        "correctIndex": 1,
        "explanation": "De acordo com a NORMAM-03/211 (Cap. 2), embarcações miúdas (comprimento até 5 metros sem convés) são dispensadas de marcar o nome na embarcação, sendo apenas obrigatória a marcação do número de inscrição no costado.",
        "normReference": "NORMAM-03/211 Cap. 2"
    },
    {
        "order": 28,
        "topic": "Legislação Náutica",
        "subtopic": "Cerimonial e Pavilhão Nacional",
        "question": "Em qual das situações abaixo é dispensado o uso da Bandeira Nacional nas embarcações navegando?",
        "options": [
            "Cruzando com um navio militar brasileiro, de dia.",
            "Das 08:00h até o por do sol.",
            "Durante a ocorrência de mau tempo, de dia e de noite.",
            "Nas embarcações miúdas, em qualquer horário.",
            "Em porto estrangeiro, de noite."
        ],
        "correctIndex": 3,
        "explanation": "Segundo a NORMAM-03/211, as embarcações miúdas (até 5 metros de comprimento sem cabine habitável) estão dispensadas de usar a Bandeira Nacional em qualquer horário.",
        "normReference": "NORMAM-03/211 Cap. 1 / Cerimonial Marítimo"
    },
    {
        "order": 29,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Reanimação Cardiopulmonar (RCP)",
        "question": "Em que posição devemos deixar a vítima quando ela está sem batimentos cardíacos e sem respiração?",
        "options": [
            "Deitada, com a barriga para cima (decúbito dorsal).",
            "Deitada, com a barriga para baixo (decúbito ventral).",
            "O mais natural possível, para não atrapalhar a respiração.",
            "Sentada, em decúbito dorsal.",
            "Deitada de lado, com o lado do coração voltado para baixo."
        ],
        "correctIndex": 0,
        "explanation": "Para realizar as compressões torácicas eficazes da Reanimação Cardiopulmonar (RCP), a vítima deve ser colocada deitada com as costas em superfície plana e rígida e a barriga voltada para cima (decúbito dorsal).",
        "normReference": "Diretrizes de Suporte Básico de Vida / NORMAM"
    },
    {
        "order": 30,
        "topic": "Manobra e Navegação",
        "subtopic": "Cabos e Amarração",
        "question": "Os cabos usados para amarrar uma embarcação no cais, trapiche, porto, etc são chamados de:",
        "options": [
            "retinidas",
            "cabresteiras",
            "cordas",
            "espias",
            "amarras"
        ],
        "correctIndex": 3,
        "explanation": "Na marinharia, os cabos empregados na amarração de uma embarcação a um cais, píer ou outra embarcação recebem o nome técnico de 'espias' (lançantes, espringues e traveses). 'Amarras' são os elos de corrente da âncora.",
        "normReference": "Manual de Marinharia e Manobra / NORMAM"
    },
    {
        "order": 31,
        "topic": "Manobra e Navegação",
        "subtopic": "Atracação com Corrente/Vento",
        "question": "Para atracar com vento e/ou correnteza perpendicular ao cais devo me aproximar do cais:",
        "options": [
            "em diagonal ao cais, pela popa",
            "de proa para o cais",
            "de popa para o cais",
            "em diagonal ao cais, pela proa",
            "de forma paralela ao cais"
        ],
        "correctIndex": 4,
        "explanation": "Quando o vento e/ou a correnteza sopram perpendicularmente em direção ao cais (vento de través para o cais), a aproximação deve ser feita paralelamente ao cais em baixa velocidade, deixando que a própria força externa encoste o barco suavemente.",
        "normReference": "Apostila Oficial de Arrais-Amador Unidade 2 / NORMAM"
    },
    {
        "order": 32,
        "topic": "Legislação Náutica",
        "subtopic": "Categorias de Amadores e Idade",
        "question": "Qual das Carteiras de Habilitação de Amadores (CHA) abaixo pode ser obtida por um cidadão(ã) com menos de 18 anos de idade?",
        "options": [
            "Arrais-Amador.",
            "Motonauta.",
            "Mestre-Amador.",
            "Capitão-Amador.",
            "Veleiro."
        ],
        "correctIndex": 4,
        "explanation": "Segundo a NORMAM-03/211, a habilitação na categoria de Veleiro pode ser obtida a partir dos 8 anos de idade (Veleiro Júnior até 14 anos e Veleiro a partir dos 14). Todas as demais categorias motorizadas (Arrais, Motonauta, Mestre e Capitão) exigem maioridade civil de 18 anos.",
        "normReference": "NORMAM-03/211 Cap. 1 / LESTA"
    },
    {
        "order": 33,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Agentes Extintores",
        "question": "Qual é o agente extintor que foi banido de uso no ano de 2000, sendo proibido o seu uso, por causar malefícios à camada de ozônio da atmosfera?",
        "options": [
            "Pó químico.",
            "Espuma química.",
            "Monóxido de carbono.",
            "Gás carbônico.",
            "Gás halon."
        ],
        "correctIndex": 4,
        "explanation": "O Gás Halon (hidrocarboneto halogenado) teve sua produção e utilização banidas no Brasil e internacionalmente pelo Protocolo de Montreal em 2000 por provocar a destruição da camada de ozônio da Terra.",
        "normReference": "Combate a Incêndio / NORMAM / Protocolo de Montreal"
    },
    {
        "order": 34,
        "topic": "Legislação Náutica",
        "subtopic": "Comandante e Tripulação",
        "question": "Segundo a Lei Federal 9.537/97 (LESTA), o tripulante responsável pela operação e manutenção de embarcação, em condições de segurança, extensivas à carga, aos tripulantes e às demais pessoas a bordo é chamado de:",
        "options": [
            "Chefe de segurança",
            "Comandante",
            "Armador",
            "Capitão",
            "Imediato"
        ],
        "correctIndex": 1,
        "explanation": "Segundo o Art. 2º, inciso IV da Lei 9.537/97 (LESTA): 'Comandante: também denominado Mestre, Arrais ou Patrão, é o tripulante responsável pela operação e manutenção de embarcação, em condições de segurança, extensivas à carga, aos tripulantes e às demais pessoas a bordo'.",
        "normReference": "LESTA Lei 9.537/97 Art. 2º, IV"
    },
    {
        "order": 35,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Homologação de Coletes",
        "question": "Um colete de fabricação estrangeira é válido para uso em embarcações nacionais desde que seja homologado pela Convenção:",
        "options": [
            "USCG",
            "IALA",
            "STCW",
            "SOLAS",
            "RIPEAM"
        ],
        "correctIndex": 3,
        "explanation": "Conforme a NORMAM-03/211 (Cap. 3), equipamentos de salvatagem estrangeiros podem ser aceitos a bordo de embarcações brasileiras desde que possuam certificado de conformidade da Convenção Internacional SOLAS (Salvaguarda da Vida Humana no Mar).",
        "normReference": "NORMAM-03/211 Cap. 3 / Convenção SOLAS"
    },
    {
        "order": 36,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Classes de Incêndio (Classe D)",
        "question": "Um incêndio em uma carga do metal \"zinco\" a bordo deve ser combatido, principalmente, com que tipo de agente extintor?",
        "options": [
            "Pó químico.",
            "Água.",
            "Gás carbônico.",
            "Espuma mecânica.",
            "Espuma química."
        ],
        "correctIndex": 0,
        "explanation": "Metais combustíveis (magnésio, zinco, titânio, potássio) constituem fogo de Classe D. Devem ser combatidos com agentes extintores específicos de PÓ QUÍMICO SECO especial para classe D. Jamais usar água, pois ela reage liberando hidrogênio e causa explosões violentas.",
        "normReference": "Apostila Oficial de Arrais-Amador Unidade 4 / NORMAM"
    },
    {
        "order": 37,
        "topic": "Legislação Náutica",
        "subtopic": "Definições LESTA",
        "question": "Um navegante com habilitação certificada pela Autoridade Marítima para conduzir embarcações de esporte e recreio em caráter não profissional é chamado de:",
        "options": [
            "armador",
            "tripulante",
            "amador",
            "marítimo",
            "aquaviário"
        ],
        "correctIndex": 2,
        "explanation": "LESTA Art. 2º, V: Amador é todo indivíduo habilitado pela Autoridade Marítima para operar embarcações de esporte e recreio, sem finalidade lucrativa ou comercial.",
        "normReference": "LESTA Lei 9.537/97 Art. 2º, V"
    },
    {
        "order": 38,
        "topic": "Primeiros Socorros, Salvatagem e Incêndio",
        "subtopic": "Queimaduras",
        "question": "Uma queimadura de 1º grau caracteriza-se pelo aparecimento de:",
        "options": [
            "pele descascada",
            "vermelhidão superficial na pele",
            "falta de sensibilidade ao toque",
            "buracos enegrecidos",
            "bolhas"
        ],
        "correctIndex": 1,
        "explanation": "Queimadura de 1º grau afeta apenas a epiderme, causando vermelhidão (eritema), dor e calor local (ex: queimadura solar leve). Bolhas (flictenas) caracterizam queimadura de 2º grau; necrose/carbonização é 3º grau.",
        "normReference": "Manual de Primeiros Socorros / NORMAM"
    },
    {
        "order": 39,
        "topic": "RIPEAM",
        "subtopic": "Navegação em Canal Estreito e Curvas",
        "question": "De acordo com o Regulamento Internacional Para Evitar Abalroamentos no Mar (RIPEAM), o comandante de uma embarcação navegando num canal estreito e que se aproxime de uma curva sem visibilidade, ao ouvir um apito longo de outra embarcação vindo pela proa deverá:",
        "options": [
            "soar dois apitos longos",
            "soar dois apitos curtos",
            "manter a velocidade e soar um apito curto",
            "manter a velocidade e permanecer na escuta de outros eventuais apitos",
            "diminuir a velocidade e soar um apito longo"
        ],
        "correctIndex": 4,
        "explanation": "RIPEAM Regra 34(e): Uma embarcação que se aproxima de uma curva onde outras podem estar ocultas deve soar 1 apito longo. Qualquer embarcação se aproximando do outro lado da curva que ouvir o sinal deverá diminuir a velocidade para navegar com cautela e responder igualmente com 1 apito longo.",
        "normReference": "RIPEAM-72 Regras 9 e 34(e)"
    },
    {
        "order": 40,
        "topic": "RIPEAM",
        "subtopic": "Marcas Diurnas de Embarcação Fundeada",
        "question": "Uma embarcação fundeada deve exibir durante o dia, onde melhor pode ser vista:",
        "options": [
            "Um cilindro",
            "Uma esfera",
            "Três esferas",
            "Duas esferas e um cone",
            "Dois cones"
        ],
        "correctIndex": 1,
        "explanation": "RIPEAM Regra 30: Uma embarcação fundeada deve exibir de dia, onde melhor possa ser vista (na proa), UMA ESFERA preta.",
        "normReference": "RIPEAM-72 Regra 30"
    }
]

def main():
    questions_file = r'c:\Projetos\Projeto Bússola Digital\Arrais-Amador\public\data\questions.json'
    with open(questions_file, 'r', encoding='utf-8') as f:
        existing_questions = json.load(f)

    max_id = max(q['id'] for q in existing_questions)
    print(f"Total existente: {len(existing_questions)} questões. Maior ID: {max_id}")

    # Process each of the 40 real exam questions
    added_count = 0
    updated_count = 0

    from difflib import SequenceMatcher

    for item in REAL_EXAM_QUESTIONS:
        q_text = item['question'].strip()
        
        # Check if already in bank
        best_match = None
        best_sim = 0
        for eq in existing_questions:
            sim = SequenceMatcher(None, q_text.lower(), eq['question'].lower()).ratio()
            if sim > best_sim:
                best_sim = sim
                best_match = eq
        
        if best_sim > 0.88 and best_match:
            # Update existing with preset flag and enrich explanation/reference
            best_match['examPreset'] = 'caderno_fluvial_1'
            best_match['examOrder'] = item['order']
            best_match['options'] = item['options']
            best_match['correctIndex'] = item['correctIndex']
            best_match['answer'] = item['correctIndex']
            best_match['topic'] = item['topic']
            best_match['explanation'] = item['explanation']
            best_match['normReference'] = item['normReference']
            best_match['reference'] = item['normReference']
            updated_count += 1
            print(f"Q{item['order']} vinculada à questão existente Id {best_match['id']} (sim: {best_sim:.2f})")
        else:
            # Add as new question
            max_id += 1
            new_q = {
                "id": max_id,
                "topic": item['topic'],
                "subtopic": item['subtopic'],
                "question": q_text,
                "options": item['options'],
                "correctIndex": item['correctIndex'],
                "explanation": item['explanation'],
                "normReference": item['normReference'],
                "image": None,
                "answer": item['correctIndex'],
                "reference": item['normReference'],
                "examPreset": 'caderno_fluvial_1',
                "examOrder": item['order']
            }
            existing_questions.append(new_q)
            added_count += 1
            print(f"Q{item['order']} ADICIONADA como nova questão Id {max_id}")

    with open(questions_file, 'w', encoding='utf-8') as f:
        json.dump(existing_questions, f, ensure_ascii=False, indent=2)

    print(f"\nFinalizado com sucesso!")
    print(f"Novas questões adicionadas: {added_count}")
    print(f"Questões existentes enriquecidas: {updated_count}")
    print(f"Novo total de questões no banco: {len(existing_questions)}")

if __name__ == '__main__':
    main()
