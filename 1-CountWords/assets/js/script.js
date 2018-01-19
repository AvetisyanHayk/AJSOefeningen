var INITIAL_SPLIT_PATTERN = /[~!#$%^&*()+_=\[\]{}\\|;"<>?\s]/;
var LAST_SPLIT_PATTERN = /[.,/@:]/;
var PUNCTUATION_PATTERN = /[~!#$%^&*()+_=\[\]{}\\|;'"<>?.,/@:]/;
var ABBREVIATION_REGEX = /^'{0,1}[A-Z]+\.([A-Z0-9]+\.)+'{0,1}$/;
var URL_REGEX = /^'{0,1}(http:\/\/|https:\/\/){0,1}(){0}([A-Za-z0-9]{3}\.)?([\w-]{2,}\.)+[A-Za-z]{2,}(\/\w+)*\/{0,1}((\?\w+=*\w*)(&\w+=\w*)*){0,1}'{0,1}$/;
var EMAIL_REGEX = /^'{0,1}((\w+[!#$%&'*+\-/=?^`{|}~]*\w+(\.\w+[!#$%&'*+\-/=?^`{|}~]*\w+)*)|"\S+")@\w{2,}(\.\w{2,})*'{0,1}$/;
var NUMBER_REGEX = /^'{0,1}\d+([.,]\d+){0,1}'{0,1}$/;
var GENUINE_NUMBER_REGEX = /^'{0,1}[1-9]\d*([.,]\d+){0,1}'{0,1}$/;

var TEST_TEXT = "This text is to test 'Count Words' application.\n" +
    "Words are split by space, CRLF, and/or punctuation.\n\n" +
    "The result is sorted alphabetically. This example contains following result:\n" +
    "- 1: 2\n" +
    "- 2: 4\n" +
    "- 2.05: 3\n" +
    "- 3: 4\n" +
    "- 4: 3\n" +
    "- 5: 2\n" +
    "- 6: 1\n" +
    "- abbreviations: 3\n" +
    "- about: 2\n" +
    "- etc.\n\n" +

    "P.S. Numbers of different formats can be counted correctly, like for instance: 2.05, 2,05, 5.\n\n" +
    "And abbreviations, like P.S.: Post-Scriptum, or e-mail addresses, URLs " +
    "(e.g. someone@example.com or https://www.somewhere.com) as well.\n" +
    "Single characters, numbers, URLs, and e-mail addresses are not ignored by default.\n\n" +
    "The word 'two' is ignored, as it is added to the ignored list, and it won't be counted, even if you write " +
    "it two times.\n\n" +
    "This excercise seems to be an easy one, but it's not true at all! It's not a good excercise for an exam. " +
    "Not because it's difficult, but because it takes too much time to make a usable, senseful application, " +
    "that will be a very little bit close to a 'perfect' solution (if we're not talking about unicode abbreviations, for example).";


var ignoreWords = function (e) {
    var $ignoredText = $('#ignore-text');
    var words = collectWords($ignoredText.val(), true);
    if (words.length > 0) {
        $(this).prop("disabled", true);
    }
    $ignoredText.val("");
    ignore(words);
};

var countWords = function (e) {
    var $text = $('#text');
    var words = collectWords($text.val());
    var map = mapWords(words);
    fill(map);
    $(this).prop("disabled", true);
    $('#filter-text').val("").focus();
};

var collectWords = function (text, unique) {
    var result = [];
    var blocks = text.split(INITIAL_SPLIT_PATTERN);
    blocks.forEach(function (block) {
        var words = block.split(" ");
        words.forEach(function (word) {
            word = word.trim();
            if (word.length > 0) {
                if (isNumeric(word)) {
                    if (!ignoreNumbersChecked()) {
                        pushWord(result, buildNumeric(word), unique);
                    }
                } else if (isURI(word)) {
                    if (!ignoreURIChecked()) {
                        pushWord(result, buildURI(word), unique);
                    }
                } else if (isAbbreviation(word)) {
                    pushWord(result, buildAbbreviation(word), unique);
                } else {
                    buildPlainWords(word).forEach(function (subword) {
                        pushWord(result, subword, unique);
                    });
                }
            }
        });
    });
    return sortWords(result);
};

var pushWord = function (array, word, unique) {
    if (!isIgnored(word) && (!unique || array.indexOf(word) === -1)) {
        array.push(word);
    }
};

