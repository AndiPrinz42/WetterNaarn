<?php
header("Content-Type: application/json;charset=utf-8");

// Get environment variables
define('DB_SERVER', getenv('DB_SERVER'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('DB_NAME', getenv('DB_NAME'));

//Get the values from the query string
$yf = $_GET['yf'];
$yt = $_GET['yt'];
$df = $_GET['df'];
$dt = $_GET['dt'];
$f = $_GET['f'];


if ($yf >= '2017' && date("Y") >= $yf && !empty($yf) && $yt >= '2017' && date("Y") >= $yt && !empty($yt) && $yf <= $yt && $f > 0) { // Check if the requested years are valid and if the year from is less or equal to year to and if the frequency is greater than 0
    if ($yf == date("Y")) { // Check if year from is current year
        $maxday = date('z'); // Get the current day of the year
    } else if (leap_year_check($yf)) { // Check if year from is a leap year
        $maxday = 366; // Set max day to 366
    } else {
        $maxday = 365; // Set max day to 365
    }

    if ($df > 0 && $dt <= $maxday && !empty($df) && !empty($dt)) { // Check if the day from is greater than 0 and the day to is less than or equal to the max day and if day from and day to are not empty
        $dbConnection = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or die("Connection Error:" . mysqli_connect_error()); // Connect to the database
        $df--; // Subtract 1 from day from
        $tmp;
        if ($yf != $yt) { // Check if year from is not equal to year to
            $query_length = $maxday - $df; // Set query length to max day - day from
            $query = mysqli_query($dbConnection, "SELECT * FROM history_$yf LIMIT $df, $query_length"); // Query the database
            while ($row = mysqli_fetch_assoc($query)) { // Fetch each row
                $items[] = $row; // Add the row to the items array
            }
            $yf++; // Add 1 to year from
            while ($yf < $yt) { // Loop while year from is less than year to
                $query = mysqli_query($dbConnection, "SELECT * FROM history_$yf"); // Query the database
                while ($row = mysqli_fetch_assoc($query)) { // Fetch each row
                    $items[] = $row; // Add the row to the items array
                }
                $yf++; // Add 1 to year from
            }
            $tmp1 = 0;
            $tmp2 = $dt;
        } else {
            $tmp1 = $df;
            $tmp2 = $dt - $df;
        }
        $query = mysqli_query($dbConnection, "SELECT * FROM history_$yt LIMIT $tmp1, $tmp2"); // Query the database
        unset($tmp1, $tmp2); // Unset tmp1 and tmp2
        while ($row = mysqli_fetch_assoc($query)) { // Fetch each row
            $items[] = $row; // Add the row to the items array
        }
        $dbConnection->close(); // Close the database connection

        for ($i = 0; $i < sizeof($items); $i++) { // Loop through each item in the items array
            $items[$i]['day'] = $i + 1; // Add a day key with the value of i + 1
        }

        for ($i = 0; $i < sizeof($items); $i++) { // Loop through each item in the items array
            $items[$i]['wind_direction'] = convertDegreeWindDirection($items[$i]['wind_direction']); // Add a wind_direction key with the value of the return from the convertDegreeWindDirection function with the current items wind_direction as a parameter
        }

        if ($f > sizeof($items)) { // Check if the frequency is greater than the size of the items array
            echo json_encode(['status' => "Invalid Frequency"]); // Return an error
            echo "\n";
            die();
        }

        //Converts the array keys to numeric ones
        $items = toNumbericKey($items);
        //Converts the values of the array to the frequency value
        $items = frequencyConvert($items, $f);
        //Converts the array keys back to string ones
        $items = toStringKey($items);
        //Returns the array as a JSON string
        echo json_encode($items);
    } else {
        echo json_encode(['status' => "Invalid URL Query"]);
        echo "\n";
    }
} else {
    echo json_encode(['status' => "Invalid URL Query"]);
    echo "\n";
}


function leap_year_check($year)
{
    if ($year % 400 == 0) {
        $leapyear = true;
    } else if ($year % 100 == 0) {
        $leapyear = false;
    } else if ($year % 4 == 0) {
        $leapyear = true;
    } else {
        $leapyear = false;
    }
    return $leapyear;
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

function toNumbericKey($items)
{
    for ($i = 0; $i < sizeof($items); $i++) {
        $items[$i][1] = $i + 1;
        $items[$i][2] = $items[$i]['date'];
        $items[$i][3] = $items[$i]['temp'];
        $items[$i][4] = $items[$i]['temp_min'];
        $items[$i][5] = $items[$i]['temp_max'];
        $items[$i][6] = $items[$i]['humidity'];
        $items[$i][7] = $items[$i]['humidity_min'];
        $items[$i][8] = $items[$i]['humidity_max'];
        $items[$i][9] = $items[$i]['pressure'];
        $items[$i][10] = $items[$i]['pressure_min'];
        $items[$i][11] = $items[$i]['pressure_max'];
        $items[$i][12] = $items[$i]['rain'];
        $items[$i][13] = $items[$i]['rain_max'];
        $items[$i][14] = $items[$i]['wind'];
        $items[$i][15] = $items[$i]['wind_max'];
        $items[$i][16] = $items[$i]['wind_direction'];
        $items[$i][17] = $items[$i]['dewpoint'];
        $items[$i][18] = $items[$i]['dewpoint_max'];
        $items[$i][19] = $items[$i]['dewpoint_min'];
        $items[$i][20] = $items[$i]['windchill'];
        $items[$i][21] = $items[$i]['windchill_max'];
        $items[$i][22] = $items[$i]['windchill_min'];
        $items[$i][23] = $items[$i]['windguests'];
        $items[$i][24] = $items[$i]['windguests_max'];

        unset($items[$i]['day'], $items[$i]['date'], $items[$i]['temp'], $items[$i]['temp_min'], $items[$i]['temp_max'], $items[$i]['humidity'], $items[$i]['humidity_min'], $items[$i]['humidity_max'], $items[$i]['pressure'], $items[$i]['pressure_min'], $items[$i]['pressure_max'], $items[$i]['rain'], $items[$i]['rain_max'], $items[$i]['wind'], $items[$i]['wind_max'], $items[$i]['wind_direction'], $items[$i]['dewpoint'], $items[$i]['dewpoint_max'], $items[$i]['dewpoint_min'], $items[$i]['windchill'], $items[$i]['windchill_max'], $items[$i]['windchill_min'], $items[$i]['windguests'], $items[$i]['windguests_max']);
    }
    return $items;
}

function toStringKey($items)
{
    for ($i = 0; $i < sizeof($items); $i++) {
        $items[$i]['day'] = $items[$i][1];
        $items[$i]['date'] = $items[$i][2];
        $items[$i]['temp'] =  $items[$i][3];
        $items[$i]['temp_min'] = $items[$i][4];
        $items[$i]['temp_max'] = $items[$i][5];
        $items[$i]['humidity'] = $items[$i][6];
        $items[$i]['humidity_min'] = $items[$i][7];
        $items[$i]['humidity_max'] = $items[$i][8];
        $items[$i]['pressure'] = $items[$i][9];
        $items[$i]['pressure_min'] = $items[$i][10];
        $items[$i]['pressure_max'] = $items[$i][11];
        $items[$i]['rain'] = $items[$i][12];
        $items[$i]['rain_max'] = $items[$i][13];
        $items[$i]['wind'] = $items[$i][14];
        $items[$i]['wind_max'] = $items[$i][15];
        $items[$i]['wind_direction'] = $items[$i][16];
        $items[$i]['dewpoint'] = $items[$i][17];
        $items[$i]['dewpoint_max'] = $items[$i][18];
        $items[$i]['dewpoint_min'] = $items[$i][19];
        $items[$i]['windchill'] = $items[$i][20];
        $items[$i]['windchill_max'] = $items[$i][21];
        $items[$i]['windchill_min'] = $items[$i][22];
        $items[$i]['windguests'] = $items[$i][23];
        $items[$i]['windguests_max'] = $items[$i][24];
        for ($j = 1; $j <= 24; $j++) {
            unset($items[$i][$j]);
        }
    }
    return $items;
}

function frequencyConvert($arr, $f)
{
    $frequencyConverted = array();
    $maxIDs = [5, 8, 11, 13, 15, 19, 22, 24];
    $minIDs = [4, 7, 10, 19, 22];

    $insertPosition = 0;
    for ($i = 0; $i < sizeof($arr); $i = $i + $f) {
        $frequencyConverted[$insertPosition][1] = $insertPosition + 1;
        $frequencyConverted[$insertPosition][2] = $arr[$i][2];
        $insertPosition++;
    }

    $insertPosition = 0;
    for ($i = 3; $i <= 24; $i++) {
        $j = 0;
        for ($j = 0; $j < sizeof($arr) - (sizeof($arr) % $f); $j += $f) {
            $k = 0;
            $tmp = 0;
            $max = PHP_INT_MIN;
            $min = PHP_INT_MAX;
            for ($k = $j; ($k < $j + $f) && $k < sizeof($arr) - (sizeof($arr) % $f); $k++) {
                $tmp = $tmp + $arr[$k][$i];
                if ($arr[$k][$i] > $max) {
                    $max = $arr[$k][$i];
                }
                if ($arr[$k][$i] < $min) {
                    $min = $arr[$k][$i];
                }
            }
            if ($k == $j + $f) {
                if (in_array($i, $maxIDs)) {
                    $tmp = $max;
                } else if (in_array($i, $minIDs)) {
                    $tmp = $min;
                } else if ($i != 12) {
                    $tmp = $tmp / $f;
                }
                $tmp = round($tmp, 1);
                $frequencyConverted[$insertPosition][$i] = $tmp;
            }
            $insertPosition++;
        }

        if ((sizeof($arr) % $f) != 0) {
            $count = 0;
            $tmp = 0;
            $max = PHP_INT_MIN;
            $min = PHP_INT_MAX;
            for ($j; $j < sizeof($arr); $j++) {
                if (in_array($i, $maxIDs) && $arr[$j][$i] > $max) {
                    $max = $arr[$j][$i];
                } else if (in_array($i, $minIDs) && $arr[$j][$i] < $min) {
                    $min = $arr[$j][$i];
                } else {
                    $tmp = $tmp + $arr[$j][$i];
                    $count++;
                }
            }

            if (in_array($i, $maxIDs)) {
                $tmp = $max;
            } else if (in_array($i, $minIDs)) {
                $tmp = $min;
            } else if ($i != 12) {
                $tmp = $tmp / $count;
            }

            $tmp = round($tmp, 1);
            $frequencyConverted[$insertPosition][$i] = $tmp;
        }
        $insertPosition = 0;
    }
    return $frequencyConverted;
}
