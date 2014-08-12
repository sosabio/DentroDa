<?php 

$files = array();
$dir = new DirectoryIterator('./image/');
 
foreach ($dir as $fileinfo) {
  $files[$fileinfo->getMTime()] = $fileinfo->getFilename();
}
 
krsort($files);
 
foreach($files as $file){
  if ($file == "index.php" or $file == "." or $file == '..'){
  }else{
  	echo '<img src="./image/'.$file.$lastModified.'" style="width:200px;" />';
  	print "</br>";
  }
}
?>