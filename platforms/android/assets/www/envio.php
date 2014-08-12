<?php
move_uploaded_file($_FILES["file"]["tmp_name"], './image/' . $_FILES['file']['name']);
echo 'ok';