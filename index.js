$(document).ready(typeProgram); //Checks if the CSS and HTML are laded before running the program.

//Main Program
function typeProgram() {
    console.log("PROGRAM LOADED");
    
    var defaultMessage = "My name is Anson";

    let firstMessages = [
        ["First time here?", defaultMessage,"Let me show you around!"], 
        ["Nice to meet you!", defaultMessage], 
        ["Hello there!", "How are you?", defaultMessage], 
        ["Salutations!", defaultMessage],
        ["Welcome!", defaultMessage, "And this is my portfolio!"],
        ["Good " + currentTime() + "!", defaultMessage],
        ["Hello, world.", "Welcome!", defaultMessage], 
        ["Hey, you.", "You're finally awake.", "You were trying to cross the border", "Right?", "Walked right into that imperial ambush", "Same as us", "And that thief over there."],
        ["Kept you waiting, huh?", "What took so long?", "Coding this website."],
        ["Hey!", "Listen!", "Hey!", "Hey!", "Listen!"],
    ];

    let selectedMessage = getRandomInt(0, firstMessages.length); //selects the first message
    let msgCount = 0;
    let index = 0;
    let currentMsg = "";
    let letter = "";

    (async function type() {

        if (msgCount === selectedMessage.length) {
            return;
        }
        
        currentMsg = firstMessages[7/*selectedMessage*/][msgCount]; console.log(currentMsg);
        letter = currentMsg.slice(0, ++index);
        
        $(".typing").text(letter);

        if (letter.length === currentMsg.length) {
            await sleep(2000);
            msgCount++;
            index = 0;
        }

        setTimeout(type, 100);
    }());
}

//additive flavors
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function currentTime() {
    console.log("Checking for Time");

    let time = new Date().getHours();

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