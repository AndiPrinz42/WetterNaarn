<?php
header("Content-Type: application/json;charset=utf-8");

// Get database configuration from database.ini
$dbcfg = parse_ini_file("/usr/www/users/wetterkk/config/database.ini", true)['db1'];

define('DB_SERVER', $dbcfg['host']);
define('DB_USER', $dbcfg['username']);
define('DB_PASSWORD', $dbcfg['password']);
define('DB_NAME', $dbcfg['database']);


$year = $_GET['year']; // Get the year from the url. The year is set in the url when the request is sent to the server.
if ($year >= '2020' && date("Y") >= $year && !empty($year)) { // Check if the year is greater than 2020, if the current year is greater than the year and if the year is not empty
    createTable($year); // Create a new table in the database for that year

    $dom = new DOMDocument();
    $data = array();
    $data2 = array();
    libxml_use_internal_errors(true);
    $dom->loadHTML(file_get_contents("https://wetter-naarn.at/data/j" . $year . ".htm")); // Load the html file from the website for that year
    foreach ($dom->getElementsByTagName('nobr') as $node) {
        $data[] = $dom->saveHTML($node); // Save the html file into an array
    }

    $data = array_values($data); // Change the array keys to numeric keys
    $data = array_slice($data, 9, array_search("<nobr>Min-Datum</nobr>", $data) - 9); // Remove the first 9 and the last 9 elements of the array
    // The first 9 elements are the header of the table
    // The last 9 elements are the footer of the table
    
    $data = cleanUpNormal($data, 0); // Clean up the data
    $data = cleanUpUnit($data, 1);
    $data = cleanUpDouble($data, 2);
    $data = cleanUpDouble($data, 3);
    $data = cleanUpUnit($data, 4);
    $data = cleanUpDouble($data, 6);
    $data = cleanUpDouble($data, 7);
    $data = cleanUpUnit($data, 8);
    $data = cleanUpDouble($data, 9);
    $data = cleanUpDouble($data, 10);
    $data = cleanUpUnit($data, 11);
    $data = cleanUpDouble($data, 12);
    $data = cleanUpUnit($data, 13);
    $data = cleanUpDouble($data, 14);
    $data = cleanUpUnit($data, 15);
    $data = cleanUpDouble($data, 16);
    $data = cleanUpDouble($data, 17);
    $data = cleanUpUnit($data, 18);
    $data = cleanUpDouble($data, 19);
    $data = cleanUpDouble($data, 20);
    $data = cleanUpUnit($data, 21);
    $data = cleanUpDouble($data, 22);
    $data = convertMultidimensionalArray($data); // Convert the array from a multidimensional array to a normal array
    $data = arrayMakeSpace($data); // Make a space between each element of the array
    $data = fillWindDirection($data, $dom); // Fill the wind direction column
    $data = insertID($data); // Insert the ID column
    $data = replaceCommas($data); // Replace the commas in the array with dots
    $data = replaceWindDashes($data); // Replace the dashes in the wind column with 0

    $dayStart = getRowCount($year); // Get the amount of rows in the database for that year
    if (date("Y") == $year) { // If the year is the current year
        $dayEnd = 1; // Set the day end to 1
    } else {
        $dayEnd = 0; // Set the day end to 0
    }
    sendToDB($data, $year, $dayStart, $dayEnd); // Send the data to the database
} else {
    echo json_encode(['status' => "Invalid Year Query"]);
    echo "\n";
}

function cleanUpNormal($data, $key)
{
    for ($i = $key; $i < sizeof($data); $i += 23) {
        $data[$i] = str_replace("<nobr>", "", $data[$i]);
        $data[$i] = str_replace("</nobr>", "", $data[$i]);
    }
    return $data;
}

function cleanUpUnit($data, $key)
{
    for ($i = $key; $i < sizeof($data); $i += 23) {
        $data[$i] = str_replace("<nobr>", "", $data[$i]);
        $data[$i] = str_replace("</nobr>", "", $data[$i]);
        $data[$i] = substr($data[$i], 0, strpos($data[$i], " "));
    }
    return $data;
}

function cleanUpDouble($data, $key)
{
    for ($i = $key; $i < sizeof($data); $i += 23) {
        $start = strpos($data[$i], "<br>") + 4;
        $len = strpos($data[$i], " ", $start) - $start;
        $data[$i] = substr($data[$i], $start, $len);
    }
    return $data;
}

function convertMultidimensionalArray($data)
{
    $pos = 0;
    $dataNew = array();
    for ($i = 0; $i < sizeof($data) / 23; $i++) {
        for ($j = 0; $j <= 22; $j++) {
            $dataNew[$i][$j] = $data[$pos];
            $pos++;
        }
    }
    return $dataNew;
}

function arrayMakeSpace($data)
{
    for ($i = 0; $i < sizeof($data); $i++) {
        for ($j = 5; $j <= 13; $j++) {
            $data[$i][$j] = $data[$i][$j + 1];
        }
    }
    return $data;
}

