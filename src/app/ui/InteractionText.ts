import { Container, Graphics, Text, type TextStyleOptions } from "pixi.js";
import { engine } from "../getEngine.ts";

const PADDING = 12;

const defaultInteractionStyle: Partial<TextStyleOptions> = {
	fontFamily: "Arial Rounded MT Bold",
	fontSize: 22,
	fill: "white",
	align: "right",
	wordWrap: true,
	wordWrapWidth: 400,
};

export class InteractionText extends Container {
	constructor(text: string) {
		super();
		const label = new Text({ text, style: defaultInteractionStyle });
		label.anchor.set(1, 0);
		label.position.set(-PADDING, PADDING);

		const background = new Graphics()
			.roundRect(
				-label.width - 2 * PADDING,
				0,
				label.width + 2 * PADDING,
				label.height + 2 * PADDING,
				8,
			)
			.fill({ color: "black", alpha: 0.7 });

		this.addChild(background, label);
	}
}

export function showInteractionText(text: string) {
	engine().navigation.showInteractionText(text);
}

export function hideInteractionText() {
	engine().navigation.hideInteractionText();
}
