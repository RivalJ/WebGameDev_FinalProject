console.log("hello from GameConfig!");


//FIXME: get a better reference for how large the game will end up being
//for now its set to 1280x720
var config = {
  width: 1280,
  height: 720,
  backgroundColor: 0x000000,
  scene: [LoadingScene, GameScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}

window.onload = function () {
  var game = new Phaser.Game(config);
}