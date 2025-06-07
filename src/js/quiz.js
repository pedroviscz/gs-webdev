import { quizData } from './quizData.js';

export function quiz() {
  const quizContainer = document.getElementById('divQuiz');
  const form = document.getElementById('quizForm');
  const resultEl = document.getElementById('result');

  const loadQuiz = () => {
    quizContainer.innerHTML = quizData
      .map((q, i) => {
        const options = q.options
          .map((opt, j) => {
            const id = `q${i}_${j}`;
            return `
          <div class="option">
            <input type="radio" id="${id}" name="question${i}" value="${opt.value}">
            <label for="${id}">${opt.value}) ${opt.text}</label>
          </div>`;
          })
          .join('');

        return `
        <div class="question">
          <h3>${i + 1}. ${q.question}</h3>
          ${options}
          <div class="error-message" id="error${i}">
            <strong>É necessário responder essa pergunta.</strong>
          </div>
        </div>`;
      })
      .join('');
  };

  const showResults = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    let score = 0,
      allAnswered = true;

    resultEl.style.display = 'none';
    resultEl.classList.remove('success', 'warning', 'danger');

    quizContainer
      .querySelectorAll('label')
      .forEach((label) => label.classList.remove('correct', 'incorrect'));

    quizData.forEach((q, i) => {
      const answer = formData.get(`question${i}`);
      const error = document.getElementById(`error${i}`);
      error.style.display = answer ? 'none' : ((allAnswered = false), 'block');
    });

    if (!allAnswered) {
      resultEl.classList.add('danger');
      resultEl.innerHTML = `<span>Responda todas as perguntas antes de enviar.</span>`;
      resultEl.style.display = 'block';
      resultEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    quizData.forEach((q, i) => {
      const answer = formData.get(`question${i}`);
      q.options.forEach((opt, j) => {
        const input = document.getElementById(`q${i}_${j}`);
        const label = input.nextElementSibling;
        const isCorrect = opt.value === q.correct;
        const isSelected = answer === opt.value;

        if (isSelected) {
          label.classList.add(isCorrect ? 'correct' : 'incorrect');
          if (isCorrect) score++;
        }
      });
    });

    const feedbacks = [
      {
        min: 8,
        text: `👏 <strong>${score}/10</strong> – Parabéns! Você compreende bem o funcionamento dos bueiros inteligentes.`,
        class: 'success',
      },
      {
        min: 5,
        text: `⚠️ <strong>${score}/10</strong> – Você possui boas noções, mas pode revisar mais sobre bueiros inteligentes.`,
        class: 'warning',
      },
      {
        min: 0,
        text: `🚨 <strong>${score}/10</strong> – Atenção! Estude mais sobre bueiros inteligentes e suas funcionalidades.`,
        class: 'danger',
      },
    ];

    const { text, class: cls } = feedbacks.find((f) => score >= f.min);
    resultEl.classList.add(cls);
    resultEl.innerHTML = text;
    resultEl.style.display = 'block';
    resultEl.scrollIntoView({ behavior: 'smooth' });
  };

  loadQuiz();
  form.addEventListener('submit', showResults);
}
