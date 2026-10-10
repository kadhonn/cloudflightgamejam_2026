import { Sprite } from "pixi.js";

import {
	randomBool,
	randomFloat,
	randomInt,
} from "../../../engine/utils/random.ts";
import { wallpapers } from "../../sprites/Sprites.ts";

export enum DIRECTION {
	NE,
	NW,
	SE,
	SW,
}

export class Logo extends Sprite {
	public direction!: DIRECTION;
	public speed!: number;

	get left() {
		return -this.width * 0.5;
	}

	get right() {
		return this.width * 0.5;
	}

	get top() {
		return -this.height * 0.5;
	}

	get bottom() {
		return this.height * 0.5;
	}

	constructor() {
		const tex = randomBool() ? wallpapers(12, 26) : wallpapers(9, 26);
		super({ texture: tex, anchor: 0.5, scale: 4 });
		this.direction = randomInt(0, 3);
		this.speed = randomFloat(1, 6);
	}
}
