
import { TransitionTargetType, transitionManager } from "../../screens/TransitionManager";
import { showStoryText } from "../../ui/StoryText";
import { CouchTableMessState } from "../entitystates/CouchTableState";
import { Iteration2 } from "./Iteration2";
import { StorySlice } from "./StorySlice";
import { StoryState } from "./StoryState";

export class Iteration1 extends StoryState {
	constructor() {
		super();
		// define initial state

		// bedroom
		this.bedRoomState.makeupTableState.showPills = false;
		this.bedRoomState.exitDoorState.isInteractable = true;
		this.bedRoomState.exitDoorState.interactionHint = "Exit bedroom";
		this.bedRoomState.exitDoorState.interactionText = "She really liked doing her makeup every morning.";
		this.bedRoomState.exitDoorState.isOpen = false;
		this.bedRoomState.makeupTableState.isInteractable = true;
        this.bedRoomState.makeupTableState.interactionHint = "Do makeup."
        this.bedRoomState.makeupTableState.interactionText = ""
		this.bedRoomState.makeupTableState.entityInteractionDelegate = () => {
			transitionManager().transition(TransitionTargetType.BEDROOM, TransitionTargetType.MAKEUP);
		};
		this.bedRoomState.makeupTableState.progressesStoryOnInteraction = true;

		// living room
		this.livingRoomState.tableState.hasNote = false;
		this.livingRoomState.kitchenState.dirtyDishes = true;
		this.livingRoomState.kitchenState.interactionHint = "Do the dishes";
		this.livingRoomState.kitchenState.progressesStoryOnInteraction = true;
        this.livingRoomState.kitchenState.isInteractable = true;
		this.livingRoomState.couchTableState.messState = CouchTableMessState.NONE;
		this.livingRoomState.bathroomDoorState.isInteractable = true;
		this.livingRoomState.bathroomDoorState.interactionHint =
			"Enter bathroom.";
        this.livingRoomState.bathroomDoorState.interactionText =
			"He was still using the bathroom.";
		this.livingRoomState.bathroomDoorState.isOpen = false;
        this.livingRoomState.bedroomDoorState.isOpen = true;
        this.livingRoomState.bedroomDoorState.isInteractable = true;
        this.livingRoomState.bedroomDoorState.interactionHint = "Enter bedroom";
        this.livingRoomState.bedroomDoorState.entityInteractionDelegate = () => {
            transitionManager().transition(TransitionTargetType.LIVINGROOM, TransitionTargetType.BEDROOM);
        };
        this.livingRoomState.kidsroomDoorState.isOpen = true;
        this.livingRoomState.kidsroomDoorState.isInteractable = true;
		this.livingRoomState.kidsroomDoorState.interactionHint =
			"Enter kid's room.";
        this.livingRoomState.kidsroomDoorState.entityInteractionDelegate = () => {
            transitionManager().transition(TransitionTargetType.LIVINGROOM, TransitionTargetType.KIDS);
        };

        this.livingRoomState.exitDoorState.isInteractable = true;
        this.livingRoomState.exitDoorState.interactionHint = "Go to work.";
        this.livingRoomState.exitDoorState.interactionText = "She was not ready yet to go to work.";
        
        this.kidsRoomState.exitDoorState.isOpen = true;
        this.kidsRoomState.exitDoorState.isInteractable = true;
        this.kidsRoomState.exitDoorState.interactionHint = "Exit kids room";
        this.kidsRoomState.exitDoorState.entityInteractionDelegate = () => {
            transitionManager().transition(TransitionTargetType.KIDS, TransitionTargetType.LIVINGROOM);
        };

        showStoryText(
            "What a beautiful day it is today! As always, she started her day by putting on some makeup."
        );
	}

	public getNextIteration() {
		return new Iteration2();
	}

	public defineStorySliceList() {
		var noteReadSlice = new StorySlice(
			(storyState) => {
                showStoryText("He always knew how to make her start her work day with a smile. Speaking of, she had to leave now to catch the early bus.");
                storyState.livingRoomState.exitDoorState.entityInteractionDelegate = () => {
                    transitionManager().transitionToNewIteration();
                };
			},
			() => null,
		);
		var kidsRoomExitedSlice = new StorySlice(
			(storyState) => {
                showStoryText("He left a note for her, he must have left in a hurry that day.");
                storyState.livingRoomState.tableState.isInteractable = true;
                storyState.livingRoomState.tableState.hasNote = true;
                storyState.livingRoomState.tableState.noteText = "Hey babe, had to leave already! Early meetings today. Hope you have a great day! Love you!";
                storyState.livingRoomState.tableState.interactionHint = "Read note";
                storyState.livingRoomState.tableState.progressesStoryOnInteraction = true;
                storyState.livingRoomState.bathroomDoorState.interactionText = "She quickly read the note, since she was already running late for work.";
                // TODO: note popup on note interaction
			},
			() => noteReadSlice,
		);
		var kidsRoomEnteredSlice = new StorySlice(
			(storyState) => {
                showStoryText("The room looked as tidy as usual. The little one always cleaned it up properly. She heard her husband shuffle about in the living room.");
                storyState.kidsRoomState.exitDoorState.progressesStoryOnInteraction = true;
			},
			() => kidsRoomExitedSlice,
		);
		var dishesDoneSlice = new StorySlice(
			(storyState) => {
                showStoryText("The little one already left for school, but she always loved making sure the kids room is cleaned up as well.");
                storyState.livingRoomState.kitchenState.isInteractable = false;
                storyState.livingRoomState.kitchenState.dirtyDishes = false;
                storyState.livingRoomState.kidsroomDoorState.progressesStoryOnInteraction = true;
			},
			() => kidsRoomEnteredSlice,
		);
		var exitedBedroomSlice = new StorySlice(
			(storyState) => {
                storyState.livingRoomState.kitchenState.progressesStoryOnInteraction = true;
                showStoryText(
					"She liked doing the dishes in the morning. Such a great way to get into the groove for a productive work day!",
				);
			},
			() => dishesDoneSlice,
		);
		var makeupDoneSlice = new StorySlice(
			(storyState) => {
                storyState.bedRoomState.exitDoorState.isOpen = true;
                storyState.bedRoomState.exitDoorState.progressesStoryOnInteraction = true;
                storyState.bedRoomState.exitDoorState.entityInteractionDelegate = () => {
                    transitionManager().transition(TransitionTargetType.BEDROOM, TransitionTargetType.LIVINGROOM);
                };
                storyState.bedRoomState.makeupTableState.isInteractable = false;
                showStoryText(
				    "Feeling as pretty as usual, she was eager to start her day."
			    );
            },
			() => exitedBedroomSlice,
		);

		return makeupDoneSlice;
	}
}
