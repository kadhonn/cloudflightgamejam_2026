import { Texture, TilingSprite } from "pixi.js";
import { wallpapers } from "../sprites/Sprites";

export enum FloorType {
    WOODEN
} 

export class FloorTile extends TilingSprite {

    constructor(floorType: FloorType, x: number, y: number, width: number, height: number) {
        super();
        this.texture = this.getTexture(floorType);
        this.x = x;
        this.y = y;
        this.width = width*16*4;
        this.height = height*16*4;
        this.tileScale = 4;
    }

    public updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    private getTexture(floorType: FloorType): Texture {
        switch(floorType) {
            case FloorType.WOODEN: {
                return wallpapers(9, 36);
            }
            default: {
                throw Error("Unsupported floortype")
            }
        }
    }
}