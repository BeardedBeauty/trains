var time;
var freq;
var complete = {};
var firebaseConfig = {
    apiKey: "AIzaSyBrpNTIk-OAiKUe4fqts3fEfbifUg9ontI",
    authDomain: "yup1-b0aa6.firebaseapp.com",
    databaseURL: "https://yup1-b0aa6.firebaseio.com",
    projectId: "yup1-b0aa6",
    storageBucket: "",
    messagingSenderId: "507587435465",
    appId: "1:507587435465:web:ef7e4b90b1507c37"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

function trains() {
    var tFrequency = freq;
    var firstTime = time;

    console.log(firstTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    next = moment(nextTrain).format("hh:mm");
    console.log(next)

    db.ref().push({
        start: firstTime,
        //convert: firstTimeConverted,
        dt: diffTime,
        remain: tRemainder,
        until: tMinutesTillTrain,
        next: next,
    });
}

$(document).on("click", "#addtrain", function () {
    time = $("#time").val().trim();
    freq = $("#freq").val().trim();
    trains();
});

db.ref().on("value", function (snappy) {
    var shinkansen = snappy.val();
    console.log("from db: ", shinkansen);
});

