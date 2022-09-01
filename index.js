$(document).ready(runProgram); //Checks if the CSS and HTML are laded before running the program.

//Main Program
function runProgram() {
    console.log("PROGRAM LOADED");

    typing(welcomeMessage());


}

function welcomeMessage() {
    console.log("Running Welcome Message");
    
    var firstMessages = [
        "First time here?", 
        "Welcome, nice to meet you!", 
        "Hello there!", 
        "Salutations!",
        "Welcome!",
        "Good " + currentTime() + "!",
        "Hello, world", 
        "Hey, you.",
        "Kept you waiting, huh?",
        "Hey!",
        
    ];
    var messageNum = getRandomInt(0, firstMessages.length);
    var messages = firstMessages[messageNum];

    return messages;
}

//Message Engine
function messageEngine(messageArray) {
    console.log("Running Message Engine");

    let numerator = 0;
    
    $.on("click", function(e) {
        numerator++;
    })
}

//Additive Programs
function typing(message) {
    //This is a program that types words!
    
    console.log("Typing Message")

    var messageChar = message.length;
    
    $(".splash-text").css({
        "width": `${messageChar}` + "ch",
        "animation": `typing 1s steps(${messageChar}), blink .5s step-end infinite alternate`,
    }).text(message);
}

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