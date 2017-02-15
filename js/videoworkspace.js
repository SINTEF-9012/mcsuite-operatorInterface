//Just send a get request to a script on the server side
function startRecording() {
    var button = $("#btn-recordingCam");
    if (button.hasClass('btn-danger')) {
        button.empty();
        button.append('Start record &nbsp;<span class="glyphicon glyphicon-record" aria-hidden="true"></span>');
        button.removeClass('btn-danger');
        button.addClass('btn-primary');

        $.get("https://54.170.207.195/cgi-bin/stopRecording.sh", function (data) {
            console.log("Stopped recording camera");
        });

    } else {
        button.empty();
        button.append('Stop record &nbsp;<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>');
        button.removeClass('btn-primary');
        button.addClass('btn-danger');

        $.get("https://54.170.207.195/cgi-bin/startRecording.sh", function (data) {
            console.log("Started recording camera");
        });

    }

}