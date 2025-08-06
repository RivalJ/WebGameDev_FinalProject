import { FireStoreDBCarrier } from "./FireBaseSetup.js";
import { collection, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export class DataBase {
  constructor() {
    this.fireStoreInstance = new FireStoreDBCarrier();
    this.db = this.fireStoreInstance.db_fireStore; //gets the database from the firestore carrier
    this.highScores = []; //stores all of our high scores
    this.dataReady;
    // ^^ used to make sure that we don't try to use our data until it has been retrieved
    this.updateScores();
    // ^^ the function actually responsible for getting data from the database
  }

  async uploadScoreToDB(score, username, entryToReplace = null) {
    await this.dataReady; //wait for the data to be ready
    var isNewScore = true; //is the entry a new one?

    for (const entry of this.highScores) {//for each entry in our list of scores
      if (entry.name == username && entry.score == score) { //if there is an exact copy
        isNewScore = false; //we are not adding a new score
        break;// exit the loop early, to save time and resources
      }
    }

    if (isNewScore) {
      try {
        const dbCollection = collection(this.db, "highScores");//get our collection of data

        let dbDocRef = null;
        if (entryToReplace != null) {
          dbDocRef = doc(dbCollection, entryToReplace.id);//get our document reference
          //^^ this version of the doc ref get's a specific one based on the ID of our entry to replace
        } else {
          dbDocRef = doc(dbCollection);//get our document reference
        }

        setDoc(dbDocRef, {
          playerName: username,
          playerScore: score
        });//try to add the values to the document

        console.log("score added to database");

        this.updateScores();

      } catch (error) {
        console.error("score could not be added to database");
        console.error(error);

      }
    } else {
      console.warn(`attempted to add already existing score. \n name: ${username} \n score: ${score}`);
    }
  }

  async updateScores() {
    this.dataReady = this.retrieveScoresFromDB();
  }

  async retrieveScoresFromDB() {
    this.highScores = [];
    try {
      const dbCollection = collection(this.db, "highScores");//get our collection of data
      const dbDocuments = await getDocs(dbCollection);//get all of the documents in our collection

      dbDocuments.forEach(doc => {//for each document in the collection
        var scoreObject = doc.data();//attach its data to a temporary object

        this.highScores.push({
          id: doc.id,
          name: scoreObject.playerName,
          score: scoreObject.playerScore
        });//add it to our list of scores
      });
      console.log("scores loaded from database");
    } catch (error) {
      console.error("could not get scores from database");
      console.error(error);
    }
  }

  async printScoresToConsole() {
    await this.dataReady;

    this.highScores.forEach(entry => {
      console.log(`id: ${entry.id} \n  username: ${entry.name} \n  score: ${entry.score}`);
    });
  }
}