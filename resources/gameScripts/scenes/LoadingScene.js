console.log("LoadingScene.js loaded from html");
class LoadingScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload() {
    try {
      // this.load.image("ohioSign", "./resources/assets/ohioSign.png");
      // this.load.image("kentuckySign", "./resources/assets/kentuckySign.png");
      this.load.image("normalBurger", "./resources/assets/normalBurger.png");
      this.load.image("evilBurger", "./resources/assets/evilBurger.png");
    } catch {
      console.error("Could not load burger sprites!");
    }//load images

    try {
      this.load.audio("music", "./resources/sounds/music.mp3");
      this.load.audio("gameOver", "./resources/sounds/gameOver.mp3");
      this.load.audio("smash", "./resources/sounds/smash.mp3");
      this.load.audio("evilSmash", "./resources/sounds/evilSmash.mp3");
    } catch {
      console.error("Could not load audio!");
    }
  }

  create() {
    this.add.text(20, 20, "The game is loading!");
    this.scene.start("playGame");
  }
}