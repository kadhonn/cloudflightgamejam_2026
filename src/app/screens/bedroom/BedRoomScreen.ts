import type { Container } from "pixi.js";
import { FloorType } from "../../interior/FloorTile";
import { WALL_TILES } from "../../interior/WallTile";
import { RoomScreenBase } from "../RoomScreenBase";
import {Door} from "../../interior/Door.ts";
import {DoorState} from "../../story/entitystates/DoorState.ts";

export class BedRoomScreen extends RoomScreenBase {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];
	public exitDoorState: DoorState = new DoorState();

	constructor() {
		super();

		this.exitDoorState.y = 200 - 26;
		this.exitDoorState.x = 230;

		this.drawRoom();
	}

	public drawRoomEntities(container: Container) {
		let exitDoor = this.drawDoor(
			this.exitDoorState,
			container,
			2,
		);
	}

	public getWallTile() {
		return WALL_TILES.CIRCLES.WHITE_SKIRTING_BOARD.white();
	}

	public getFloorType() {
		return FloorType.WOODEN;
	}
}
