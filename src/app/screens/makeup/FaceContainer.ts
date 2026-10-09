import {Container, ContainerOptions, Graphics, Sprite} from "pixi.js";

export class FaceContainer extends Container {

    public sprite: Sprite;

    constructor(options?: ContainerOptions<Container>) {
        super(options);

        this.sprite = Sprite.from("face.png");
        this.sprite.anchor = 0.5;
        this.sprite.scale = 6;
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.addChild(this.sprite);
    }

    red() {
        this.addChild(
            new Graphics()
                .rect(-50, -50, 100, 100)
                .fill(0xff0000)
        );
    }
}