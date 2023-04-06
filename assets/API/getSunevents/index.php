<?php
// define which content type we want to return
header("Content-Type: application/json;charset=utf-8");
// get the current time
$date = time();

for ($i = 1; $i <= 5; $i++) {
    // get the sunrise and sunset for the current date
    $suninfo = date_sun_info($date, 48.226125, 14.604809);
    // save the sunrise and sunset time
    $result[$i]['sunrise'] = date("H:i", $suninfo['sunrise']);
    $result[$i]['sunset'] = date("H:i", $suninfo['sunset']);
    // go to the next day
    $date = $date + 86400;
}

// return the result in JSON format
echo(json_encode($result));