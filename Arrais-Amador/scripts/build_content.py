# -*- coding: utf-8 -*-
"""
Script final de compilação do Banco de Questões e Flashcards para o 'Simulado Arrais - Bússola Digital'.
"""

import re
import json
import os

def clean_text(text):
    if not text:
        return ""
    text = re.sub(r'=== P\d+ ===', '', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n+', ' ', text)
    return text.strip()

def build_database():
    os.makedirs('public/data', exist_ok=True)
    
    with open('pdf_text_dump.txt', 'r', encoding='utf-8', errors='ignore') as f:
        full_text = f.read()

    full_text = re.sub(r'=== P\d+ ===', '', full_text)

    split_pos = full_text.find('RESPOSTAS DOS TESTES')
    if split_pos == -1:
        split_pos = full_text.find('RESPOSTAS\n \n \nRIPEAM')
    
    questions_raw = full_text[:split_pos]
    answers_raw = full_text[split_pos:]

    # Parse answers by chapter
    chapter_answers = {}
    ans_chapters = [
        ("RIPEAM", r"RIPEAM\s*\n(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+II|\Z)"),
        ("Balizamento", r"(?:CAPITULO|CAPÍTULO)\s+II\s*\n\s*BALIZAMENTO\s*\n(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+III|\Z)"),
        ("Manobra", r"(?:CAPITULO|CAPÍTULO)\s+III\s*\n\s*MANOBRA\s*\n(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+IV|\Z)"),
        ("Navegação e Cartas Náuticas", r"(?:CAPITULO|CAPÍTULO)\s+IV\s*\n.*?\n(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+V|\Z)"),
        ("Combate a Incêndio", r"(?:CAPITULO|CAPÍTULO)\s+V\s*\n\s*COMBATE A INCÊNDIO\s*\n(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+VI|\Z)"),
        ("Primeiros Socorros", r"(?:CAPITULO|CAPÍTULO)\s+VI\s*\n\s*PRIMEIROS SOCORROS\s*\n(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+VII|\Z)"),
        ("Salvatagem e Sobrevivência", r"(?:CAPITULO|CAPÍTULO)\s+VII\s*\n\s*SOBREVIV.*?\n(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+IX|\Z)"),
        ("Legislação Náutica", r"(?:CAPITULO|CAPÍTULO)\s+IX\s*\n\s*NORMAS BÁSICAS.*?\n(.*)")
    ]

    for ch_name, pattern in ans_chapters:
        match = re.search(pattern, answers_raw, re.DOTALL | re.IGNORECASE)
        if match:
            ch_text = match.group(1)
            ans_items = re.findall(r'(\d+)\s*\)\s*(.*?)\n\s*([a-d])\s*\)\s*(.*?)(?=(?:\n\s*\d+\s*\)|\Z))', ch_text, re.DOTALL)
            chapter_answers[ch_name] = {}
            for qnum, qtext, letter, atext in ans_items:
                chapter_answers[ch_name][int(qnum)] = {
                    "letter": letter.strip().lower(),
                    "answer_text": clean_text(atext)
                }

    # Questions sections
    quest_chapters = [
        ("RIPEAM", r"CAP[ÍI]TULO\s+1\s*\n\s*RIPEAM\s*\n.*?(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+II|\Z)"),
        ("Balizamento", r"(?:CAPITULO|CAPÍTULO)\s+II\s*\n\s*BALIZAMENTO\s*\n.*?(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+III|\Z)"),
        ("Manobra", r"(?:CAPITULO|CAPÍTULO)\s+III\s*\n\s*MANOBRA\s*\n.*?(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+IV|\Z)"),
        ("Navegação e Cartas Náuticas", r"(?:CAPITULO|CAPÍTULO)\s+IV\s*\n\s*SIMBOLOGIA.*?\n.*?(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+V|\Z)"),
        ("Combate a Incêndio", r"(?:CAPITULO|CAPÍTULO)\s+V\s*\n\s*COMBATE A INCÊNDIO\s*\n.*?(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+VI|\Z)"),
        ("Primeiros Socorros", r"(?:CAPITULO|CAPÍTULO)\s+VI\s*\n\s*PRIMEIROS SOCORROS\s*\n.*?(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+VII|\Z)"),
        ("Salvatagem e Sobrevivência", r"(?:CAPITULO|CAPÍTULO)\s+VII\s*\n\s*SOBREVIV.*?\n.*?(.*?)(?=(?:CAPITULO|CAPÍTULO)\s+IX|\Z)"),
        ("Legislação Náutica", r"(?:CAPITULO|CAPÍTULO)\s+IX\s*\n\s*NORMAS BÁSICAS.*?\n.*?(.*?)(?=Lembretes Importantes|CAPITANIA DOS PORTOS DO CEAR|\Z)")
    ]

    all_questions = []
    seen_statements = set()
    qid = 1

    for ch_name, pattern in quest_chapters:
        match = re.search(pattern, questions_raw, re.DOTALL | re.IGNORECASE)
        if not match:
            continue
        ch_text = match.group(1)
        
        q_blocks = re.findall(r'(?:^|\n)\s*(\d{1,3})\s*\)\s*(.*?)(?=(?:\n\s*\d{1,3}\s*\)|\Z))', ch_text, re.DOTALL)
        
        for qnum_str, block in q_blocks:
            try:
                qnum = int(qnum_str)
            except:
                continue
            
            opt_matches = list(re.finditer(r'([a-d])\s*\)\s*(.*?)(?=(?:[a-d]\s*\)|\Z))', block, re.DOTALL))
            if len(opt_matches) < 2:
                continue
            
            statement = block[:opt_matches[0].start()].strip()
            statement = clean_text(statement)
            if not statement or len(statement) < 6:
                continue

            stmt_key = re.sub(r'[^a-zA-Z0-9]', '', statement.lower())[:50]
            if stmt_key in seen_statements:
                continue
            seen_statements.add(stmt_key)

            options = []
            opt_letters = []
            for om in opt_matches:
                opt_letter = om.group(1).lower()
                opt_text = clean_text(om.group(2))
                if opt_text:
                    options.append(opt_text)
                    opt_letters.append(opt_letter)

            if len(options) < 2:
                continue

            ans_info = chapter_answers.get(ch_name, {}).get(qnum)
            correct_idx = 0
            if ans_info:
                correct_letter = ans_info['letter']
                if correct_letter in opt_letters:
                    correct_idx = opt_letters.index(correct_letter)
                else:
                    for idx, opt in enumerate(options):
                        if ans_info['answer_text'].lower()[:20] in opt.lower():
                            correct_idx = idx
                            break
            
            # Map to 5 official DPC categories:
            # 1. RIPEAM
            # 2. Balizamento
            # 3. Legislação Náutica
            # 4. Manobra, Atracação e Fundeio
            # 5. Primeiros Socorros, Salvatagem e Incêndio
            category_mapping = {
                "RIPEAM": "RIPEAM",
                "Balizamento": "Balizamento",
                "Manobra": "Manobra, Atracação e Fundeio",
                "Navegação e Cartas Náuticas": "Manobra, Atracação e Fundeio",
                "Combate a Incêndio": "Primeiros Socorros, Salvatagem e Incêndio",
                "Primeiros Socorros": "Primeiros Socorros, Salvatagem e Incêndio",
                "Salvatagem e Sobrevivência": "Primeiros Socorros, Salvatagem e Incêndio",
                "Legislação Náutica": "Legislação Náutica"
            }
            category = category_mapping.get(ch_name, "Legislação Náutica")

            explanation = ""
            norm_ref = ""
            image_type = None

            if category == "RIPEAM":
                norm_ref = "RIPEAM-72 (Regulamento Internacional para Evitar Abalroamentos no Mar)"
                if "roda a roda" in statement.lower() or "proa com proa" in statement.lower():
                    explanation = "Na situação de 'roda a roda' (proa com proa), ambas as embarcações a propulsão mecânica devem guinar para boreste (direita), passando bombordo com bombordo (RIPEAM Regra 14)."
                    image_type = "maneuver_head_on"
                elif "rumos cruzados" in statement.lower():
                    explanation = "Na situação de rumos cruzados, a embarcação que avistar a outra por seu boreste (direita) deve se manter fora do caminho e evitar cruzar a sua proa (RIPEAM Regra 15)."
                    image_type = "maneuver_crossing"
                elif "alcançad" in statement.lower() or "ultrapass" in statement.lower():
                    explanation = "Toda embarcação que estiver alcançando outra deverá manter-se fora do caminho da alcançada. A condição de alcançada ocorre quando se aproxima em setor superior a 22,5° a ré do través (RIPEAM Regra 13)."
                    image_type = "maneuver_overtaking"
                elif "apito" in statement.lower() or "sinal sonoro" in statement.lower() or "som" in statement.lower():
                    explanation = "Sinais sonoros de manobra: 1 apito curto (1s) = guinando para boreste; 2 curtos = guinando para bombordo; 3 curtos = dando atrás; 5 curtos rápidos = sinal de dúvida/perigo (RIPEAM Regra 34)."
                    image_type = "sound_signals"
                elif "luz" in statement.lower() or "mastro" in statement.lower() or "setor" in statement.lower() or "alcançado" in statement.lower():
                    explanation = "Luzes de navegação: Luz de mastro branca (225° na proa); Luzes de bordos (Verde a Boreste 112,5°, Encarnada a Bombordo 112,5°); Luz de alcançado branca (135° na ré) (RIPEAM Regra 21)."
                    image_type = "nav_lights"
                elif "fundeada" in statement.lower() or "balão" in statement.lower():
                    explanation = "Embarcação fundeada exibe à noite uma luz branca circular de 360° no mastro/vante e, durante o dia, uma esfera preta (balão) a vante (RIPEAM Regra 30)."
                    image_type = "day_shape_anchored"
                elif "sem governo" in statement.lower():
                    explanation = "Embarcação sem governo exibe à noite duas luzes encarnadas circulares verticais (360°) e, de dia, duas esferas pretas verticais (RIPEAM Regra 27)."
                    image_type = "day_shape_not_under_command"
                else:
                    explanation = "Regulamentado pelas regras internacionais do RIPEAM-72 para prevenção de colisões na navegação de amadores e profissionais."

            elif category == "Balizamento":
                norm_ref = "Manual de Balizamento IALA Região B / NORMAM-211"
                if "boreste" in statement.lower():
                    explanation = "No Sistema IALA Região B (Brasil), quem entra no canal/porto deixa os sinais verdes cônicos a boreste (direita)."
                    image_type = "buoy_starboard"
                elif "bombordo" in statement.lower():
                    explanation = "No Sistema IALA Região B (Brasil), quem entra no canal/porto deixa os sinais encarnados (vermelhos) cilíndricos a bombordo (esquerda)."
                    image_type = "buoy_port"
                elif "perigo isolado" in statement.lower():
                    explanation = "O sinal de Perigo Isolado tem cor preta com faixas encarnadas horizontais e tope de duas esferas pretas. À noite emite luz branca em grupo de 2 lampejos (Fl(2))."
                    image_type = "buoy_isolated_danger"
                elif "águas seguras" in statement.lower() or "aguas seguras" in statement.lower():
                    explanation = "O sinal de Águas Seguras possui faixas verticais encarnadas e brancas com uma esfera encarnada no tope. Indica águas navegáveis em toda a sua volta."
                    image_type = "buoy_safe_water"
                elif "cardinal" in statement.lower() or "quadrante" in statement.lower():
                    explanation = "Sinais cardinais indicam o quadrante seguro (N, S, L, O) através das cores preta e amarela e da posição dos dois cones pretos no tope."
                    image_type = "buoy_cardinal"
                elif "preferencial" in statement.lower() or "bifurcação" in statement.lower():
                    explanation = "Canal preferencial a Boreste: boia verde com faixa encarnada horizontal. Canal preferencial a Bombordo: boia encarnada com faixa verde horizontal."
                    image_type = "buoy_preferred_channel"
                else:
                    explanation = "Conforme o Sistema de Balizamento Marítimo e Fluvial IALA Região B adotado no Brasil."

            elif category == "Legislação Náutica":
                norm_ref = "LESTA (Lei 9.537/1997), RLESTA (Dec. 2.596/1998) e NORMAM-211/DPC (2026)"
                explanation = "A LESTA e a NORMAM-211 estabelecem a habilitação de amadores (Arrais-Amador para navegação interior), o cadastro e registro da embarcação (TIE/TIEM), a fiscalização da Inspeção Naval e as penalidades administrativas cabíveis."

            elif category == "Manobra, Atracação e Fundeio":
                norm_ref = "Arte Naval / Manobra de Embarcações / NORMAM-211"
                explanation = "As manobras de atracação, desatracação e fundeio exigem considerar vento, correnteza e rotação do hélice (efeito de leme e corrente de descarga)."
                image_type = "mooring_diagram"

            elif category == "Primeiros Socorros, Salvatagem e Incêndio":
                if "fogo" in statement.lower() or "incêndio" in statement.lower() or "extintor" in statement.lower():
                    norm_ref = "Combate a Incêndio (CBINC) / NORMAM-211"
                    explanation = "Classes de incêndio: Classe A (materiais sólidos - água/espuma), Classe B (líquidos inflamáveis - CO2/pó químico), Classe C (equipamentos elétricos energizados - CO2/pó químico; NUNCA água!)."
                    image_type = "fire_triangle"
                else:
                    norm_ref = "Primeiros Socorros Náuticos (PRISOC) / Salvatagem / NORMAM-211"
                    explanation = "Primeiros socorros a bordo: priorizar manutenção de vias aéreas, controle de hemorragias, prevenção de choque e RCP 30:2."
                    image_type = "first_aid"

            q_entry = {
                "id": qid,
                "topic": category,
                "subtopic": ch_name,
                "question": statement,
                "options": options,
                "correctIndex": correct_idx,
                "explanation": explanation,
                "normReference": norm_ref,
                "image": image_type
            }
            all_questions.append(q_entry)
            qid += 1

    # 2026 specific high-yield questions
    normam2026_questions = [
        {
            "id": qid,
            "topic": "Legislação Náutica",
            "subtopic": "NORMAM-211 2026",
            "question": "Um candidato aprovado no exame de Arrais-Amador recebe sua Carteira de Habilitação de Amador (CHA). Ele pode conduzir moto aquática (jet-ski) exclusivamente com essa habilitação?",
            "options": [
                "Sim, pois a habilitação de Arrais-Amador abrange todas as embarcações de esporte e recreio em águas interiores.",
                "Não, pois a condução de moto aquática exige obrigatoriamente a habilitação específica na categoria de Motonauta (MTA).",
                "Sim, desde que a moto aquática possua até 130 HP de potência.",
                "Não, exceto se estiver acompanhado de um Mestre-Amador a bordo."
            ],
            "correctIndex": 1,
            "explanation": "Conforme a NORMAM-211/DPC (atualizada em 2026), o Arrais-Amador é habilitado para conduzir embarcações nos limites da navegação interior, EXCETO moto aquática, que exige habilitação específica de Motonauta.",
            "normReference": "NORMAM-211/DPC (2026) / LESTA",
            "image": None
        },
        {
            "id": qid + 1,
            "topic": "Legislação Náutica",
            "subtopic": "NORMAM-211 2026",
            "question": "Qual instrumento normativo regulamenta a Lei de Segurança do Tráfego Aquaviário (LESTA - Lei nº 9.537/1997)?",
            "options": [
                "NORMAM-211/DPC",
                "Decreto nº 2.596/1998 (RLESTA)",
                "Código de Trânsito Brasileiro (CTB)",
                "NORMAM-301/DPC"
            ],
            "correctIndex": 1,
            "explanation": "A LESTA (Lei 9.537/97) é regulamentada pelo Decreto Federal nº 2.596/1998 (RLESTA), que define as infrações e o processo administrativo das penalidades.",
            "normReference": "LESTA (Lei 9.537/97) e RLESTA (Decreto 2.596/98)",
            "image": None
        },
        {
            "id": qid + 2,
            "topic": "Legislação Náutica",
            "subtopic": "NORMAM-211 2026",
            "question": "De acordo com a NORMAM-211/DPC e a LESTA, qual a diferença entre as responsabilidades do Proprietário da embarcação e do Condutor?",
            "options": [
                "O proprietário responde apenas pelas despesas de combustível e o condutor por tudo o mais.",
                "O proprietário é responsável por manter a regularidade documental e condições de segurança da embarcação e não permitir condução por não habilitado; o condutor responde pela condução segura e observância às normas náuticas durante a navegação.",
                "Ambos respondem sempre com a mesma penalidade criminal em qualquer fiscalização da Marinha.",
                "A posse da CHA do condutor regulariza automaticamente qualquer pendência documental da embarcação."
            ],
            "correctIndex": 1,
            "explanation": "Habilitação do condutor e regularidade documental da embarcação são matérias distintas. O proprietário deve manter a embarcação inscrita/registrada e segura; o condutor responde administrativamente pela condução e manobras.",
            "normReference": "NORMAM-211/DPC / LESTA Art. 8º",
            "image": None
        },
        {
            "id": qid + 3,
            "topic": "Legislação Náutica",
            "subtopic": "NORMAM-211 2026",
            "question": "Segundo a atualização da NORMAM-211/DPC (Portaria DPC/DGN/MB nº 200/2026), a Carteira de Habilitação de Amador (CHA) e os atestados náuticos:",
            "options": [
                "Podem ser emitidos e disponibilizados em formato digital e assinados eletronicamente via plataforma Gov.br nas condições previstas na norma.",
                "Exigem obrigatoriamente porte do documento físico plastificado e carimbado em cartório em todas as saídas.",
                "Passaram a ter validade vitalícia para todas as categorias de amadores.",
                "São dispensados para embarcações com motor de popa de até 50 HP."
            ],
            "correctIndex": 0,
            "explanation": "A atualização normativa da NORMAM-211 modernizou os procedimentos náuticos, admitindo a CHA Digital e assinaturas eletrônicas avançadas pelo Gov.br conforme regulamentado pela DPC.",
            "normReference": "NORMAM-211/DPC (Atualização 2026)",
            "image": None
        },
        {
            "id": qid + 4,
            "topic": "Legislação Náutica",
            "subtopic": "LESTA / Penalidades",
            "question": "Conduzir embarcação em estado de embriaguez alcoólica ou sob efeito de substâncias entorpecentes/tóxicas sujeita o infrator a qual penalidade segundo a LESTA e RLESTA?",
            "options": [
                "Apenas advertência verbal na primeira autuação.",
                "Multa ou suspensão da CHA por até 120 dias, e em caso de reincidência, cancelamento da habilitação, sem prejuízo de sanções penais cabíveis.",
                "Apreensão definitiva imediata da embarcação sem direito a recurso.",
                "Obrigação de realizar curso de 10 horas na Capitania dos Portos."
            ],
            "correctIndex": 1,
            "explanation": "Pela LESTA e RLESTA, a condução sob efeito de álcool ou drogas acarreta suspensão da Carteira de Habilitação de Amador de até 120 dias e, em caso de reincidência, cancelamento da CHA, além de responsabilidade penal.",
            "normReference": "LESTA Art. 16 / RLESTA Art. 19 / NORMAM-211",
            "image": None
        },
        {
            "id": qid + 5,
            "topic": "Primeiros Socorros, Salvatagem e Incêndio",
            "subtopic": "Salvatagem",
            "question": "Em caso de 'Homem ao Mar', qual é a primeira ação imediata que deve ser realizada a bordo?",
            "options": [
                "Lançar imediatamente a boia circular com cabo e facho/fumígeno para o bordo da vítima, gritar 'Homem ao Mar' e nunca perdê-la de vista.",
                "Dar marcha a ré com motor em potência máxima para se aproximar rapidamente.",
                "Pular na água sem colete para nadar até a vítima.",
                "Desligar imediatamente todos os rádios e luzes da embarcação."
            ],
            "correctIndex": 0,
            "explanation": "O primeiro procedimento é lançar a boia circular pelo bordo da queda da vítima, alertar a tripulação ('Homem ao Mar por boreste/bombordo') e manter vigilância visual ininterrupta.",
            "normReference": "Manual de Salvatagem Náutica / NORMAM-211",
            "image": "first_aid"
        },
        {
            "id": qid + 6,
            "topic": "Primeiros Socorros, Salvatagem e Incêndio",
            "subtopic": "Salvatagem",
            "question": "Qual bandeira do Código Internacional de Sinais (CIS) deve ser içada durante faina de 'Homem ao Mar'?",
            "options": [
                "Bandeira Bravo (vermelha)",
                "Bandeira Oscar (dividida diagonalmente em amarelo e vermelho)",
                "Bandeira Alfa (dividida em branco e azul)",
                "Bandeira Zulu (dividida em 4 triângulos)"
            ],
            "correctIndex": 1,
            "explanation": "A bandeira 'Oscar' (O) do CIS significa 'Homem ao Mar' e avisa a todas as embarcações nas proximidades sobre a operação de resgate em andamento.",
            "normReference": "Código Internacional de Sinais (CIS) / NORMAM-211",
            "image": None
        },
        {
            "id": qid + 7,
            "topic": "Manobra, Atracação e Fundeio",
            "subtopic": "Manobra",
            "question": "Ao fundear uma embarcação com vento e correnteza atuando no local, qual a boa prática marinheira recomendada?",
            "options": [
                "Lançar a âncora navegando em alta velocidade a favor do vento.",
                "Aproar ao elemento predominante (vento ou correnteza mais forte), parar o seguimento e largar o ferro enquanto a embarcação dá marcha a ré lenta para unhar a âncora.",
                "Largar duas âncoras ao mesmo tempo pela popa.",
                "Amarrar a âncora ao mastro com cabo de nylon fino."
            ],
            "correctIndex": 1,
            "explanation": "Aprova-se ao elemento preponderante (vento ou corrente), corta-se o seguimento a vante e larga-se o ferro com o navio recuando lentamente para o ferro filar o cabo/corrente e unhar firmemente no fundo.",
            "normReference": "Arte Naval / Fundeio e Amarrações",
            "image": "mooring_diagram"
        },
        {
            "id": qid + 8,
            "topic": "RIPEAM",
            "subtopic": "Regras Gerais",
            "question": "O que define a 'Velocidade de Segurança' no RIPEAM?",
            "options": [
                "A velocidade máxima registrada no documento de inscrição da lancha.",
                "A velocidade que possibilita uma ação apropriada e eficaz de evitar abalroamento e parar a embarcação a uma distância segura, considerando visibilidade, tráfego, manobrabilidade e estado do mar.",
                "A velocidade de cruzeiro de exatamente 10 nós para qualquer embarcação de esporte e recreio.",
                "A velocidade mínima necessária para o barco planar na água."
            ],
            "correctIndex": 1,
            "explanation": "Conforme a Regra 6 do RIPEAM, velocidade de segurança é aquela que permite ao condutor manobrar com eficácia para evitar colisão e parar a distância segura dentro das circunstâncias e condições predominantes.",
            "normReference": "RIPEAM Regra 6",
            "image": None
        }
    ]

    all_questions.extend(normam2026_questions)

    for idx, q in enumerate(all_questions):
        q['id'] = idx + 1

    with open('public/data/questions.json', 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)

    print(f"Total curated questions generated: {len(all_questions)}")

    cat_counts = {}
    for q in all_questions:
        cat_counts[q['topic']] = cat_counts.get(q['topic'], 0) + 1
    print("Questions per Category:")
    for c, cnt in cat_counts.items():
        print(f"  {c}: {cnt}")

    # Build Flashcards
    flashcards = [
        # SINAIS SONOROS
        {
            "id": "fc-sound-1",
            "category": "Sinais Sonoros",
            "title": "1 Apito Curto (•)",
            "subtitle": "Manobra RIPEAM (1 segundo)",
            "front": "Qual o significado de 1 apito curto (duração de ~1s) emitido por uma embarcação de propulsão mecânica à vista da outra?",
            "back": "ESTOU GUINANDO PARA BORESTE (DIREITA).",
            "normReference": "RIPEAM Regra 34(a)",
            "signalType": "short_1",
            "icon": "Volume2",
            "soundDuration": [1]
        },
        {
            "id": "fc-sound-2",
            "category": "Sinais Sonoros",
            "title": "2 Apitos Curtos (••)",
            "subtitle": "Manobra RIPEAM (1 segundo cada)",
            "front": "Qual o significado de 2 apitos curtos emitidos em manobra?",
            "back": "ESTOU GUINANDO PARA BOMBORDO (ESQUERDA).",
            "normReference": "RIPEAM Regra 34(a)",
            "signalType": "short_2",
            "icon": "Volume2",
            "soundDuration": [1, 1]
        },
        {
            "id": "fc-sound-3",
            "category": "Sinais Sonoros",
            "title": "3 Apitos Curtos (•••)",
            "subtitle": "Manobra RIPEAM",
            "front": "Qual o significado de 3 apitos curtos emitidos por uma embarcação?",
            "back": "ESTOU DANDO ATRÁS (MÁQUINAS EM MARCHA A RÉ).",
            "normReference": "RIPEAM Regra 34(a)",
            "signalType": "short_3",
            "icon": "Volume2",
            "soundDuration": [1, 1, 1]
        },
        {
            "id": "fc-sound-4",
            "category": "Sinais Sonoros",
            "title": "5 Apitos Curtos e Rápidos (•••••)",
            "subtitle": "Sinal de Dúvida / Perigo",
            "front": "Qual o significado de 5 ou mais apitos curtos e rápidos?",
            "back": "SINAL DE DÚVIDA OU PERIGO IMINENTE: 'Não compreendi suas intenções de manobra' ou 'Duvido que você esteja agindo para evitar a colisão'.",
            "normReference": "RIPEAM Regra 34(d)",
            "signalType": "danger_5",
            "icon": "AlertTriangle",
            "soundDuration": [0.4, 0.4, 0.4, 0.4, 0.4]
        },
        {
            "id": "fc-sound-5",
            "category": "Sinais Sonoros",
            "title": "1 Apito Longo (—)",
            "subtitle": "Curvas em Rios e Canais (4 a 6 segundos)",
            "front": "Qual o sinal sonoro obrigatório ao se aproximar de uma curva em canal estreito ou rio sem visibilidade?",
            "back": "1 APITO LONGO (4 a 6 segundos). Qualquer embarcação além da curva que o ouvir deverá responder com outro apito longo.",
            "normReference": "RIPEAM Regra 34(e)",
            "signalType": "long_1",
            "icon": "Volume2",
            "soundDuration": [4]
        },
        {
            "id": "fc-sound-6",
            "category": "Sinais Sonoros",
            "title": "1 Apito Longo a cada 2 min (— ... —)",
            "subtitle": "Visibilidade Restrita (Com Seguimento)",
            "front": "Qual sinal de cerração indica embarcação a motor em movimento com seguimento no mar?",
            "back": "1 APITO LONGO a intervalos não superiores a 2 minutos.",
            "normReference": "RIPEAM Regra 35(a)",
            "signalType": "fog_motor",
            "icon": "CloudFog",
            "soundDuration": [4]
        },
        {
            "id": "fc-sound-7",
            "category": "Sinais Sonoros",
            "title": "2 Apitos Longos a cada 2 min (—— ... ——)",
            "subtitle": "Visibilidade Restrita (Sem Seguimento)",
            "front": "Qual sinal sonoro indica embarcação a motor sob máquinas paradas (sem seguimento)?",
            "back": "2 APITOS LONGOS consecutivos separados por 2 segundos, a intervalos de até 2 minutos.",
            "normReference": "RIPEAM Regra 35(b)",
            "signalType": "fog_stopped",
            "icon": "CloudFog",
            "soundDuration": [4, 4]
        },

        # BALIZAMENTO IALA B
        {
            "id": "fc-buoy-1",
            "category": "Balizamento IALA B",
            "title": "Sinal Lateral de Boreste",
            "subtitle": "Entrada de Canal (Brasil)",
            "front": "No Brasil (Região B), qual a cor, formato do tope e luz da boia de BORESTE para quem entra no porto?",
            "back": "• Cor: VERDE\n• Formato: Cônico ou pilar\n• Tope: Cone verde apontado para CIMA\n• Luz: Verde (qualquer ritmo exceto Fl(2+1))\n• Regra de ouro: BORESTE = VERDE (deixar à direita ao entrar)",
            "normReference": "IALA Região B / NORMAM-211",
            "icon": "Anchor",
            "imageType": "buoy_starboard"
        },
        {
            "id": "fc-buoy-2",
            "category": "Balizamento IALA B",
            "title": "Sinal Lateral de Bombordo",
            "subtitle": "Entrada de Canal (Brasil)",
            "front": "No Brasil (Região B), qual a cor, formato do tope e luz da boia de BOMBORDO para quem entra no porto?",
            "back": "• Cor: ENCARNADA (Vermelha)\n• Formato: Cilíndrico ou cego\n• Tope: Cilindro encarnado\n• Luz: Encarnada (qualquer ritmo exceto Fl(2+1))\n• Regra de ouro: BOMBORDO = ENCARNADO (deixar à esquerda ao entrar)",
            "normReference": "IALA Região B / NORMAM-211",
            "icon": "Anchor",
            "imageType": "buoy_port"
        },
        {
            "id": "fc-buoy-3",
            "category": "Balizamento IALA B",
            "title": "Sinal de Perigo Isolado",
            "subtitle": "Obstáculo Pontual Seguro ao Redor",
            "front": "Como identificar uma boia de PERIGO ISOLADO (cores, tope e luz)?",
            "back": "• Cores: PRETA com faixas horizontais ENCARNADAS\n• Tope: DUAS ESFERAS PRETAS sobrepostas\n• Luz: Branca lampejante em grupo de 2 (Fl(2))\n• Significado: Perigo isolado com águas navegáveis em toda a sua volta.",
            "normReference": "IALA Região B",
            "icon": "AlertOctagon",
            "imageType": "buoy_isolated_danger"
        },
        {
            "id": "fc-buoy-4",
            "category": "Balizamento IALA B",
            "title": "Sinal de Águas Seguras",
            "subtitle": "Meio de Canal / Entrada de Barra",
            "front": "Como identificar um sinal de ÁGUAS SEGURAS?",
            "back": "• Cores: FAIXAS VERTICAIS ENCARNADAS E BRANCAS\n• Tope: UMA ESFERA ENCARNADA\n• Luz: Branca isofásica, ocultação ou Morse 'A' (• —)\n• Significado: Águas seguras e profundas em todo o seu redor.",
            "normReference": "IALA Região B",
            "icon": "Compass",
            "imageType": "buoy_safe_water"
        },
        {
            "id": "fc-buoy-5",
            "category": "Balizamento IALA B",
            "title": "Canal Preferencial a Boreste",
            "subtitle": "Bifurcação de Canal",
            "front": "Qual a pintura da boia que indica que o Canal Principal / Preferencial fica a BORESTE?",
            "back": "• Cor: VERDE com FAIXA ENCARNADA horizontal no centro.\n• Luz: Verde lampejante composta (Fl(2+1))\n• Significado: O canal recomendado está à direita (boreste) do sinal.",
            "normReference": "IALA Região B",
            "icon": "Navigation",
            "imageType": "buoy_preferred_channel"
        },
        {
            "id": "fc-buoy-6",
            "category": "Balizamento IALA B",
            "title": "Sinais Cardinais (N, S, L, O)",
            "subtitle": "Quadrantes de Navegação",
            "front": "Como memorizar os 4 sinais cardinais pelos cones pretos?",
            "back": "• NORTE (N): 2 cones para CIMA ▲▲ (Preto sobre Amarelo)\n• SUL (S): 2 cones para BAIXO ▼▼ (Amarelo sobre Preto)\n• LESTE (E): Cones pelas BASES ▲▼ (Preto/Amarelo/Preto)\n• OESTE (W): Cones pelos VÉRTICES ▼▲ (Amarelo/Preto/Amarelo)",
            "normReference": "IALA Região B",
            "icon": "Compass",
            "imageType": "buoy_cardinal"
        },

        # LUZES E MARCAS RIPEAM
        {
            "id": "fc-lights-1",
            "category": "Luzes e Marcas",
            "title": "Luzes de Navegação Básicas",
            "subtitle": "Setores e Arcos Horizontais",
            "front": "Quais são as cores e os setores horizontais das 3 luzes regulamentares?",
            "back": "1. Mastro: BRANCA, setor de 225° na proa (vante).\n2. Bordos: VERDE a Boreste (112,5°) e ENCARNADA a Bombordo (112,5°).\n3. Alcançado: BRANCA, setor de 135° na popa (ré).",
            "normReference": "RIPEAM Regra 21",
            "icon": "Sun",
            "imageType": "nav_lights"
        },
        {
            "id": "fc-lights-2",
            "category": "Luzes e Marcas",
            "title": "Embarcação Fundeada",
            "subtitle": "Sinais Noturnos e Diurnos",
            "front": "Quais são os sinais para embarcação fundeada?",
            "back": "• Noite: 1 Luz branca circular de 360° no mastro/vante.\n• Dia: 1 ESFERA PRETA (balão preto) exibida a vante.",
            "normReference": "RIPEAM Regra 30",
            "icon": "Anchor",
            "imageType": "day_shape_anchored"
        },
        {
            "id": "fc-lights-3",
            "category": "Luzes e Marcas",
            "title": "Embarcação Sem Governo",
            "subtitle": "Incapaz de Manobrar por Avaria",
            "front": "Quais as luzes e marcas de embarcação SEM GOVERNO?",
            "back": "• Noite: 2 LUZES ENCARNADAS circulares verticais (360°).\n• Dia: 2 ESFERAS PRETAS verticais sobrepostas.\n• Frase de ouro: 'Duas vermelhas verticais = Sem governo no mar'.",
            "normReference": "RIPEAM Regra 27(a)",
            "icon": "AlertTriangle",
            "imageType": "day_shape_not_under_command"
        },

        # REGRAS DE MANOBRA RIPEAM
        {
            "id": "fc-maneuver-1",
            "category": "Regras de Manobra",
            "title": "Situação 'Roda a Roda'",
            "subtitle": "Proa com Proa",
            "front": "Duas embarcações a motor se aproximam diretamente proa com proa. Como manobram?",
            "back": "AMBAS DEVEM GUINAR PARA BORESTE (DIREITA), passando bombordo com bombordo.",
            "normReference": "RIPEAM Regra 14",
            "icon": "Navigation",
            "imageType": "maneuver_head_on"
        },
        {
            "id": "fc-maneuver-2",
            "category": "Regras de Manobra",
            "title": "Rumos Cruzados",
            "subtitle": "Direito de Passagem",
            "front": "Duas embarcações a motor em rumos que se cruzam. Quem tem a obrigação de manobrar?",
            "back": "A que avistar a outra por seu BORESTE (direita) DEVE MANOBRAR e evitar cruzar a sua proa.\n(Quem vê verde passa; quem vê encarnada manobra!).",
            "normReference": "RIPEAM Regra 15",
            "icon": "Navigation",
            "imageType": "maneuver_crossing"
        },
        {
            "id": "fc-maneuver-3",
            "category": "Regras de Manobra",
            "title": "Embarcação Alcançadora",
            "subtitle": "Ultrapassagem",
            "front": "Na ultrapassagem, quem tem preferência de passagem?",
            "back": "A EMBARCAÇÃO ALCANÇADA TEM PREFERÊNCIA. Quem está alcançando deve se manter afastada até passar totalmente.",
            "normReference": "RIPEAM Regra 13",
            "icon": "Navigation",
            "imageType": "maneuver_overtaking"
        },

        # COMBATE A INCÊNDIO & PRIMEIROS SOCORROS
        {
            "id": "fc-cbinc-1",
            "category": "Combate a Incêndio",
            "title": "Classes de Incêndio (A, B, C)",
            "subtitle": "Agentes Extintores Recomendados",
            "front": "Como combater as Classes de Fogo A, B e C?",
            "back": "• Classe A (Sólidos): Resfriamento com Água ou Espuma.\n• Classe B (Líquidos): Abafamento com CO2, Pó Químico ou Espuma.\n• Classe C (Elétrico energizado): CO2 ou Pó Químico. NUNCA USAR ÁGUA!",
            "normReference": "CBINC / NORMAM-211",
            "icon": "Flame",
            "imageType": "fire_triangle"
        },
        {
            "id": "fc-prisoc-1",
            "category": "Primeiros Socorros",
            "title": "Reanimação Cardiopulmonar (RCP)",
            "subtitle": "Protocolo 30:2",
            "front": "Qual o protocolo oficial de RCP em adultos a bordo?",
            "back": "• 30 compressões torácicas no centro do peito para 2 ventilações de resgate (30:2).\n• Ritmo: 100 a 120 compressões por minuto.\n• Profundidade: 5 a 6 cm.",
            "normReference": "Manual de Primeiros Socorros Marinha",
            "icon": "HeartPulse",
            "imageType": "first_aid"
        },

        # LEGISLAÇÃO NORMAM-211 2026
        {
            "id": "fc-legis-1",
            "category": "Legislação Náutica",
            "title": "Arrais-Amador vs Motonauta",
            "subtitle": "Limites de Habilitação (NORMAM-211/2026)",
            "front": "O Arrais-Amador pode conduzir moto aquática (jet-ski)?",
            "back": "NÃO! O Arrais-Amador conduz embarcações nos limites da NAVEGAÇÃO INTERIOR (rios, lagos, baías e canais), EXCETO moto aquática, que exige habilitação específica de MOTONAUTA (MTA).",
            "normReference": "NORMAM-211/DPC (2026)",
            "icon": "Award"
        },
        {
            "id": "fc-legis-2",
            "category": "Legislação Náutica",
            "title": "Categorias de Amadores",
            "subtitle": "Graus de Habilitação Náutica",
            "front": "Quais são as categorias de amadores na ordem de abrangência?",
            "back": "1. Veleiro (VLA): Apenas embarcações a vela sem motor (navegação interior).\n2. Motonauta (MTA): Moto aquática (navegação interior).\n3. Arrais-Amador (ARA): Navegação interior (exceto moto aquática).\n4. Mestre-Amador (MSA): Navegação costeira (até 20 milhas da costa).\n5. Capitão-Amador (CPA): Navegação oceânica / sem limite de afastamento.",
            "normReference": "NORMAM-211/DPC (2026)",
            "icon": "Compass"
        },
        {
            "id": "fc-legis-3",
            "category": "Legislação Náutica",
            "title": "Documentos Obrigatórios",
            "subtitle": "A bordo em Navegação",
            "front": "Quais documentos devem estar a bordo durante a navegação de esporte/recreio?",
            "back": "1. Carteira de Habilitação do Condutor (CHA física ou digital no Gov.br).\n2. Título de Inscrição da Embarcação (TIE/TIEM físico ou digital).\n3. Comprovante de pagamento do seguro obrigatório (DPEM, quando exigível).",
            "normReference": "NORMAM-211/DPC",
            "icon": "FileText"
        }
    ]

    with open('public/data/flashcards.json', 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, ensure_ascii=False, indent=2)

    print(f"Total flashcards generated: {len(flashcards)}")

if __name__ == '__main__':
    build_database()
