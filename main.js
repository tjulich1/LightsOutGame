var ASSET_MANAGER = new AssetManager();
var TILE_LOADER = new TileLoader();
var PMH = new PlayerMovementHandler(3);

ASSET_MANAGER.queueDownload("./img/TestTileSheet.png");
<<<<<<< HEAD
ASSET_MANAGER.queueDownload("./img/rock.png");
ASSET_MANAGER.queueDownload("./img/link_walking.png");
=======
ASSET_MANAGER.queueDownload("./img/mainCharacter_move.png");
>>>>>>> origin/yuboDev

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    // Test Code
    var testTileSheet = ASSET_MANAGER.getAsset("./img/TestTileSheet.png");
    TILE_LOADER.loadTileSheet(testTileSheet, 50, 50, 1, 3);
    var loadedTileSheet = TILE_LOADER.loadedTiles;
    var testWorld = new World(testTileSheet, loadedTileSheet, 40, 20, 20, gameEngine);
    testWorld.generate();

<<<<<<< HEAD
    var testPlayer = new Player(gameEngine, 10, 10, 50, 50, ASSET_MANAGER.getAsset("./img/link_walking.png"));
    PMH.assignPlayer(testPlayer);
=======
    var mainChar = ASSET_MANAGER.getAsset("./img/mainCharacter_move.png")
    var mainCharacter = new Player(gameEngine, 30, 30, 64, 64, mainChar);
    PMH.assignPlayer(mainCharacter);

    // main character sprite properties: height = 64 width = 64 
>>>>>>> origin/yuboDev
    PMH.setContext(gameEngine);

    var armor = new Armored(gameEngine, 500, 500, 50, 50, mainCharacter);
    var light = new Light(gameEngine, 50, 50);
    var skele = new Skeleton(gameEngine, 720, 10, 50, 50);

    gameEngine.setMovementHandler(PMH);
    gameEngine.addEntity(testWorld);
<<<<<<< HEAD
=======

    gameEngine.addEntity(mainCharacter);
    gameEngine.addEntity(armor);
    gameEngine.addEntity(light);
    gameEngine.addEntity(skele);
>>>>>>> origin/yuboDev

    gameEngine.addEntity(new Resource(100, 100, 50, 50, gameEngine, ASSET_MANAGER.getAsset("./img/rock.png")));

    gameEngine.addEntity(testPlayer);

    gameEngine.start();

});
