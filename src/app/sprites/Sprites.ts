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

export function loadTextureFromAsset(
	asset: string,
	width: number,
	height: number,
	col: number,
	row: number,
	gridWidth: number = width,
	gridHeight: number = height,
) {
	const x = col * gridWidth;
	const y = row * gridHeight;

	const texture = new Texture({
		source: Assets.get(asset),
		frame: new Rectangle(x, y, width, height),
	});
	texture.source.scaleMode = "nearest"; // we want to keep the pixelated art style
	return texture;
}
