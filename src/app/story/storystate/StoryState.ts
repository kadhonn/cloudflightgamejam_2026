import { BedRoomState } from "../roomstates/BedRoomState";
import { LivingRoomState } from "../roomstates/LivingRoomState";
import type { StorySlice } from "./StorySlice";

export abstract class StoryState {
	public livingRoomState = new LivingRoomState();
	public bedRoomState = new BedRoomState();
	public kidsRoomState = new BedRoomState();

	public nextStorySlice: StorySlice;

	constructor() {
		this.nextStorySlice = this.defineStorySliceList();
	}

	public applyNextStorySlice() {
		const slice = this.nextStorySlice;
		const nextSlice = slice.getNextSliceDelegate();
		if (nextSlice) {
			this.nextStorySlice = nextSlice;
		}
		slice.applyStoryUpdateDelegate(this);
	}

	public abstract getNextIteration(): StoryState;

	public abstract defineStorySliceList(): StorySlice;
}
