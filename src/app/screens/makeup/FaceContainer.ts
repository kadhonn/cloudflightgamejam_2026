import {
    Assets,
    CanvasSource,
    Container,
    type ContainerOptions,
    Sprite,
    Texture,
} from "pixi.js";


export type Mask = { label: string, assetName: string }
export const MASKS: Mask[] = [
    {label: "Lips", assetName: "mask_lips.png"},
    {label: "Eye Circles", assetName: "mask_eyecircles.png"},
    {label: "Hair", assetName: "mask_hair.png"},
]

type AppliedMask = { color: string, masks: Mask[] }

export class FaceContainer extends Container {
    public imageSource: CanvasSource;
    public appliedMasks: AppliedMask[] = [];
    public currentMaskChosen: Mask[] = [];

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
        sprite.interactive = true;
        sprite.on("click", () => this.removeUpperMask());
        this.addChild(sprite);

    }

    red() {
        this.applyCurrentMasks("#ff0000");
    }

    blue() {
        this.applyCurrentMasks("#0000ff");
    }

    chosenMask(mask: Mask) {
        if (this.currentMaskChosen.indexOf(mask) === -1) {
            this.currentMaskChosen.push(mask);
            this.updatePicture();
        }
    }

    resetMasks() {
        this.currentMaskChosen = [];
        this.appliedMasks = [];
        this.resetPicture();
        this.updateImageSource();
    }

    private getContext2D() {
        return this.imageSource.context2D as any as OffscreenCanvasRenderingContext2D;
    }

    private getFaceImageBitmap(): ImageBitmap {
        return this.getImageBitmap("face.png");
    }

    private getImageBitmap(assetName: string) {
        return Assets.get(assetName).source.resource;
    }

    private updatePicture() {
        if (!this.currentMaskChosen) {
            return;
        }
        this.resetPicture();


        let allMasksCanvas = new OffscreenCanvas(128, 128);
        let allMasksContext = allMasksCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

        for (let appliedMask of this.appliedMasks) {
            let appliedMaskCanvas = new OffscreenCanvas(128, 128);
            let appliedMaskContext = appliedMaskCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
            for (let mask of appliedMask.masks) {
                appliedMaskContext.drawImage(this.getImageBitmap(mask.assetName), 0, 0)
            }
            appliedMaskContext.globalCompositeOperation = "xor";
            appliedMaskContext.fillRect(0, 0, 128, 128)
            appliedMaskContext.globalCompositeOperation = "source-in";
            appliedMaskContext.fillStyle = appliedMask.color;
            appliedMaskContext.fillRect(0, 0, 128, 128)

            allMasksContext.drawImage(appliedMaskCanvas, 0, 0, 128, 128);
        }

        let ctx = this.getContext2D();

        allMasksContext.globalCompositeOperation = "destination-in";
        allMasksContext.drawImage(ctx.canvas, 0, 0);

        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(allMasksCanvas, 0, 0)
        ctx.restore();

        let currentChosenMaskCanvas = new OffscreenCanvas(128, 128);
        let currentChosenContext = currentChosenMaskCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
        for (let mask of this.currentMaskChosen) {
            currentChosenContext.drawImage(this.getImageBitmap(mask.assetName), 0, 0)
        }
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.drawImage(currentChosenMaskCanvas, 0, 0)
        ctx.restore();

        this.updateImageSource();
    }

    private updateImageSource() {
        this.imageSource.update()
    }

    private removeUpperMask() {
        if (this.currentMaskChosen.length !== 0) {
            this.currentMaskChosen.pop();
            this.updatePicture();
        }
    }

    private resetPicture() {
        let ctx = this.getContext2D();
        ctx.clearRect(0, 0, 128, 128);
        ctx.drawImage(this.getFaceImageBitmap(), 0, 0);
    }

    private applyCurrentMasks(color: string) {
        this.appliedMasks.push({color, masks: [...this.currentMaskChosen]});
        this.updatePicture();
    }
}
