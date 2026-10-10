import { Graphics, Sprite, type SpriteOptions, type Texture } from "pixi.js";
import { TABLE_HEIGHT, tableVertical } from "../sprites/Sprites";
import type { TableState } from "../story/entitystates/TableState";

export type TableUpdateDelegate = (state: TableState) => void;

const NOTE_WIDTH = 25;
const NOTE_HEIGHT = 25;

export class Table extends Sprite {
	private noteOverlay: Sprite;

	constructor(state: TableState, x: number, y: number) {
		super();
		this.texture = this.getTexture();
		this.x = x;
		this.y = y;
		this.scale.set(4);
		const noteOverlayOptions: SpriteOptions = {
			x: NOTE_WIDTH / 2,
			y: TABLE_HEIGHT / 2 - NOTE_HEIGHT / 2,
		};
		this.noteOverlay = new Sprite(noteOverlayOptions);
		this.addChild(this.noteOverlay);
		this.updateState(state);
	}

	public updatePosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	private getTexture(): Texture {
		return tableVertical();
	}

	public updateState(state: TableState) {
		if (state.hasNote && state.noteText) {
			const noteGraphics = new Graphics()
				.rect(0, 0, NOTE_WIDTH, NOTE_HEIGHT)
				.fill("yellow");
			this.noteOverlay.addChild(noteGraphics);
		} else {
			this.noteOverlay.removeChildren();
		}
	}
}
