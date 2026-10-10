import { Assets, Rectangle, Texture } from "pixi.js";

export function wallpapers(col: number, row: number): Texture {
	return loadTextureFromAsset("wallpapers.png", 16, 16, col, row);
}

function loadTextureFromAsset(
	asset: string,
	width: number,
	height: number,
	col: number,
	row: number,
) {
	const x = col * width;
	const y = row * height;

	const texture = new Texture({
		source: Assets.get(asset),
		frame: new Rectangle(x, y, width, height),
	});
	texture.source.scaleMode = "nearest"; //TODO ???
	return texture;
}
