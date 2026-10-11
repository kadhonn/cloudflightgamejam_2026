import { CouchTableState } from "../entitystates/CouchTableState";
import { DoorState } from "../entitystates/DoorState";
import { KitchenState } from "../entitystates/KitchenState";
import { TableState } from "../entitystates/TableState";
import { TVState } from "../entitystates/TVState";

export class LivingRoomState {
	public bedroomDoorState: DoorState = new DoorState();
	public bathroomDoorState: DoorState = new DoorState();
	public kidsroomDoorState: DoorState = new DoorState();
	public exitDoorState: DoorState = new DoorState();

	public tableState: TableState = new TableState();

	public couchTableState: CouchTableState = new CouchTableState();

	public kitchenState: KitchenState = new KitchenState();

    public tvState: TVState = new TVState();

	public constructor() {
		// we define the door positions here for convenience -
		// makes the room creation code better readable
		this.bedroomDoorState.y = 200 - 26;
		this.bedroomDoorState.x = 230;
		this.kidsroomDoorState.y = 200 - 26;
		this.kidsroomDoorState.x = 350;
		this.bathroomDoorState.y = 200 - 26;
		this.bathroomDoorState.x = 1050;
		this.exitDoorState.y = 200 - 26;
		this.exitDoorState.x = 1200;
	}
}
