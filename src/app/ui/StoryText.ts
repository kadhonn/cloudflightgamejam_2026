import type { TextOptions, TextStyleOptions } from "pixi.js";
import { Text } from "pixi.js";
import { engine } from "../getEngine.ts";

const defaultLabelStyle: Partial<TextStyleOptions> = {
	fontFamily: "Arial Rounded MT Bold",
	fill: "white",
	align: "center",
	wordWrap: true,
	wordWrapWidth: 800,
};

export class StoryText extends Text {
	constructor(opts?: TextOptions) {
		const style = { ...defaultLabelStyle, ...opts?.style };
		super({ ...opts, style });
		// Label is always centred, but this can be changed in instance afterwards
		this.anchor.set(0.5);
	}
}

export function showStoryText(text: string) {
	engine().navigation.showStoryText(text);
}

export function hideStoryText() {
	engine().navigation.hideStoryText();
}
