console.log("LoadingScene.js loaded from html");
class LoadingScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload() {
    try {
      this.load.image("ohioSign", "./resources/assets/ohioSign.png");
      this.load.image("kentuckySign", "./resources/assets/kentuckySign.png");

      this.load.image("normalBurger", "./resources/assets/normalBurger.png");
      this.load.image("evilBurger", "./resources/assets/evilBurger.png");
    } catch {
      console.error("Could not load burger sprites!");
    }//load images

    try {
      this.load.audio("music", ["./resources/sounds/music.mp3", "./resources/sounds/music.ogg"]);
      this.load.audio("gameOver", ["./resources/sounds/gameOver.mp3", "./resources/sounds/gameOver.ogg"]);
      this.load.audio("smash", ["./resources/sounds/smash.mp3", "./resources/sounds/smash.ogg"]);
      this.load.audio("evilSmash", ["./resources/sounds/evilSmash.mp3", "./resources/sounds/evilSmash.ogg"]);
    } catch {
      console.error("Could not load audio!");
    }
  }

  async create() {
    this.add.text(20, 20, "The game is loading!");

    const geoLocation = new GeoLocation();
    await geoLocation.apiRequest().then((value) => {

      this.location = value;
      console.log(this.location);//used for debugging
    });//gets the players location

    this.scene.start("playGame", {location: this.location});
  }
}