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
        var colorBank = ['rgba(0, 0, 0, 0.75)','rgba(40, 28, 64, 0.75)','rgba(83, 57, 132, 0.75)','rgba(115, 80, 180, 0.75)','rgba(152, 126, 200, 0.75)','rgba(184, 166, 217, 0.75)'];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            //var canvas = app.canvas;
            var ctx = canvas.getContext("2d"); 
            var grd = ctx.createLinearGradient(0,canvasHeight,0,0);
            grd.addColorStop(0.26, "#ffffff");
            grd.addColorStop(0.3,"#C724B1");
            grd.addColorStop(1,"#000000"); 
            grd.addColorStop(0.1,"#000000");
            var backgroundFill = draw.rect(canvasWidth, groundY, grd);
            background.addChild(backgroundFill);
            //this is Tony's work...

            // TODO: 3 - Add a moon and starfield
                var moon = draw.bitmap('img/moon.png');
                moon.x = canvasWidth / 3;
                moon.y = groundY - 500;
                moon.scaleX = 1;
                moon.scaleY = 1;

                for (var i = 0; i < 100; i++) {
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
                    
                    var buildingWidth = Math.random() * (200 - 75) + 75;

                    var building = draw.rect(buildingWidth,buildingHeight,buildingColor,'',1);
                    
                    building.x = 1000 + (200*buildings.length);
                    
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
