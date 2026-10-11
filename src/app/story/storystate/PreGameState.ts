import { Iteration1 } from "./Iteration1";
import { StorySlice } from "./StorySlice";
import { StoryState } from "./StoryState";

export class PreGameState extends StoryState {
	constructor() {
		super();
		// this is just to load the first state on initial transition into the game
	}

	public getNextIteration() {
		return new Iteration1();
	}

	public defineStorySliceList() {
		var initialStorySlice = new StorySlice(
			(storyState) => {},
			() => null,
		);

		return initialStorySlice;
	}
}
