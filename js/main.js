document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const QUESTION_URL = fetch('js/bd.json');
    const quizAnswers = document.querySelector('.quiz__answers');
    const quizBtn = document.querySelector('.quiz__btn');
    let question;
    let choosingAnswerInd;
    const priceArr = [];
    let countQuestion = 0;

    // Получения данных
    QUESTION_URL.then(response => {
        return response.json();
    })
    .then(data => {
        question = data[0].questions;
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
        quizPrice.innerHTML = '';
        const winning = `<span class="quiz__winning-text">${question[countQuestion].price} ₽</span>`;
        quizPrice.insertAdjacentHTML('beforeend', winning);
    }

    // Отображает на странице ВОПРОС
    const renderTitle = (question) => {
        const quizQuestionTitle = document.querySelector('.quiz__question');
        quizQuestionTitle.innerHTML = '';
        console.log(question[countQuestion]);
        const titleHTML = `<h1 class="quiz__question-title"><span>${countQuestion + 1}.</span>${question[countQuestion].question}</h1>`;
        quizQuestionTitle.insertAdjacentHTML('beforeend', titleHTML);
    }

    // Отображает на странице ОТВЕТЫ
    const renderAnswers = (question) => {
        const order = ['A', 'B', 'C', 'D'];
        question[countQuestion].answer.forEach((el, i) => {
            const ansewrHTML = `<p class="quiz__answer"><span>${order[i]}.</span> ${el}</p>`;
            quizAnswers.insertAdjacentHTML('beforeend', ansewrHTML);
        });
        getAnswers();
    }

    // События по ответам
    const getAnswers = () => {
        const answers = document.querySelectorAll('.quiz__answer');
        answers.forEach((answer, ind) => {
            answer.addEventListener('click', ( {target} ) => {
                choosingAnswerInd = ind;

                answers.forEach(answer => answer.classList.remove('checked'));
                target.classList.add('checked');
                quizBtn.classList.add('quiz__btn-bg');

                // Праверка на выбор ответа
                if (target.classList.contains('checked')) {
                    quizBtn.addEventListener('click', btnClick);
                    quizBtn.textContent = 'Ответить'
                }

            });
        });
    }


    const btnClick = () => {
        if (!quizBtn.classList.contains('quiz__btn-bg')) return;
        const answers = document.querySelectorAll('.quiz__answer');


        if (choosingAnswerInd === question[countQuestion].correct) {
            answers[choosingAnswerInd].classList.add('rightanswer');
            answers[choosingAnswerInd].classList.remove('checked');
            priceArr.push(question[countQuestion].price);
        } else {
            answers[choosingAnswerInd].classList.add('wronganswer');
            answers[choosingAnswerInd].classList.remove('checked');
        }

        if (countQuestion >= question.length) {
            // Показывать итоговый контент
            countQuestion = 0;
            console.log(priceArr);
        }


        setTimeout(() => {
            countQuestion++;
            quizBtn.classList.remove('quiz__btn-bg');
            quizAnswers.innerHTML = '';
            renderTitle(question);
            renderNumberQuestion(question);
            renderAnswers(question);
            renderWinning(question);
            quizBtn.textContent = 'Выберите ответ';
        }, 1000);

        
    }




    
    
    


    


});