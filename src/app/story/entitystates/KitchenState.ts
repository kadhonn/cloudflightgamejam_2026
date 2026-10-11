import { EntityBaseState } from "./EntityStateBase";

export class KitchenState extends EntityBaseState {
	public dirtyDishes: boolean;

	public constructor(dirtyDishes = false) {
		super();
		this.dirtyDishes = dirtyDishes;
	}
}
