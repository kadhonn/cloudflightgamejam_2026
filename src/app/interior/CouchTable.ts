import {
	Container,
	type ContainerOptions,
	Sprite,
	type Texture,
} from "pixi.js";
import {
	beerBottle,
	couchTable,
	pizzaBox,
	whiskeyBottle,
} from "../sprites/Sprites";
import {
	CouchTableMessState,
	type CouchTableState,
} from "../story/entitystates/CouchTableState";

export type CouchTableUpdateDelegate = (state: CouchTableState) => void;

export class CouchTable extends Sprite {
	private readonly messContainer: Container;

	constructor(state: CouchTableState, x: number, y: number) {
		super();
		this.texture = this.getTexture();
		this.x = x;
		this.y = y;
		this.scale.set(4);
		var messContainerOptions: ContainerOptions = {
			x: 0,
			y: 0,
			scale: 0.5,
		};
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

	private getBeerBottleSprite(): Sprite {
		return new Sprite(beerBottle());
	}

	private getBeerPizzaBoxSprite(): Sprite {
		return new Sprite(pizzaBox());
	}

	private getWhiskeyBottleSprite(): Sprite {
		return new Sprite(whiskeyBottle());
	}

	public updateState(state: CouchTableState) {
		// always clear out mess container before redrawing
		this.messContainer.removeChildren();
		switch (state.messState) {
			case CouchTableMessState.NONE:
				// no mess at all
				break;
			case CouchTableMessState.LITTLE: {
				const beerBottle = this.getBeerBottleSprite();
				beerBottle.x = 1;
				beerBottle.y = 4;
				this.messContainer.addChild(beerBottle);
				break;
			}
			case CouchTableMessState.MEDIUM: {
				const beerBottle1 = this.getBeerBottleSprite();
				beerBottle1.x = 2;
				beerBottle1.y = 4;
				const beerBottle2 = this.getBeerBottleSprite();
				beerBottle2.x = 15;
				beerBottle2.y = 0;
				const beerBottle3 = this.getBeerBottleSprite();
				beerBottle3.x = 15;
				beerBottle3.y = 15;
				beerBottle3.rotation = Math.PI / 4;
				this.messContainer.addChild(beerBottle1);
				this.messContainer.addChild(beerBottle2);
				this.messContainer.addChild(beerBottle3);
				break;
			}
			default: {
				//state LOTS
				const beerBottle1 = this.getBeerBottleSprite();
				beerBottle1.x = 15;
				beerBottle1.y = -2;
				const beerBottle2 = this.getBeerBottleSprite();
				beerBottle2.x = 10;
				beerBottle2.y = -4;
				const pizzaBox = this.getBeerPizzaBoxSprite();
				pizzaBox.x = 0;
				pizzaBox.y = 5;
				const whiskeyBottle = this.getWhiskeyBottleSprite();
				whiskeyBottle.x = 12;
				whiskeyBottle.y = 18;
				this.messContainer.addChild(beerBottle1);
				this.messContainer.addChild(beerBottle2);
				this.messContainer.addChild(pizzaBox);
				this.messContainer.addChild(whiskeyBottle);
			}
		}
	}
}
