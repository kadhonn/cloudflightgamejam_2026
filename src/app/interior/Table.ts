import {Assets, Container, Graphics, Sprite, type SpriteOptions, type Texture} from "pixi.js";
import {TABLE_HEIGHT, tableVertical} from "../sprites/Sprites";
import type {TableState} from "../story/entitystates/TableState";
import {GifSprite, GifSpriteOptions} from "pixi.js/gif";

export type TableUpdateDelegate = (state: TableState) => void;

const NOTE_WIDTH = 25;
const NOTE_HEIGHT = 25;

export class Table extends Container {
    private noteOverlay: Container;

    constructor(state: TableState, x: number, y: number) {
        super();
        this.addChild(new Sprite(this.getTexture()))
        this.x = x;
        this.y = y;
        this.scale.set(4);
        this.noteOverlay = new Container();
        this.addChild(this.noteOverlay);
        this.updateState(state);
        const budgieSpriteOptions: GifSpriteOptions = {
            source: Assets.get("budgie_blue.gif"),
            x: 0,
            y: -10,
            scale: 0.5
        };
        this.addChild(new GifSprite(budgieSpriteOptions));
    }

    public updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    private getTexture(): Texture {
        return tableVertical();
    }

    public updateState(state: TableState) {
        this.noteOverlay.removeChildren();
        if (state.hasNote && state.noteText) {
            let noteSprite = Sprite.from("note.png");
            noteSprite.texture.source.scaleMode = "nearest";
            noteSprite.x = 7;
            noteSprite.y = 10;
            noteSprite.scale = 0.8;
            this.noteOverlay.addChild(noteSprite);
        }
    }
}
