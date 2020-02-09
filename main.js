var ASSET_MANAGER = new AssetManager();
var TILE_LOADER = new TileLoader();
var PMH = new PlayerMovementHandler(3);

ASSET_MANAGER.queueDownload("./img/TestTileSheet.png");

ASSET_MANAGER.queueDownload("./img/rock.png");

ASSET_MANAGER.queueDownload("./img/mainCharacter_move.png");
ASSET_MANAGER.queueDownload("./img/armoredWalk.png");
ASSET_MANAGER.queueDownload("./img/skeleWalk.png");
ASSET_MANAGER.queueDownload("./img/campFire.png");


ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    var testTileSheet = ASSET_MANAGER.getAsset("./img/TestTileSheet.png");
    TILE_LOADER.loadTileSheet(testTileSheet, 50, 50, 1, 3);
    var loadedTileSheet = TILE_LOADER.loadedTiles;
    var testWorld = new World(testTileSheet, loadedTileSheet, 40, 20, 20, gameEngine);
    testWorld.generate();

    // main character sprite properties: height = 64 width = 64
    var mainChar = ASSET_MANAGER.getAsset("./img/mainCharacter_move.png")
    var mainCharacter = new Player(gameEngine, 30, 30, 64, 64, mainChar);
    PMH.assignPlayer(mainCharacter);
    PMH.setContext(gameEngine);

    var armor = new Armored(gameEngine, 500, 500, 70, 70, mainCharacter, ASSET_MANAGER.getAsset("./img/armoredWalk.png"));
    var light = new Light(gameEngine, 64, 64, ASSET_MANAGER.getAsset("./img/campFire.png"));
    var skele = new Skeleton(gameEngine, 720, 10, 50, 50, ASSET_MANAGER.getAsset("./img/skeleWalk.png"));

    gameEngine.setMovementHandler(PMH);
    gameEngine.addEntity(testWorld);

    gameEngine.addEntity(mainCharacter);
    gameEngine.addEntity(armor);
    gameEngine.addEntity(light);
    gameEngine.addEntity(skele);

    gameEngine.addEntity(new Resource(100, 100, 50, 50, gameEngine, ASSET_MANAGER.getAsset("./img/rock.png")));

    gameEngine.start();

});
