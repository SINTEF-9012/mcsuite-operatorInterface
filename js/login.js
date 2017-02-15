function checkSession() {
    $.ajax({
        url: "http://127.0.0.1:5984/_session",
        xhrFields: {
            withCredentials: true,
        },
        type: "GET",
        dataType: 'json',
        complete: function (data, textStatus, jqXHR) {
            var c = JSON.parse(data.responseText);
            document.cookie = "username=" + c.userCtx.name;
            if (c.userCtx.name !== null) {
                window.location.replace("./operatorInterface.html");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' :: ' + errorThrown + ' :: ' + JSON.stringify(jqXHR));
        }
    });
}



$(document).ready(function () {
    checkSession();
    $("#plop").click(function () {
        var cred = {};
        cred.name = $("#inputEmail").val();
        cred.password = $("#inputPassword").val();


        $.ajax({
            url: "http://127.0.0.1:5984/_session",
            xhrFields: {
                withCredentials: true,
            },
            type: "POST",
            dataType: 'json',
            data: {
                "name": cred.name,
                "password": cred.password
            },
            complete: function (data, textStatus, jqXHR) {
                checkSession();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ' :: ' + errorThrown + ' :: ' + JSON.stringify(jqXHR));
            }
        });
    });
});