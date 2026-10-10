import { Sprite, type SpriteOptions, Texture } from "pixi.js";
import { dirtyDishes, kitchen } from "../sprites/Sprites";
import type { LivingRoomState } from "../story/roomstates/LivingRoomState";

const KITCHEN_ROW = 0;
const KITCHEN_COL = 0;

export type KitchenUpdateDelegate = (state: LivingRoomState) => void;

export class Kitchen extends Sprite {
	private dirtyDishesOverlay: Sprite;

	constructor(state: LivingRoomState, x: number, y: number) {
		super();
		this.texture = this.getTexture();
		this.x = x;
		this.y = y;
		this.scale.set(4);
		var dirtyDishesOverlayOptions: SpriteOptions = {
			x: 50,
			y: 26,
			scale: 0.75,
		};
		this.dirtyDishesOverlay = new Sprite(dirtyDishesOverlayOptions);
		this.addChild(this.dirtyDishesOverlay);
		this.updateState(state);
	}

	public updatePosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	private getTexture(): Texture {
		return kitchen(KITCHEN_ROW, KITCHEN_COL);
	}

	public updateState(state: LivingRoomState) {
		if (state.dirtyDishes) {
			this.dirtyDishesOverlay.texture = dirtyDishes();
		} else {
			this.dirtyDishesOverlay.texture = new Texture();
		}
	}
}
