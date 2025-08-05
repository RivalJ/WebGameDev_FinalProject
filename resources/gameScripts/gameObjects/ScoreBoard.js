class ScoreBoard{
  constructor(scene) {
    this.scene = scene;
    this.scoreHandler = null;

    this.dimensions;
    this.background;


    this.create();
  }
  create() {
    this.dimensions = this.getScoreBoardDimensions();
    this.scoreHandler = new ScoreHandler();
    this.debug_testScoreHandler();//FIXME: remove this when testing is done
  }

  async openScoreBoard() {
    this.drawBackground();

    await this.scoreHandler.dbLoaded;//wait for the scorehandler to be ready
    await this.scoreHandler.getScoreList();//wait for our score list to be ready

    //console.log("score board values: ", this.scoreHandler.scoreList);//used for debugging

    this.scoreHandler.scoreList.forEach((player, index) => {
      this.drawLeftText(player.name, index);
      this.drawRightText(player.score, index);
    });
  }
  hideScoreBoard() {
    this.background.destroy();
  }

  debug_testScoreHandler() {
    this.scoreHandler.addScore(200, "Rival");
    this.scoreHandler.getScoreList();
  }
  getScoreBoardDimensions() {
    let topLeft = {
      x: this.scene.scale.width / 5,
      y: this.scene.scale.height / 15
    }
    let bottomRight = {
      x: this.scene.scale.width - topLeft.x,
      y: this.scene.scale.height - topLeft.y
    }
    let width = bottomRight.x - topLeft.x;
    let height = bottomRight.y - topLeft.y;
    return {
      topLeft: topLeft,
      bottomRight: bottomRight,
      width: width,
      height: height
    }
  }
  drawBackground() {

    this.background = this.scene.add.container(this.dimensions.topLeft.x, this.dimensions.topLeft.y);
    let backgroundGraphic = this.scene.add.graphics();
    backgroundGraphic.fillStyle(0x000000, 1);
    backgroundGraphic.lineStyle(2, 0xFFFFFF, 1);
    //setup the background

    backgroundGraphic.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    backgroundGraphic.strokeRect(0, 0, this.dimensions.width, this.dimensions.height);
    backgroundGraphic.setDepth(99);

    this.background.add(backgroundGraphic);
    this.background.setDepth(100);
  }
  drawLeftText(text, index) {
    text = text.toString();//make sure text is a string
    let fontSize = 24;//get fontsize
    let currentTextSpacing = fontSize * (index * (fontSize/10));//calculate spacing
    let textObject = this.scene.add.text(fontSize, currentTextSpacing + fontSize, text);//create object
    textObject.setFontSize(fontSize);//set font size
    textObject.setColor("#FFFFFF");//make the text white
    this.background.add(textObject);//add it to our container
  }
  drawRightText(text, index) {
    text = text.toString();
    let fontSize = 24;
    let currentTextSpacing = fontSize * (index * (fontSize / 10));
    let stringSizeOffset = text.length * fontSize;//used to set the text to the right of the screen
    let textObject = this.scene.add.text(this.dimensions.width - stringSizeOffset, currentTextSpacing + fontSize, text);
    textObject.setFontSize(fontSize);
    textObject.setColor("#FFFFFF");//make the text white
    this.background.add(textObject);
  }
}