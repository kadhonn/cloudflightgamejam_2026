import { BedState } from "../entitystates/BedState.ts";
import { DoorState } from "../entitystates/DoorState";
import { MakeupTableState } from "../entitystates/MakeupTableState.ts";

export class BedRoomState {
	public exitDoorState: DoorState = new DoorState();
	public bedState: BedState = new BedState();
	public makeupTableState: MakeupTableState = new MakeupTableState();

	public constructor() {}
}
