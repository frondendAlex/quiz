import { data } from "./data.js";
document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    

    const QUESTION_URL = fetch('js/bd.json');

    let countQuestion = 0;
    
    // Получения данных
    QUESTION_URL.then(response => {
        return response.json();
    })
    .then(data => {
        const question = data[0].questions;
        renderTitle(question);
        renderAnswers(question);
        renderNumberQuestion(question);
        renderWinning(question);
    })

    // Отображает сколько на странице вопросов
    const renderNumberQuestion = (num) => {
        const quizTopText = document.querySelector('.quiz__top');
        const numberQuestion = `<p class="quiz__top-text">Вопросов <span class="quiz__top-text-num">${countQuestion + 1}</span> из <span class="quiz__top-text-num">${num.length}</span></p>`;
        quizTopText.innerHTML = numberQuestion;
    };

    // Отображает какой выигрыш
    const renderWinning = (question) => {
        const quizPrice = document.querySelector('.quiz__winning');
        const winning = `<span class="quiz__winning-text">${question[countQuestion].price} ₽</span>`;
        quizPrice.innerHTML = winning;
    }

    // Отображает на странице ВОПРОС
    const renderTitle = (question) => {
        const quizQuestionTitle = document.querySelector('.quiz__question');
        for (let i = 0; i < question.length; i++) {
            const titleHTML = `<h1 class="quiz__question-title"><span>${countQuestion + 1}.</span>${question[countQuestion].question}</h1>`;
            quizQuestionTitle.innerHTML = titleHTML;
        }
    }

    // Отображает на странице ОТВЕТЫ
    const renderAnswers = (question) => {
        const quizAnswers = document.querySelector('.quiz__answers');
        const order = ['A', 'B', 'C', 'D'];
        question[countQuestion].answer.forEach((el, i) => {
            const ansewrHTML = `<p class="quiz__answer"><span>${order[i]}.</span> ${el}</p>`;
            quizAnswers.insertAdjacentHTML('beforeend', ansewrHTML);
        });
    }

    const d = data();


});