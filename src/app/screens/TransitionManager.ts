import type { AppScreenConstructor } from "../../engine/navigation/navigation";
import { engine } from "../getEngine";
import { storyEngine } from "../story/storyengine/StoryEngine";

let instance: TransitionManager | null;

export function transitionManager(): TransitionManager {
	if (!instance) {
		instance = new TransitionManager();
	}

	return instance;
}

type RoomDictionary<T> = {
	[K in TransitionTargetType]: T;
};

export enum TransitionTargetType {
	BEDROOM,
	LIVINGROOM,
    KIDS,
	WAKEUP,
    MAKEUP,
}

const LIVING_ROOM_ENTRY_TILES: RoomDictionary<number[]> = {
	[TransitionTargetType.LIVINGROOM]: [-1, -1],
	[TransitionTargetType.BEDROOM]: [2, 0],
	[TransitionTargetType.WAKEUP]: [-1, -1],
	[TransitionTargetType.MAKEUP]: [-1, -1],
	[TransitionTargetType.KIDS]: [16, 0],
};

const BED_ROOM_ENTRY_TILES: RoomDictionary<number[]> = {
	[TransitionTargetType.LIVINGROOM]: [2, 0],
	[TransitionTargetType.BEDROOM]: [-1, -1],
	[TransitionTargetType.WAKEUP]: [12, 0],
	[TransitionTargetType.MAKEUP]: [6, 2],
	[TransitionTargetType.KIDS]: [-1, -1],
};

const KIDS_ROOM_ENTRY_TILES: RoomDictionary<number[]> = {
	[TransitionTargetType.LIVINGROOM]: [2, 0],
	[TransitionTargetType.BEDROOM]: [-1, -1],
	[TransitionTargetType.WAKEUP]: [12, 0],
	[TransitionTargetType.MAKEUP]: [6, 2],
	[TransitionTargetType.KIDS]: [-1, -1],
};

const DESTINATION_TILE_SELECTION: RoomDictionary<RoomDictionary<number[]>> = {
	[TransitionTargetType.LIVINGROOM]: LIVING_ROOM_ENTRY_TILES,
	[TransitionTargetType.BEDROOM]: BED_ROOM_ENTRY_TILES,
	[TransitionTargetType.WAKEUP]: BED_ROOM_ENTRY_TILES,
	[TransitionTargetType.MAKEUP]: BED_ROOM_ENTRY_TILES,
	[TransitionTargetType.KIDS]: KIDS_ROOM_ENTRY_TILES,
};

const DESTINATION_SCREEN: RoomDictionary<() => Promise<AppScreenConstructor>> =
	{
		[TransitionTargetType.LIVINGROOM]: async () =>
			(await import("./livingroom/LivingRoomScreen")).LivingRoomScreen,
		[TransitionTargetType.BEDROOM]: async () =>
			(await import("./bedroom/BedRoomScreen")).BedRoomScreen,
		[TransitionTargetType.WAKEUP]: async () =>
			(await import("./bedroom/BedRoomScreen")).BedRoomScreen,
        [TransitionTargetType.MAKEUP]: async () =>
            (await import("../screens/makeup/MakeupGameScreen")).MakeupGameScreen,
        [TransitionTargetType.KIDS]: async () =>
            (await import("./kidsroom/KidsRoomScreen")).KidsRoomScreen,
	};

export class TransitionManager {
	constructor() {
		this.preloadScreens();
	}

	// loads the code of all screens in the background, so the first transition
	// into a room doesn't have to wait for it (import() results are cached)
    // this is an attempt to make kids room load faster on first enter
	public preloadScreens() {
		for (const loadScreen of Object.values(DESTINATION_SCREEN)) {
			void loadScreen();
		}
	}

	public async transition(from: TransitionTargetType, to: TransitionTargetType) {
		if (from === to && from !== TransitionTargetType.WAKEUP) {
			throw "Invalid transition!";
		}

		storyEngine().spawnTile = DESTINATION_TILE_SELECTION[to][from];
		engine().navigation.showScreen(await DESTINATION_SCREEN[to]());
	}

	public async transitionToNewIteration() {
		if (storyEngine().storyState.getNextIteration()) {
			storyEngine().loadIteration(storyEngine().storyState.getNextIteration());
		}
		storyEngine().spawnTile =
			DESTINATION_TILE_SELECTION[TransitionTargetType.WAKEUP][TransitionTargetType.WAKEUP];
		engine().navigation.showScreen(await DESTINATION_SCREEN[TransitionTargetType.WAKEUP]());
	}
}