function fillWindDirection($data, $dom)
{
    for ($i = 15; $i < sizeof($dom->getElementsByTagName('td')) - 65; $i = $i + 23) {
        $data[$i / 23][14] = $dom->saveHTML($dom->getElementsByTagName('td')[$i]);
        $data[$i / 23][14] = str_replace("<td>", "", $data[$i / 23][14]);
        $data[$i / 23][14] = str_replace("</td>", "", $data[$i / 23][14]);
    }
    return $data;
}

function replaceCommas($data)
{
    for ($i = 0; $i < sizeof($data); $i++) {
        for ($j = 0; $j <= 23; $j++) {
            $data[$i][$j] = str_replace(",", ".", $data[$i][$j]);
        }
    }
    return $data;
}

function replaceWindDashes($data)
{
    for ($i = 0; $i < sizeof($data); $i++) {
        $data[$i][15] = str_replace("-", "", $data[$i][15]);
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

function mysql_query($sql)
{
    $dbConnection = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or die("Connection Error:" . mysqli_connect_error());
    $response_status = $dbConnection->multi_query($sql);
    $dbConnection->close();
    return $response_status;
}

function createTable($year)
{
    if (!mysql_query("DESCRIBE `history_$year`")) {
        $sql = "CREATE TABLE `history_$year` ( `day` INT NOT NULL AUTO_INCREMENT , `date` VARCHAR(10) NOT NULL , `temp` FLOAT NOT NULL , `temp_min` FLOAT NOT NULL , `temp_max` FLOAT NOT NULL , `humidity` INT(3) NOT NULL , `humidity_min` INT(3) NOT NULL , `humidity_max` INT(3) NOT NULL , `pressure` FLOAT NOT NULL , `pressure_min` FLOAT NOT NULL , `pressure_max` FLOAT NOT NULL , `rain` FLOAT NOT NULL , `rain_max` FLOAT NOT NULL , `wind` FLOAT NOT NULL , `wind_max` FLOAT NOT NULL , `wind_direction` VARCHAR(3) NOT NULL , `dewpoint` FLOAT NOT NULL , `dewpoint_max` FLOAT NOT NULL , `dewpoint_min` FLOAT NOT NULL , `windchill` FLOAT NOT NULL , `windchill_max` FLOAT NOT NULL , `windchill_min` FLOAT NOT NULL , `windguests` FLOAT NOT NULL , `windguests_max` FLOAT NOT NULL , PRIMARY KEY (`day`))";
        mysql_query($sql);
    }
}

function getRowCount($year)
{
    $dbConnection = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or die("Connection Error:" . mysqli_connect_error());
    $result = mysqli_query($dbConnection, "SELECT * FROM `history_$year`");
    $rows = mysqli_num_rows($result);
    $dbConnection->close();
    return $rows;
}

function sendToDB($data, $year, $dayStart, $dayEnd)
{
    $sql = "";
    for ($i = $dayStart; $i < sizeof($data) - $dayEnd; $i++) {
        $day = $data[$i][0];
        $date = $data[$i][1];
        $temp = $data[$i][2];
        $temp_min = $data[$i][3];
        $temp_max = $data[$i][4];
        $humidity = $data[$i][5];
        $humidity_min = $data[$i][6];
        $humidity_max = $data[$i][7];
        $pressure = $data[$i][8];
        $pressure_min = $data[$i][9];
        $pressure_max = $data[$i][10];
        $rain = $data[$i][11];
        $rain_max = $data[$i][12];
        $wind = $data[$i][13];
        $wind_max = $data[$i][14];
        $wind_direction = $data[$i][15];
        $dewpoint = $data[$i][16];
        $dewpoint_max = $data[$i][17];
        $dewpoint_min = $data[$i][18];
        $windchill = $data[$i][19];
        $windchill_max = $data[$i][20];
        $windchill_min = $data[$i][21];
        $windguests = $data[$i][22];
        $windguests_max = $data[$i][23];
        $sql .= "INSERT INTO `history_$year` (`day`,`date`,`temp`,`temp_min`,`temp_max`,`humidity`,`humidity_min`,`humidity_max`,`pressure`,`pressure_min`,`pressure_max`,`rain`,`rain_max`,`wind`,`wind_max`,`wind_direction`,`dewpoint`,`dewpoint_max`,`dewpoint_min`,`windchill`,`windchill_max`,`windchill_min`,`windguests`,`windguests_max`) VALUES ('$day','$date','$temp','$temp_min','$temp_max','$humidity','$humidity_min','$humidity_max','$pressure','$pressure_min','$pressure_max','$rain','$rain_max','$wind','$wind_max','$wind_direction','$dewpoint','$dewpoint_max','$dewpoint_min','$windchill','$windchill_max','$windchill_min','$windguests','$windguests_max');";
    }

    if ($sql != "") {
        if (mysql_query($sql)) {
            $status = "success";
        } else {
            $status = "database error";
        }
    } else {
        $status = "success";
    }
    echo json_encode(['status' => $status]);
    echo "\n";
}
