var STOP = false;

var calculateFibonacci = function (e) {
    var n = parseInt($('#fibonacci-for').val());
    var fibonacci = fib(n);
    $('#result').find('span').text(fibonacci);
};

var fibRecursive = function (n) {
    if (n < 2) {
        return n;
    } else {
        return fibRecursive(n - 1) + fibRecursive(n - 2);
    }
};

var fib = function (n, startTime) { // Not recursive for performance
    if (n < 2) {
        return n;
    } else {
        var preprev = 1;
        var prev = 1;
        var fib;
        for (var i = 2; i < n; i++) {
            fib = prev + preprev;
            preprev = prev;
            prev = fib;
        }
        if (startTime) {
            return {
                fib: fib,
                time: new Date() - startTime
            }
        }
        return fib;
    }
};

var fibChallenge = function (e) {
    var n = 1476;
    var fibN = fib(1476, new Date());
    $('.fibonacci-milliseconds').text(fibN.time);
    $('.fibonacci-number').text(n);
    $('.fibonacci-result').text(fibN.fib);
    $('.wait').hide();
    $('.report').show();
    $('#fibonacci-for').prop("disabled", false);
    $('#calculate').prop("disabled", false);
};

var calculateChallenge = function (e) {
    $(this).prop("disabled", true);
    $('.wait').show();
    $('#fibonacci-for').prop("disabled", true);
    setTimeout(function () {
        stop(10 /* seconds */);
        fibChallenge();
    }, 10);
};

var preventSubmit = function (e) {
    e.preventDefault();
    $('form')[0].checkValidity();
};

var init = function () {
    $('form').on("submit", preventSubmit);
    $('#fibonacci-for').bind("input propertychange", calculateFibonacci);
    $('#calculate').on("click", calculateChallenge);
};

$(document).ready(init);

