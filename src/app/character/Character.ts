import type {Container} from "pixi.js";

export abstract class Character {
    screenContainer!: Container;

    show(screenContainer: Container) {
        this.screenContainer = screenContainer;
        this.init();
    }

    abstract init(): void;

    /** The display object representing the character on screen, e.g. for positioning it. */
    abstract get view(): Container;

    abstract up(deltaTime: number): void;

    abstract down(deltaTime: number): void;

    abstract left(deltaTime: number): void;

    abstract right(deltaTime: number): void;
}
