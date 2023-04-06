<?php
header("Content-Type: application/json;charset=utf-8");
function exception_error_handler()
{
    echo json_encode(["status" => "error"]);
    throw new ErrorException();
}
set_error_handler("exception_error_handler");

//get data
$rawData = file_get_contents("https://api.openweathermap.org/data/2.5/forecast?lat=48.2261&lon=14.6049&appid=5810b2313c22dc7d29992e937192b33f");
$rawData = json_decode($rawData, true);

$history = file_get_contents("history.json");
$history = json_decode($history, true);

//fill array with data
$data = array();
for ($i = 0; $i < 40; $i++) {
    array_push($data, [$rawData['list'][$i]['dt_txt'], $rawData['list'][$i]['weather']['0']['icon'], $rawData['list'][$i]['main']['temp'], $rawData['list'][$i]['main']['temp_max'], $rawData['list'][$i]['main']['temp_min'], $rawData['list'][$i]['clouds']['all'], $rawData['list'][$i]['wind']['speed'], $rawData['list'][$i]['wind']['deg'], $rawData['list'][$i]['pop']]);
}

//calculations
$offset = getOffset($data, $history);
$data = insertHistory($data, $history, $offset);
$data = clearOld($data, $offset, '00:00:00');
$data = clearNew($data);
file_put_contents("history.json", json_encode($data, true));

echo json_encode(["status" => "success"]);


//FUNCTIONS
function getOffset($arrCurrent, $arrHistory)
{
    for ($i = 1; $i < sizeof($arrHistory); $i++) {
        if ($arrHistory[$i][0] == $arrCurrent[0][0]) {
            return $i;
        }
    }
    return 0;
}

//insert History Data from text file
function insertHistory($arrCurrent, $arrHistory, $offset)
{
    for ($i = $offset - 1; $i >= 0; $i--) {
        array_unshift($arrCurrent, $arrHistory[$i]);
    }
    return $arrCurrent;
}

//clear data which is older than current day
function clearOld($arr, $offset, $time)
{
    $clearOffset = 0;
    for ($i = $offset - 1; $i >= 0; $i--) {
        if (str_contains($arr[$i][0], $time)) {
            $clearOffset = $i;
            break;
        }
    }

    $arr = array_slice($arr, $clearOffset, sizeof($arr));
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