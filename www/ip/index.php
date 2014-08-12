<?
$arq = file_get_contents('meuip.txt');
header("location: http://$arq");
?>
