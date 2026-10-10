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
    private readonly colorRedButton: Button;

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

        this.colorRedButton = new Button({
            text: "Red",
            width: 175,
            height: 110,
        });
        this.colorRedButton.onPress.connect(() => this.faceContainer.red());
        this.addChild(this.colorRedButton);
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

        this.colorRedButton.x = 100;
        this.colorRedButton.y = height / 2;
    }
}
