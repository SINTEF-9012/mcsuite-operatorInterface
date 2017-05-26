//This ugly part is for generating the form
var com = ["Everything is OK", "Workpiece handling", "Machine tool setup", "Tool change", "Broken insert, tool", "Lack of tool, inserts, workpiece, other material", "Lack of operator", "Lack of other consumable", "Machine error", "Coolant problem", "Strong vibrations", "Wrong chip generation", "Programming error"];

for (i = 0; i < com.length; i++) {
    $('#comments').append('<label class="radio"><input type="radio" name = "optionsRadios" value="' + com[i] + '"/>' + com[i] + '</label>');
}
$('#comments').append('<label class="radio"><input type="radio" name = "optionsRadios" value="o"/><input id="freeComment" type="text" /></label>');


//This is to send the observation
var comments = [];
if (sessionStorage.getItem('comments')) {
    console.log(sessionStorage.getItem('comments'));
    comments = JSON.parse(sessionStorage.getItem('comments'));
}
$("#btn-send").click(function () {
    var comment = {};
    var tab = document.cookie.split("=");
    comment._id = (new Date).getTime() + "";
    comment.owner = tab[1];
    comment.timestamp = new Date().toLocaleString();
    comment.level = $('input[name="level"]:checked').val();
    comment.from = $('input[name="from"]').val();
    comment.to = $('input[name="to"]').val();
    if ($('input[name="occasion"]:checked').val() === "o") {
        comment.occasion = $('#freeComment').val();
    } else {
        comment.occasion = $('input[name="occasion"]:checked').val();
    }
    if ($('input[name="optionsRadios"]:checked').val() === "o") {
        comment.val = $('#freeComment').val();
    } else {
        comment.val = $('input[name="optionsRadios"]:checked').val();
    }
    comments.push(comment);
    var stringified = JSON.stringify(comments);
    sessionStorage.setItem('comments', stringified);
    storeComment(comment);
});

$("#btn-file").click(function () {
    var comments = sessionStorage.getItem('comments');
    window.open("data:text/json," + comments);
    sessionStorage.clear();
});



function storeComment(comment) {
    $.ajax({
        url: "http://54.75.18.26:5984/operatorcomments",
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
        }
    });
}