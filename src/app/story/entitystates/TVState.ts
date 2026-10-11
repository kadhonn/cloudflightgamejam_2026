import { EntityBaseState } from "./EntityStateBase";

export class TVState extends EntityBaseState {
	public isTVOn: boolean;

	public constructor(isTVOn = false) {
		super();
		this.isTVOn = isTVOn;
	}
}
