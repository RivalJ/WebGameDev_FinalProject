console.log("LoadingScene.js loaded from html");
class LoadingScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  create() {
    this.add.text(20, 20, "The game is loading!");
    this.scene.start("playGame");
  }
}