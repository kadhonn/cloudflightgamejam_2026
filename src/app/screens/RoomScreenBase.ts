import { Container } from "pixi.js";
import type { AppScreen } from "../../engine/navigation/navigation";
import { FloorTile, type FloorType } from "../interior/FloorTile";
import type { WallTile } from "../interior/WallTile";

const TILE_SIZE = 16;
const SCALE_FACTOR = 4;

const ROOM_WIDTH = 23;
const ROOM_HEIGHT = 12;
const WALL_HEIGHT = 3;

const TOP_LEFT_OFFSET_X = 30;
const TOP_LEFT_OFFSET_Y = 200;

export abstract class RoomScreenBase extends Container implements AppScreen {
	public mainContainer: Container;

	constructor() {
		super();
		this.mainContainer = new Container();
		this.addChild(this.mainContainer);
	}

	public async drawRoom() {
		this.drawBackground(this.mainContainer);
		this.drawRoomEntities(this.mainContainer);
	}

	public abstract drawRoomEntities(container: Container): void;

	public abstract getWallTile(): WallTile;
	public abstract getFloorType(): FloorType;

	public async drawBackground(container: Container) {
		var floorTile = new FloorTile(this.getFloorType());
		floorTile.updatePosition(TOP_LEFT_OFFSET_X, TOP_LEFT_OFFSET_Y);
		floorTile.horizontalTiles = ROOM_WIDTH;
		floorTile.verticalTiles = ROOM_HEIGHT - WALL_HEIGHT;
		var wallTile = this.getWallTile();
		wallTile.matchPosition(floorTile);
		wallTile.matchWidth(floorTile);
		container.addChild(floorTile);
		container.addChild(wallTile);
	}

	public placeEntityByTile(sprite: Container, col: number, row: number) {
		const bottom = sprite.getLocalBounds().maxY * sprite.scale.y;
		sprite.x = TOP_LEFT_OFFSET_X + col * TILE_SIZE * SCALE_FACTOR;
		sprite.y = TOP_LEFT_OFFSET_Y + row * TILE_SIZE * SCALE_FACTOR - bottom;
	}

	public placeEntityByPixel(sprite: Container, x: number, y: number) {
		// even when placing "by pixel" we want to use the scale factor so we tend to
		// land on a multiple of SCALE_FACTOR (smallest positioning unit)
		const bottom = sprite.getLocalBounds().maxY * sprite.scale.y;
		sprite.x = TOP_LEFT_OFFSET_X + x * SCALE_FACTOR;
		sprite.y = TOP_LEFT_OFFSET_Y + y * SCALE_FACTOR - bottom;
	}

	public positionEntityOntoEntityByTile(
		positionedSprite: Container,
		baseSprite: Container,
		x: number,
		y: number,
	) {
		positionedSprite.x = x * TILE_SIZE * SCALE_FACTOR;
		positionedSprite.y = y * TILE_SIZE * SCALE_FACTOR;
		baseSprite.addChild(positionedSprite);
	}

	public positionEntityOntoEntityByPixel(
		positionedSprite: Container,
		baseSprite: Container,
		x: number,
		y: number,
	) {
		positionedSprite.x = x * SCALE_FACTOR;
		positionedSprite.y = y * SCALE_FACTOR;
		baseSprite.addChild(positionedSprite);
	}
}
