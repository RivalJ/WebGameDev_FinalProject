console.log("GameScene.js loaded from html");
class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  create() {
    this.add.text(20, 20, "The game has loaded!");
  }
}