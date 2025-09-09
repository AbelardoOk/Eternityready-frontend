<?php

// Define the directory to clean
$directory = '/../home/eternity/public_html/templates/apollo';

// Create a handler for the directory
$dirHandle = opendir($directory);

if ($dirHandle) {
    while (($file = readdir($dirHandle)) !== false) {
        if ($file != '.' && $file != '..' && $file != basename(__FILE__)) { // Exclude current and parent folder, and this script itself
            $filePath = $directory . DIRECTORY_SEPARATOR . $file;
            if (is_file($filePath)) {
                unlink($filePath); // Delete the file
            }
        }
    }
    closedir($dirHandle);
    echo "The directory has been cleaned up.";
} else {
    echo "Could not open the directory.";
}

?>