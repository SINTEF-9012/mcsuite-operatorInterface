var player = videojs("myVideo", {
    controls: true,
    width: 640,
    height: 480,
    plugins: {
        record: {
            audio: true,
            video: true,
            maxLength: 120,
            debug: true
        }
    }
});
// error handling
player.on('deviceError', function () {
    console.log('device error:', player.deviceErrorCode);
});

// user clicked the record button and started recording
player.on('startRecord', function () {
    console.log('started recording!');
});

// user completed recording and stream is available
player.on('finishRecord', function () {
    // the blob object contains the recorded data that
    // can be downloaded by the user, stored on server etc.
    //var u = URL.createObjectURL(player.recordedData);
    //invokeSaveAsDialog(player.recordedData, "test.webm");
    var time = new Date().getTime();
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    if (isAndroid) {
        uploadBlob(player.recordedData.video, time + ".webm", time);
    } else {
        if (isChrome) {
            console.log("chrome");
            uploadBlob(player.recordedData.video, time + ".webm", time);
        } else {
            uploadBlob(player.recordedData, time + ".webm", time);
        }
    }
});

function uploadBlob(file, fileName, time) {
    if (!file) {
        throw 'Blob object is required.';
    }
    if (!file.type) {
        file.type = 'video/webm';
    }

    var fileExtension = file.type.split('/')[1];
    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }
    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;
    informVideoIsRecorded(fileFullName, time);
    var formData = new FormData();
    formData.append(file.type + '-filename', fileFullName);
    formData.append(file.type + '-blob', file);

    makeXMLHttpRequest('upload.php', formData, function (progress) {
        if (progress !== 'upload-ended') {
            return;
        }
    });
}

function makeXMLHttpRequest(url, data, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            callback('upload-ended');
            location.reload();
        }
    };
    request.upload.onloadstart = function () {
        callback('Upload started...');
    };
    request.upload.onprogress = function (event) {
        $(".progress-bar").css("width", Math.round(event.loaded / event.total * 100) + "%");
        console.log('Upload Progress ' + Math.round(event.loaded / event.total * 100) + "%");
    };
    request.upload.onload = function () {
        callback('progress-about-to-end');
    };
    request.upload.onload = function () {
        $(".progress-bar").css("width", "0%");
    };
    request.upload.onerror = function (error) {
        callback('Failed to upload to server');
        console.error('XMLHttpRequest failed', error);
    };
    request.upload.onabort = function (error) {
        callback('Upload aborted.');
        console.error('XMLHttpRequest aborted', error);
    };
    request.open('POST', url);
    request.send(data);
}


function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }
    if (!file.type) {
        file.type = 'video/webm';
    }

    var fileExtension = file.type.split('/')[1];
    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;
    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);

    hyperlink.target = '_blank';
    hyperlink.download = fileFullName;
    if (!!navigator.mozGetUserMedia) {
        hyperlink.onclick = function () {
            (document.body || document.documentElement).removeChild(hyperlink);
        };
        (document.body || document.documentElement).appendChild(hyperlink);
    }

    var evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    hyperlink.dispatchEvent(evt);

    if (!navigator.mozGetUserMedia) {
        URL.revokeObjectURL(hyperlink.href);
    }

}

function informVideoIsRecorded(fullName, time) {
    var comment = {};
    comment.username = username;
    comment._id = time + "";
    comment.timestamp = new Date().toISOString();
    comment.val = fullName;
    storeComment(comment);
}

function storeComment(comment) {
    $.ajax({
        url: "https://54.75.18.26/operatorcomments",
        xhrFields: {
            withCredentials: true,
        },
        type: "POST",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(comment),
        complete: function (data, textStatus, jqXHR) {
            console.log(JSON.stringify(data));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' :: ' + errorThrown + ' :: ' + JSON.stringify(jqXHR));
            alertMessage('error', 'Failed to upload observation', 2000);
        }
    });
}