var makeMyLog = function (consolelog, id) {
    return {
        log: function (text) {
            consolelog(text);
            id = '#' + id;
            var $closeBtn = $('<div class="console-header">').append($('<a href="#" class="close">').text("Close"));
            $(id).append($('<div class="console-line">').append($closeBtn).append($('<div>').text(text)));
        }
    }
};

var preventSubmit = function (e) {
    e.preventDefault();
    if ($('form')[0].checkValidity()) {
        var $consoleText = $('#console-text');
        var text = $consoleText.val();
        $consoleText.val("");
        var myLog = makeMyLog(console.log, "console");
        myLog.log(text);
    }
};

var removeLine = function (e) {
    $(this).closest('.console-line').slideUp('fast', function () {
        $(this).remove();
    });
};

var init = function () {
    $('form').on("submit", preventSubmit);
    $('#console-text').focus();
    $('#console').on("click", '.console-header .close', removeLine);
};

$(document).ready(init);

