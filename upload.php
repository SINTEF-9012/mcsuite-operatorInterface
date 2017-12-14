<?php
// Muaz Khan     - www.MuazKhan.com 
// MIT License   - https://www.webrtc-experiment.com/licence/
// Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC
foreach(array('video/webm', 'video', 'audio') as $type) {
$file = fopen("test.txt","w");
fwrite($file,sizeof($_FILES)."llmlmpokpok");
//fwrite($file,$_FILES["${type}-blob"]["size"][0]."pjjujujujuj");
fclose($file);

    if (isset($_FILES["${type}-blob"])) {
        echo 'uploads/';
		$fileName = $_POST["${type}-filename"];
	$nm=time().".webm";
        $uploadDirectory = '/var/www/owncloud/data/operator/files/Camera/'.$fileName;
        if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory)) {
            echo(" problem moving uploaded file");
        }
		echo($fileName);
    }
}
?>
