import {
	TransitionTargetType,
	transitionManager,
} from "../../screens/TransitionManager.ts";
import { BedState } from "../entitystates/BedState.ts";
import { DoorState } from "../entitystates/DoorState.ts";

export class KidsRoomState {
	public exitDoorState: DoorState = new DoorState();
	public bedState: BedState = new BedState();

	public constructor() {}
}
