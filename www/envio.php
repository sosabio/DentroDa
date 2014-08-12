<?php

$arq = fopen('arq.txt', 'w');

$ip=$_SERVER['REMOTE_ADDR'];

fwrite($arq, print_r($_SERVER, true).print_r($_FILES, true).print_r($_POST, true).print_r($_GET, true));

fclose($arq);

move_uploaded_file($_FILES["file"]["tmp_name"], './image/' . $_FILES['file']['name']);
