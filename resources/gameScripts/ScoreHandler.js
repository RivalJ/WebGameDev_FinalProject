//FIXME: scorelist does not update properly after being changed. the page needs to be reloaded for the changes to be visible, try to fix this

class ScoreHandler {
  constructor() {
    this.dbInstance = null;
    this.dbLoaded = this.getImport();
    this.scoreList = [];//used to store a copy of the database scores here;
    this.scoreListLoaded = null;
    //this.DEBUG_test(); //used to print the dbInstance version of the scorelist, used to make sure that dbInstance was imported properly
  }

  async getImport() {
    console.log("importing db class");
    await import("../generalScripts/DataBase.js").then(module => {
      this.dbInstance = new module.DataBase();
      console.log(this.dbInstance);
    }).catch(error => {
      console.error("database failed to import to scorehandler");
      console.error(error);
    });
  }
  async updateScoreList() {
    await this.dbLoaded;
    await this.dbInstance.dataReady;

    this.scoreList = this.dbInstance.highScores; //copy the dbInstance of the score list to this class
    this.scoreList.sort((a, b) => b.score - a.score);//sort the list in descending order based on score
  }
  async getScoreList() {
    this.scoreListLoaded = this.updateScoreList();
    await this.scoreListLoaded;
    console.log(this.scoreList);
  }
  async addScore(newScore, username) {
    await this.dbLoaded;
    await this.scoreListLoaded;
    //console.log(`scorelist loaded, current list: \n `, this.scoreList);//used for debugging

    const lowerThanNewScore = this.scoreList.filter(entry => {
      //console.log(`checking score: ${entry.score} against: ${newScore}`);
      return entry.score < newScore;
    });//get a list of entries with scores lower than the new one
    //console.log(lowerThanNewScore);

    if (lowerThanNewScore.length > 0) {
      const highestEntry = lowerThanNewScore.reduce((accumulator, currentValue) => {
        return currentValue.score > accumulator.score ? currentValue : accumulator;
      });
      console.log(`the highest score that you beat is: ${highestEntry.score}`)

      const entryToReplace = highestEntry;
      this.dbInstance.uploadScoreToDB(newScore, username, entryToReplace);

    } else {
      console.log("no highscore detected");

    }
  }

  async DEBUG_test() {
    await this.dbLoaded;

    try {
      this.dbInstance.uploadScoreToDB(10, "Rival");
      this.dbInstance.uploadScoreToDB(999, "John Burger");
      this.dbInstance.uploadScoreToDB(120, "Jane Burger");
      this.dbInstance.uploadScoreToDB(400, "Evil Martian");
      this.dbInstance.uploadScoreToDB(345, "Not Evil Martian");
      this.dbInstance.uploadScoreToDB(678, "Slightly Evil Martian");
      this.dbInstance.uploadScoreToDB(893, "Steve, from Minecraft");
      await this.dbInstance.updateScores();
      await this.dbInstance.printScoresToConsole();
      console.log("test complete");

    } catch (error) {
      console.error("test failed");
      console.error(error);
    }

  }
}

const scoreHandler = new ScoreHandler();

scoreHandler.addScore(200, "Rival");

scoreHandler.getScoreList();
