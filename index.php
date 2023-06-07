<!DOCTYPE html>
<html lang="de-at">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Erhalten Sie das aktuelle Wetter, Prognosen und historische Daten für Naarn im Machlande informativ und übersichtlich aufbereitet.">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="https://wetter-naarn.at/assets/img/logo.svg">
    <link rel="apple-touch-icon" href="https://wetter-naarn.at/assets/img/apple-touch-icon-180x180.png">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://wetter-naarn.at/assets/fonts/poppins/style.css">

    <!-- CSS -->
    <link rel="stylesheet" href="https://wetter-naarn.at/assets/css/navbar/style.css">
    <link rel="stylesheet" href="https://wetter-naarn.at/assets/libraries/boxicons/style.css">
    <link rel="stylesheet" href="https://wetter-naarn.at/assets/css/dashboard/style.css">

    <!-- Scripts -->
    <script src="https://wetter-naarn.at/assets/js/navbar/script.js" defer></script>
    <script src="https://wetter-naarn.at/assets/js/dashboard/script.js" defer></script>
    <?php if(isset($_COOKIE['consent']) && json_decode($_COOKIE['consent'])[1] == 1) include 'https://wetter-naarn.at/assets/google_analytics/'?>
    <title>Aktuelle Wetterwerte aus Naarn | Wetter Naarn</title>
</head>

<body>
    <div id="navbar">
        <?php
        include 'https://wetter-naarn.at/assets/html/navbar/index.html';
        ?>
    </div>

    <div id="content">
        <?php
        include 'https://wetter-naarn.at/assets/html/dashboard/index.html';
        ?>
    </div>

    <?php
    // Cookie Banner
    if (!isset($_COOKIE['consent']) || json_decode($_COOKIE['consent'])[0] == 1) {
        echo('<link rel="stylesheet" href="https://wetter-naarn.at/assets/fonts/opensans/style.css">');
        include 'https://wetter-naarn.at/assets/html/cookie-banner/index.html';
        echo ('<link rel="stylesheet" href="https://wetter-naarn.at/assets/css/cookie-banner/style.css">');
        echo ('<script src="https://wetter-naarn.at/assets/js/cookie-banner/script.js" defer></script>');
    }
    ?>
</body>
</html>