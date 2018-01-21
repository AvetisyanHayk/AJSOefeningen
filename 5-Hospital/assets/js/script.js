var ICON_MANAGER = createIconManager(
    {pct: 60, tight: true, originalWidth: 698}, // Person Icon Map parameters
    {tight: true, originalWidth: 698} // Organ Icon Map Parameters
);

function Condition(data) {
    this.name = data.name;
    this.icon = data.icon;
    this.description = data.description;
}

function Specialty(data) {
    this.name = data.name;
    this.icon = data.icon;
    this.condition = new Condition(data.condition);
    this.getOrganIcon = function () {
        return this.condition.icon;
    }
}

function Gender(type) {
    this.type = type;
    this.getName = function () {
        if (this.type === "M") {
            return "male"
        } else if (this.type === "F") {
            return "female"
        }
    };
    this.getTitle = function () {
        if (this.type === "M") {
            return "Mr."
        }
        return "Ms."
    };
}

function Age(age) {
    this.value = age.value;
    this.name = age.name;
}

function Person(name, genderName) {
    this.name = name;
    this.gender = new Gender(genderName);
    this.getId = function () {
        return this.name.split(" ").join("-")
    }
}

function Patient(patient) {
    Person.call(this, patient.name, patient.gender);
    this.age = new Age(patient.age);
    this.condition = new Condition(patient.condition);
    this.title = this.gender.getTitle();
    this.icon = patient.icon;
    this.getOrganIcon = function () {
        return this.condition.icon;
    };
    this.getSymptom = function () {
        return this.condition.name;
    };
    this.render = function ($patients) {
        var $patient = $('<article draggable="true">').attr("id", this.getId());
        var $personIcon = $('<div class="patient">').css("background-position", ICON_MANAGER.person(this.icon));
        var $personName = $('<h3>').html($('<small>').text(this.title)).append(" " + this.name);
        var $symptom = $('<div class="wide">').append($('<div class="specialty">')
            .css("background-position", ICON_MANAGER.organ(this.getOrganIcon())));
        var $description = $('<div class="description">').text(this.condition.description);
        $patient.append($personIcon).append($personName).append($symptom).append($description);
        $patients.append($patient);
    };
}

Patient.prototype = Object.create(Person.prototype);
Patient.prototype.constructor = Patient;

function Doctor(doctor) {
    Person.call(this, doctor.name, doctor.gender);
    this.specialty = new Specialty(doctor.specialty);
    this.title = "Dr.";
    this.getOrganIcon = function () {
        return this.specialty.getOrganIcon();
    };
    this.getIcon = function () {
        return this.specialty.icon;
    };
    this.getSpecialtyName = function () {
        return this.specialty.name;
    };
    this.render = function ($doctors) {
        var $doctor = $('<article draggable="true">').attr("id", this.getId());
        var $personIcon = $('<div class="doctor">').css("background-position", ICON_MANAGER.person(this.getIcon()));
        var $personName = $('<h3>').html($('<small>').text(this.title)).append(" " + this.name);
        var $symptom = $('<div class="wide">').append($('<div class="specialty">')
            .css("background-position", ICON_MANAGER.organ(this.getOrganIcon())));
        var $description = $('<div class="description">').text(this.getSpecialtyName());
        $doctor.append($personIcon).append($personName).append($symptom).append($description);
        $doctors.append($doctor);
    };
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

var fillPatients = function () {
    var $patients = $('.patients');
    findAllPatients().forEach(function (patient) {
        new Patient(patient).render($patients);
    });
};

var fillDoctors = function () {
    var $doctors = $('.doctors');
    findAllDoctors().forEach(function (doctor) {
        new Doctor(doctor).render($doctors);
    });
};


var buildDoctor = function (doctor) {
    var $doctor = $('<article draggable="true">').attr("id", doctor.getId());
    var $personIcon = $('<div class="doctor">').css("background-position", ICON_MANAGER.person(doctor.getIcon()));
    var $personName = $('<h3>').html($('<small>').text(doctor.title)).append(" " + doctor.name);
    var $symptom = $('<div class="wide">').append($('<div class="specialty">')
        .css("background-position", ICON_MANAGER.organ(doctor.getOrganIcon())));
    var $description = $('<div class="description">').text(doctor.getSpecialtyName());
    return $doctor.append($personIcon).append($personName).append($symptom).append($description);
};

var initDragAndDrop = function () {
    $('.droppable')
        .on("dragover", allowDrop)
        .on("dragenter", toggleDropFeedback)
        .on("dragleave", toggleDropFeedback)
        .on("drop", handleDrop);
    $('section.draggable-container').on("dragstart", '[draggable="true"]', handleDrag);
};

var allowDrop = function (e) {
    e.preventDefault();
};

var toggleDropFeedback = function (e) {
    $(this).toggleClass('dropme');
};

var handleDrag = function (e) {
    var dataString = getDataString();
    e.dataTransfer = e.originalEvent.dataTransfer;
    var item = getDragItem($(this));
    e.dataTransfer.setData(dataString, JSON.stringify(item));
};

var handleDrop = function (e) {
    var dataString = getDataString();
    e.dataTransfer = e.originalEvent.dataTransfer;
    var item = JSON.parse(e.dataTransfer.getData(dataString));
    $('.dropme').removeClass('dropme');
    e.stopPropagation();
    handleShowMessage(item);
};

var getDragItem = function ($person) {
    var name = $person.find('h3').html();
    var description = $person.find('.description').text();
    var person = getPersonType($person);
    return {
        name: name,
        description: description,
        person: person
    };
};

var isPatient = function ($person) {
    return $person.closest('.draggable-container').hasClass("patients");
};

var isDoctor = function ($person) {
    return $person.closest('.draggable-container').hasClass("doctors");
};

var getPersonType = function ($person) {
    if (isPatient($person)) {
        return "patient";
    } else if (isDoctor($person)) {
        return "doctor";
    }
};

var getDataString = function () {
    var userAgent = window.navigator.userAgent,
        msie = userAgent.indexOf('MSIE '),       // IE
        trident = userAgent.indexOf('Trident/'); // IE 11 / Edge
    if (msie > 0 || trident > 0) {
        return 'Text';
    }
    return 'text/html';
};

var handleShowMessage = function (item) {
    var modalId = "#" + item.person + "-modal";
    var $modal = $(modalId);
    $modal.find('.name').html(item.name);
    $modal.find('.description').html(item.description);
    $modal.modal('show');
};

var init = function () {
    fillPatients();
    fillDoctors();
    initDragAndDrop();
};

$(document).ready(init);

