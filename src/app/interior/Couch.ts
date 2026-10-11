import { Container, Sprite } from "pixi.js";
import { couch } from "../sprites/Sprites";

export class Couch extends Container {
	constructor() {
		super();
		this.scale.set(4);
		this.addChild(Sprite.from(couch()));
	}
}
