$(document).ready(runProgram); //Checks if the CSS and HTML are laded.

//Main Program
function runProgram() {
    console.log("PROGRAM LOADED");

    $(".splash-text").text(welcomeMessage());
}

function welcomeMessage() {
    console.log("Running Welcome Message");
    
    var firstMessages = [
        "First time here?", 
        "Welcome, nice to meet you!", 
        "Hello there!", 
        "Salutations!",
        "Good " + currentTime() + "!",
        "Hello, world", 
        "Hey, you.",
    ];
    var messageNum = getRandomInt(0, firstMessages.length);
    var messages = firstMessages[messageNum];

    

    return messages;
}

//Message Engine
function messageEngine(messageArray) {
    console.log("Running Message Engine");

    for (var i = 0; i < messageArray.length; i++) {
        
    }
}

//Additive Programs
function currentTime() {
    console.log("Checking for Time");

    var time = new Date().getHours();

    if (time >= 0 && time < 12) {return ("morning");}
    if (time >= 12 && time < 18) {return ("afternoon");}
    if (time >= 18 && time < 24) {return ("evening");}
    else {return ("day");}
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}