import { AppScreen } from "../../../engine/navigation/navigation";
import { Container } from "pixi.js";
import { FloorTile, FloorType } from "../../interior/FloorTile";
import { WallTile, WallType } from "../../interior/WallTile";

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
        this.wallTile = new WallTile(WallType.RED, 200, 200-32, 30);
        this.mainContainer.addChild(this.floorTile);
        this.mainContainer.addChild(this.wallTile);
    }


}