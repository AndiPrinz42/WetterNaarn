<?php
$check_filename = 'custom.json';
$fileAge = time()-filemtime($check_filename);
echo $fileAge;