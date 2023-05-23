<?php
header("Content-Type: application/json;charset=utf-8");

// get apikey from apikey.ini
$apikey = parse_ini_file("/usr/www/users/wetterkk/config/apikey.ini", true)['openweathermap'];

//get data
$rawData = file_get_contents("https://api.openweathermap.org/data/2.5/forecast?lat=48.2261&lon=14.6049&appid=".$apikey);

// Decode the raw data to JSON format
$rawData = json_decode($rawData, true);

// Get data from history file
$history = file_get_contents("history.json");
$history = json_decode($history, true);

// Create array for storing data
$data = array();

// Fill array with data
for ($i = 0; $i < 40; $i++) {
    array_push($data, [$rawData['list'][$i]['dt_txt'], $rawData['list'][$i]['weather']['0']['icon'], $rawData['list'][$i]['main']['temp'], $rawData['list'][$i]['main']['temp_max'], $rawData['list'][$i]['main']['temp_min'], $rawData['list'][$i]['clouds']['all'], $rawData['list'][$i]['wind']['speed'], $rawData['list'][$i]['wind']['deg'], $rawData['list'][$i]['pop']]);
}

// Get offset for inserting new data
$offset = getOffset($data, $history);

// Insert new data into old data
$data = insertHistory($data, $history, $offset);

// Clear old data
$data = clearOld($data, $offset, '00:00:00');

// Clear new data
$data = clearNew($data);

// Save new data to history file
file_put_contents("history.json", json_encode($data, true));

// Convert array to numeric keys
$data = array_values($data);

$data = sumUp($data, $offset);
$data = convertCelsius($data);
$data = assignKeys($data);

// Encode data to JSON format
echo json_encode(['forecast' => $data]);


//FUNCTIONS
//get Offset from data now and history data
function getOffset($current, $history)
{
    for ($i = 1; $i < sizeof($history); $i++) {
        if ($history[$i][0] == $current[0][0]) {
            return $i;
        }
    }
    return 0;
}

//insert History Data from text file
function insertHistory($arrCurrent, $arrHistory, $offset)
{
    return array_merge(array_slice($arrHistory, 0, $offset), $arrCurrent);
}

//clear data which is older than current day
function clearOld($arr, $offset, $time)
{
    for ($i = $offset - 1; $i >= 0; $i--) {
        if (str_contains($arr[$i][0], $time)) {
            return array_slice($arr, $i, sizeof($arr));
        }
    }
    return $arr;
}

//clear data where there is not a whole day available (newest day in forecast)
function clearNew($arr)
{
    $clearOffset = 0;
    for ($i = sizeof($arr) - 1; $i > 0; $i--) {
        if (str_contains($arr[$i][0], '06:00:00')) {
            $clearOffset = $i + 1;
            break;
        }
    }
    $arr = array_slice($arr, 0, $clearOffset);
    return $arr;
}

