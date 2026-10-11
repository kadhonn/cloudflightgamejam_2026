import type { Container } from "pixi.js";
import {
	CouchTable,
	type CouchTableUpdateDelegate,
} from "../../interior/CouchTable.ts";
import { Door, type DoorUpdateDelegate } from "../../interior/Door";
import { type FloorTile, FloorType } from "../../interior/FloorTile";
import { Kitchen, type KitchenUpdateDelegate } from "../../interior/Kitchen";
import { Table, type TableUpdateDelegate } from "../../interior/Table.ts";
import { WALL_TILES } from "../../interior/WallTile";
import { LivingRoomState } from "../../story/roomstates/LivingRoomState";
import { RoomScreenBase } from "../RoomScreenBase.ts";
import {Couch} from "../../interior/Couch.ts";
import { storyEngine } from "../../story/storyengine/StoryEngine.ts";
import { TV, TVUpdateDelegate } from "../../interior/TV.ts";

export class LivingRoomScreen extends RoomScreenBase {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];

	private state: LivingRoomState;

	// not sure if we need these in the end, but they have been
	// really helpful with testing/degugging UI updates on state change
	private kitchenUpdater: KitchenUpdateDelegate = (roomState) => {};
	private bedroomDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private bathroomDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private kidsroomDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private exitDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private tableUpdater: TableUpdateDelegate = (tableState) => {};
	private couchTableUpdater: CouchTableUpdateDelegate = (couchTableState) => {};
    private tvUpdater: TVUpdateDelegate = (tvState) => {};

	constructor() {
		super();

		this.state = storyEngine().storyState.livingRoomState;

		this.drawRoom();
	}

	public drawRoomEntities(container: Container) {
		this.drawKitchen(container);

		// doors stand in the wall, the number is the tile column they start at
		const bedroomDoor = this.drawDoor(
			this.state.bedroomDoorState,
			container,
			2,
		);
		const bathroomDoor = this.drawDoor(
			this.state.bathroomDoorState,
			container,
			5,
		);
		const kidsroomDoor = this.drawDoor(
			this.state.kidsroomDoorState,
			container,
			16,
		);
		const exitDoor = this.drawDoor(this.state.exitDoorState, container, 20);

		this.addInteractableForEntity(bedroomDoor, this.state.bedroomDoorState);
		this.addInteractableForEntity(bathroomDoor, this.state.bathroomDoorState);
		this.addInteractableForEntity(kidsroomDoor, this.state.kidsroomDoorState);
		this.addInteractableForEntity(exitDoor, this.state.exitDoorState);

		this.bedroomDoorUpdater = async (state) => {
			bedroomDoor.updateState(state);
		};
		this.bathroomDoorUpdater = async (state) => {
			bathroomDoor.updateState(state);
		};
		this.kidsroomDoorUpdater = async (state) => {
			kidsroomDoor.updateState(state);
		};
		this.exitDoorUpdater = async (state) => {
			exitDoor.updateState(state);
		};

		this.drawTable(container);

		this.drawCouchTable(container);

		let couch = new Couch();
		this.positionEntityOntoEntityByTile(couch, container, 21,7.5)
		this.drawTV(container);
	}

	public refreshEntities() {
		this.kitchenUpdater(this.state);
		this.bedroomDoorUpdater(this.state.bedroomDoorState);
		this.bathroomDoorUpdater(this.state.bathroomDoorState);
		this.kidsroomDoorUpdater(this.state.kidsroomDoorState);
		this.exitDoorUpdater(this.state.exitDoorState);
		this.tableUpdater(this.state.tableState);
		this.couchTableUpdater(this.state.couchTableState);
        this.tvUpdater(this.state.tvState);
	}

	public getWallTile() {
		return WALL_TILES.PLAIN.WHITE_SKIRTING_BOARD.red();
	}

	public getFloorType() {
		return FloorType.WOODEN;
	}

	public drawKitchen(container: Container) {
		var kitchen = new Kitchen(this.state, 0, 0);
		this.positionEntityOntoEntityByTile(kitchen, container, 7, 1);
		this.kitchenUpdater = (state) => {
			kitchen.updateState(state);
		};
		// only the sink is interactable, not the whole kitchen
		this.addInteractableForRectangle(
			kitchen.getSinkArea(),
			this.state.kitchenState,
		);
	}

	public drawTable(container: Container) {
		var table = new Table(this.state.tableState, 0, 0);
		this.positionEntityOntoEntityByTile(table, container, 4, 6);
		this.tableUpdater = (state) => {
			table.updateState(state);
		};
		this.addInteractableForEntity(table, this.state.tableState);
	}

	public drawCouchTable(container: Container) {
		var couchTable = new CouchTable(this.state.couchTableState, 0, 0);
		this.positionEntityOntoEntityByTile(couchTable, container, 20, 8);
		this.couchTableUpdater = (state) => {
			couchTable.updateState(state);
		};
		this.addInteractableForEntity(couchTable, this.state.couchTableState);
	}

	public drawTV(container: Container) {
		var tv = new TV(this.state.tvState, 0, 0);
		this.positionEntityOntoEntityByTile(tv, container, 21, 6);
		this.tvUpdater = (state) => {
			tv.updateState(state);
		};
		this.addInteractableForEntity(tv, this.state.tvState);
	}
}
