document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const QUESTION_URL = fetch('js/bd.json');
    const quizAnswers = document.querySelector('.quiz__answers');
    const quizBtn = document.querySelector('.quiz__btn');
    const quizTotalEl = document.querySelector('.quiz__top-total');
    let question;
    let choosingAnswerInd;
    const priceArr = [];
    let total = 0;
    let countQuestion = 0;
    let btnInterval;

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

        if (countQuestion >= question.length) {
            countQuestion = 0;
            const totalPrice = totalFun();
            console.log(totalPrice);
        }
        
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
                    quizBtn.textContent = 'Ответить';
                }

            });
        });
    }


    const btnClick = () => {
        clearInterval(btnInterval);
        if (!quizBtn.classList.contains('quiz__btn-bg')) return;
        const answers = document.querySelectorAll('.quiz__answer');

        if (choosingAnswerInd === question[countQuestion].correct) {
            answers[choosingAnswerInd].classList.add('rightanswer');
            answers[choosingAnswerInd].classList.remove('checked');
            priceArr.push(question[countQuestion].price);
            quizTotalEl.textContent = `${totalFun()} очков`;
            
        } else {
            answers[choosingAnswerInd].classList.add('wronganswer');
            answers[choosingAnswerInd].classList.remove('checked');
        }

        // Подсвечивает все не праильные ответы
        answers.forEach(el => {
            if (!el.classList.contains('rightanswer')) {
                el.classList.add('wronganswer')
            }
        });
    
        showNextQuestion();
        
    }

    // Показывает следующий вопрос через 3 секунды
    const showNextQuestion = () => {
        btnInterval = setTimeout(() => {
            countQuestion++;
            quizBtn.classList.remove('quiz__btn-bg');
            quizAnswers.innerHTML = '';
            renderTitle(question);
            renderNumberQuestion(question);
            renderAnswers(question);
            renderWinning(question);
            quizBtn.textContent = 'Выберите ответ';
        }, 3000);
    }

    // Итоговый общий выигрыш
    const totalFun = () => {
        total = priceArr.reduce((accumulator, item ) => accumulator + item , 0);
        return total;
    }




    
    
    


    


});