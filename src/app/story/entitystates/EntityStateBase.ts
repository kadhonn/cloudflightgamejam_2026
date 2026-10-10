import type { StoryState } from "../storystate/StoryState";

export type StoryProgressionDelegate = (state: StoryState) => void;

export type EntityInteractionDelegate = () => void;

export abstract class EntityBaseState {
	public isInteractable: boolean;
	public interactionText: string;
	public progressesStoryOnInteraction: boolean;

	public storyProgressionDelegate?: StoryProgressionDelegate;
	public entityInteractionDelegate?: EntityInteractionDelegate;

	protected constructor(
		isInteractable = false,
		interactionText = "",
		progressesStoryOnInteraction = false,
		storyProgressionDelegate?: StoryProgressionDelegate,
		entityInteractionDelegate?: EntityInteractionDelegate,
	) {
		this.isInteractable = isInteractable;
		this.interactionText = interactionText;
		this.progressesStoryOnInteraction = progressesStoryOnInteraction;
		this.storyProgressionDelegate = storyProgressionDelegate;
		this.entityInteractionDelegate = entityInteractionDelegate;
	}

	public interact(story: StoryState) {
		if (this.entityInteractionDelegate) {
			this.progress(story);
			this.entityInteractionDelegate();
		} else {
			// writing interaction text is a sensible default we can use as shorthand quite a lot
			if (this.interactionText.length > 0) {
				//Todo: implement temporary showing of interactionText
			}
		}
	}

	public progress(story: StoryState) {
		if (this.progressesStoryOnInteraction && this.storyProgressionDelegate) {
			this.storyProgressionDelegate(story);
		}
	}
}
