import { Container, Ticker } from "pixi.js";
import type { AppScreen } from "../../../engine/navigation/navigation.ts";
import { Her } from "../../character/Her.ts";
import { engine } from "../../getEngine.ts";
import { Character } from "../../character/Character.ts";
import { CharacterController } from "../../character/CharacterController.ts";

/**
 * Example screen for showing of arbitrary functionality
 */
export class ExampleScreen extends Container implements AppScreen {
  viewContainer: Container;
  her: Character;
  controller: CharacterController;

  constructor() {
    super();

    this.viewContainer = new Container();
    this.addChild(this.viewContainer);

    this.her = new Her();
    this.controller = new CharacterController();
  }

  async show() {
    this.controller.activate();
    this.her.show(this.viewContainer);
    engine().audio.bgm.current?.stop();
  }

  async hide() {
    this.controller.deactivate();
  }

  async update(ticker: Ticker) {
    if (this.controller.keys.up.pressed) {
      this.her.up(ticker.deltaTime);
    } else if (this.controller.keys.down.pressed) {
      this.her.down(ticker.deltaTime);
    } else if (this.controller.keys.left.pressed) {
      this.her.left(ticker.deltaTime);
    } else if (this.controller.keys.right.pressed) {
      this.her.right(ticker.deltaTime);
    }
  }
}
