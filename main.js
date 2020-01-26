var ASSET_MANAGER = new AssetManager();
var TILE_LOADER = new TileLoader();
var PMH = new PlayerMovementHandler();

ASSET_MANAGER.queueDownload("./img/TestTileSheet.png");

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

    var testPlayer = new Player(gameEngine, 10, 10, 50, 50);
    PMH.assignPlayer(testPlayer);
    PMH.setContext(gameEngine);

    var armor = new Armored(gameEngine, 500, 500, 50, 50, testPlayer);
    var light = new Light(gameEngine, 50, 50);
    var skele = new Skeleton(gameEngine, 750, 0, 50, 50);

    gameEngine.setMovementHandler(PMH);
    gameEngine.addEntity(testWorld);
    gameEngine.addEntity(testPlayer);
    gameEngine.addEntity(armor);
    gameEngine.addEntity(light);
    gameEngine.addEntity(skele);


    gameEngine.start();

});
