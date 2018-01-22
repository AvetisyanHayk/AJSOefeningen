function createIconManager(personParams, organParams) {
    var organIconMap = [
        ["body", "veins", "green", "bloodDrop", "bloodPlate", "brokenBone", "bone", "brain", "brainColor"],
        ["cells", "cell1", "cell2", "cell2", "deadBody", "dna", "ear", "embryo", "eye"],
        ["eyeball", "foot", "footSick", "hand", "handSick", "heart", "heartSick", "bowls", "teeth"],
        ["kidney", "liver", "liverSick", "lungs", "lungsSick", "water", "month", "ukn1", "neuron"],
        ["nose", "skin", "skull", "skullBrain", "skullCrack", "sperm", "stomach", "tooth", "toothSlice"],
        ["toothSliceHole", "toothSliceHole2", "uterus", "ukn2", "eggCell", "eggCellSperm"]
    ];

    var personIconMap = [
        ["noFoodFemale", "noFoodMale", "angel", "armyDoctorFemale", "armyDoctorMale", "child", "suitFemale", "suitMale", "heartDoctorFemale"],
        ["heartDoctorMale", "kidPatientFemale", "kidPatientMale", "teethDoctorFemale", "teethDoctorMale", "doctorFemale", "doctorMale", "doctorNurse", "doctorPatient"],
        ["doctorNoFoodPatient", "motherBaby", "patients", "surgeonNurse", "surgeonPatient", "parentsChild", "parentsBaby", "family", "doctorNursePatients"],
        ["uterusDoctorFemale", "uterusDoctorMale", "doctorSyringeFemale", "doctorSyringeMale", "doctorMouthProtectionFemale", "doctorMouthProtection", "studentFemale", "student", "baby"],
        ["nurseFemale", "nurse", "doctorAppleFemale", "doctorApple", "eyeDoctorFemale", "eyeDoctorMale", "doctorLampFemale", "doctorLampMale", "patientFemale"],
        ["patientMale", "patientBandageFemale", "patientBandageMale", "childDoctorFemale", "childDoctorMale", "rxDoctorFemale", "rxDoctorMale", "woman", "lungDoctor"],
        ["receptionist", "oldPatientFemale", "oldPatientMale", "doctorMouthProtectionBlue", "doctorMouthProtectionGreen", "patient2Female", "patient2Male", "kidneyDoctor", "animalDoctor"]
    ];

    function IconMapProperties(iconMap, params) {
        this.iconMap = iconMap;
        this.side = params.side;
        this.tight = params.tight;
        this.factor = (params.pct) ? params.pct / 100 : 1;
        this.width = params.originalWidth;
        this.indexOf = function (icon) {
            for (var rowIndex = 0; rowIndex < this.iconMap.length; rowIndex++) {
                for (var colIndex = 0; colIndex < this.iconMap[rowIndex].length; colIndex++) {
                    var current = this.iconMap[rowIndex][colIndex];
                    if (current === icon) {
                        return {
                            rowIndex: rowIndex,
                            colIndex: colIndex
                        }
                    }
                }
            }
            return null;
        };
        this.getSide = function () {
            return this.side * this.factor;
        };
        this.getPadding = function () {
            return (this.width - this.iconMap[0].length * this.side) * this.factor / 2;
        };
        this.getSpacing = function () {
            var spacing = 0;
            if (this.tight === true) {
                spacing = this.getSide() * .1;
            }
            return spacing;
        };
        this.getPositionFor = function (icon) {
            var index = this.indexOf(icon);
            var x = index.colIndex * this.getSide() + this.getSpacing() + this.getPadding();
            var y = index.rowIndex * this.getSide() + this.getSpacing();
            return {
                x: -x,
                y: -y
            }
        };
        this.getPositionCssValueFor = function (icon) {
            var position = this.getPositionFor(icon);
            var x = (position.x === 0) ? 0 : position.x + "px";
            var y = (position.y === 0) ? 0 : position.y + "px";
            return x + " " + y;
        }
    }

    var personIconMapProperties = new IconMapProperties(personIconMap, personParams);
    var organIconMapProperties = new IconMapProperties(organIconMap, organParams);

    return {
        person: function (icon) {
            return personIconMapProperties.getPositionCssValueFor(icon);
        },
        organ: function (icon) {
            return organIconMapProperties.getPositionCssValueFor(icon);
        }
    };
}

/*
    Age Data
 */
var AGE_DATA = [
    {name: "baby", min: 0, max: 2},
    {name: "child", min: 3, max: 15},
    {name: "adult", min: 16, max: 74},
    {name: "elderly", min: 75, max: null}
];

var findAgeByValue = function (value) {
    var result = {value: value};
    var age;
    for (var i = 0; i < AGE_DATA.length; i++) {
        age = AGE_DATA[i];
        if (age.max !== null) {
            if (value >= age.min && value <= age.max) {
                result.name = age.name;
                break;
            }
        } else {
            if (value >= age.min) {
                result.name = age.name;
                break;
            }
        }

    }
    return result;
};

/*
    Patient Data
 */
var PATIENT_ICON_DATA = [
    {
        gender: "M",
        baby: "child",
        child: "kidPatientMale",
        adult: "patientMale",
        elderly: "oldPatientMale"
    },
    {
        gender: "F",
        baby: "child",
        child: "kidPatientFemale",
        adult: "patientFemale",
        elderly: "oldPatientFemale"
    }];

