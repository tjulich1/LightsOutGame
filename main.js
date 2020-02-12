var ASSET_MANAGER = new AssetManager();
var TILE_LOADER = new TileLoader();
var PMH = new PlayerMovementHandler(3);
var inventory = new Inventory();

var rock = document.getElementById("rock");
var wood = document.getElementById("wood");

ASSET_MANAGER.queueDownload("./img/TestTileSheet.png");

ASSET_MANAGER.queueDownload("./img/rock.png");

ASSET_MANAGER.queueDownload("./img/mainCharacter_move.png");
ASSET_MANAGER.queueDownload("./img/mainCharacter_dead.png");
ASSET_MANAGER.queueDownload("./img/armoredWalk.png");
ASSET_MANAGER.queueDownload("./img/skeleWalk.png");
ASSET_MANAGER.queueDownload("./img/campFire.png");
ASSET_MANAGER.queueDownload("./img/greenTree1.png");
ASSET_MANAGER.queueDownload("./img/health_bar.png");

ASSET_MANAGER.downloadAll(function () {

    var rows = 20;
    var columns = 20;

    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    // Test Code
    var testTileSheet = ASSET_MANAGER.getAsset("./img/TestTileSheet.png");
    TILE_LOADER.loadTileSheet(testTileSheet, 50, 50, 1, 3);
    var loadedTileSheet = TILE_LOADER.loadedTiles;
    var testWorld = new World(testTileSheet, loadedTileSheet, 40, rows, columns,
         gameEngine, ASSET_MANAGER.getAsset("./img/greenTree1.png"), ASSET_MANAGER.getAsset("./img/rock.png"));
    gameEngine.addMiscEntity(testWorld);
    testWorld.generate();

    var mainChar = ASSET_MANAGER.getAsset("./img/mainCharacter_move.png");
    var healthBar = ASSET_MANAGER.getAsset("./img/health_bar.png");
    var mainCharDead = ASSET_MANAGER.getAsset("./img/mainCharacter_dead.png");
    var mainCharacter = new Player(gameEngine, 30, 30, 64, 64, mainChar, healthBar, mainCharDead);
    PMH.assignPlayer(mainCharacter);

    // main character sprite properties: height = 64 width = 64

    // ******* testing updating inventory values*****//
        inventory.addRock();
        rock.innerHTML = rock.innerHTML.substring(0, rock.innerHTML.length - 1) + inventory.getRockCount();
        inventory.addWood();
        inventory.addWood();
        wood.innerHTML = wood.innerHTML.substring(0, wood.innerHTML.length - 1) + inventory.getWoodCount();
    //************************************************/

    PMH.setContext(gameEngine);

    var armor = new Armored(gameEngine, 500, 500, 70, 70, mainCharacter, ASSET_MANAGER.getAsset("./img/armoredWalk.png"));
    var light = new Light(gameEngine, 64, 64, ASSET_MANAGER.getAsset("./img/campFire.png"));
    var skele = new Skeleton(gameEngine, 720, 10, 50, 50, ASSET_MANAGER.getAsset("./img/skeleWalk.png"));

    gameEngine.setMovementHandler(PMH);

    gameEngine.addMainEntity(mainCharacter);
    gameEngine.addEnemyEntity(armor);
    gameEngine.addMainEntity(light);
    gameEngine.addEnemyEntity(skele);

    var grid = new Grid(rows, columns, canvas.width, canvas.height,gameEngine)
    var mouseHandler = new MouseHandler(gameEngine, grid);

    gameEngine.addMiscEntity(grid);

    gameEngine.start();

});
