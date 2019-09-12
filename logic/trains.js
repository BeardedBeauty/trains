var time;
var freq;
var name = "";
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

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    firstTime = moment(firstTimeConverted).format("hh:mm");
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
        name: name,
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
    name = $("#name").val();
    console.log(time)
    trains();
});

db.ref().on("child_added", function (snappy) {
    var i = snappy.val();
    $(".loco").after("<div><div class='train'>" + i.name + "</div><div class='train'>" + i.start + "</div><div class='train'>" + i.until + "</div><div class='train'>" + i.next + "</div></div>")
});
