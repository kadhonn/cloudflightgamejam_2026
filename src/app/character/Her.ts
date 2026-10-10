import { Sprite, Texture } from "pixi.js";
import { Character } from "./Character.ts";

export class Her extends Character {
	her: Sprite;
	speed: number = 1;

	constructor() {
		super();
		this.her = Sprite.from(Texture.from("her"));
	}

	async init() {
		this.screenContainer.addChild(this.her);
	}

	async down(deltaTime: number) {
		this.her.y += this.speed / deltaTime;
	}

	async left(deltaTime: number) {
		this.her.x -= this.speed / deltaTime;
	}

	async right(deltaTime: number) {
		this.her.x += this.speed / deltaTime;
	}

	async up(deltaTime: number) {
		this.her.y -= this.speed / deltaTime;
	}
}