var sortWords = function (words) {
    return words.sort(function (w1, w2) {
        var w1s = (w1 + '').toLowerCase();
        var w2s = (w2 + '').toLowerCase();
        if (w1s < w2s) {
            return -1
        } else if (w1s > w2s) {
            return 1
        }
        return 0
    });
};

var mapWords = function (words) {
    var map = [];
    words.forEach(function (word) {
        var found;
        for (var i = 0; i < map.length; i++) {
            if (map[i].word === word) {
                map[i].count++;
                found = true;
                break;
            }
            found = false;
        }
        if (!found) {
            map.push({word: word, count: 1});
        }
    });
    return map;
};

var fill = function (map) {
    var $tbody = $('#result').find('table tbody');
    $tbody.find('tr:not(.null)').remove();
    $.each(map, function () {
        var $word = $('<td>').text(this.word);
        var $count = $('<td>').text(this.count);
        var $tr = $('<tr>').append($word).append($count);
        $tbody.append($tr);
    });
    toggleNullRow();
};

var ignore = function (words) {
    var $ignoredWords = $('#ignored-words');
    var $a = $ignoredWords.find('a');
    var ignored = [];
    $.each($a, function () {
        ignored.push($(this).attr("data-value"));
    });
    ignored.forEach(function (value) {
        if (words.indexOf(value) === -1) {
            words.push(value);
        }
    });
    words = sortWords(words);
    $ignoredWords.empty();
    words.forEach(function (word) {
        var $remove = $('<a href="#">').text("Remove").attr("data-value", word);
        var $li = $('<li>').append($remove).append(" " + word);
        $ignoredWords.append($li);
    });
    if (ignored.length !== words.length) {
        $(triggerJQueryEvent("update", $ignoredWords));
    }
};

var ignoreNumbersChecked = function () {
    return $('#ignore-numbers').is(":checked");
};

var ignoreURIChecked = function () {
    return $('#ignore-uri').is(":checked");
};

var ignoreSingleCharactersChecked = function () {
    return $('#ignore-single').is(":checked");
};

var optimizeSpecificWord = function (word) {
    lastLetter = word[word.length - 1];
    if (PUNCTUATION_PATTERN.test(lastLetter)) {
        return word.substring(0, word.length - 1);
    }
    return word;
};

var finalizeWord = function (word) {
    if (word[0] === '\'') {
        word = word.substring(1);
    }
    if (word[word.length - 1] === '\'') {
        word = word.substring(0, word.length - 1);
    }
    return word;
};

var buildNumeric = function (word) {
    word = finalizeWord(word);
    word = optimizeSpecificWord(word.replace(",", "."));
    if (GENUINE_NUMBER_REGEX.test(word)) {
        word = parseFloat(word);
    }
    return word;
};

var buildURI = function (word) {
    word = finalizeWord(word);
    word = optimizeSpecificWord(word.replace("https://", ""));
    return word.toLowerCase();
};

var buildAbbreviation = function (word) {
    word = finalizeWord(word);
    if (!ABBREVIATION_REGEX.test(word)) {
        word = optimizeSpecificWord(word);
    }
    return word;
};

var buildPlainWords = function (wordgroup) {
    var words = [];
    wordgroup.split(LAST_SPLIT_PATTERN).forEach(function (word) {
        word = finalizeWord(word);
        if (word.length === 1 && word !== "-" && !ignoreSingleCharactersChecked() || word.length > 1) {
            var alternativeAbbreviationRegex = /^[A-Z][A-Z0-9]+$/;
            if (!alternativeAbbreviationRegex.test(word)) {
                word = word.toLowerCase();
            }
            words.push(word);
        }
    });
    return words;
};

var isIgnored = function (word) {
    var $ignored = $('#ignored-words').find('a');
    word = word + '';
    for (var i = 0; i < $ignored.length; i++) {
        if ($($ignored[i]).attr("data-value") === word) {
            return true;
        }
    }
    return false;
};

var isNumeric = function (n) {
    return matchesPattern(n, NUMBER_REGEX);
};

var isAbbreviation = function (word) {
    return matchesPattern(word, ABBREVIATION_REGEX);
};

var isURI = function (word) {
    return isEmailAddress(word) || isURL(word);
};

var isEmailAddress = function (word) {
    return matchesPattern(word, EMAIL_REGEX);
};

var isURL = function (word) {
    return matchesPattern(word, URL_REGEX);
};

