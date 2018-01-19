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
        // TO DO: complete this function
        //
        // It will hookup the event handler for the submit button
        // and contain the necessary code to retrieve the input from both text
        // fields and add an URL to the list
    }
    ,
    getAndClearInput: function ($input) {
        // do not modify this function
        var val = $input.val();
        $input.val("");
        return val;
    }
    ,
    addUrl: function (title, url) {
        // do not modify this function
        var $li = $("<li></li>");
        var $a = $("<a href=\"" + url + "\">" + title + "</a>");
        $li.append($a);
        this.append($li); // what does this this reference?
    }
};

$(function () {

    $('form').on("submit", function (e) {
        e.preventDefault();
    });

    $('input[name="add"]').on("click", app.hookUpEventHandler());
    // TO DO:
    // add the right calls to app.addUrl here so http://www.howest.be and
    // http://www.google.be are added to the list upon launch
});


