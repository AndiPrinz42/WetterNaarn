<?php
header('Content-Type: application/json;charset=utf-8');
// get json data from wetter-naarn.at/data/custom.json
$data = file_get_contents("https://wetter-naarn.at/data/custom.json");
// remove any special characters
$data = preg_replace('/[\x00-\x1F\x7F-\xFF]/', '', $data);
// convert json to array
$data = json_decode($data, true);
// get current weather data
$data = $data['current'];
// get icon data from openweathermap.org
$icon = file_get_contents("https://api.openweathermap.org/data/2.5/weather?lat=48.2261&lon=14.6049&appid=".getenv('OPENWEATHERMAP_API_KEY'));
// convert json to array
$icon = json_decode($icon, true);
// get icon
$icon = $icon['weather'][0]['icon'];
// add icon to weather data
$data['icon'] = $icon;
// convert icon to condition
$condition = getCondition($icon);
// add condition to weather data
$data['condition'] = $condition;
// send weather data as json
echo (json_encode($data, true));

// convert icon to condition
function getCondition($icon) {
    // initialize condition
    $condition = "Unbekannt";
    // convert icon to lower case
    $icon = strtolower($icon);
    // check icon
    if (strpos($icon, '01') !== false) {
        //clear sky
        $condition = "wolkenlos";
    } else if (strpos($icon, '02') !== false) {
        //few clouds
        $condition = "wechselnd bewölkt";
    } else if (strpos($icon, '03') !== false) {
        //scattered clouds
        $condition = "bewölkt";
    } else if (strpos($icon, '04') !== false) {
        //broken clouds
        $condition = "stark bewölkt";
    } else if (strpos($icon, '09') !== false) {
        //shower rain
        $condition = "Regenschauer";
    } else if (strpos($icon, '10') !== false) {
        //rain
        $condition = "Regen";
    } else if (strpos($icon, '11') !== false) {
        //thunderstorm
        $condition = "Gewitter";
    } else if (strpos($icon, '13') !== false) {
        //snow
        $condition = "Schneefall";
    } else if (strpos($icon, '50') !== false) {
        //mist
        $condition = "Nebel";
    } else {
        echo ("Condition Error!");
    }
    return $condition;
}