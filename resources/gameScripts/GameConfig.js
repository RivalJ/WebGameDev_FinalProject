console.log("hello from GameConfig!");

const input_username = document.getElementById("username");
const btn_submitUsername = document.getElementById("username-submit");
const div_startScreen = document.getElementById("startScreen");

// const geoLocation = new GeoLocation();
// geoLocation.getLocation();
//FIXME: get a better reference for how large the game will end up being
//for now its set to 1280x720
var config = {
  width: 1280,
  height: 720,
  backgroundColor: 0x000000,
  scene: [LoadingScene, GameScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}

btn_submitUsername.addEventListener("click", function () {
  window.username = input_username.value;
  if (username.length > 0 && username != null) {
    //console.log(input_username.value);
    var game = new Phaser.Game(config);
    div_startScreen.style.display = "none";
  } else {
    btn_submitUsername.innerHTML = "You must input a username to play!";
    console.warn("no username input, input a real username");
  }
});
