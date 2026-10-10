import { type Container, type Texture, TilingSprite } from "pixi.js";
import { wallpapers } from "../sprites/Sprites";

/**
 * Always renders 2 blocks
 * The default anchor position is in the lower left corner.
 */
export class WallTile extends TilingSprite {
	constructor(texture: Texture) {
		super();
		this.texture = texture;
		this.scale = 4;
		this.height = this.texture.height;
		this.width = this.texture.width;
		this.anchor.set(0, 1);
	}

	updatePosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	matchPosition(container: Container) {
		this.updatePosition(container.x, container.y);
	}

	matchWidth(container: Container) {
		this.width = container.width;
	}

	/**
	 * Sets the number of rendered wall tiles.
	 * Internally the width property is adapted to accommodate the requested number of tiles
	 * @param wallTiles
	 */
	set wallTiles(wallTiles: number) {
		this.width = wallTiles * this.texture.width;
	}
}

const COLOR_COUNT = 11;

function wallpaperTile(
	col: number,
	row: number,
	width: number,
	height: number,
) {
	return new WallTile(wallpapers(col, row, width, height));
}

function colorWallpaper(col: number, row: number) {
	return {
		red() {
			return wallpaperTile(col, row, 16, 32);
		},
		orange() {
			return wallpaperTile(col + 1, row, 16, 32);
		},
		yellow() {
			return wallpaperTile(col + 2, row, 16, 32);
		},
		green() {
			return wallpaperTile(col + 3, row, 16, 32);
		},
		lightBlue() {
			return wallpaperTile(col + 4, row, 16, 32);
		},
		blue() {
			return wallpaperTile(col + 5, row, 16, 32);
		},
		violet() {
			return wallpaperTile(col + 6, row, 16, 32);
		},
		pink() {
			return wallpaperTile(col + 7, row, 16, 32);
		},
		grey() {
			return wallpaperTile(col + 8, row, 16, 32);
		},
		black() {
			return wallpaperTile(col + 9, row, 16, 32);
		},
		white() {
			return wallpaperTile(col + 10, row, 16, 32);
		},
	};
}

function colorSkirtingBoardWallpaper(col: number, row: number) {
	return {
		WHITE_SKIRTING_BOARD: colorWallpaper(7, row),
		LIGHT_BROWN_SKIRTING_BOARD: colorWallpaper(col + COLOR_COUNT, row),
		DARK_BROWN_SKIRTING_BOARD: colorWallpaper(col + 2 * COLOR_COUNT, row),
	};
}

export const WALL_TILES = {
	PLAIN: colorSkirtingBoardWallpaper(7, 0),
	PLAIN_WITH_WOOD_PANEL: colorSkirtingBoardWallpaper(7, 2),
	VERTICAL_STRIPED: colorSkirtingBoardWallpaper(7, 4),
	HORIZONTAL_STRIPED: colorSkirtingBoardWallpaper(7, 6),
	VERTICAL_HALF: colorSkirtingBoardWallpaper(7, 8),
	CIRCLES: colorSkirtingBoardWallpaper(7, 10),
	HIGHLIGHT_STRIPES: colorSkirtingBoardWallpaper(7, 12),
	WITH_GIRLAND: colorSkirtingBoardWallpaper(7, 14),
	WOOD_PANEL: {
		VERTICAL: {
			...colorWallpaper(7, 16),
			rainbow() {
				return wallpaperTile(18, 16, 32, 32);
			},
			lightWood() {
				return wallpaperTile(20, 16, 16, 32);
			},
			darkWood() {
				return wallpaperTile(21, 16, 16, 32);
			},
		},
		HORIZONTAL: {
			...colorWallpaper(7, 16),
			rainbow() {
				return wallpaperTile(18, 16, 16, 32);
			},
			blackAndWhite() {
				return wallpaperTile(19, 16, 16, 32);
			},
			lightWood() {
				return wallpaperTile(20, 16, 16, 32);
			},
			darkWood() {
				return wallpaperTile(21, 16, 16, 32);
			},
		},
	},
} as const;
