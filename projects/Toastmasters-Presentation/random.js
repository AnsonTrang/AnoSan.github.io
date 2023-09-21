$(document).ready(runProgram);
//Randomly generate a character (Red, blue, and red/blue) with different hairstyles

function runProgram() {
  var bodies = ['CharacterElements/Bodies/Extrovert.svg',
  'CharacterElements/Bodies/Friendly.svg',
  'CharacterElements/Bodies/Introvert.svg'];
  
  var faces = ['CharacterElements/Faces/Angry.svg',
  'CharacterElements/Faces/Beard.svg',
  'CharacterElements/Faces/Busy.svg',
  'CharacterElements/Faces/Cool.svg',
  'CharacterElements/Faces/Crossed.svg',
  'CharacterElements/Faces/Curious.svg',
  'CharacterElements/Faces/Diddlied.svg',
  'CharacterElements/Faces/Dog.svg',
  'CharacterElements/Faces/Grin.svg',
  'CharacterElements/Faces/Indifferent.svg',
  'CharacterElements/Faces/Pin.svg',
  'CharacterElements/Faces/Sad.svg',
  'CharacterElements/Faces/Small.svg',
  'CharacterElements/Faces/Smiling.svg',
  'CharacterElements/Faces/Surprised.svg',
  'CharacterElements/Faces/Tongue.svg'
  ];
  
  var hair = ['CharacterElements/Hair/Bandana.svg',
  'CharacterElements/Hair/Bow.svg',
  'CharacterElements/Hair/Bucket.svg',
  'CharacterElements/Hair/Crown.svg',
  'CharacterElements/Hair/Elvis.svg',
  'CharacterElements/Hair/Emo.svg',
  'CharacterElements/Hair/Funnel.svg',
  'CharacterElements/Hair/Halo.svg',
  'CharacterElements/Hair/Monoglasses.svg',
  'CharacterElements/Hair/Ninja.svg',
  'CharacterElements/Hair/Pirate.svg',
  'CharacterElements/Hair/Saiyan.svg',
  'CharacterElements/Hair/Sunglasses.svg',
  'CharacterElements/Hair/Sword.svg',
  'CharacterElements/Hair/TooManyEyes.svg',
  'CharacterElements/Hair/Toupe.svg'
  ]
  
  
  var randomizeCharacter = (function () {
    // Define the randomizeCharacter function
    function randomizeCharacter() {
        body();
        hairstyles();
        face();
    }

    // Invoke the randomizeCharacter function once when the website loads
    randomizeCharacter();

    // Return the randomizeCharacter function
    return randomizeCharacter;
  })();

  function body() {
    const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
    $("#body").attr("src", randomBody);
  }

  function hairstyles() {
    const randomHair = hair[Math.floor(Math.random() * hair.length)];
    $("#hair").attr("src", randomHair);
  }

  function face() {
    const randomFace = faces[Math.floor(Math.random() * faces.length)];
    $("#eyes").attr("src", randomFace);
  }

  document.addEventListener("click", function(){
    console.log("Click");
    // Now you can call randomizeCharacter
    randomizeCharacter();
  });


}





