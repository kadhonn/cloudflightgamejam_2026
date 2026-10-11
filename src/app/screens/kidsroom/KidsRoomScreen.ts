import type { Container } from "pixi.js";
import { Bed } from "../../interior/Bed.ts";
import type { Door } from "../../interior/Door.ts";
import { FloorType } from "../../interior/FloorTile.ts";
import { WALL_TILES } from "../../interior/WallTile.ts";
import type { KidsRoomState } from "../../story/roomstates/KidsRoomState.ts";
import { storyEngine } from "../../story/storyengine/StoryEngine.ts";
import { RoomScreenBase } from "../RoomScreenBase.ts";

export class KidsRoomScreen extends RoomScreenBase {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];
	public state: KidsRoomState;

	private exitDoor!: Door;
	private bed!: Bed;

	constructor() {
		super();

		this.state = storyEngine().storyState.kidsRoomState;

		this.drawRoom();
	}

	public drawRoomEntities(container: Container) {
		this.exitDoor = this.drawDoor(this.state.exitDoorState, container, 2);
		this.addInteractableForEntity(this.exitDoor, this.state.exitDoorState);

		this.bed = new Bed(this.state.bedState, 0, 0);
		this.positionEntityOntoEntityByTile(this.bed, container, 12, 2);
	}

	public refreshEntities() {
		this.exitDoor.updateState(this.state.exitDoorState);
		this.bed.updateState(this.state.bedState);
	}

	public getWallTile() {
		return WALL_TILES.CIRCLES.WHITE_SKIRTING_BOARD.orange();
	}

	public getFloorType() {
		return FloorType.WOODEN;
	}
}
