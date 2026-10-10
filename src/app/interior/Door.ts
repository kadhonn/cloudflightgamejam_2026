import { Texture, Sprite, SpriteOptions, Graphics } from "pixi.js";
import { doorClosed, doorOpen, DOOR_WIDTH, DOOR_CELL_HEIGHT } from "../sprites/Sprites";
import { DoorState } from "../story/entitystates/DoorState";

export interface DoorUpdateDelegate {
    (state: DoorState): void;
}

export class Door extends Sprite {

    private isOpen: boolean;
    private doorSprite: Sprite;

    constructor(state: DoorState) {
        super();
        this.x = state.x;
        this.y = state.y;
        this.scale.set(4);
        this.isOpen = state.isOpen;
        var doorSpriteOptions : SpriteOptions = {
            scale: 1
        };
        this.doorSprite = new Sprite(doorSpriteOptions);
        var blackBackground = new Graphics()
            .rect(0, 6, DOOR_WIDTH, DOOR_CELL_HEIGHT*0.8)
            .fill('black');
        this.addChild(blackBackground);
        this.addChild(this.doorSprite);
        this.updateState(state);
    }

    public updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    private getTexture(): Texture {
        if(this.isOpen)
        {
            return doorOpen();
        }
        else  
        {
            return doorClosed();
        }
    }

    public updateState(state: DoorState) 
    {
        this.isOpen = state.isOpen;
        this.doorSprite.texture = this.getTexture();
    }
}
