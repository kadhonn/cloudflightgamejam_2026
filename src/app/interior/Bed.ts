import { Container, Sprite } from "pixi.js";
import { bedBottom, bedTop } from "../sprites/Sprites";
import type { BedState } from "../story/entitystates/BedState.ts";

export type BedUpdateDelegate = (state: BedState) => void;

export class Bed extends Container {
	constructor(state: BedState, x: number, y: number) {
		super();

		this.x = x;
		this.y = y;
		this.scale.set(4);
		this.updateState(state);
		this.addChild(Sprite.from(bedBottom()));
		this.addChild(Sprite.from(bedTop()));
	}

	public updatePosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public updateState(state: BedState) {}
}
