var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Synth Strolling Synthwave Town",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "amt": 25},
                { "type": "reward", "x": 1500, "y": groundY - 50, "health": 10},
                { "type": "dodger", "x": 2000, "y": groundY - 50, "hp": 2},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        var access = levelData.gameItems;

        for (var i = 1; i < access[0].amt; i++) {
            access.push({ "type": "car", "x": i * (Math.random() * (1000 - 800) + 800), "y": groundY});
            access.push({ "type": "jet", "x": i * (Math.random() * (1000 - 800) + 800), "y": groundY - 50, "hp" : 2});

        }

        for (var i = 0; i < access.length;i++) {
            var accessed = access[i];
            var x = accessed.x;
            var y = accessed.y
            if (accessed.type === "car") {
                createCar(x ,y);
            }
            else if (accessed.type === "jet") {
                createEnemy(x,y,accessed.hp);
            }
            else if (accessed.type === "reward") {
                createPrize(x,y,accessed.health);
            }
            else if (accessed.type === "dodger") {
                createDodger(x,y,accessed.hp);
            }
        }



        function createCar (xParam, YParam) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var carHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            carHitZone.x = xParam;
            carHitZone.y = YParam;
            game.addGameItem(carHitZone);  
            var obstacleImage = draw.bitmap('img/Synthwave Car.png');
            obstacleImage.scaleX = 0.1;
            obstacleImage.scaleY = 0.1;
            carHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        function createPrize(x, y, health) {
            var prize = game.createGameItem('prize', 25);
            var greenSquare = draw.rect(50,50,'green');
            greenSquare.x = -25;
            greenSquare.y = -25;
            prize.addChild(greenSquare);
            prize.x = x;
            prize.y = y;
            prize.velocityX = -2

            game.addGameItem(prize);
            prize.onPlayerCollision = function() {
                game.changeIntegrity(health);
                game.increaseScore(100);
                prize.fadeOut();
            }
            prize.onProjectileCollision = function () {
                prize.shrink();
                createPrize(prize.x, prize.y, health);
            }
        }

        function createEnemy(x, y, hp){
            var enemy = game.createGameItem('jet',25);
            var jet = draw.bitmap('img/FighterJet.png');
            var hits = 0;
            jet.x = -25;
            jet.y = -25;
            jet.scaleX = 0.1;
            jet.scaleY = 0.1;
            enemy.addChild(jet);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -4;

            game.addGameItem(enemy);
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                if (hp === 0) {
                    enemy.shrink();
                }
                else {
                    hits = hits + 1;
                    game.increaseScore(100);
                    enemy.flyTo(enemy.x - 100, groundY -50);
                    createEnemy(enemy.x - 100, groundY - 50, hp - hits);
                }
            }
        
        }
        
        function createDodger (x, y, hp) {
            var dodger = game.createGameItem('dodger',25);
            var yellowSquare = draw.rect(50,50,'yellow');
            var hits = 0;
            yellowSquare.x = -25;
            yellowSquare.y = -25;
            dodger.addChild(yellowSquare);
            dodger.x = x;
            dodger.y = y;
            dodger.velocityX = -3;

            game.addGameItem(dodger);
            dodger.onPlayerCollision = function() {
                game.changeIntegrity(-100);
                dodger.fadeOut();
            };
            dodger.onProjectileCollision = function() {
                if (hp === 0) {
                    dodger.shrink();
                }
                else {
                    hits = hits + 1;
                    game.increaseScore(100);
                    dodger.flyTo(dodger.x + 1000 , groundY -50);
                    createDodger(dodger.x + 1000, groundY - 50, hp - hits);
                }
            }
                    
        }


        
        
        


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
