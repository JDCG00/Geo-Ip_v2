<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $json = file_get_contents('php://input');

    if (file_exists('../js/data.json')) {
        
        $current_json = file_get_contents('../js/data.json');
        $json1 = json_decode($current_json, true);
        $json2 = json_decode($json, true);        

        $json1[] = $json2;

        $final_data = json_encode($json1);
    
        file_put_contents('../js/data.json', $final_data);

    }else{

        $json3 = json_decode($json, true);
        
        $json4[] = $json3;

        $final_data = json_encode($json4);

        echo $final_data;
        
        file_put_contents('../js/data.json', $final_data);
    }
?>