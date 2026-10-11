import type { Container } from "pixi.js";
import { FloorType } from "../../interior/FloorTile";
import { WALL_TILES } from "../../interior/WallTile";
import { RoomScreenBase } from "../RoomScreenBase";

export class BedRoomScreen extends RoomScreenBase {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];

	constructor() {
		super();

		this.drawRoom();
	}

	public async drawRoomEntities(container: Container) {}

	public getWallTile() {
		return WALL_TILES.CIRCLES.WHITE_SKIRTING_BOARD.white();
	}

	public getFloorType() {
		return FloorType.WOODEN;
	}
}
