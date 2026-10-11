import {DoorState} from "../entitystates/DoorState";
import {BedState} from "../entitystates/BedState.ts";

export class BedRoomState {

    public exitDoorState: DoorState = new DoorState();
    public bedState: BedState = new BedState();

    public constructor() {

    }
}
