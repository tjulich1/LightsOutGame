var ASSET_MANAGER = new AssetManager();
var TILE_LOADER = new TileLoader();
var PMH = new PlayerMovementHandler();

ASSET_MANAGER.queueDownload("./img/TestTileSheet.png");
ASSET_MANAGER.queueDownload("./img/mainCharacter_move.png");

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

    var mainChar = ASSET_MANAGER.getAsset("./img/mainCharacter_move.png")
    var mainCharacter = new Player(gameEngine, 30, 30, 64, 64, mainChar);
    PMH.assignPlayer(mainCharacter);

    // main character sprite properties: height = 64 width = 64 
    PMH.setContext(gameEngine);

    gameEngine.setMovementHandler(PMH);
    gameEngine.addEntity(testWorld);
    gameEngine.addEntity(mainCharacter);


    gameEngine.start();

});
