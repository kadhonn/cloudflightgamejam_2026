import type {Container} from "pixi.js";
import {FloorType} from "../../interior/FloorTile";
import {WALL_TILES} from "../../interior/WallTile";
import {RoomScreenBase} from "../RoomScreenBase";
import {Bed} from "../../interior/Bed.ts";
import {BedRoomState} from "../../story/roomstates/BedRoomState.ts";
import {MakeupTableState} from "../../story/entitystates/MakeupTableState.ts";
import {MakeupTable, MakeupTableUpdateDelegate} from "../../interior/MakeupTable.ts";

export class BedRoomScreen extends RoomScreenBase {
    /** Assets bundles required by this screen */
    public static assetBundles = ["main"];
    public state: BedRoomState = new BedRoomState();

    private makeupTableUpdater: MakeupTableUpdateDelegate = (makeupTableState: MakeupTableState) => {};

    constructor() {
        super();

        this.drawRoom();
    }

	public drawRoomEntities(container: Container) {
		const exitDoor = this.drawDoor(this.exitDoorState, container, 2);

        let bed = new Bed(this.state.bedState, 0, 0);
        this.positionEntityOntoEntityByTile(bed, container, 12, 2);

        this.state.makeupTableState.showPills=true;
        let makeupTable = new MakeupTable(this.state.makeupTableState, 0, 0);
        this.positionEntityOntoEntityByTile(makeupTable, container, 6, 2);
        this.addInteractableForEntity(makeupTable, this.state.makeupTableState);
    }

    public getWallTile() {
        return WALL_TILES.CIRCLES.WHITE_SKIRTING_BOARD.white();
    }

    public getFloorType() {
        return FloorType.WOODEN;
    }
}
