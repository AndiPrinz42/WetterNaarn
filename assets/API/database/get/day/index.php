<?php
header("Content-Type: application/json;charset=utf-8"); // set content type of response

// get data from url query
$day = $_GET['day'];
$month = $_GET['month'];
$year = $_GET['year'];

// check if data is valid (1 <= day <= 31 and 2017 <= year <= current year and 1 <= month <= 12)
if ($day >= 1 && $day <= 31 && $year >= 2017 && $year <= date("Y", time()) && $month >= 1 && $month <= 12) {

    // create date string from url query
    $year_month_day = date("Ymd", strtotime($year . "-" . $month . "-" . $day));

    // create new DOMDocument
    $dom = new DOMDocument();

    // create array for data
    $data = array();

    // create array for data
    $data2 = array();

    // suppress errors
    libxml_use_internal_errors(true);

    // get HTML from website
    $dom->loadHTML(file_get_contents("https://wetter-naarn.at/data/" . $year_month_day . ".htm"));

    // get all table data from HTML
    foreach ($dom->getElementsByTagName('td') as $node) {

        // add table data to data array
        $data[] = $dom->saveHTML($node);
    }

    // remove first element of data array
    $data = array_values($data);
    $data = array_slice($data, 1, sizeof($data) - 1);

    // clean up data
    for ($i = 0; $i < 12; $i++) {
        $data = cleanUpNormal($data, $i);
        $data = cleanUpUnit($data, $i);
    }

    // convert data into multidimensional array
    $data = convertMultidimensionalArray($data);

    // replace commas with dots
    $data = replaceCommas($data);

    // replace dashes in wind direction with underscores
    $data = replaceWindDashes($data);

    // convert keys of data array to strings
    $data = toStringKey($data);

    // return data as JSON
    echo json_encode($data);
} else {
    echo json_encode(['status' => "Invalid URL Query"]);
    echo "\n";
}

function cleanUpNormal($data, $key)
{
    for ($i = $key; $i < sizeof($data); $i += 12) {
        $data[$i] = str_replace("<nobr>", "", $data[$i]);
        $data[$i] = str_replace("</nobr>", "", $data[$i]);
        $data[$i] = str_replace("<td>", "", $data[$i]);
        $data[$i] = str_replace("</td>", "", $data[$i]);
    }
    return $data;
}

function cleanUpUnit($data, $key)
{
    for ($i = $key; $i < sizeof($data); $i += 12) {
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
    for ($i = 0; $i < sizeof($data) / 12; $i++) {
        for ($j = 0; $j <= 11; $j++) {
            $dataNew[$i][$j] = $data[$pos];
            $pos++;
        }
    }
    return $dataNew;
}


function replaceCommas($data)
{
    for ($i = 0; $i < sizeof($data); $i++) {
        for ($j = 0; $j <= 11; $j++) {
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
        $items[$i]['wind_direction'] = $items[$i][8];
        $items[$i]['dewpoint'] = $items[$i][9];
        $items[$i]['windchill'] = $items[$i][10];
        $items[$i]['windguests'] = $items[$i][11];
        for ($j = 0; $j <= 12; $j++) {
            unset($items[$i][$j]);
        }
    }
    return $items;
}