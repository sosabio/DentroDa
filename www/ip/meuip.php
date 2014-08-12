<?
$arq = fopen('.htaccess', 'w');

$ip=$_SERVER['REMOTE_ADDR'];

fwrite($arq, '<IfModule mod_rewrite.c>'."\n");
fwrite($arq, '  RewriteEngine On'."\n");
fwrite($arq, '  RewriteBase /'."\n");
fwrite($arq, '	RewriteCond $1 !^(index\.php|meuip\.php)'."\n");
fwrite($arq, '  RewriteRule ^(.*)$ http://'.$ip.'/$1 [L]'."\n");
fwrite($arq, '</IfModule>');

fclose($arq);

echo 'gravado';

?>
