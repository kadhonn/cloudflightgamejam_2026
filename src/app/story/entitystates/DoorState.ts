import { EntityBaseState } from "./EntityStateBase";

export class DoorState extends EntityBaseState {
	public isOpen: boolean;

	// hack: since we render multiple doors in the living
	// room we store each door's coordinates here to make
	// the room creation code a bit more readable :P
	public x: number = 0;
	public y: number = 0;

	public constructor(isOpen = false) {
		super();
		this.isOpen = isOpen;
	}
}
