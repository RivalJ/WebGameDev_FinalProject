console.log("LoadingScene.js loaded from html");
class LoadingScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload() {
    try {
      this.load.image("normalBurger", "./resources/assets/normalBurger.jpg");
      this.load.image("evilBurger", "./resources/assets/evilBurger.jpg");
    } catch {
      console.error("Could not load burger sprites!");
    }
  }

  create() {
    this.add.text(20, 20, "The game is loading!");
    this.scene.start("playGame");
  }
}