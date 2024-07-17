<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <link rel="stylesheet" href="css/style.css">

    <!-- ** Font ** -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:wght@300&display=swap" rel="stylesheet">
    <!-- // Font // -->

    <title>Викторина</title>
</head>
<body>

    <div class="app" id="app">

        <div class="quiz">

            <div class="quiz__left">
                <div class="quiz__top-wrap">
                    <div class="quiz__top-total">0 очков</div>
                    <div class="quiz__top">
                        <!-- <p class="quiz__top-text">Вопросов <span class="quiz__top-text-num">3</span> из <span class="quiz__top-text-num">10</span></p> -->
                    </div>
                </div>
                

                <div class="quiz__content">
                    <div class="quiz__question"></div>
                    <div class="quiz__winning"></div>
                    <div class="quiz__answers"></div>
                    <div class="quiz__button">
                        <button class="quiz__btn" type="button">Выберите ответ</button>
                    </div>
                </div>

                <div class="quiz__progress">
                    <span class="quiz__progress-line"></span>
                    <span class="quiz__progress-text">0%</span>
                </div>
            </div>

            <div class="quiz__right">
                <div class="quiz__right-wrap">
                    <!-- <span class="quiz__right-text active">100</span>
                    <span class="quiz__right-text">200</span>
                    <span class="quiz__right-text">300</span>
                    <span class="quiz__right-text">400</span>
                    <span class="quiz__right-text">500</span>
                    <span class="quiz__right-text">600</span>
                    <span class="quiz__right-text">1000</span>
                    <span class="quiz__right-text">10000</span> -->
                    
                </div>
                <div class="quiz__right-line" style="top: 10px;"></div>
            </div>

        </div>

        <!-- <div>Денежное вознограждения</div> -->

    </div>
    
    <script src="js/main.js" defer type="module"></script>
    
</body>
</html>