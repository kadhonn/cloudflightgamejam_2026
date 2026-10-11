import {
    Container,
    Sprite,
} from "pixi.js";
import {
    makeupTable, pills,
} from "../sprites/Sprites";
import {MakeupTableState} from "../story/entitystates/MakeupTableState.ts";

export type MakeupTableUpdateDelegate = (state: MakeupTableState) => void;

export class MakeupTable extends Container {

    constructor(state: MakeupTableState, x: number, y: number) {
        super();

        this.x = x;
        this.y = y;
        this.scale.set(4);
        this.updateState(state);
    }

    public updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public updateState(state: MakeupTableState) {
        this.removeChildren()
        this.addChild(Sprite.from(makeupTable()))
        if (state.showPills) {
            let pillsSprite = Sprite.from(pills());
            pillsSprite.scale = 0.8;
            pillsSprite.x = 2;
            pillsSprite.y = 14;
            this.addChild(pillsSprite)
        }
    }
}
