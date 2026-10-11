import {
	Container,
	type ContainerOptions,
	Sprite,
	type Texture,
} from "pixi.js";
import { tvOff, tvOn } from "../sprites/Sprites";
import type { TVState } from "../story/entitystates/TVState";

export type TVUpdateDelegate = (state: TVState) => void;

export class TV extends Sprite {
	private isTVOn: boolean = false;

	constructor(state: TVState, x: number, y: number) {
		super();
		this.texture = this.getTexture();
		this.x = x;
		this.y = y;
		this.scale.set(2);
		this.updateState(state);
	}

	public updatePosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	private getTexture(): Texture {
		return this.isTVOn ? tvOn() : tvOff();
	}

	public updateState(state: TVState) {
		this.isTVOn = state.isTVOn;
		this.texture = this.getTexture();
	}
}
