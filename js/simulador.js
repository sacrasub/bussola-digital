/**
 * Bússola Digital - Simulador Inteligente (MVP)
 * Motor lógico para consumo de provas, no estilo PREPOM.
 * No futuro, estas questões virão de um banco de dados / API estruturada pelo Gemini.
 */

const mockQuestions = [
    {
        id: 1,
        category: "Matemática",
        pergunta: "Em uma embarcação, um marinheiro observa que 3/5 da tripulação estão de serviço e o restante está folgando. Se há 24 tripulantes de folga, qual é o total de tripulantes na embarcação?",
        opcoes: ["40", "50", "60", "72", "80"],
        respostaCorreta: 2 // Índice (60)
    },
    {
        id: 2,
        category: "Matemática",
        pergunta: "Uma embarcação consome 400 litros de combustível a cada 3 horas de navegação com velocidade constante. Quantos litros serão consumidos em uma viagem de 15 horas?",
        opcoes: ["1200", "1500", "2000", "2400", "3000"],
        respostaCorreta: 2 // Índice (2000)
    },
    {
        id: 3,
        category: "Português",
        pergunta: "Analise a frase: 'O marinheiro realizou a faina diária com dedicação, embora estivesse cansado.' O termo destacado (embora) estabelece uma relação de:",
        opcoes: ["Causa", "Condição", "Tempo", "Concessão", "Consequência"],
        respostaCorreta: 3 // Índice (Concessão)
    },
    {
        id: 4,
        category: "Português",
        pergunta: "Assinale a alternativa onde TODAS as palavras estão acentuadas corretamente de acordo com o Novo Acordo Ortográfico:",
        opcoes: ["Ideia - Pêlo - Baía", "Voo - Joia - Saúde", "Pôlo - Árvore - Ímã", "Ruím - Herói - Jibóia", "Enjôo - Céu - Heróico"],
        respostaCorreta: 1 // Índice (Voo - Joia - Saúde)
    }
];

class QuizApp {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answered = false;

        // Elementos UI
        this.questionText = document.getElementById('questionText');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.nextBtn = document.getElementById('nextBtn');
        this.questionCounter = document.getElementById('questionCounter');
        this.questionCategory = document.getElementById('questionCategory');
        this.progressText = document.getElementById('progressText');
        this.progressBar = document.getElementById('progressBar');

        // Telas
        this.quizScreen = document.getElementById('quizScreen');
        this.resultScreen = document.getElementById('resultScreen');

        // Botoes fim
        this.restartBtn = document.getElementById('restartBtn');
        this.endBtn = document.getElementById('endSimulation');

        this.init();
    }

    init() {
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartGame());

        if (this.endBtn) {
            this.endBtn.addEventListener('click', () => {
                const conf = confirm("Tem certeza que deseja encerrar o simulado agora?");
                if (conf) {
                    window.location.href = "index.html";
                }
            });
        }

        this.loadQuestion();
    }

    loadQuestion() {
        this.answered = false;
        const q = this.questions[this.currentQuestionIndex];

        // Atualiza textos
        this.questionText.textContent = q.pergunta;
        this.questionCategory.textContent = `< ${q.category} >`;
        this.questionCounter.textContent = `Questão ${this.currentQuestionIndex + 1} de ${this.questions.length}`;

        // Atualiza Progresso Sidebar
        const currentProg = this.currentQuestionIndex;
        const total = this.questions.length;
        this.progressText.textContent = `${currentProg}/${total}`;
        const pct = (currentProg / total) * 100;
        this.progressBar.style.width = `${pct}%`;

        // Renderiza botões
        this.optionsContainer.innerHTML = '';
        this.nextBtn.disabled = true;

        q.opcoes.forEach((opcao, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<strong>${String.fromCharCode(65 + index)})</strong> ${opcao}`;
            btn.dataset.index = index;

            btn.addEventListener('click', () => this.selectOption(index, btn));

            this.optionsContainer.appendChild(btn);
        });
    }

    selectOption(index, btnSelected) {
        if (this.answered) return; // Nao permite re-selecionar

        this.answered = true;
        this.nextBtn.disabled = false;

        const q = this.questions[this.currentQuestionIndex];
        const correctIndex = q.respostaCorreta;

        // Verifica todos os botões para aplicar estilos
        const allBtns = this.optionsContainer.querySelectorAll('button');

        allBtns.forEach((btn, i) => {
            btn.disabled = true; // desativa clicks extras

            if (i === correctIndex) {
                btn.classList.add('correct');
                btn.innerHTML += ' <i class="ph-bold ph-check-circle" style="float: right;"></i>';
            }

            if (i === index && index !== correctIndex) {
                btn.classList.add('incorrect');
                btn.innerHTML += ' <i class="ph-bold ph-x-circle" style="float: right;"></i>';
            }
        });

        if (index === correctIndex) {
            this.score++;
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.quizScreen.style.display = 'none';
        this.resultScreen.style.display = 'block';

        // Atualiza Barra no fim (100%)
        this.progressText.textContent = `${this.questions.length}/${this.questions.length}`;
        this.progressBar.style.width = `100%`;

        const total = this.questions.length;
        const pct = Math.round((this.score / total) * 100);

        document.getElementById('scoreValue').textContent = pct;
        document.getElementById('correctCount').textContent = this.score;
        document.getElementById('incorrectCount').textContent = total - this.score;

        const msgEl = document.getElementById('feedbackMsg');
        if (pct >= 80) {
            msgEl.textContent = "Excelente! Você tem a base sólida. Agora é lapidar o conhecimento e focar nas NORMAMs para dominar a aprovação.";
            document.querySelector('.score-circle').style.borderColor = "var(--green-success)";
            document.querySelector('.score-circle').style.color = "var(--green-success)";
        } else if (pct >= 50) {
            msgEl.textContent = "Bom trabalho, mas atenção: o PREPOM é concorrido. Recomendamos dedicação nos fundamentos matemáticos.";
        } else {
            msgEl.textContent = "Alerta: Você precisa reformular sua estratégia de estudos para passar no CFAQ. Sugerimos ingressar no Curso Completo.";
            document.querySelector('.score-circle').style.borderColor = "var(--red-alert)";
            document.querySelector('.score-circle').style.color = "var(--red-alert)";
        }
    }

    restartGame() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.quizScreen.style.display = 'block';
        this.resultScreen.style.display = 'none';

        // Volta borda default
        document.querySelector('.score-circle').style.borderColor = "var(--gold)";
        document.querySelector('.score-circle').style.color = "var(--white)";

        this.loadQuestion();
    }
}

// Inicia aplicação
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp(mockQuestions);
});
