document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const QUESTION_URL = fetch("bd/bd.json");
    const start = document.querySelector(".start");
    const quiz = document.querySelector(".quiz");
    const quizInfo = document.querySelector(".quizInfo");
    const quizAnswers = document.querySelector(".quiz__answers");
    const quizBtn = document.querySelector(".quiz__btn");
    const quizTotalEl = document.querySelector(".quiz__top-total");
    const quizProgressbar = document.querySelector(".quiz__progress-line");
    const quizProgressbarText = document.querySelector(".quiz__progress-text");

    const rightNumber = document.querySelector(".quiz__right-wrap");

    let question;
    let choosingAnswerInd;
    const priceArr = [];
    let total = 0;
    let countQuestion = 0;
    let btnInterval;
    let heightCount = 0;

    // const arrRightAnswer = [];
    // const arrWrongAnswer = [];
    let arrRightAnswer = 0;
    let arrWrongAnswer = 0;

    // Начала квиза
    const startQuiz = () => {
        const startBtn = document.querySelector(".start__btn");
        startBtn.addEventListener("click", () => {
            start.classList.add("hidden");
            quiz.classList.add("show");

            // Получения данных
            QUESTION_URL.then((response) => {
                return response.json();
            }).then((data) => {
                question = data[0].questions;
                renderTitle(question);
                renderAnswers(question);
                renderNumberQuestion(question);
                renderWinning(question);

                // Создает справа игровые очки
                renderPrice(question);
            });
        });
    };

    // Отображает сколько на странице вопросов
    const renderNumberQuestion = (num) => {
        const quizTopText = document.querySelector(".quiz__top");
        const numberQuestion = `<p class="quiz__top-text">Вопросов <span class="quiz__top-text-num">${
            countQuestion + 1
        }</span> из <span class="quiz__top-text-num">${num.length}</span></p>`;
        quizTopText.innerHTML = numberQuestion;
    };

    // Отображает какой выигрыш
    const renderWinning = (question) => {
        const quizPrice = document.querySelector(".quiz__winning");
        quizPrice.innerHTML = "";
        const winning = `<span class="quiz__winning-text">${question[countQuestion].price} очков</span>`;
        quizPrice.insertAdjacentHTML("beforeend", winning);
    };

    // Отображает на странице ВОПРОС
    const renderTitle = (question) => {
        const quizQuestionTitle = document.querySelector(".quiz__question");
        quizQuestionTitle.innerHTML = "";

        // Обновления квиза после последнего вопроса
        if (countQuestion >= question.length) {
            countQuestion = 0;

            quiz.style.display = "none";
            quizInfo.style.display = "block";

            // const totalPrice = totalFun();
            // console.log(totalPrice);

            quizFinish();

            quizTotalEl.textContent = `${0} очков`;
        }

        const titleHTML = `
            <h1 class="quiz__question-title"><span>${
                countQuestion + 1
            }.</span>${question[countQuestion].question}</h1>
        `;

        quizQuestionTitle.insertAdjacentHTML("beforeend", titleHTML);
        progressBar();
    };

    // Отображает на странице ОТВЕТЫ
    const renderAnswers = (question) => {
        const order = ["A", "B", "C", "D"];
        question[countQuestion].answer.forEach((el, i) => {
            const ansewrHTML = `<p class="quiz__answer"><span>${order[i]}.</span> ${el}</p>`;
            quizAnswers.insertAdjacentHTML("beforeend", ansewrHTML);
        });
        getAnswers();
    };

    // Создает справа игровые очки
    const renderPrice = (price) => {
        rightNumber.innerHTML = "";
        for (let i = 0; i < price.length; i++) {
            const spanText = document.createElement("span");
            spanText.classList.add("quiz__right-text");
            spanText.textContent = price[i].price;
            rightNumber.append(spanText);
        }

        Array.from(rightNumber.querySelectorAll(".quiz__right-text"))[0].classList.add("active");
    };

    // События по ответам
    const getAnswers = () => {
        const answers = document.querySelectorAll(".quiz__answer");
        answers.forEach((answer, ind) => {
            answer.addEventListener("click", ({ target }) => {
                choosingAnswerInd = ind;

                answers.forEach((answer) => answer.classList.remove("checked"));
                target.classList.add("checked");
                quizBtn.classList.add("quiz__btn-bg");

                // Праверка на выбор ответа
                if (target.classList.contains("checked")) {
                    quizBtn.addEventListener("click", btnClick);
                    quizBtn.textContent = "Ответить";
                    quizBtn.disabled = false;
                }
            });
        });
    };

    // События по кнопке "выбирите ответ
    const btnClick = (e) => {
        clearInterval(btnInterval);
        if (!quizBtn.classList.contains("quiz__btn-bg")) return;
        const answers = document.querySelectorAll(".quiz__answer");
        const numbers = rightNumber.querySelectorAll('.quiz__right-text');
        
        if (choosingAnswerInd === question[countQuestion].correct) {
            answers[choosingAnswerInd].classList.add("rightanswer");
            answers[choosingAnswerInd].classList.remove("checked");
            priceArr.push(question[countQuestion].price);
            quizTotalEl.textContent = `${totalFun()} очков`;
            numbers[countQuestion].classList.add('checked');

            // Подсвечивает не правильные ответы
            answers.forEach(el => {
                if (!el.classList.contains("rightanswer")) {
                    el.classList.add("wronganswer");
                } else {
                    console.log("Yes answer");
                    arrRightAnswer++;
                }
            });
        } else {
            answers[choosingAnswerInd].classList.add("wronganswer");
            answers[choosingAnswerInd].classList.remove("checked");

            numbers[countQuestion].classList.add('nochecked');
            // Подсвечивает правильный ответ
            const content = e.target.closest(".quiz__content");
            const answersEl = content.querySelectorAll(".quiz__answer");
            answersEl.forEach((el, i) => {
                if (question[countQuestion].correct === i) {
                    el.classList.add("rightanswer");
                    console.log("No answer");
                    arrWrongAnswer++;
                } else {
                    el.classList.add("wronganswer");
                }
            });
        }

        showNextQuestion();
        lineIndicator();
        switchClassColor();
    };

    // Меняет цвет текста у очков в правом блоке
    const switchClassColor = () => {
        const rightPrice = Array.from(
            rightNumber.querySelectorAll(".quiz__right-text")
        );
        rightPrice[0].classList.remove("active");

        rightPrice.forEach((element) => {
            element.classList.remove("active");
        });

        countQuestion < rightPrice.length - 1
            ? rightPrice[countQuestion + 1].classList.add("active")
            : rightPrice[0].classList.add("active");
    };

    // Показывает следующий вопрос через 3 секунды
    const showNextQuestion = () => {
        quizBtn.textContent = "Выберите ответ";
        quizBtn.classList.remove("quiz__btn-bg");
        quizBtn.disabled = true;
        btnInterval = setTimeout(() => {
            countQuestion++;
            quizAnswers.innerHTML = "";
            renderTitle(question);
            renderNumberQuestion(question);
            renderAnswers(question);
            renderWinning(question);
            
        }, 2500);
    };

    // Итоговый общий выигрыш
    const totalFun = () => {
        total = priceArr.reduce((accumulator, item) => accumulator + item, 0);
        return total;
    };

    // Перемещает индикатор линии по очкам
    const lineIndicator = () => {
        const quizRightLine = document.querySelector(".quiz__right-line");
        if (countQuestion >= question.length - 1) {
            quizRightLine.style.top = 10 + "px";
            heightCount = 0;
        } else {
            quizRightLine.style.top = heightCount + 40 + "px";
            heightCount += 30;
        }
    };

    // Пргресс бар
    const progressBar = () => {
        quizProgressbar.style.width =
            (countQuestion * 100) / question.length + "%";
        quizProgressbarText.textContent =
            Math.round((countQuestion * 100) / question.length) + "%";
    };

    const quizFinish = () => {
        const totalPrice = totalFun();
        console.log("правильные ", arrRightAnswer);
        console.log("не правильные ", arrWrongAnswer);
        console.log(totalPrice);
    };

    startQuiz();
});
