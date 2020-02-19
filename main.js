var ASSET_MANAGER = new AssetManager();
var TILE_LOADER = new TileLoader();
var PMH = new PlayerMovementHandler(3);
var inventory = new Inventory();
var enemyProb = ["skeleton", "armored"];

var rock = document.getElementById("rock");
var wood = document.getElementById("wood");
var level = document.getElementById("level");
var score = document.getElementById("score");

var gameEngine = new GameEngine();

ASSET_MANAGER.queueDownload("./img/gameOver.png");
ASSET_MANAGER.queueDownload("./img/start.jpg");

ASSET_MANAGER.queueDownload("./img/TestTileSheet.png");

ASSET_MANAGER.queueDownload("./img/rock.png");

ASSET_MANAGER.queueDownload("./img/mainCharacter_move.png");
ASSET_MANAGER.queueDownload("./img/mainCharacter_dead.png");
ASSET_MANAGER.queueDownload("./img/mainCharacter_attack.png");
ASSET_MANAGER.queueDownload("./img/armoredWalk.png");
ASSET_MANAGER.queueDownload("./img/armoredAttack.png");
ASSET_MANAGER.queueDownload("./img/skeleWalk.png");
ASSET_MANAGER.queueDownload("./img/skeleAttack.png");
ASSET_MANAGER.queueDownload("./img/campFire.png");
ASSET_MANAGER.queueDownload("./img/greenTree1.png");
ASSET_MANAGER.queueDownload("./img/health_bar.png");
ASSET_MANAGER.queueDownload("./img/tower.png");
ASSET_MANAGER.queueDownload("./img/pebble.png");
ASSET_MANAGER.queueDownload("./img/skeleDie.png");
ASSET_MANAGER.queueDownload("./img/armoredDie.png");

ASSET_MANAGER.downloadAll(function () {

    var rows = 20;
    var columns = 20;

    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    gameEngine.init(ctx);

    // Test Code
    var testTileSheet = ASSET_MANAGER.getAsset("./img/TestTileSheet.png");
    TILE_LOADER.loadTileSheet(testTileSheet, 50, 50, 1, 3);
    var loadedTileSheet = TILE_LOADER.loadedTiles;
    var testWorld = new World(testTileSheet, loadedTileSheet, 40, rows, columns,
         gameEngine, ASSET_MANAGER.getAsset("./img/greenTree1.png"), ASSET_MANAGER.getAsset("./img/rock.png"));
    gameEngine.addMiscEntity(testWorld);
    testWorld.generate();

    // main character sprite properties: height = 64 width = 64

    // ******* testing updating inventory values*****//
        inventory.addRock();
        inventory.addRock();
        rock.innerHTML = rock.innerHTML.substring(0, rock.innerHTML.length - 1) + inventory.getRockCount();
        inventory.addWood();
        inventory.addWood();
        inventory.addWood();
        wood.innerHTML = wood.innerHTML.substring(0, wood.innerHTML.length - 1) + inventory.getWoodCount();
    //************************************************/

    PMH.setContext(gameEngine);

    var light = new Light(gameEngine, 64, 64, ASSET_MANAGER.getAsset("./img/campFire.png"), ASSET_MANAGER.getAsset("./img/health_bar.png"));
    var tow = new Tower(gameEngine, 450, 450, 128, 128, ASSET_MANAGER.getAsset("./img/tower.png"));
    gameEngine.setMovementHandler(PMH);

    gameEngine.addMainEntity(light);

    var grid = new Grid(rows, columns, canvas.width, canvas.height,gameEngine)
    var mouseHandler = new MouseHandler(gameEngine, grid);
    gameEngine.setGrid(grid);

    var mainChar = ASSET_MANAGER.getAsset("./img/mainCharacter_move.png");
    var healthBar = ASSET_MANAGER.getAsset("./img/health_bar.png");
    var mainCharDead = ASSET_MANAGER.getAsset("./img/mainCharacter_dead.png");
    var mainCharAttack = ASSET_MANAGER.getAsset("./img/mainCharacter_attack.png");
    var mainCharacter = new Player(gameEngine, 400, 400, 64, 64, mainChar, healthBar, mainCharDead, mainCharAttack, grid, ASSET_MANAGER.getAsset("./img/tower.png"), 
                                    testWorld, inventory, rock, wood);
    PMH.assignPlayer(mainCharacter);
    gameEngine.addMainEntity(mainCharacter);

    gameEngine.addMiscEntity(grid);

    var gameOverScreen = ASSET_MANAGER.getAsset("./img/gameOver.png");
    gameEngine.setGameOverScreen(gameOverScreen);

    var startScreen = ASSET_MANAGER.getAsset("./img/start.jpg");
    gameEngine.setStartScreen(startScreen);

    gameEngine.setScore(score);

    gameEngine.start();
});

function addProjectile(x, y, point){
    gameEngine.addProjectileEntity(new Projectile(gameEngine, x, y, 10, 10, point, ASSET_MANAGER.getAsset("./img/pebble.png")));
}

function spawnEnemies(level){
    var type = null;
    var loc = null;
    for(var i = 0; i < (5 + Math.floor(1.5*level)); i++){
        type = enemyProb[Math.floor(Math.random() * enemyProb.length)];
        loc = getSpawnLoc()
        if(type === "skeleton"){
            gameEngine.addEnemyEntity(new Skeleton(gameEngine, loc.x, loc.y, 64, 64, ASSET_MANAGER.getAsset("./img/skeleWalk.png"), ASSET_MANAGER.getAsset("./img/skeleAttack.png"), ASSET_MANAGER.getAsset("./img/skeleDie.png")));
        }else{
            gameEngine.addEnemyEntity(new Armored(gameEngine, loc.x, loc.y, 64, 64, ASSET_MANAGER.getAsset("./img/armoredWalk.png"), ASSET_MANAGER.getAsset("./img/armoredAttack.png"), ASSET_MANAGER.getAsset("./img/armoredDie.png")));
        }
    }
}

function getSpawnLoc(){
    var line = Math.floor(Math.random() * 4);
    var x = null;
    var y = null;

    if(line === 0){
        //spawn along left axis
        x = -64;
        y = Math.floor(Math.random() * 800);
    }else if(line === 1){
        //spawn along bottom
        y = 800;
        x = Math.floor(Math.random() * 800);
    }else if(line === 2){
        //spawn along right
        x = 800;
        y = Math.floor(Math.random() * 800);
    }else{
        //spawn along top
        y = -64;
        x = Math.floor(Math.random() * 800);
    }

    return {x: x, y: y};
}