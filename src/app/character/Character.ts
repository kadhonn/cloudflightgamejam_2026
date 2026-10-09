import { Container } from "pixi.js";

export abstract class Character {
  screenContainer!: Container;

  async show(screenContainer: Container) {
    this.screenContainer = screenContainer;
    await this.init();
  }

  abstract init(): Promise<void>;

  abstract up(deltaTime: number): Promise<void>;

  abstract down(deltaTime: number): Promise<void>;

  abstract left(deltaTime: number): Promise<void>;

  abstract right(deltaTime: number): Promise<void>;
}
