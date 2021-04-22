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
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "enemy", "x" : 1000, "y": groundY - 50, "hp": 12},
                { "type": "reward", "x": 2000, "y": groundY - 50, "health": 10},
                { "type": "dodger", "x": 4000, "y": groundY - 50, "hp": 8},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        var access = levelData.gameItems;
        
        function createSawBlade (xParam, YParam) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = xParam;
            sawBladeHitZone.y = YParam;
            game.addGameItem(sawBladeHitZone);  
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }


        /*for (var i = 0; i < 20;i++) {
            createSawBlade(200 * i, Math.random() * (500 - groundY) + groundY);
        }*/

        
        function createEnemy(x, y, hp){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            var hits = 0;
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -1;

            game.addGameItem(enemy);
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-100);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                if (hp === 0) {
                    enemy.shrink();
                }
                else {
                    hits = hits + 1;
                    game.increaseScore(100);
                    enemy.flyTo(enemy.x - 10, groundY -50);
                    createEnemy(enemy.x - 10, groundY - 50, hp - hits);
                }
            }
        
        }
        for (var i = 0; i < access.length;i++) {
            var accessed = access[i];
            var x = accessed.x;
            var y = accessed.y
            if (accessed.type === "sawblade") {
                createSawBlade(x,y);
            }
            else if (accessed.type === "enemy") {
                createEnemy(x,y,accessed.hp);
            }
            else if (accessed.type === "reward") {

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
