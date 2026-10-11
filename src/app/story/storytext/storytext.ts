import { StoryTexts } from "./storytexts.ts";

export function getTextFor(iteration: number, key: string): string {
	//@ts-expect-error
	return StoryTexts[iteration][key] as string;
}
