var toggleSwitchActive = function (e) {
    var $img = $(this).find('img');
    var src = $img.attr("src");
    if (src.indexOf("active") > 0) {
        src = src.replace("-active", "")
    } else {
        src = src.replace(".svg", "-active.svg")
    }
    $img.attr("src", src);
};

var toggleSwitch = function (e) {
    var $circuit = $(this).closest('.circuit');
    var $device = $circuit.find('.device').find('i');
    var newState = getNewState($circuit);
    $circuit.attr("data-state", newState);
    var $img = $(this).find('img');
    var src = $img.attr("src").replace((newState === "off") ? "on" : "off", newState);
    $circuit.find('img').attr("src", src);
    if ($device.hasClass('fa-spin')) {
        $device.removeClass('fa-spin')
    } else {
        $device.addClass('fa-spin');
    }
};

var getNewState = function ($circuit) {
    var newState = $circuit.attr('data-state');
    return (newState === "on") ? "off" : "on";
};

var buildCircuit = function (deviceCount, switchCount, defaultEnabled, icon) {
    var state = (defaultEnabled) ? "on" : "off";
    var $circuit = $('<div class="circuit">').attr("data-state", state);
    var $device = buildDevice(deviceCount, defaultEnabled, icon);
    var $switches = buildSwitches(switchCount, defaultEnabled);
    $circuit.append($device).append($switches);
    $('#circuits').append($circuit);
};

var buildDevice = function (deviceCount, defaultEnabled, icon) {
    if (icon === undefined) {
        icon = "fa-gear";
    }
    var $device = $('<div class="device">');
    var spin = (defaultEnabled) ? " fa-spin" : "";
    for (var i = 0; i < deviceCount; i++) {
        var $icon = $('<i class="fa">').addClass(icon).addClass(spin);
        $device.append($icon);
    }
    return $device;
};

var buildSwitches = function (switchCount, defaultEnabled) {
    var state = (defaultEnabled) ? "on" : "off";
    var $switches = $('<ul class="switches">');
    for (var i = 0; i < switchCount; i++) {
        var src = "assets/media/switch-" + state + ".svg";
        var $img = $('<img alt="switch">').attr("src", src);
        var $switch = $('<a href="#">').append($img);
        $switches.append($('<li>').append($switch));
    }
    return $switches;
};

var init = function () {
    $('#circuits').on("mousedown", '.switches a', toggleSwitchActive)
        .on("mouseup", '.switches a', toggleSwitchActive)
        .on("click", '.switches a', toggleSwitch);
    buildCircuit(3, 5, false);
    buildCircuit(2, 4, false, "fa-soccer-ball-o");
    buildCircuit(1, 3, true, "fa-globe");
};

$(document).ready(init);

