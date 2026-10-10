import { CouchTableState } from "../entitystates/CouchTableState";
import { DoorState } from "../entitystates/DoorState";
import { TableState } from "../entitystates/TableState";

export class LivingRoomState {
    public tableMessGrade = 0;
    public showNote = false;
    public dirtyDishes = true;

    public bedroomDoorState: DoorState = new DoorState();
    public bathroomDoorState: DoorState = new DoorState();
    public kidsroomDoorState: DoorState = new DoorState();
    public exitDoorState: DoorState = new DoorState();

    public tableState: TableState = new TableState();

    public couchTableState: CouchTableState = new CouchTableState();

    public constructor() {
        // we define the door positions here for convenience - 
        // makes the room creation code better readable
        this.bedroomDoorState.y = 200-26;
        this.bedroomDoorState.x = 230;
        this.kidsroomDoorState.y = 200-26;
        this.kidsroomDoorState.x = 350;
        this.bathroomDoorState.y = 200-26;
        this.bathroomDoorState.x = 1050;
        this.exitDoorState.y = 200-26;
        this.exitDoorState.x = 1200;

        
        this.exitDoorState.isOpen = true;
        this.bathroomDoorState.isOpen = true;
        this.kidsroomDoorState.isOpen = true;
        this.bedroomDoorState.isOpen = true;
    }
}