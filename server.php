<?php //php i greladzevna
$_POST = json_decode(file_get_contents("php://input"), true); // json formati hamar
echo var_dump($_POST); // vercuma POST @ u mshakum