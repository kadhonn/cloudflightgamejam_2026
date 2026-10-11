import { Container, Text, type Ticker } from "pixi.js";

import type { AppScreen } from "../../../engine/navigation/navigation.ts";
import { engine } from "../../getEngine.ts";
import { Button } from "../../ui/Button.ts";
import { BedRoomScreen } from "../bedroom/BedRoomScreen.ts";
import {
	TransitionTargetType,
	transitionManager,
} from "../TransitionManager.ts";
import { FaceContainer, MASKS } from "./FaceContainer.ts";

/** The screen that holds the app */
export class MakeupGameScreen extends Container implements AppScreen {
	/** Assets bundles required by this screen */
	public static assetBundles = ["main"];
	private readonly faceContainer: FaceContainer;
	private readonly colorButtons: Button[];
	private readonly maskButtons: Button[];
	private readonly resetButton: Button;
	private readonly doneButton: Button;

	constructor() {
		super();

		this.faceContainer = new FaceContainer();
		this.addChild(this.faceContainer);

		this.colorButtons = [];
		this.addColorButton("Red", () => this.faceContainer.chosenColor("#e52828"));
		this.addColorButton("Blue", () =>
			this.faceContainer.chosenColor("#2727e2"),
		);
		this.addColorButton("Rose", () =>
			this.faceContainer.chosenColor("#d16f8a"),
		);
		this.addColorButton("Purple", () =>
			this.faceContainer.chosenColor("#6f0ca0"),
		);
		this.addColorButton("Brown", () =>
			this.faceContainer.chosenColor("#512204"),
		);
		this.addColorButton("Blond", () =>
			this.faceContainer.chosenColor("#ffd390"),
		);
		this.addColorButton("Black", () =>
			this.faceContainer.chosenColor("#000000"),
		);
		this.addColorButton("White", () =>
			this.faceContainer.chosenColor("#ffffff"),
		);
		this.addColorButton("Wash", () => this.faceContainer.chosenColor(""));

		this.maskButtons = [];
		for (const mask of MASKS) {
			this.addMaskButton(mask.label, () => this.faceContainer.chosenMask(mask));
		}

		this.resetButton = new Button({
			text: "Reset",
			width: 175,
			height: 110,
		});
		this.resetButton.onPress.connect(() => this.faceContainer.resetMasks());
		this.addChild(this.resetButton);

		this.doneButton = new Button({
			text: "Done",
			width: 175,
			height: 110,
		});
		this.doneButton.onPress.connect(() =>
			transitionManager().transition(
				TransitionTargetType.MAKEUP,
				TransitionTargetType.BEDROOM,
			),
		);
		this.addChild(this.doneButton);
	}

	/** Update the screen */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public update(_time: Ticker) {}

	/** Show screen with animations */
	public async show(): Promise<void> {}

	resize(width: number, height: number): void {
		this.faceContainer.x = width / 2;
		this.faceContainer.y = height / 2;

		const BUTTON_DISTANCE = 100;

		let i = 0;
		for (const button of this.maskButtons) {
			button.x = 100;
			button.y = 100 + i * BUTTON_DISTANCE;
			i++;
		}

		i = 0;
		for (const button of this.colorButtons) {
			button.x = width - 100;
			button.y = 100 + i * BUTTON_DISTANCE;
			i++;
		}

		this.resetButton.x = width / 2 - 100;
		this.resetButton.y = height - 100;

		this.doneButton.x = width / 2 + 100;
		this.doneButton.y = height - 100;
	}

	private addColorButton(label: string, onclick: () => void) {
		const button = new Button({
			text: label,
			width: 175,
			height: 110,
		});
		button.onPress.connect(onclick);
		this.colorButtons.push(button);
		this.addChild(button);
	}

	private addMaskButton(label: string, onclick: () => void) {
		const button = new Button({
			text: label,
			width: 155,
			height: 110,
		});
		button.onPress.connect(onclick);
		this.maskButtons.push(button);
		this.addChild(button);
	}
}
