import { Iteration1 } from "../storystate/Iteration1";
import { PreGameState } from "../storystate/PreGameState";
import type { StoryState } from "../storystate/StoryState";

let instance: StoryEngine | null;

export function storyEngine(): StoryEngine {
	if (!instance) {
		instance = new StoryEngine();
	}

	return instance;
}

export class StoryEngine {
	public spawnTile: number[] = [0, 0];

	public storyState: StoryState = new PreGameState();

	public loadIteration(iteration: StoryState) {
		this.storyState = iteration;
	}
}
