class Burger extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, isEvil = false) {
      super(scene, x, y, null);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.isEvil = isEvil;
        this.evilTimer = 0;
        this.burgerSprite = null;

        this.create();
    }

    create() {
        // Load the correct sprite based on whether the burger is evil or not
        this.burgerSprite = this.scene.add.sprite(
            this.x,
            this.y,
            this.isEvil ? 'evilBurger' : 'normalBurger'
        );

        this.burgerSprite.setOrigin(0.5);

        if (this.isEvil) {
            this.evilTimer = 5; // seconds
        }

        // Enable click interaction
        this.burgerSprite.setInteractive();
        this.burgerSprite.on('pointerdown', () => this.onClick());

      //FIXME: currently the scale is set to 0.1 because otherwise the images are too large
      //someone will need to go in and edit the images to be something like 100 by 100 pixels in size, they should also be PNG images
      this.burgerSprite.setScale(0.10);
    }

    update(deltaTime) {
        if (this.isEvil) {
            this.evilTimer -= deltaTime / 1000;

            if (this.evilTimer <= 0) {
                this.isEvil = false;
                this.burgerSprite.setTexture('normalBurger');
            }
        }
    }

    onClick() {
        if (this.isEvil) {
          this.scene.events.emit("damagePlayer");

        } else {
          this.scene.events.emit("increaseScore");

        }

        this.burgerSprite.destroy(); // remove burger from screen
    }
}
