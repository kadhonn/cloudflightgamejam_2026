import { showInteractionText } from "../../ui/InteractionText.ts";
import type { StoryState } from "../storystate/StoryState";

export type StoryProgressionDelegate = (state: StoryState) => void;

export type EntityInteractionDelegate = () => void;

export abstract class EntityBaseState {
	public isInteractable: boolean;
	public interactionText: string;
	public interactionHint: string;
	public progressesStoryOnInteraction: boolean;

	public storyProgressionDelegate?: StoryProgressionDelegate;
	public entityInteractionDelegate?: EntityInteractionDelegate;

	protected constructor(
		isInteractable = false,
		interactionHint = "",
		interactionText = "",
		progressesStoryOnInteraction = false,
		storyProgressionDelegate?: StoryProgressionDelegate,
		entityInteractionDelegate?: EntityInteractionDelegate,
	) {
		this.isInteractable = isInteractable;
		this.interactionText = interactionText;
		this.interactionHint = interactionHint;
		this.progressesStoryOnInteraction = progressesStoryOnInteraction;
		this.storyProgressionDelegate = storyProgressionDelegate;
		this.entityInteractionDelegate = entityInteractionDelegate;
	}

	public interact(story: StoryState) {
		this.progress(story);
		if (this.entityInteractionDelegate) {
			this.entityInteractionDelegate();
		} else {
			// writing interaction text is a sensible default we can use as shorthand quite a lot
			if (this.interactionText.length > 0) {
				showInteractionText(this.interactionText);
			}
		}
	}

	public progress(story: StoryState) {
		if (this.progressesStoryOnInteraction) {
			// if we are progressing the story this means we load the next story slice
			// and execute additional custom progression behavior
			story.applyNextStorySlice();
			if (this.storyProgressionDelegate) {
				this.storyProgressionDelegate(story);
			}

			// things generally don't re-progress the story on re-interaction
			this.progressesStoryOnInteraction = false;
		}
	}
}
