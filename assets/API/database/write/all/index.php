<?php
// Create a header to return JSON data
header("Content-Type: application/json;charset=utf-8");

// Get database configuration from database.ini
$dbcfg = parse_ini_file("/usr/www/users/wetterkk/config/database.ini", true)['db1'];

define('DB_SERVER', $dbcfg['host']);
define('DB_USER', $dbcfg['username']);
define('DB_PASSWORD', $dbcfg['password']);
define('DB_NAME', $dbcfg['database']);

// Loop from 2020 to the current year (date("Y") returns the current year)
for ($i = 2020; $i <= date("Y"); $i++) {
    // Check if the current year is a leap year
    if (leap_year_check($i)) {
        // If it is, set the number of days to 366
        $days = 366;
    } else {
        // If it isn't, set the number of days to 365
        $days = 365;
    }
    // Get the number of rows in the database table for the current year
    $rowcount = getRowCount($i);
    // Check if the number of rows is not equal to the number of days
    if ($rowcount != $days) {
        // If it isn't, print the current year to the console
        echo "$i ";
        // Call the write.php script to write the missing data to the database
        include('https://wetter-naarn.at/assets/API/database/write?year=' . $i);
    }
}

// Function to check if a year is a leap year
function leap_year_check($year)
{
    // If the year can be divided by 400, it is a leap year
    if ($year % 400 == 0) {
        $leapyear = true;
    // If the year can be divided by 100, it isn't a leap year
    } else if ($year % 100 == 0) {
        $leapyear = false;
    // If the year can be divided by 4, it is a leap year
    } else if ($year % 4 == 0) {
        $leapyear = true;
    // Otherwise it isn't a leap year
    } else {
        $leapyear = false;
    }
    // Return the result of the check
    return $leapyear;
}

// Function to get the number of rows in the database table for a given year
function getRowCount($year)
{
    // Connect to the database
    $dbConnection = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or die("Connection Error:" . mysqli_connect_error());
    // Check if the table for the given year exists
    if ($dbConnection->query("DESCRIBE `history_$year`")) {
        // If it does, get the number of rows
        $result = mysqli_query($dbConnection, "SELECT * FROM `history_$year`");
        $rows = mysqli_num_rows($result);
    } else {
        // If it doesn't, set the number of rows to 0
        $rows = 0;
    }
    // Close the connection to the database
    $dbConnection->close();
    // Return the number of rows
    return $rows;
}