import { Assets, Rectangle, Texture } from "pixi.js";

export function wallpapers(
	col: number,
	row: number,
	width: number = 16,
	height: number = 16,
): Texture {
	return loadTextureFromAsset(
		"wallpapers.png",
		width,
		height,
		col,
		row,
		16,
		16,
	);
}

// kitchen lookup constants
const KITCHEN_SHEET_WIDTH = 608;
const KITCHEN_ROW_HEIGHT = 48;
const KITCHEN_TOP_PADDING = 6;
const KITCHEN_COLUMN_STARTS = [
	[0, 128, 256, 400],
	[0, 128, 256, 400],
	[0, 128, 256, 384, 496],
	[0, 128, 256, 384, 496],
];

export function kitchen(row: number, col: number): Texture {
	const columnStarts = KITCHEN_COLUMN_STARTS[row];
	const x = columnStarts?.[col];
	if (x === undefined) {
		throw Error(`No kitchen at row ${row}, column ${col}`);
	}
	const width = (columnStarts[col + 1] ?? KITCHEN_SHEET_WIDTH) - x;
	const y = row * KITCHEN_ROW_HEIGHT + KITCHEN_TOP_PADDING;
	const height = KITCHEN_ROW_HEIGHT - KITCHEN_TOP_PADDING;
	return loadTextureFromRect("kitchens_assembled.png", x, y, width, height);
}

/** Inside of the sink (16x8px, excluding its black rim) of the messy kitchen in Messy_Furniture_16x16.png. */
export function dirtyDishes(): Texture {
	return loadTextureFromRect("Messy_Furniture_16x16.png", 24, 240, 16, 8);
}

/** Open pizza box, 4th from the left in the last row of Messy_Furniture_16x16.png. */
export function pizzaBox(): Texture {
	return loadTextureFromRect("Messy_Furniture_16x16.png", 114, 277, 26, 23);
}

/** Green beer bottle, 4th from the right in the last row of Messy_Furniture_16x16.png. */
export function beerBottle(): Texture {
	return loadTextureFromRect("Messy_Furniture_16x16.png", 340, 288, 6, 16);
}

/** Whiskey bottle, 2nd from the right in the last row of Messy_Furniture_16x16.png. */
export function whiskeyBottle(): Texture {
	return loadTextureFromRect("Messy_Furniture_16x16.png", 371, 288, 8, 15);
}

// door lookup constants
const DOOR_CELL_WIDTH = 48;
export const DOOR_CELL_HEIGHT = 32;
export const DOOR_WIDTH = 24;
const DOOR_ROW = 0;
const DOOR_CLOSED_COL = 21;
const DOOR_OPEN_COL = 23;

export function doorClosed(): Texture {
	return door(DOOR_ROW, DOOR_CLOSED_COL);
}

export function doorOpen(): Texture {
	return door(DOOR_ROW, DOOR_OPEN_COL);
}

function door(row: number, col: number): Texture {
	const x = col * DOOR_CELL_WIDTH + (DOOR_CELL_WIDTH - DOOR_WIDTH) / 2;
	const y = row * DOOR_CELL_HEIGHT;
	return loadTextureFromRect("doors.png", x, y, DOOR_WIDTH, DOOR_CELL_HEIGHT);
}


export const TABLE_WIDTH = 20;
export const TABLE_HEIGHT = 28;

export function tableVertical(): Texture {
	return loadTextureFromRect("tables.png", 294, 52, TABLE_WIDTH, TABLE_HEIGHT);
}

export function couchTable(): Texture {
	return loadTextureFromRect("couchtables.png", 97, 92, 13, 20);
}

export function loadTextureFromAsset(
	asset: string,
	width: number,
	height: number,
	col: number,
	row: number,
	gridWidth: number = width,
	gridHeight: number = height,
) {
	return loadTextureFromRect(asset, col * gridWidth, row * gridHeight, width, height);
}

function loadTextureFromRect(
	asset: string,
	x: number,
	y: number,
	width: number,
	height: number,
) {
	const texture = new Texture({
		source: Assets.get(asset),
		frame: new Rectangle(x, y, width, height),
	});
	texture.source.scaleMode = "nearest"; // we want to keep the pixelated art style
	return texture;
}
