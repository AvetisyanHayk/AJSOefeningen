"use strict";

var app = {
    hookUpEventHandler: function () {
        return function (e) {
            e.preventDefault();
            var $title = $('input[name="title"]');
            var $url = $('input[name="url"]');
            var url = $url.val();
            if (url.indexOf('http') === -1) {
                url = "http://" + url;
            }
            app.addUrl.call($('ul'), $title.val(), url);
            app.getAndClearInput($title);
            app.getAndClearInput($url);
        }
    },
    getAndClearInput: function ($input) {
        var val = $input.val();
        $input.val("");
        return val;
    },
    addUrl: function (title, url) {
        var $li = $("<li></li>");
        var $a = $('<a target="_blank">').attr("href", url).text(title);
        $li.append($a);
        this.append($li); // what does this this reference?
    }
};

$(function () {
    $('form').on("submit", function (e) {
        e.preventDefault();
    });

    $('input[name="add"]').on("click", app.hookUpEventHandler());
    var $ul = $('ul');
    app.addUrl.call($ul, "Howest", "https://www.howest.be");
    app.addUrl.call($ul, "Google", "https://www.google.be");
});


