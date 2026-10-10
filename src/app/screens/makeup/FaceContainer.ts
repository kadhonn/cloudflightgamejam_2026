import {
    Assets,
    CanvasSource,
    Container,
    type ContainerOptions,
    Sprite,
    Texture,
} from "pixi.js";

enum Masks {
    CIRCLE,
    SQUARE,
}

export class FaceContainer extends Container {
    public imageSource: CanvasSource;
    public currentMaskChosen: Masks | null = null;

    constructor(options?: ContainerOptions<Container>) {
        super(options);

        this.imageSource = new CanvasSource({
            resource: new OffscreenCanvas(128, 128)
        });
        this.imageSource.scaleMode = "nearest";
        this.resetMasks();
        let sprite = Sprite.from(Texture.from(this.imageSource));
        sprite.anchor = 0.5;
        sprite.scale = 6;
        sprite.x = 0;
        sprite.y = 0;
        this.addChild(sprite);
    }

    red() {
        this.paintCurrentMask("#ff0000");
    }

    blue() {
        this.paintCurrentMask("#0000ff");
    }

    square() {
        this.currentMaskChosen = Masks.SQUARE;
    }

    circle() {
        this.currentMaskChosen = Masks.CIRCLE;
    }

    resetMasks() {
        let ctx = this.getContext2D();
        ctx.clearRect(0, 0, 128, 128);
        ctx.drawImage(this.getFaceImageBitmap(), 0, 0);
        this.update();
    }

    private getContext2D() {
        return this.imageSource.context2D;
    }

    private getFaceImageBitmap(): ImageBitmap {
        return this.getImageBitmap("face.png");
    }

    private getImageBitmap(assetName: string) {
        return Assets.get(assetName).source.resource;
    }

    private paintCurrentMask(color: string) {
        let ctx = this.getContext2D();
        ctx.fillStyle = color;
        if (this.currentMaskChosen === Masks.CIRCLE) {
            ctx.beginPath();
            ctx.arc(64, 64, 30, 0, 2 * Math.PI);
            ctx.fill()
        } else if (this.currentMaskChosen === Masks.SQUARE) {
            console.log("painting square color " + color);
            ctx.fillRect(0, 0, 50, 50);
        }
        this.update();
    }

    private update() {
        this.imageSource.update()
    }
}
