import { engine } from "../../getEngine.ts";
import { EntityBaseState } from "./EntityStateBase";

export class MakeupTableState extends EntityBaseState {
	showPills: boolean = false;

	public constructor() {
		super();
		this.isInteractable = true;
		this.entityInteractionDelegate = async () => {
			const { MakeupGameScreen } = await import(
				"../../screens/makeup/MakeupGameScreen.ts"
			);
			engine().navigation.showScreen(MakeupGameScreen);
		};
	}
}
