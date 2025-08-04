console.log("GameScene.js loaded from html");

/*
  !!!!!!!!PLEASE READ!!!!!!!!
  pay attention to the text at the front of method names, these headings tell you about the intended use of the method.
  for example:

    listener_<methodName>, means that the method is intended as an event listener.
      listener_onClickEvilBurger()

    a method with no header means that it is intended to be called as is.
      getRandomPosition()
*/
class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");

    this.scoreHandler = null;
    this.burgers = [];
    this.playerScore = 0;
  }
  preload() {
    //load the score handler
  }

  create() {
    this.playerScore = 0;

    this.add.text(20, 20, "The game has loaded!");

    this.events.on("damagePlayer", this.listener_onClickEvilBurger.bind(this));
    this.events.on("increaseScore", this.listener_onClickNormalBurger.bind(this));
  }

  update(time, delta) {

    //burger creation
    if (this.burgers.length < 20) {

      let randomPosition = this.getRandomPosition(8);

      let burger = new Burger(this, randomPosition.x, randomPosition.y, true);

      //burger.burgerSprite.setScale(0.10);

      this.burgers.push(burger);

    } else {
      console.log("max number of burgers reached");//used for debugging
    }


    //burger state checking and updating
    this.burgers.forEach((object, objectIndex) => {//for each object in burgers[]
      object.update(time / 1000);

      if (object.burgerSprite.scene == null) {
        this.burgers.splice(objectIndex, 1);
      }
    });



  }

  //tolerance determines how close to the edge of the game area 
  //that the returned postion is allowed to be.
  getRandomPosition(tolerance) {
    let randomX = this.getRandomInt(
      this.scale.width / tolerance,
      (this.scale.width * (tolerance - 1)) / tolerance
    );//get a random x value within the tolerance
    let randomY = this.getRandomInt(
      this.scale.height / tolerance,
      (this.scale.height * (tolerance - 1)) / tolerance
    );//get a random y value within the tolerance
    return {
      x: randomX,
      y: randomY
    }//return the postions as an object
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }//gets a random Int between the min and max input
  modifyPlayerScore(value) {
    this.playerScore += value;
    console.log(`player score: ${this.playerScore}`);//used for debug
  }

  listener_onClickEvilBurger() {
    this.modifyPlayerScore(-15);
  }
  listener_onClickNormalBurger() {
    this.modifyPlayerScore(15);
  }
}