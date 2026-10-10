import { Texture, Sprite, Container, ContainerOptions } from "pixi.js";
import { beerBottle, couchTable, pizzaBox, whiskeyBottle } from "../sprites/Sprites";
import { CouchTableState, CouchTableMessState } from "../story/entitystates/CouchTableState";

export interface CouchTableUpdateDelegate {
    (state: CouchTableState): void;
}

export class CouchTable extends Sprite {

    private messContainer: Container;

    constructor(state: CouchTableState, x: number, y: number) {
        super();
        this.texture = this.getTexture();
        this.x = x;
        this.y = y;
        this.scale.set(4);
        var messContainerOptions : ContainerOptions = {
            x: 0,
            y: 0,
        }
        this.messContainer = new Container(messContainerOptions);
        this.addChild(this.messContainer);
        this.updateState(state);
    }

    public updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    private getTexture(): Texture {
        return couchTable();
    }

    private getBeerBottleSprite(): Sprite
    {
        return new Sprite(beerBottle());
    }

    private getBeerPizzaBoxSprite(): Sprite
    {
        return new Sprite(pizzaBox());
    }

    private getWhiskeyBottleSprite(): Sprite
    {
        return new Sprite(whiskeyBottle());
    }

    public updateState(state: CouchTableState) 
    {
        // always clear out mess container before redrawing
        this.messContainer.removeChildren();
        switch(state.messState)
        {
            case CouchTableMessState.NONE:
                // no mess at all
                break;
            case CouchTableMessState.LITTLE:
                var beerBottle = this.getBeerBottleSprite();
                beerBottle.x = 10;
                beerBottle.y = 40;
                this.messContainer.addChild(beerBottle);
                break;
            case CouchTableMessState.MEDIUM:
                var beerBottle1 = this.getBeerBottleSprite();
                beerBottle1.x = 10;
                beerBottle1.y = 20;
                var beerBottle2 = this.getBeerBottleSprite();
                beerBottle2.x = 18;
                beerBottle2.y = 25;
                var beerBottle3 = this.getBeerBottleSprite();
                beerBottle3.x = 40;
                beerBottle3.y = 23;
                beerBottle3.rotation = Math.PI/4;
                this.messContainer.addChild(beerBottle1);
                this.messContainer.addChild(beerBottle2);
                this.messContainer.addChild(beerBottle3);
                break;
            default: //state LOTS
                var beerBottle1 = this.getBeerBottleSprite();
                beerBottle1.x = 30;
                beerBottle1.y = 18;
                var beerBottle2 = this.getBeerBottleSprite();
                beerBottle2.x = 38;
                beerBottle2.y = 22;
                var pizzaBox = this.getBeerPizzaBoxSprite();
                pizzaBox.x = 22;
                pizzaBox.y = 60;
                var whiskeyBottle = this.getWhiskeyBottleSprite();
                whiskeyBottle.x = 12;
                whiskeyBottle.y = 8;
                this.messContainer.addChild(beerBottle1);
                this.messContainer.addChild(beerBottle2);
                this.messContainer.addChild(pizzaBox);
                this.messContainer.addChild(whiskeyBottle);
        }
    }
}
