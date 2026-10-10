import {Container, type ContainerOptions, Graphics, Sprite} from "pixi.js";

enum Masks {
    CIRCLE,
    SQUARE,
}

export class FaceContainer extends Container {

    public sprite: Sprite;
    public masks: Graphics[];
    public currentMaskChosen: Masks | null = null;

    constructor(options?: ContainerOptions<Container>) {
        super(options);

        this.sprite = Sprite.from("face.png");
        this.sprite.anchor = 0.5;
        this.sprite.scale = 6;
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.addChild(this.sprite);

        this.masks = [];
    }

    red() {
        this.paintCurrentMask(0xff0000);
    }

    blue() {
        this.paintCurrentMask(0x0000ff);
    }

    resetMasks() {
        for (let mask of this.masks) {
            this.removeChild(mask);
        }
        this.masks = [];
    }

    private addMask(graphics: Graphics) {
        this.masks.push(graphics);
        this.addChild(graphics);
    }

    square() {
        this.currentMaskChosen = Masks.SQUARE;
    }

    circle() {
        this.currentMaskChosen = Masks.CIRCLE;
    }

    private paintCurrentMask(color: number) {
        if (this.currentMaskChosen === Masks.CIRCLE) {
            this.addMask(new Graphics().circle(0, 0, 60,).fill(color));
        } else if (this.currentMaskChosen === Masks.SQUARE) {
            this.addMask(new Graphics().rect(-50, -50, 100, 100).fill(color));
        }
    }
}
