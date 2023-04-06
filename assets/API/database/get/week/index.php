<?php
header("Content-Type: application/json;charset=utf-8");
$week = $_GET['week']; // Get the week from the URL
$year = $_GET['year']; // Get the year from the URL

// check if the week and year are valid
if (($week >= 1 && $week <= 53) && ($year >= 2017 && $year <= date("Y", time()))) { // Check if the week and year are valid
    $year_week = $year . "_" . $week;
    $dom = new DOMDocument();
    $data = array();
    $data2 = array();
    libxml_use_internal_errors(true);
    $dom->loadHTML(file_get_contents("https://wetter-naarn.at/data/w" . $year_week . ".htm")); // Load the website
    foreach ($dom->getElementsByTagName('td') as $node) {
        $data[] = $dom->saveHTML($node);
    }

    $data = array_values($data); // Convert the array to a normal array
    $data = array_slice($data, 1, sizeof($data) - 1); // Remove the first element

    for ($i = 0; $i < 11; $i++) {
        $data = cleanUpNormal($data, $i); // Remove all unnecessary tags and spaces
        $data = cleanUpUnit($data, $i); // Remove the unit (°C, m/s, mm) from the values
    }

    $data = convertMultidimensionalArray($data); // Convert the array to a multidimensional array
    $data = replaceCommas($data); // Replace the commas with dots
    $data = replaceWindDashes($data); // Replace the dashes in the wind direction with the word "unknown"
    $data = convertWind($data); // Convert the wind direction to the corresponding degree
    $data = toStringKey($data); // Convert the keys to strings


    echo json_encode($data); // Output the data as json
} else {
    echo json_encode(['status' => "Invalid URL Query"]);
    echo "\n";
}

function cleanUpNormal($data, $key)
{
    for ($i = $key; $i < sizeof($data); $i += 11) {
        $data[$i] = str_replace("<nobr>", "", $data[$i]);
        $data[$i] = str_replace("</nobr>", "", $data[$i]);
        $data[$i] = str_replace("<td>", "", $data[$i]);
        $data[$i] = str_replace("</td>", "", $data[$i]);
    }
    return $data;
}

function cleanUpUnit($data, $key)
{
    for ($i = $key; $i < sizeof($data); $i += 11) {
        if (str_contains($data[$i], " ")) {
            $data[$i] = substr($data[$i], 0, strpos($data[$i], " "));
        }
    }
    return $data;
}


function convertMultidimensionalArray($data)
{
    $pos = 0;
    $dataNew = array();
    for ($i = 0; $i < sizeof($data) / 11; $i++) {
        for ($j = 0; $j <= 10; $j++) {
            $dataNew[$i][$j] = $data[$pos];
            $pos++;
        }
    }
    return $dataNew;
}


function replaceCommas($data)
{
    for ($i = 0; $i < sizeof($data); $i++) {
        for ($j = 0; $j <= 10; $j++) {
            $data[$i][$j] = str_replace(",", ".", $data[$i][$j]);
        }
    }
    return $data;
}

function replaceWindDashes($data)
{
    for ($i = 0; $i < sizeof($data); $i++) {
        $data[$i][7] = str_replace("-", "", $data[$i][7]);
    }
    return $data;
}

function insertID($data)
{
    for ($i = 0; $i < sizeof($data); $i++) {
        array_unshift($data[$i], $i + 1);
    }
    return $data;
}

function toStringKey($items)
{
    for ($i = 0; $i < sizeof($items); $i++) {
        $items[$i]['date'] = $items[$i][0];
        $items[$i]['time'] = $items[$i][1];
        $items[$i]['temp'] =  $items[$i][2];
        $items[$i]['humidity'] = $items[$i][3];
        $items[$i]['pressure'] = $items[$i][4];
        $items[$i]['rain'] = $items[$i][5];
        $items[$i]['wind'] = $items[$i][6];
        $items[$i]['wind_direction_alphabetic'] = $items[$i][7];
        $items[$i]['dewpoint'] = $items[$i][8];
        $items[$i]['windchill'] = $items[$i][9];
        $items[$i]['windguests'] = $items[$i][10];
        $items[$i]['wind_direction'] = $items[$i][11];
        for ($j = 0; $j <= 11; $j++) {
            unset($items[$i][$j]);
        }
    }
    return $items;
}

function convertWind($items)
{
    for ($i = 0; $i < sizeof($items); $i++) {
        $items[$i][11] = convertDegreeWindDirection($items[$i][7]);
    }
    return $items;
}

function convertDegreeWindDirection($direction)
{
    switch ($direction) {
        case 'N':
            return 0;
        case 'NNO':
            return 22.5;
        case 'NO':
            return 45;
        case 'ONO':
            return 67.5;
        case 'O':
            return 90;
        case 'OSO':
            return 112.5;
        case 'SO':
            return 135;
        case 'SSO':
            return 157.5;
        case 'S':
            return 180;
        case 'SSW':
            return 202.5;
        case 'SW':
            return 225;
        case 'WSW':
            return 247.5;
        case 'W':
            return 270;
        case 'WNW':
            return 292.5;
        case 'NW':
            return 315;
        case 'NNW':
            return 337.5;
    }
}
