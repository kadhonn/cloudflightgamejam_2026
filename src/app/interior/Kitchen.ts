import { Rectangle, Sprite, type SpriteOptions, Texture } from "pixi.js";
import { dirtyDishes, kitchen } from "../sprites/Sprites";
import type { LivingRoomState } from "../story/roomstates/LivingRoomState";

const KITCHEN_TEXTURE_ROW = 0;
const KITCHEN_TEXTURE_COL = 0;

const DIRTY_DISHES_SCALE = 0.75;

const SINK_AREA = new Rectangle(
	50,
	26,
	16 * DIRTY_DISHES_SCALE,
	8 * DIRTY_DISHES_SCALE,
);

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
			x: SINK_AREA.x,
			y: SINK_AREA.y,
			scale: DIRTY_DISHES_SCALE,
		};
		this.dirtyDishesOverlay = new Sprite(dirtyDishesOverlayOptions);
		this.addChild(this.dirtyDishesOverlay);
		this.updateState(state);
	}

	public updatePosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public getSinkArea(): Rectangle {
		return new Rectangle(
			this.x + SINK_AREA.x * this.scale.x,
			this.y + SINK_AREA.y * this.scale.y,
			SINK_AREA.width * this.scale.x,
			SINK_AREA.height * this.scale.y,
		);
	}

	private getTexture(): Texture {
		return kitchen(KITCHEN_TEXTURE_ROW, KITCHEN_TEXTURE_COL);
	}

	public updateState(state: LivingRoomState) {
		if (state.kitchenState.dirtyDishes) {
			this.dirtyDishesOverlay.texture = dirtyDishes();
		} else {
			this.dirtyDishesOverlay.texture = new Texture();
		}
	}
}
