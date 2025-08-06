console.log("audioHandler loaded");
class AudioHandler{
  constructor(scene) {
    this.scene = scene;
    this.create();
  }
  create() {
    this.sound_smash = this.scene.sound.add("smash");
    this.sound_evilSmash = this.scene.sound.add("evilSmash");
    this.sound_gameOver = this.scene.sound.add("gameOver");
    this.sound_music = this.scene.sound.add("music");
    this.sound_music.loop = true;
    this.sound_music.setVolume(0.35);
  }
}
