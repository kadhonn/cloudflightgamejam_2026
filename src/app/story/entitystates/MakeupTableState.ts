import {EntityBaseState} from "./EntityStateBase";
import {engine} from "../../getEngine.ts";
import {MakeupGameScreen} from "../../screens/makeup/MakeupGameScreen.ts";

export class MakeupTableState extends EntityBaseState {
    showPills: boolean = false;

    public constructor() {
        super();
        this.entityInteractionDelegate = () => {
            engine().navigation.showScreen(MakeupGameScreen)
        };
    }
}
