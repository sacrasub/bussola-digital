/**
 * Bússola Digital - Simulador Inteligente (Onda 2)
 * Consumindo base de dados JSON (gemini format) e implementando cronômetro (Timer).
 */

class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answered = false;

        // Timer
        this.timerInterval = null;
        this.secondsElapsed = 0;

        // Elementos UI
        this.questionText = document.getElementById('questionText');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.nextBtn = document.getElementById('nextBtn');
        this.questionCounter = document.getElementById('questionCounter');
        this.questionCategory = document.getElementById('questionCategory');
        this.progressText = document.getElementById('progressText');
        this.progressBar = document.getElementById('progressBar');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.timeElapsedResult = document.getElementById('timeElapsedResult');

        // Telas
        this.quizScreen = document.getElementById('quizScreen');
        this.resultScreen = document.getElementById('resultScreen');

        // Botoes fim
        this.restartBtn = document.getElementById('restartBtn');
        this.endBtn = document.getElementById('endSimulation');

        this.fetchQuestions();
    }

    async fetchQuestions() {
        try {
            // Loading state
            this.questionText.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i> Carregando banco estratégico...';

            // Fetch the JSON dynamically
            const response = await fetch('db/questoes.json');
            if (!response.ok) throw new Error("Erro ao carregar questoes.json");

            const data = await response.json();

            // Sort questions randomly for each attempt
            this.questions = data.questoes.sort(() => 0.5 - Math.random());

            this.init();
        } catch (error) {
            console.error("Erro no Simulador:", error);
            this.questionText.innerHTML = '<span class="text-red">Erro de conexão ao baixar as provas da Capitania. Tente novamente mais tarde.</span>';
        }
    }

    init() {
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartGame());

        if (this.endBtn) {
            this.endBtn.addEventListener('click', () => {
                const conf = confirm("Tem certeza que deseja desistir do simulado agora?");
                if (conf) window.location.href = "index.html";
            });
        }

        this.startTimer();
        this.loadQuestion();
    }

    startTimer() {
        this.secondsElapsed = 0;
        clearInterval(this.timerInterval);

        const updateDisplay = () => {
            const m = Math.floor(this.secondsElapsed / 60).toString().padStart(2, '0');
            const s = (this.secondsElapsed % 60).toString().padStart(2, '0');
            if (this.timerDisplay) this.timerDisplay.textContent = `${m}:${s}`;
        };

        updateDisplay();
        this.timerInterval = setInterval(() => {
            this.secondsElapsed++;
            updateDisplay();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        const m = Math.floor(this.secondsElapsed / 60).toString().padStart(2, '0');
        const s = (this.secondsElapsed % 60).toString().padStart(2, '0');
        if (this.timeElapsedResult) this.timeElapsedResult.textContent = `${m}:${s}`;
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
        if (this.progressText) this.progressText.textContent = `${currentProg}/${total}`;

        const pct = (currentProg / total) * 100;
        if (this.progressBar) this.progressBar.style.width = `${pct}%`;

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
        if (this.answered) return; // Trava resposta dupla

        this.answered = true;
        this.nextBtn.disabled = false;

        const q = this.questions[this.currentQuestionIndex];
        const correctIndex = q.respostaCorreta;

        const allBtns = this.optionsContainer.querySelectorAll('button');

        allBtns.forEach((btn, i) => {
            btn.disabled = true;

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
        this.stopTimer();
        this.quizScreen.style.display = 'none';
        this.resultScreen.style.display = 'block';

        // Finaliza Barra
        if (this.progressText) this.progressText.textContent = `${this.questions.length}/${this.questions.length}`;
        if (this.progressBar) this.progressBar.style.width = `100%`;

        const total = this.questions.length;
        const pct = Math.round((this.score / total) * 100);

        document.getElementById('scoreValue').textContent = pct;
        document.getElementById('correctCount').textContent = this.score;
        document.getElementById('incorrectCount').textContent = total - this.score;

        const msgEl = document.getElementById('feedbackMsg');
        const scoreCircle = document.querySelector('.score-circle');

        if (pct >= 80) {
            msgEl.textContent = "Excelente! Você tem a base sólida. Agora é lapidar o conhecimento e focar nas NORMAMs para dominar a aprovação.";
            if (scoreCircle) { scoreCircle.style.borderColor = "var(--green-success)"; scoreCircle.style.color = "var(--green-success)"; }
        } else if (pct >= 50) {
            msgEl.textContent = "Bom trabalho, mas atenção: o PREPOM é concorrido. Recomendamos dedicação nos fundamentos principais.";
        } else {
            msgEl.textContent = "Alerta: Você precisa reformular sua estratégia de estudos para passar no CFAQ. Sugerimos ingressar no Curso Completo.";
            if (scoreCircle) { scoreCircle.style.borderColor = "var(--red-alert)"; scoreCircle.style.color = "var(--red-alert)"; }
        }
    }

    restartGame() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.quizScreen.style.display = 'block';
        this.resultScreen.style.display = 'none';

        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) { scoreCircle.style.borderColor = "var(--gold)"; scoreCircle.style.color = "var(--white)"; }

        this.startTimer();

        // Shuffle again
        this.questions = this.questions.sort(() => 0.5 - Math.random());
        this.loadQuestion();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
