<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="SINTEF ICT">

    <title>MC-Suite operator interface</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="./css/bootstrap.min.css" crossorigin="anonymous">

    <style>
        .recordrtc button {
            font-size: inherit;
        }
        
        .recordrtc button,
        .recordrtc select {
            vertical-align: middle;
            line-height: 1;
            padding: 2px 5px;
            height: auto;
            font-size: inherit;
            margin: 0;
        }
        
        .recordrtc,
        .recordrtc .header {
            display: block;
            text-align: center;
            padding-top: 0;
        }
        
        .recordrtc video {
            width: 70%;
        }
        
        .recordrtc option[disabled] {
            display: none;
        }
        /* place fullscreen control on right side of the player */
        
        .video-js .vjs-control.vjs-fullscreen-control {
            position: absolute;
            right: 0;
        }
        /* make sure the custom controls are always visible because
		   the plugin hides and replace the video.js native mobile
		   controls */
        
        .vjs-using-native-controls .vjs-control-bar {
            display: flex !important;
        }
        /* change player background color */
        
        #myVideo {
            background-color: #E8E884;
        }
    </style>
    <script src="./js/jquery.min.js"></script>
    <link href="https://vjs.zencdn.net/5.16.0/video-js.css" rel="stylesheet">
    <link href="./css/videojs.record.min.css" rel="stylesheet">
    <script src="https://vjs.zencdn.net/5.9.2/video.min.js"></script>
    <script src="https://cdn.webrtc-experiment.com/RecordRTC.js"></script>
    <script src="https://cdn.webrtc-experiment.com/gif-recorder.js"></script>
    <script src="https://cdn.webrtc-experiment.com/getScreenId.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/videojs.record.min.js"></script>
    <!-- for Edige/FF/Chrome/Opera/etc. getUserMedia support -->
    <script src="https://cdn.webrtc-experiment.com/gumadapter.js"></script>

</head>

<body>
    <!--Moved the file to php and added this for Tamas (as a quick fix for one of his request). This is not important and can be removed. And the file can be rolled back to html-->
    <?php if (isset($_GET['username'])) {
        echo '<script>var username="'.$_GET['username'].'";</script>';
        }else{
        echo '<script>var username="unknown";</script>';        
        }
    ?>
        <div id="sound" class="tab-pane fade in active">
            <p>
                <div>
                    <video id="myVideo" playsinline class="video-js vjs-default-skin"></video>
                </div>
                <script src="./js/videomessage.js"></script>
            </p>
        </div>

</body>

</html>