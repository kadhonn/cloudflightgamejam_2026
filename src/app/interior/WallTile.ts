import { Texture, TilingSprite } from "pixi.js";
import { wallpapersDouble } from "../sprites/Sprites";

export enum WallType {
    RED
} 

/**
 * Always renders 2 blocks
 */
export class WallTile extends TilingSprite {
    
        constructor(wallType: WallType, x: number, y: number, width: number) {
            super();
            this.texture = this.getTexture(wallType);
            this.x = x;
            this.y = y;
            this.width = width*16*4;
            this.height = 32*4;
            this.tileScale = 4;
        }
    
        public updatePosition(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    
        private getTexture(wallType: WallType): Texture {
            switch(wallType) {
                case WallType.RED: {
                    return wallpapersDouble(7, 0);
                }
                default: {
                    throw Error("Unsupported walltype")
                }
            }
        }
}