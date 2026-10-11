import { BedRoomState } from "../roomstates/BedRoomState";
import { LivingRoomState } from "../roomstates/LivingRoomState";
import type { StorySlice } from "./StorySlice";

export abstract class StoryState {
	public livingRoomState = new LivingRoomState();
	public bedRoomState = new BedRoomState();

	public nextStorySlice: StorySlice;

	constructor() {
		this.nextStorySlice = this.defineStorySliceList();
	}

	public abstract getNextIteration(): StoryState;

	public abstract defineStorySliceList(): StorySlice;
}
