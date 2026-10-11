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
import { CouchTableMessState } from "../../story/entitystates/CouchTableState.ts";
import type { DoorState } from "../../story/entitystates/DoorState.ts";
import { LivingRoomState } from "../../story/roomstates/LivingRoomState";
import { Button } from "../../ui/Button.ts";
import { RoomScreenBase } from "../RoomScreenBase.ts";

export class LivingRoomScreen extends RoomScreenBase {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];

	private state: LivingRoomState;
	private floorTile!: FloorTile;

	// not sure if we need these in the end, but they have been
	// really helpful with testing/degugging UI updates on state change
	private kitchenUpdater: KitchenUpdateDelegate = (roomState) => {};
	private bedroomDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private bathroomDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private kidsroomDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private exitDoorUpdater: DoorUpdateDelegate = (doorState) => {};
	private tableUpdater: TableUpdateDelegate = (tableState) => {};
	private couchTableUpdater: CouchTableUpdateDelegate = (couchTableState) => {};

	private testDishesButton: Button;
	private testNoteButton: Button;
	private testDoorsButton: Button;
	private testCTMessButton: Button;

	constructor(state: LivingRoomState = new LivingRoomState()) {
		super();

		this.state = state;

		this.state.kitchenState.entityInteractionDelegate = () =>
			this.showStoryText("You interacted with the sink!");

		this.drawRoom();

		//TODO: remove test code below - used for testing state changes
		this.testDishesButton = new Button({
			text: "toggle dishes",
			width: 300,
			height: 100,
		});
		this.testDishesButton.y = 300;
		this.testDishesButton.x = 100;
		this.testDishesButton.onPress.connect(() => {
			this.state.kitchenState.dirtyDishes =
				!this.state.kitchenState.dirtyDishes;
			this.kitchenUpdater(this.state);
		});
		this.addChild(this.testDishesButton);

		this.testNoteButton = new Button({
			text: "toggle note",
			width: 300,
			height: 100,
		});
		this.testNoteButton.y = 450;
		this.testNoteButton.x = 100;
		this.testNoteButton.onPress.connect(() => {
			this.state.tableState.hasNote = !this.state.tableState.hasNote;
			this.state.tableState.noteText = "Lorem Ipsum";
			this.tableUpdater(this.state.tableState);
		});
		this.addChild(this.testNoteButton);

		this.testDoorsButton = new Button({
			text: "toggle doors",
			width: 300,
			height: 100,
		});
		this.testDoorsButton.y = 600;
		this.testDoorsButton.x = 100;
		this.testDoorsButton.onPress.connect(() => {
			this.state.bedroomDoorState.isOpen = !this.state.bedroomDoorState.isOpen;
			this.state.bathroomDoorState.isOpen =
				!this.state.bathroomDoorState.isOpen;
			this.state.kidsroomDoorState.isOpen =
				!this.state.kidsroomDoorState.isOpen;
			this.state.exitDoorState.isOpen = !this.state.exitDoorState.isOpen;
			this.bedroomDoorUpdater(this.state.bedroomDoorState);
			this.bathroomDoorUpdater(this.state.bathroomDoorState);
			this.kidsroomDoorUpdater(this.state.kidsroomDoorState);
			this.exitDoorUpdater(this.state.exitDoorState);
		});
		this.addChild(this.testDoorsButton);

		this.testCTMessButton = new Button({
			text: "cycle mess",
			width: 300,
			height: 100,
		});
		this.testCTMessButton.y = 750;
		this.testCTMessButton.x = 100;
		this.testCTMessButton.onPress.connect(() => {
			switch (this.state.couchTableState.messState) {
				case CouchTableMessState.NONE:
					this.state.couchTableState.messState = CouchTableMessState.LITTLE;
					break;
				case CouchTableMessState.LITTLE:
					this.state.couchTableState.messState = CouchTableMessState.MEDIUM;
					break;
				case CouchTableMessState.MEDIUM:
					this.state.couchTableState.messState = CouchTableMessState.LOTS;
					break;
				case CouchTableMessState.LOTS:
					this.state.couchTableState.messState = CouchTableMessState.NONE;
					break;
			}
			this.couchTableUpdater(this.state.couchTableState);
		});
		this.addChild(this.testCTMessButton);
	}

	public async drawRoomEntities(container: Container) {
		this.drawKitchen(container);

		// doors stand in the wall, the number is the tile column they start at
		var bedroomDoor = await this.drawDoor(
			this.state.bedroomDoorState,
			container,
			2,
		);
		var bathroomDoor = await this.drawDoor(
			this.state.bathroomDoorState,
			container,
			5,
		);
		var kidsroomDoor = await this.drawDoor(
			this.state.kidsroomDoorState,
			container,
			16,
		);
		var exitDoor = await this.drawDoor(this.state.exitDoorState, container, 20);

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
	}

	public getWallTile() {
		return WALL_TILES.PLAIN.WHITE_SKIRTING_BOARD.red();
	}

	public getFloorType() {
		return FloorType.WOODEN;
	}

	public async drawKitchen(container: Container) {
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

	public async drawDoor(
		state: DoorState,
		container: Container,
		col: number,
	): Promise<Door> {
		var door = new Door(state);
		this.positionEntityOntoEntityByTile(door, container, col, 1);
		container.addChild(door);
		return door;
	}

	public async drawTable(container: Container) {
		var table = new Table(this.state.tableState, 0, 0);
		this.positionEntityOntoEntityByTile(table, container, 4, 6);
		container.addChild(table);
		this.tableUpdater = (state) => {
			table.updateState(state);
		};
		this.addInteractableForEntity(table, this.state.tableState);
	}

	public async drawCouchTable(container: Container) {
		var couchTable = new CouchTable(this.state.couchTableState, 0, 0);
		this.positionEntityOntoEntityByTile(couchTable, container, 20, 8);
		container.addChild(couchTable);
		this.couchTableUpdater = (state) => {
			couchTable.updateState(state);
		};
		this.addInteractableForEntity(couchTable, this.state.couchTableState);
	}
}
