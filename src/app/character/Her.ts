import { Sprite, Texture } from "pixi.js";
import { Character } from "./Character.ts";

export class Her extends Character {
	her: Sprite;
	speed: number = 4;

	constructor() {
		super();
		this.her = Sprite.from(Texture.from("her"));
	}

	get view() {
		return this.her;
	}

	init() {
		this.screenContainer.addChild(this.her);
	}

	down(deltaTime: number) {
		this.her.y += this.speed / deltaTime;
	}

	left(deltaTime: number) {
		this.her.x -= this.speed / deltaTime;
	}

	right(deltaTime: number) {
		this.her.x += this.speed / deltaTime;
	}

	up(deltaTime: number) {
		this.her.y -= this.speed / deltaTime;
	}
}
