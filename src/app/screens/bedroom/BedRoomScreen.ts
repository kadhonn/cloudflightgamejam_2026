import type { Container } from "pixi.js";
import { Bed } from "../../interior/Bed.ts";
import type { Door } from "../../interior/Door.ts";
import { FloorType } from "../../interior/FloorTile";
import {
	MakeupTable,
	type MakeupTableUpdateDelegate,
} from "../../interior/MakeupTable.ts";
import { WALL_TILES } from "../../interior/WallTile";
import type { MakeupTableState } from "../../story/entitystates/MakeupTableState.ts";
import { BedRoomState } from "../../story/roomstates/BedRoomState.ts";
import { storyEngine } from "../../story/storyengine/StoryEngine.ts";
import { RoomScreenBase } from "../RoomScreenBase";

export class BedRoomScreen extends RoomScreenBase {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];
	public state;

	private makeupTableUpdater: MakeupTableUpdateDelegate = (
		makeupTableState: MakeupTableState,
	) => {};

	private exitDoor!: Door;
	private bed!: Bed;
	private makeupTable!: MakeupTable;

	constructor() {
		super();

		this.state = storyEngine().storyState.bedRoomState;

		this.drawRoom();
	}

	public drawRoomEntities(container: Container) {
		this.exitDoor = this.drawDoor(this.state.exitDoorState, container, 2);
		this.addInteractableForEntity(this.exitDoor, this.state.exitDoorState);

		this.bed = new Bed(this.state.bedState, 0, 0);
		this.positionEntityOntoEntityByTile(this.bed, container, 12, 2);

		this.state.makeupTableState.showPills = true;
		this.makeupTable = new MakeupTable(this.state.makeupTableState, 0, 0);
		this.positionEntityOntoEntityByTile(this.makeupTable, container, 6, 2);
		this.addInteractableForEntity(
			this.makeupTable,
			this.state.makeupTableState,
		);
	}

	public refreshEntities() {
		this.exitDoor.updateState(this.state.exitDoorState);
		this.bed.updateState(this.state.bedState);
		this.makeupTable.updateState(this.state.makeupTableState);
	}

	public getWallTile() {
		return WALL_TILES.CIRCLES.WHITE_SKIRTING_BOARD.white();
	}

	public getFloorType() {
		return FloorType.WOODEN;
	}
}
