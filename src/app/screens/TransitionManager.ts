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
	[K in RoomType]: T;
};

export enum RoomType {
	BEDROOM,
	LIVINGROOM,
	WAKEUP,
}

const LIVING_ROOM_ENTRY_TILES: RoomDictionary<number[]> = {
	[RoomType.LIVINGROOM]: [-1, -1],
	[RoomType.BEDROOM]: [2, 3],
	[RoomType.WAKEUP]: [-1, -1],
};

const BED_ROOM_ENTRY_TILES: RoomDictionary<number[]> = {
	[RoomType.LIVINGROOM]: [2, 3],
	[RoomType.BEDROOM]: [-1, -1],
	[RoomType.WAKEUP]: [4, 4],
};

const DESTINATION_TILE_SELECTION: RoomDictionary<RoomDictionary<number[]>> = {
	[RoomType.LIVINGROOM]: LIVING_ROOM_ENTRY_TILES,
	[RoomType.BEDROOM]: BED_ROOM_ENTRY_TILES,
	[RoomType.WAKEUP]: BED_ROOM_ENTRY_TILES,
};

const DESTINATION_SCREEN: RoomDictionary<() => Promise<AppScreenConstructor>> =
	{
		[RoomType.LIVINGROOM]: async () =>
			(await import("./livingroom/LivingRoomScreen")).LivingRoomScreen,
		[RoomType.BEDROOM]: async () =>
			(await import("./bedroom/BedRoomScreen")).BedRoomScreen,
		[RoomType.WAKEUP]: async () =>
			(await import("./bedroom/BedRoomScreen")).BedRoomScreen,
	};

export class TransitionManager {
	constructor() {}

	public async transition(from: RoomType, to: RoomType) {
		if (from === to) {
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
			DESTINATION_TILE_SELECTION[RoomType.WAKEUP][RoomType.WAKEUP];
		engine().navigation.showScreen(await DESTINATION_SCREEN[RoomType.WAKEUP]());
	}
}
