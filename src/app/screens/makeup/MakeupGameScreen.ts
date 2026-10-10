import {Container, Text, type Ticker} from "pixi.js";

import type {AppScreen} from "../../../engine/navigation/navigation.ts";
import {Button} from "../../ui/Button.ts";
import {FaceContainer} from "./FaceContainer.ts";

/** The screen that holds the app */
export class MakeupGameScreen extends Container implements AppScreen {
    /** Assets bundles required by this screen */
    public static assetBundles = ["main"];
    private readonly myText: Text;
    private readonly faceContainer: FaceContainer;
    private readonly colorButtons: Button[];
    private readonly maskButtons: Button[];
    private readonly resetButton: Button;

    constructor() {
        super();

        this.myText = new Text({
            text: "Whaat!",
            style: {
                fill: "#ffffff",
                fontSize: 36,
                fontFamily: "MyFont",
            },
            anchor: 1,
        });
        this.addChild(this.myText);

        this.faceContainer = new FaceContainer();
        this.addChild(this.faceContainer);

        this.colorButtons = [];
        this.addColorButton("Red", () => this.faceContainer.red());
        this.addColorButton("Blue", () => this.faceContainer.blue());

        this.maskButtons = [];
        this.addMaskButton("Square", () => this.faceContainer.square());
        this.addMaskButton("Circle", () => this.faceContainer.circle());

        this.resetButton = new Button({
            text: "Reset",
            width: 175,
            height: 110,
        });
        this.resetButton.onPress.connect(() => this.faceContainer.resetMasks());
        this.addChild(this.resetButton);
    }

    /** Update the screen */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(_time: Ticker) {
    }

    /** Show screen with animations */
    public async show(): Promise<void> {
    }

    resize(width: number, height: number): void {
        this.myText.x = width;
        this.myText.y = height;

        this.faceContainer.x = width / 2;
        this.faceContainer.y = height / 2;

        const BUTTON_DISTANCE = 100;

        let i = 0;
        for (let button of this.colorButtons) {
            button.x = 100;
            button.y = 100 + i * BUTTON_DISTANCE;
            i++
        }
        for (let button of this.maskButtons) {
            button.x = 100;
            button.y = 100 + i * BUTTON_DISTANCE;
            i++
        }

        this.resetButton.x = 100;
        this.resetButton.y = 100 + (i + 1) * BUTTON_DISTANCE;
    }

    private addColorButton(label: string, onclick: () => void) {
        let button = new Button({
            text: label,
            width: 175,
            height: 110,
        });
        button.onPress.connect(onclick);
        this.colorButtons.push(button);
        this.addChild(button);
    }

    private addMaskButton(label: string, onclick: () => void) {
        let button = new Button({
            text: label,
            width: 155,
            height: 110,
        });
        button.onPress.connect(onclick);
        this.maskButtons.push(button);
        this.addChild(button);
    }
}
