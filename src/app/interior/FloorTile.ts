import { type Texture, TilingSprite } from "pixi.js";
import { wallpapers } from "../sprites/Sprites";

export enum FloorType {
	WOODEN,
}

export class FloorTile extends TilingSprite {
	constructor(floorType: FloorType) {
		super();
		this.texture = this.getTexture(floorType);
		this.scale = 4;
		this.width = this.texture.width;
		this.height = this.texture.height;
	}

	updatePosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Sets the number of horizontally rendered floor tiles.
	 * Internally the width property is adapted to accommodate the requested number of tiles
	 * @param horizontalTiles
	 */
	set horizontalTiles(horizontalTiles: number) {
		this.width = horizontalTiles * this.texture.width;
	}

	/**
	 * Sets the number of vertically rendered floor tiles.
	 * Internally the height property is adapted to accommodate the requested number of tiles
	 * @param verticalTiles
	 */
	set verticalTiles(verticalTiles: number) {
		this.height = verticalTiles * this.texture.height;
	}

	private getTexture(floorType: FloorType): Texture {
		switch (floorType) {
			case FloorType.WOODEN: {
				return wallpapers(9, 36);
			}
			default: {
				throw Error("Unsupported floortype");
			}
		}
	}
}
