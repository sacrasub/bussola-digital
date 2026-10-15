import os

file_path = r'c:\Projetos\Projeto Bússola Digital\Arrais-Amador\src\components\ConceptsStudyScreen.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports
old_imp = "import { Compass, Anchor, ShieldCheck, Flame, BookOpen, Volume2, Award, ArrowRight, Search, CheckCircle2, ChevronDown, ChevronUp, Ship } from 'lucide-react';"
new_imp = "import { Compass, Anchor, ShieldCheck, Flame, BookOpen, Volume2, Award, ArrowRight, Search, CheckCircle2, ChevronDown, ChevronUp, Ship, Maximize2, X, Image as ImageIcon } from 'lucide-react';"
content = content.replace(old_imp, new_imp)

# 2. Add state for dhnModal
old_state = "  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);"
new_state = """  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const [dhnModal, setDhnModal] = useState<{ title: string; src: string; desc: string; code: string; rule: string } | null>(null);"""
content = content.replace(old_state, new_state)

# 3. Add c-ripeam-veleiros-regras after c-ripeam-alcancado
target_alc = """        normReference: 'RIPEAM-72 Regra 13 / Apostila Unidade 3 pág. 27',
        examTip: 'O ângulo de ultrapassagem na prova é SEMPRE "mais de 22,5° para ré do través".',
        illustration: 'maneuver_overtaking'
      },"""

new_ripeam = target_alc + """
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
      },"""
content = content.replace(target_alc, new_ripeam)

# 4. Add c-baliz-formatos-detalhados after c-baliz-conceito
target_bal = """        normReference: 'Sistema IALA B / Apostila Unidade 3 pág. 34 a 36',
        examTip: 'No Brasil (IALA B), as boias encarnadas recebem numeração ÍMPAR e as boias verdes numeração PAR, a partir do número 1 na entrada!',
        illustration: 'buoy_starboard'
      },"""

new_bal = target_bal + """
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
      },"""
content = content.replace(target_bal, new_bal)

# 5. Add c-legis-distancias-velocidades in Legislacao Nautica
target_leg = """        normReference: 'NORMAM-03/211 / Apostila Unidade 1 pág. 11 e 12',
        examTip: 'Memorize para a prova: CHA = 10 anos (ou 5 se >= 65 anos); TIE = 5 anos; Seguro DPEM = 12 meses!'
      },"""

new_leg = target_leg + """
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
      },"""
content = content.replace(target_leg, new_leg)

# 6. Add DHN Posters Gallery and Modal above Concepts List
dhn_block = """      {/* Quadros Oficiais DHN Marinha do Brasil */}
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
      )}"""

old_list = "      {/* Concepts List */}"
content = content.replace(old_list, dhn_block + "\n\n      {/* Concepts List */}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("ConceptsStudyScreen.tsx atualizado com sucesso!")
