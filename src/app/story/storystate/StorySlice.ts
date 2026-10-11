import type { StoryState } from "./StoryState";

// represents the changes on game state upon story progression
export class StorySlice {
	public applyStoryUpdateDelegate: (storyState: StoryState) => void;
	public getNextSliceDelegate: () => StorySlice | null;

	constructor(
		applyStoryUpdateDelegate: (storyState: StoryState) => void,
		getNextSliceDelegate: () => StorySlice | null,
	) {
		this.applyStoryUpdateDelegate = applyStoryUpdateDelegate;
		this.getNextSliceDelegate = getNextSliceDelegate;
	}
}