function sumUp($arr, $offset)
{
    $sumArr = array();
    //currentDay
    $position = 0;
    for ($i = 0; $i < 4; $i++) { //periods
        for ($j = 0; $j < 2; $j++) { //values per period
            $icon = $arr[$position][1];
            if ($j == 0) {
                $sumArr[$i][0] = 0;
            }
            $snow = FALSE;
            if (str_contains($icon, '01')) {
                //clear sky
                $sumArr[$i][0] += 6;
            } else if (str_contains($icon, '02')) {
                //few clouds
                $sumArr[$i][0] += 5;
            } else if (str_contains($icon, '03')) {
                //scattered clouds
                $sumArr[$i][0] += 4;
            } else if (str_contains($icon, '04') || str_contains($icon, '50')) {
                //broken clouds
                $sumArr[$i][0] += 3;
            } else if (str_contains($icon, '09')) {
                //shower rain
                $sumArr[$i][0] += 2;
            } else if (str_contains($icon, '10')) {
                //rain
                $sumArr[$i][0] += 1;
            } else if (str_contains($icon, '11')) {
                //thunderstorm
                $sumArr[$i][0] += 0;
            } else if (str_contains($icon, '13')) {
                //snow
                $sumArr[$i][0] += 1;
                $snow = TRUE;
            } else {
                // echo ("icon error");
            }
            $position++;
        }
        $sumArr[$i][0] = round(($sumArr[$i][0] / 2), 0);
        if ($sumArr[$i][0] != 0) {
            $sumArr[$i][0] += 2;
        }
        if (($sumArr[$i][0] - 2 == 1 || $sumArr[$i][0] - 2 == 2) && $snow) {
            $sumArr[$i][0] -= 2;
        }
    }

    //currentDay
    $position = 0;
    for ($i = 0; $i < 4; $i++) { //periods
        for ($j = 0; $j < 2; $j++) { //values per period
            for ($k = 2; $k < 9; $k++) { //values
                if ($j == 0) {
                    $sumArr[$i][$k] = $arr[$position][$k];
                } else {
                    if ($k != 3 && $k != 4 && $k != 8) {
                        $sumArr[$i][$k] += $arr[$position][$k];
                    } else if ($k == 3) {
                        if ($arr[$position][$k] > $sumArr[$i][$k]) {
                            $sumArr[$i][$k] = $arr[$position][$k];
                        }
                    } else if ($k == 4) {
                        if ($arr[$position][$k] < $sumArr[$i][$k]) {
                            $sumArr[$i][$k] = $arr[$position][$k];
                        }
                    } else {
                        $sumArr[$i][$k] += $arr[$position][$k] * 100;
                    }
                }
            }
            $position++;
        }
        for ($j = 2; $j < 9; $j++) { //create average
            if ($j != 3 && $j != 4 && $j != 6) {
                $sumArr[$i][$j] = round(($sumArr[$i][$j] / 2), 0);
            } else {
                $sumArr[$i][$j] = round($sumArr[$i][$j]);
            }
        }
        $sumArr[$i] = array_values($sumArr[$i]);
    }
    $arr = clearOld($arr, $offset, '09:00:00');
    
    //forecastDays
    $position = 0;
    for ($i = 4; $i < 14; $i++) { //periods
        for ($j = 0; $j < 4; $j++) { //values per period
            $icon = $arr[$position][1];
            if ($j == 0) {
                $sumArr[$i][0] = 0;
            }
            $snow = FALSE;
            if (str_contains($icon, '01')) {
                //clear sky
                $sumArr[$i][0] += 6;
            } else if (str_contains($icon, '02')) {
                //few clouds
                $sumArr[$i][0] += 5;
            } else if (str_contains($icon, '03')) {
                //scattered clouds
                $sumArr[$i][0] += 4;
            } else if (str_contains($icon, '04') || str_contains($icon, '50')) {
                //broken clouds
                $sumArr[$i][0] += 3;
            } else if (str_contains($icon, '09')) {
                //shower rain
                $sumArr[$i][0] += 2;
            } else if (str_contains($icon, '10')) {
                //rain
                $sumArr[$i][0] += 1;
            } else if (str_contains($icon, '11')) {
                //thunderstorm
                $sumArr[$i][0] += 0;
            } else if (str_contains($icon, '13')) {
                //snow
                $sumArr[$i][0] += 1;
                $snow = TRUE;
            } else {
                // echo ("icon error");
            }
            $position++;
        }

        $sumArr[$i][0] = round(($sumArr[$i][0] / 4), 0);
        if ($sumArr[$i][0] != 0) {
            $sumArr[$i][0] += 2;
        }
        if (($sumArr[$i][0] - 2 == 1 || $sumArr[$i][0] - 2 == 2) && $snow) {
            $sumArr[$i][0] -= 2;
        }
    }

    //forecastDays
    $position = 0;
    for ($i = 4; $i < 14; $i++) { //periods
        for ($j = 0; $j < 4; $j++) { //values per period
            for ($k = 2; $k < 9; $k++) { //values
                if ($j == 0) {
                    $sumArr[$i][$k] = $arr[$position][$k];
                } else {
                    if ($k != 3 && $k != 4 && $k != 8) {
                        $sumArr[$i][$k] += $arr[$position][$k];
                    } else if ($k == 3) {
                        if ($arr[$position][$k] > $sumArr[$i][$k]) {
                            $sumArr[$i][$k] = $arr[$position][$k];
                        }
                    } else if ($k == 4) {
                        if ($arr[$position][$k] < $sumArr[$i][$k]) {
                            $sumArr[$i][$k] = $arr[$position][$k];
                        }
                    } else {
                        $sumArr[$i][$k] += $arr[$position][$k] * 100;
                    }
                }
            }
            $position++;
        }
        for ($j = 2; $j < 9; $j++) { //create average
            if ($j != 3 && $j != 4) {
                $sumArr[$i][$j] = round(($sumArr[$i][$j] / 4), 0);
            } else {
                $sumArr[$i][$j] = round($sumArr[$i][$j]);
            }
        }
        $sumArr[$i] = array_values($sumArr[$i]);
    }
    return $sumArr;
}

//convert kelvin to celsius
function convertCelsius($arr)
{
    for ($i = 0; $i < sizeof($arr); $i++) {
        for ($j = 1; $j <= 3; $j++) {
            $arr[$i][$j] -= 273;
        }
    }
    return $arr;
}

//Assign Array Keys
function assignKeys($arr)
{
    for ($i = 0; $i < sizeof($arr); $i++) {
        $arr[$i]['icon'] = $arr[$i][0];
        unset($arr[$i][0]);
        $arr[$i]['temp'] = $arr[$i][1];
        unset($arr[$i][1]);
        $arr[$i]['tempmax'] = $arr[$i][2];
        unset($arr[$i][2]);
        $arr[$i]['tempmin'] = $arr[$i][3];
        unset($arr[$i][3]);
        $arr[$i]['clouds'] = $arr[$i][4];
        unset($arr[$i][4]);
        $arr[$i]['windspeed'] = $arr[$i][5];
        unset($arr[$i][5]);
        $arr[$i]['winddeg'] = $arr[$i][6];
        unset($arr[$i][6]);
        $arr[$i]['pop'] = $arr[$i][7];
        unset($arr[$i][7]);
    }
    return $arr;
}
