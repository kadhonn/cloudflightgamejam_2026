import { AppScreen } from "../../../engine/navigation/navigation";
import { Container } from "pixi.js";
import { FloorTile, FloorType } from "../../interior/FloorTile";
import { WALL_TILES } from "../../interior/WallTile";
import { Door, DoorUpdateDelegate } from "../../interior/Door";
import { Kitchen, KitchenUpdateDelegate } from "../../interior/Kitchen";
import { LivingRoomState } from "../../story/roomstates/LivingRoomState";
import { DoorState } from "../../story/entitystates/DoorState.ts";

import { Button } from "../../ui/Button.ts";
import { Table, TableUpdateDelegate } from "../../interior/Table.ts";
import { CouchTable, CouchTableUpdateDelegate } from "../../interior/CouchTable.ts";
import { CouchTableMessState } from "../../story/entitystates/CouchTableState.ts";

export class LivingRoomScreen extends Container implements AppScreen {
    /** Assets bundles required by this screen */
	public static assetBundles = ["main"];

    public mainContainer: Container;
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

    private testDishesButton: Button;
    private testNoteButton: Button;
    private testDoorsButton: Button;
    private testCTMessButton: Button;

    constructor(state: LivingRoomState = new LivingRoomState()) {
        super();
        this.state = state;
        this.state.dirtyDishes = true;
        this.mainContainer = new Container();
        this.addChild(this.mainContainer);

        this.drawRoom();

        //TODO: remove test code below - used for testing state changes
        this.testDishesButton = new Button({
                    text: "toggle dishes",
                    width: 475,
                    height: 130,
                });
        this.testDishesButton.y = 400;
        this.testDishesButton.x = 400;
        this.testDishesButton.onPress.connect(() => {
            this.state.dirtyDishes = !this.state.dirtyDishes;
            this.kitchenUpdater(this.state);
        });
        this.addChild(this.testDishesButton);

        this.testNoteButton = new Button({
                    text: "toggle note",
                    width: 475,
                    height: 130,
                });
        this.testNoteButton.y = 700;
        this.testNoteButton.x = 400;
        this.testNoteButton.onPress.connect(() => {
            this.state.tableState.hasNote = !this.state.tableState.hasNote;
            this.state.tableState.noteText = "Lorem Ipsum";
            this.tableUpdater(this.state.tableState);
        });
        this.addChild(this.testNoteButton);

        this.testDoorsButton = new Button({
                    text: "toggle doors",
                    width: 475,
                    height: 130,
                });
        this.testDoorsButton.y = 1000;
        this.testDoorsButton.x = 400;
        this.testDoorsButton.onPress.connect(() => {
            this.state.bedroomDoorState.isOpen = !this.state.bedroomDoorState.isOpen;
            this.state.bathroomDoorState.isOpen = !this.state.bathroomDoorState.isOpen;
            this.state.kidsroomDoorState.isOpen = !this.state.kidsroomDoorState.isOpen;
            this.state.exitDoorState.isOpen = !this.state.exitDoorState.isOpen;
            this.bedroomDoorUpdater(this.state.bedroomDoorState);
            this.bathroomDoorUpdater(this.state.bathroomDoorState);
            this.kidsroomDoorUpdater(this.state.kidsroomDoorState);
            this.exitDoorUpdater(this.state.exitDoorState);
        });
        this.addChild(this.testDoorsButton);

        this.testCTMessButton = new Button({
                    text: "cycle mess",
                    width: 475,
                    height: 130,
                });
        this.testCTMessButton.y = 1300;
        this.testCTMessButton.x = 400;
        this.testCTMessButton.onPress.connect(() => {
            switch(this.state.couchTableState.messState)
            {
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

    public async drawRoom() {
        this.drawBackground(this.mainContainer);

        this.drawKitchen(this.mainContainer);

        //bedroom door
        var bedroomDoor = this.drawDoor(this.state.bedroomDoorState, this.mainContainer);
        //bathroom door
        var bathroomDoor = this.drawDoor(this.state.bathroomDoorState, this.mainContainer);
        //kids room door
        var kidsroomDoor = this.drawDoor(this.state.kidsroomDoorState, this.mainContainer);
        //exit door
        var exitDoor = this.drawDoor(this.state.exitDoorState, this.mainContainer);

        this.bedroomDoorUpdater = async (state) => { (await bedroomDoor).updateState(state); };
        this.bathroomDoorUpdater = async (state) => { (await bathroomDoor).updateState(state); };
        this.kidsroomDoorUpdater = async (state) => { (await kidsroomDoor).updateState(state); };
        this.exitDoorUpdater = async (state) => { (await exitDoor).updateState(state); };

        this.drawTable(this.mainContainer);

        this.drawCouchTable(this.mainContainer);
    }

    public async drawBackground(container: Container) {
        var floorTile = new FloorTile(FloorType.WOODEN);
        floorTile.updatePosition(200, 200);
        floorTile.horizontalTiles = 30;
        floorTile.verticalTiles = 20;
        var wallTile = WALL_TILES.PLAIN.WHITE_SKIRTING_BOARD.red();
        wallTile.matchPosition(floorTile);
        wallTile.matchWidth(floorTile);
        container.addChild(floorTile);
        container.addChild(wallTile);
    }

    public async drawKitchen(container: Container) {
        var kitchen = new Kitchen(this.state, 500, 200-32);
        container.addChild(kitchen);
        this.kitchenUpdater = (state) => { kitchen.updateState(state); };
    }

    public async drawDoor(state: DoorState, container: Container) : Promise<Door> {
        var door = new Door(state);
        container.addChild(door);
        return door;
    }

    public async drawTable(container: Container) {
        var table = new Table(this.state.tableState, 800, 700);
        container.addChild(table);
        this.tableUpdater = (state) => { table.updateState(state); };
    }

    public async drawCouchTable(container: Container) {
        var couchTable = new CouchTable(this.state.couchTableState, 1800, 650);
        container.addChild(couchTable);
        this.couchTableUpdater = (state) => { couchTable.updateState(state); };
    }
}