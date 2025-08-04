console.log("GameScene.js loaded from html");
class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {
    //load the score handler
  }

  create() {
    this.add.text(20, 20, "The game has loaded!");

    this.burgers = [];

    // Example: create a burger at x=200, y=200

    this.burgers.push(new Burger(this, 200, 200, Math.random() > 0.5));
  }

  update(time, delta) {
    for (const burger of this.burgers) {
      burger.update(delta);
    }
  }
}