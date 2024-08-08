

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../css/nullstyle.css">
    <link rel="stylesheet" href="../css/generalstyle.css">
    <link rel="stylesheet" href="css/style.css">
    
    <!-- ** Font ** -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:wght@300&display=swap" rel="stylesheet">
    <!-- // Font // -->

    <title>Регистрация</title>
</head>
<body>

    <?php require_once('../components/registr.php') ?>

    <div class="adminform">
        <form class="adminform__form" action="" method="POST">
            <h2 class="adminform__title">Регистрация</h2>
            <input class="adminform__input" type="text" name="login" placeholder="Ваш логин">
            <input class="adminform__input" type="text" name="pass" placeholder="Пароль">
            <button class="adminform__btn" typr="submit">Зарегистрироваться</button>
            
        </form>
    </div>

</body>
</html>