<?php
function sql($query, $variant = 1) {
    
    ///////////////
    // DB Config //
    ///////////////

    $server = "localhost";
    $user = "dbuser";
    $pass = "pass";
    $db = "dbname";

    /////////////
    // Connect //
    /////////////
    
    $link = mysqli_connect($server, $user, $pass);
    if (!$link) {
        die("<div class='error'>No connection to database! :(</div><br />");
    }
    mysqli_set_charset($link, 'utf8');

    $db_selected = mysqli_select_db($link, $db);
    if (!$db_selected) {
        die ("<div class='error'>Could not find data in the database... sorry :(</div><br />");
    }

    else {

        switch ($variant) {
            case 1:
                $result = mysqli_query($link, $query)
                or die ("<div class='error'>Be afraid: an error occurred while reading data. :(</div><br />".mysqli_error($link).'<br>query: '.$query);
                return $result;
                break;

            case 2:
                mysqli_query($link, $query)
                or die ("<div class='error'>We have a little bit of a situation here and some trouble to write your data to the database... sorry :(</div><br />".mysqli_error($link));
                return mysqli_insert_id($link);
                break;
        }
    }

    mysqli_close($link);
    return true;
}
