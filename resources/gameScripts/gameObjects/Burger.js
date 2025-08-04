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
            this.evilTimer = 2; // seconds
        }

        // Enable click interaction
        this.burgerSprite.setInteractive();
        this.burgerSprite.on('pointerdown', () => this.onClick());
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
            console.log(" Evil burger clicked – player takes damage!");
            // doDamage(); // placeholder
        } else {
            console.log(" Normal burger clicked – score increased!");
            // increaseScore(); // placeholder
        }

        this.burgerSprite.destroy(); // remove burger from screen
    }
}