var matchesPattern = function (word, regex) {
    if (word === undefined || word.length === 0) {
        return false;
    }
    var notLastLetter = word.substring(0, word.length - 1);
    var lastLetter = word[word.length - 1];
    return regex.test(word)
        || regex.test(notLastLetter) && PUNCTUATION_PATTERN.test(lastLetter);
};

var emptyIgnoredWords = function (e) {
    $('#ignored-words').empty();
};

var removeIgnoredWord = function (e) {
    $(this).closest('li').remove();
    triggerJQueryEvent("update", $('#ignored-words'));
};

var handleIgnoreSingle = function (e) {
    if ($(this).is(":checked")) {
        $.each($('#ignored-words').find('a'), function () {
            if ($(this).attr("data-value").length === 1) {
                $(this).trigger("click");
            }
        });
    }
};

var handleIgnoreNumbers = function (e) {
    if ($(this).is(":checked")) {
        $.each($('#ignored-words').find('a'), function () {
            if (NUMBER_REGEX.test($(this).attr("data-value"))) {
                $(this).trigger("click");
            }
        });
    }
};

var handleIgnoreURI = function (e) {
    if ($(this).is(":checked")) {
        $.each($('#ignored-words').find('a'), function () {
            var value = $(this).attr("data-value");
            if (URL_REGEX.test(value) || EMAIL_REGEX.test(value)) {
                $(this).trigger("click");
            }
        });
    }
};

var handleNewText = function (e) {
    if ($(this).val().trim().length > 0) {
        enableCountButton();
    }
};

var handleNewIgnoreText = function (e) {
    $('#ignore-button').prop("disabled", !$(this).val().trim().length > 0);
};

var handleSubmitForm = function (e) {
    e.preventDefault();
    $('#ignore-button').trigger("click");
};

var filterResult = function (e) {
    var $result = $('#result').find('table tbody');
    var filterWords = [];
    var words = $(this).val().trim().split(" ");
    words.forEach(function (word) {
        word = word.trim();
        if (word.length > 0) {
            filterWords.push(word);
        }
    });
    if (filterWords.length > 0) {
        enableCountButton();
        toggleResultRow(filterWords);
        toggleNullRow();
    }
};

var wordContainsAny = function (filterWords, word) {
    for (var i = 0; i < filterWords.length; i++) {
        if (filterWords[i] === word || word.indexOf(filterWords[i]) >= 0) {
            return true;
        }
    }
    return false;
};

var toggleResultRow = function (filterWords, word) {
    var $result = $('#result').find('table tbody');
    var $row = $result.find('tr');
    $.each($row, function () {
        var word = $(this).text();
        if (!wordContainsAny(filterWords, word)) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
};

var toggleNullRow = function () {
    var $result = $('#result').find('table tbody');
    if ($result.find('tr:not(.null):visible').length === 0) {
        $result.find('.null').show();
    } else {
        $result.find('.null').hide();
    }
};

var reset = function (e) {
    $('#result').find('.table tbody tr:not(.null)').remove();
    $('#clear-ignored-words-button').trigger('click');
    $('#ignored-words').empty();
    $('#text').text(TEST_TEXT);
    $('[data-change-on-reset="true"]').trigger("change");
    toggleNullRow();
};

var enableControl = function ($control) {
    $control.prop("disabled", false);
};

var enableCountButton = function (e) {
    enableControl($('#count-button'));
};

var triggerJQueryEvent = function (eventName, $object) {
    var event = new jQuery.Event(eventName);
    $object.trigger(event);
};

var init = function () {
    $('form').on("submit", handleSubmitForm);

    $('#text').bind("input propertychange", handleNewText).val(TEST_TEXT);
    $('#ignore-text').bind("input propertychange", handleNewIgnoreText);
    $('#clear-ignored-words-button').on("click", emptyIgnoredWords);
    $('#ignore-button').on("click", ignoreWords);
    $('input[type="checkbox"][name="ignore-filter"]').on("change", enableCountButton);
    $('#ignore-numbers').on("click", handleIgnoreNumbers);
    $('#ignore-uri').on("click", handleIgnoreURI);
    $('#ignore-single').on("change", handleIgnoreSingle);
    $('#ignored-words').on("click", 'a', removeIgnoredWord)
        .on("update", enableCountButton);

    $('#reset-button').on("click", reset);
    $('#count-button').on("click", countWords).focus();

    $('#filter-text').bind("input propertychange", filterResult);

    ignore(["two"]);
};

$(document).ready(init);