var findPatientIconByGenderAndAgeName = function (gender, ageName) {
    for (var i = 0; i < PATIENT_ICON_DATA.length; i++) {
        var icon = PATIENT_ICON_DATA[i];
        if (icon.gender === gender) {
            return icon[ageName];
        }
    }
    return null;
};


/*
    Specialty Data
 */
const SPECIALTY_DATA = [
    {
        name: "Nephrologist",
        maleIcon: "kidneyDoctor",
        femaleIcon: "kidneyDoctor",
        condition: {name: "kidney", icon: "kidney", description: "Kidney Problems"}
    },
    {
        name: "Ophthalmologist",
        maleIcon: "eyeDoctorMale",
        femaleIcon: "eyeDoctorFemale",
        condition: {name: "eye", icon: "eye", description: "Visual problems"}
    },
    {
        name: "Cardiologist",
        maleIcon: "heartDoctorMale",
        femaleIcon: "heartDoctorFemale",
        condition: {name: "heart", icon: "heart", description: "Heart problems"}
    },
    {
        name: "Pulmonologist",
        maleIcon: "lungDoctor",
        femaleIcon: "lungDoctor",
        condition: {name: "respiratory", icon: "lungs", description: "Respiratory issues"}
    },
    {
        name: "Gyneacologist",
        maleIcon: "uterusDoctorMale",
        femaleIcon: "uterusDoctorFemale",
        condition: {name: "gyn", icon: "uterus", description: "Uterine discomfort"}
    },
    {
        name: "Dentist",
        maleIcon: "teethDoctorMale",
        femaleIcon: "teethDoctorFemale",
        condition: {name: "teeth", icon: "teeth", description: "Dental issues"}
    },
    {
        name: "Hematologist",
        maleIcon: "doctorSyringeMale",
        femaleIcon: "doctorSyringeFemale",
        condition: {name: "blood", icon: "bloodPlate", description: "Sanguine worries"}
    }
];

var findSpecialtyByConditionNameAndGender = function (conditionName, gender) {
    for (var i = 0; i < SPECIALTY_DATA.length; i++) {
        var specialty = SPECIALTY_DATA[i];
        if (specialty.condition.name === conditionName) {
            var icon;
            if (gender === "M") {
                icon = specialty.maleIcon
            } else if (gender === "F") {
                icon = specialty.femaleIcon
            }
            return {
                name: specialty.name,
                icon: icon,
                condition: specialty.condition
            };
        }
    }
    return null;
};

var readCondition = function (name) {
    for (var i = 0; i < SPECIALTY_DATA.length; i++) {
        var condition = SPECIALTY_DATA[i].condition;
        if (condition.name === name) {
            return condition;
        }
    }
    return null;
};

/*
    Person Data
 */
var DOCTOR_DATA = [
    {name: "Gregory House", gender: "M", specialty: "blood"},
    {name: "Martin Manners", gender: "M", specialty: "teeth"},
    {name: "Lindsey Case", gender: "F", specialty: "gyn"},
    {name: "Clare Hobbs", gender: "F", specialty: "respiratory"},
    {name: "Sam Uncle", gender: "M", specialty: "eye"},
    {name: "Damon Cringle", gender: "M", specialty: "kidney"},
    {name: "Ellie Skelly", gender: "F", specialty: "gyn"},
    {name: "Max Dear", gender: "M", specialty: "heart"},
    {name: "Pat Sang", gender: "M", specialty: "blood"}];

var PATIENT_DATA = [
    {name: "Alice", gender: "F", age: 20, symptom: "kidney"},
    {name: "Jane Doe", gender: "F", age: 66, symptom: "gyn"},
    {name: "John Doe", gender: "M", age: 48, symptom: "blood"},
    {name: "Jimmy Doe", gender: "M", age: 8, symptom: "teeth"},
    {name: "Jacky Doe", gender: "F", age: 16, symptom: "respiratory"},
    {name: "Lyanna Raine", gender: "F", age: 22, symptom: "respiratory"},
    {name: "Egon Lint", gender: "M", age: 75, symptom: "heart"},
    {name: "Lester Cobbleworth", gender: "M", age: 89, symptom: "blood"},
    {name: "Nolan Keith", gender: "M", age: 4, symptom: "teeth"},
    {name: "Jenny Danes", gender: "F", age: 4, symptom: "teeth"}];


var findAllPatients = function () {
    var result = [];
    PATIENT_DATA.forEach(function (resultSet) {
        var age = findAgeByValue(resultSet.age);
        var patient = {
            name: resultSet.name,
            gender: resultSet.gender,
            icon: findPatientIconByGenderAndAgeName(resultSet.gender, age.name),
            age: age,
            condition: readCondition(resultSet.symptom)
        };
        result.push(patient);
    });
    return result;
};

var findAllDoctors = function () {
    var result = [];
    DOCTOR_DATA.forEach(function (resultSet) {
        var doctor = {
            name: resultSet.name,
            gender: resultSet.gender,
            specialty: findSpecialtyByConditionNameAndGender(resultSet.specialty, resultSet.gender)
        };
        result.push(doctor);
    });
    return result;
};


