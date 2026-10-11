import {DoorState} from "../entitystates/DoorState.ts";
import {BedState} from "../entitystates/BedState.ts";
import { transitionManager, TransitionTargetType } from "../../screens/TransitionManager.ts";

export class KidsRoomState {

    public exitDoorState: DoorState = new DoorState();
    public bedState: BedState = new BedState();

    public constructor() {
    }
}
