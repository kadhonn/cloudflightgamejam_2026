import { Container } from "pixi.js";
import type { AppScreen } from "../../../engine/navigation/navigation";
import { FloorTile, FloorType } from "../../interior/FloorTile";
import { WALL_TILES, type WallTile } from "../../interior/WallTile";

export class BedRoomScreen extends Container implements AppScreen {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];

	public mainContainer: Container;
	public floorTile: FloorTile;
	public wallTile: WallTile;

	constructor() {
		super();
		this.mainContainer = new Container();
		this.addChild(this.mainContainer);
		this.floorTile = new FloorTile(FloorType.WOODEN, 200, 200, 30, 20);
		this.wallTile = WALL_TILES.CIRCLES.WHITE_SKIRTING_BOARD.white();
		this.wallTile.matchPosition(this.floorTile);
		this.wallTile.matchWidth(this.floorTile);
		this.mainContainer.addChild(this.floorTile);
		this.mainContainer.addChild(this.wallTile);
	}
}
