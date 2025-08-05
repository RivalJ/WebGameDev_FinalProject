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

    this.scoreBoard = null;

    this.burgers = [];
    this.playerScore = 0;
    this.playerHealth = 3;
    this.healthIndicator;

    this.username = window.username;
    // ^^ probs not the best way to do this, but we have deadlines, so if it works it works.

    this.gameActive = true;
    this.gameOver = false;
    this.gameIdle = false;
  }
  preload() {
    this.scoreBoard = new ScoreBoard(this);
    this.geoLocation = new GeoLocation();
  }

  create() {
    console.log(this.username);//FIXME: delete when testing is done
    this.playerScore = 0;

    this.healthIndicator = this.add.text(20, 20, this.playerHealth);

    this.events.on("damagePlayer", this.listener_onClickEvilBurger.bind(this));
    this.events.on("increaseScore", this.listener_onClickNormalBurger.bind(this));

    this.audioHandler = new AudioHandler(this);
    this.audioHandler.sound_music.play();
  }

  update(time, delta) {
    if (this.playerHealth > 0) {
      this.gameActive = true;
      this.gameOver = false;
      this.gameIdle = false;
    } else if (this.playerHealth <= 0 && !this.gameIdle) {
      this.gameActive = false;
      this.gameOver = true;
      this.gameIdle = false;
    }//toggle the game state based on player health

    if (this.gameOver) {
      this.gameActive = false;
      this.gameOver = false;
      this.gameIdle = true;

      this.endGame();
    }//toggle the game state to idle so that "gameover" only happens once

    if (this.gameActive) {
      this.update_handleBurgers(time, delta);
    } else {
      //when player health reaches 0, delete all burgers and show the scoreboard, the player can then click to restart the game
    }
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
    if (value < 0) {
      if (this.playerScore > 0) {
        this.playerScore += value;
      }//ensures the player score does not go below 0
    } else {
      this.playerScore += value;
    }
    //console.log(`player score: ${this.playerScore}`);//used for debug
  }
  async endGame() {
    this.audioHandler.sound_music.stop();
    this.audioHandler.sound_gameOver.play();//stop the music and play the game over sound

    if (!this.gameActive && this.gameIdle) {
      this.burgers.forEach((object, objectIndex) => {
        object.burgerSprite.destroy();
      });//clear all burger sprites
      this.burgers = [];//empty the array

      await this.scoreBoard.scoreHandler.addScore(this.playerScore, this.username);

      await this.scoreBoard.openScoreBoard();//open the scoreboard

      this.input.once('pointerdown', function (pointer) {
        this.scoreBoard.hideScoreBoard();
        this.restartGame();
      }, this);//when the player clicks, the game starts again

    }//should prevent this method from accidentally being called more than once
  }
  restartGame() {
    this.playerHealth = 3;//reset player health
    this.healthIndicator.setText(this.playerHealth);//update the indicator
    this.playerScore = 0;//reset player score

    this.gameActive = true;
    this.gameIdle = false;
    this.gameOver = false;//reset the game state

    this.audioHandler.sound_gameOver.stop();
    this.audioHandler.sound_music.play();//start the music again
  }
  coinFlip() {
    return Math.random() > 0.5;
  }// 50/50 chance to return true or false

  update_handleBurgers(time, delta) {
    //burger creation
    if (this.burgers.length < 20) {

      let randomPosition = this.getRandomPosition(8);

      let burger = new Burger(this, randomPosition.x, randomPosition.y, this.coinFlip());

      //burger.burgerSprite.setScale(0.10);

      this.burgers.push(burger);

    } else {
      //console.log("max number of burgers reached");//used for debugging
    }


    //burger state checking and updating
    this.burgers.forEach((object, objectIndex) => {//for each object in burgers[]
      object.update(time / 1000);

      if (object.burgerSprite.scene == null) {
        this.burgers.splice(objectIndex, 1);
      }
    });
  }

  listener_onClickEvilBurger() {
    this.modifyPlayerScore(-15);
    this.playerHealth--;
    console.log(this.playerHealth);
    this.healthIndicator.setText(this.playerHealth);
    this.audioHandler.sound_evilSmash.play();
  }
  listener_onClickNormalBurger() {
    this.modifyPlayerScore(15);
    this.audioHandler.sound_smash.play();
  }
}