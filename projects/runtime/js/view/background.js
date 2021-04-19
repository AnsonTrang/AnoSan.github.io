var background = function (window) {
    'use strict';

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;

        // container which will be returned
        var background;

        // ANIMATION VARIABLES HERE:
        var tree; //Will not be used.
        var maxBuildingsPerType = 16;
        var minimumBuildingsPerType = 2;
        var buildings = [];
        var buildingSpeed = [];
        var buildingHeightMax = 500;
        var colorBank = ['#2B1C2C','#512B50','#773A74','#9E4899','#C457BD','#EA66E1'];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#C724B1');
            background.addChild(backgroundFill);

            // TODO: 3 - Add a moon and starfield
                var moon = draw.bitmap('img/moon.png');
                moon.x = canvasWidth / 3;
                moon.y = canvasHeight - 600;
                moon.scaleX = .5;
                moon.scaleY = .5;

                for (var i = 0; i < 300; i++) {
                    var circle = draw.circle(1,'white','LightGray',2);
                    circle.x = canvasWidth*Math.random();
                    circle.y = groundY*Math.random();
                    background.addChild(circle);
                }
                background.addChild(moon);
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var a=0; a < colorBank.length; a++) {
                
                var buildingColor = colorBank[a];

                for (var b=0; b < Math.random() * (maxBuildingsPerType - minimumBuildingsPerType) + minimumBuildingsPerType; b++) {
                    
                    var buildingHeight = Math.random() * (buildingHeightMax - 50) + 50;
                    
                    var building = draw.rect(75,buildingHeight,buildingColor,'',1);
                    
                    building.x = 200*buildings.length;
                    
                    building.speed = (Math.random() * (a + 1)) + (a - 0.5)
                    building.speed < 0 ? building.speed = 0.1 : building.speed = building.speed
                    
                    building.y = groundY-buildingHeight;
                    
                    background.addChild(building);
                    buildings.push(building);                    
                }

            }
            


            // TODO 4: Part 1 - Add a tree
              /*  tree = draw.bitmap('img/tree.png');
                tree.x = 150;
                tree.y = groundY - 253;
                background.addChild(tree); */

        } // end of render function - DO NOT DELETE


        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the tree!
           /* tree.x = tree.x - 2;

            if(tree.x < -210) {
                tree.x = canvasWidth;
            } */

            // TODO 5: Part 2 - Parallax
            
            for (var i = 0; i < buildings.length; i++) {
                
                
                var eachBuilding = buildings[i];
                eachBuilding.x = eachBuilding.x - eachBuilding.speed;

                if (eachBuilding.x < -210) {
                    eachBuilding.x = canvasWidth;
                } 
            }
        } // end of update function - DO NOT DELETE



        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;

        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);

        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}