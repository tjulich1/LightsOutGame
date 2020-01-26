var ASSET_MANAGER = new AssetManager();
var TILE_LOADER = new TileLoader();

ASSET_MANAGER.queueDownload("./img/TestTileSheet.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    // TileLoader test code.
    var testTileSheet = ASSET_MANAGER.getAsset("./img/TestTileSheet.png");

    TILE_LOADER.loadTileSheet(testTileSheet, 50, 50, 1, 3);

    var loadedTileSheet = TILE_LOADER.loadedTiles;

    var testWorld = new World(testTileSheet, loadedTileSheet, 40, 20, 20, gameEngine);
    testWorld.generate();

    gameEngine.addEntity(testWorld);
    gameEngine.start();

});
