import { waitFor } from "../../../engine/utils/waitFor";
import { RoomType, transitionManager } from "../../screens/TransitionManager";
import {
	hideInteractionText,
	showInteractionText,
} from "../../ui/InteractionText";
import { showStoryText } from "../../ui/StoryText";
import { CouchTableMessState } from "../entitystates/CouchTableState";
import { StorySlice } from "./StorySlice";
import { StoryState } from "./StoryState";

export class Iteration1 extends StoryState {
	constructor() {
		super();
		// define initial state

		// bedroom
		this.bedRoomState.showClothes = false;
		this.bedRoomState.showPillBottle = false;
		this.bedRoomState.bedroomDoorState.isInteractable = true;
		this.bedRoomState.bedroomDoorState.interactionText =
			"She loved doing her makeup first thing in the morning.";
		this.bedRoomState.bedroomDoorState.isOpen = false;
		this.bedRoomState.makeupTableState.isInteractable = true;
		this.bedRoomState.makeupTableState.entityInteractionDelegate = () => {
			// TODO: start makeup minigame instead
			showInteractionText("You just did the makeup!");
			waitFor(3).then(() => hideInteractionText());
		};
		this.bedRoomState.makeupTableState.progressesStoryOnInteraction = true;
		this.bedRoomState.makeupTableState.storyProgressionDelegate = () => {
			showStoryText(
				"Feeling as pretty as usual, she was eager to start her day!",
			);
		};

		// living room
		this.livingRoomState.tableState.hasNote = false;
		this.livingRoomState.kitchenState.dirtyDishes = false;
		this.livingRoomState.couchTableState.messState = CouchTableMessState.NONE;
		this.livingRoomState.bathroomDoorState.isInteractable = true;
		this.livingRoomState.bathroomDoorState.interactionText =
			"He was still using the bathroom.";
		this.livingRoomState.bathroomDoorState.isOpen = false;
	}

	public getNextIteration() {
		return new Iteration1();
	}

	public defineStorySliceList() {
		var storySlice2 = new StorySlice(
			(storyState) => {},
			() => null,
		);
		var initialStorySlice = new StorySlice(
			(storyState) => {
				transitionManager().transition(RoomType.BEDROOM, RoomType.LIVINGROOM);
				showStoryText(
					"She liked doing the dishes in the morning. Such a great way to get into the groove for a productive work day!",
				);
			},
			() => storySlice2,
		);

		return initialStorySlice;
	}
}
