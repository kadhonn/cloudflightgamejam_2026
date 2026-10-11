import type { Container } from "pixi.js";

export abstract class Character {
	screenContainer!: Container;

	async show(screenContainer: Container) {
		this.screenContainer = screenContainer;
		await this.init();
	}

	abstract init(): Promise<void>;

	/** The display object representing the character on screen, e.g. for positioning it. */
	abstract get view(): Container;

	abstract up(deltaTime: number): Promise<void>;

	abstract down(deltaTime: number): Promise<void>;

	abstract left(deltaTime: number): Promise<void>;

	abstract right(deltaTime: number): Promise<void>;
}
