import { Container, Rectangle, Sprite, Texture, type Ticker } from "pixi.js";
import type { AppScreen } from "../../engine/navigation/navigation";
import type { Character } from "../character/Character";
import { CharacterController } from "../character/CharacterController";
import { Her } from "../character/Her";
import { FloorTile, type FloorType } from "../interior/FloorTile";
import type { WallTile } from "../interior/WallTile";
import type { EntityBaseState } from "../story/entitystates/EntityStateBase";
import { StoryState } from "../story/storystate/StoryState";
import { InteractionText } from "../ui/InteractionText.ts";
import { StoryText } from "../ui/StoryText.ts";

const TILE_SIZE = 16;
const SCALE_FACTOR = 4;

const ROOM_WIDTH = 23;
const ROOM_HEIGHT = 12;
const WALL_HEIGHT = 3;

const TOP_LEFT_OFFSET_X = 30;
const TOP_LEFT_OFFSET_Y = 200;

const INTERACTION_RADIUS = 15;

// distance of the interaction text from the room's top-right corner
const INTERACTION_TEXT_OFFSET = 16;

// the idea here is that only the feet of the character collide with entities
// to allow the character to stand before them and visually overlap
// this is used to determine how much of the character sprite is considered feet
// to determine that collision box
const FEET_HEIGHT_RATIO = 0.1;

export abstract class RoomScreenBase extends Container implements AppScreen {
	public mainContainer: Container;
	public her: Character;
	public controller: CharacterController;

	private obstacles: Rectangle[] = [];
	private interactables: [Rectangle, EntityBaseState][] = [];

	private storyText: StoryText | null = null;
	private interactionText: InteractionText | null = null;
	private roomTop = TOP_LEFT_OFFSET_Y;

	// TODO: should be one story state shared across all rooms, not one per room
	protected storyState = new StoryState();

	private wasInteractPressed = false;
	private currentInteractionContext: EntityBaseState | undefined;

	constructor() {
		super();
		this.mainContainer = new Container();
		this.addChild(this.mainContainer);

		this.her = new Her();
		this.controller = new CharacterController();
	}

	public async show() {
		this.controller.activate();
	}

	public async hide() {
		this.controller.deactivate();
	}

	public update(ticker: Ticker) {
		const view = this.her.view;
		const previousX = view.x;
		const previousY = view.y;

		this.moveCharacter(ticker);

		// prevent character from walking into walls/objects
		if (!this.canStandAt(this.getFeetArea())) {
			view.x = previousX;
			view.y = previousY;
		}

		const interactionContext = this.getInteractionContext(this.getFeetArea());
		if (interactionContext !== this.currentInteractionContext) {
			this.currentInteractionContext = interactionContext;
			if (interactionContext) {
				this.showInteractionText(
					interactionContext.interactionText || "You could interact here",
				);
			} else {
				this.hideInteractionText();
			}
		}

		// interact once per key press, not on every frame the key is held down
		const interactPressed = this.controller.keys.interact.pressed;
		if (interactPressed && !this.wasInteractPressed) {
			this.getInteractionContext(this.getFeetArea())?.interact(this.storyState);
		}
		this.wasInteractPressed = interactPressed;
	}

	private getRectangleForEntity(entity: Container) {
		const local =
			entity instanceof Sprite && entity.texture !== Texture.EMPTY
				? new Rectangle(0, 0, entity.texture.width, entity.texture.height)
				: entity.getLocalBounds().rectangle;
		return new Rectangle(
			entity.x + local.x * entity.scale.x,
			entity.y + local.y * entity.scale.y,
			local.width * entity.scale.x,
			local.height * entity.scale.y,
		);
	}

	private getInteractionRectangleForEntity(entity: Container) {
		return this.padForInteraction(this.getRectangleForEntity(entity));
	}

	// grows an rectangle by the interaction radius on all sides
	private padForInteraction(rectangle: Rectangle) {
		return rectangle.clone().pad(INTERACTION_RADIUS * SCALE_FACTOR);
	}

	public addObstacleForEntity(entity: Container) {
		this.obstacles.push(this.getRectangleForEntity(entity));
	}

	public addInteractableForEntity(
		entity: Container,
		interactionContext: EntityBaseState,
	) {
		this.addInteractableForInteractableRectangle(
			this.getInteractionRectangleForEntity(entity),
			interactionContext,
		);
	}

	public addInteractableForRectangle(
		rectangle: Rectangle,
		interactionContext: EntityBaseState,
	) {
		this.addInteractableForInteractableRectangle(
			this.padForInteraction(rectangle),
			interactionContext,
		);
	}

	private addInteractableForInteractableRectangle(
		rectangle: Rectangle,
		interactionContext: EntityBaseState,
	) {
		this.interactables.push([rectangle, interactionContext]);
	}

	public addObstacleByTile(
		col: number,
		row: number,
		widthInTiles: number,
		heightInTiles: number,
	) {
		const tile = TILE_SIZE * SCALE_FACTOR;
		this.obstacles.push(
			new Rectangle(
				TOP_LEFT_OFFSET_X + col * tile,
				TOP_LEFT_OFFSET_Y + row * tile,
				widthInTiles * tile,
				heightInTiles * tile,
			),
		);
	}

	// the floor's boundary box
	private getFloorArea(): Rectangle {
		return new Rectangle(
			TOP_LEFT_OFFSET_X,
			TOP_LEFT_OFFSET_Y,
			ROOM_WIDTH * TILE_SIZE * SCALE_FACTOR,
			(ROOM_HEIGHT - WALL_HEIGHT) * TILE_SIZE * SCALE_FACTOR,
		);
	}

	// the character's feet boundary box
	private getFeetArea(): Rectangle {
		const view = this.her.view;
		const bounds = view.getLocalBounds();
		const width = bounds.width * view.scale.x;
		const feetHeight = bounds.height * view.scale.y * FEET_HEIGHT_RATIO;
		return new Rectangle(
			view.x + bounds.minX * view.scale.x,
			view.y + bounds.maxY * view.scale.y - feetHeight,
			width,
			feetHeight,
		);
	}

	private canStandAt(feet: Rectangle): boolean {
		return (
			this.getFloorArea().containsRect(feet) &&
			!this.obstacles.some((obstacle) => obstacle.intersects(feet))
		);
	}

	private getInteractionContext(feet: Rectangle): EntityBaseState | undefined {
		// only consider entities that are interactable as per their current state
		// (a `return` inside forEach would only leave the callback, hence find)
		return this.interactables.find(
			([rect, context]) => context.isInteractable && feet.intersects(rect),
		)?.[1];
	}

	private moveCharacter(ticker: Ticker) {
		if (this.controller.keys.up.pressed) {
			this.her.up(ticker.deltaTime);
		}
		if (this.controller.keys.down.pressed) {
			this.her.down(ticker.deltaTime);
		}
		if (this.controller.keys.left.pressed) {
			this.her.left(ticker.deltaTime);
		}
		if (this.controller.keys.right.pressed) {
			this.her.right(ticker.deltaTime);
		}
	}

	// Tile the character starts on when entering the room
	// TODO: should probably be set by transition delegates
	// maybe warrants a separate transision manager class
	public getPlayerStartTile(): { col: number; row: number } {
		return {
			col: Math.floor(ROOM_WIDTH / 2),
			row: Math.ceil((ROOM_HEIGHT - WALL_HEIGHT) / 2),
		};
	}

	public async drawRoom() {
		await this.drawBackground(this.mainContainer);
		await this.drawRoomEntities(this.mainContainer);

		// always draw last to have character on top layer
		this.drawCharacter();
	}

	public abstract drawRoomEntities(container: Container): Promise<void> | void;

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

		// the wall is anchored at its bottom, so its top is the room's top edge
		this.roomTop = wallTile.y - wallTile.height * wallTile.scale.y;
	}

	public async drawCharacter() {
		await this.her.show(this.mainContainer);
		const { col, row } = this.getPlayerStartTile();
		this.placeEntityByTile(this.her.view, col, row, false);
	}

	public placeEntityByTile(
		sprite: Container,
		col: number,
		row: number,
		isObstacle = true,
	) {
		const bottom = sprite.getLocalBounds().maxY * sprite.scale.y;
		sprite.x = TOP_LEFT_OFFSET_X + col * TILE_SIZE * SCALE_FACTOR;
		sprite.y = TOP_LEFT_OFFSET_Y + row * TILE_SIZE * SCALE_FACTOR - bottom;
		if (isObstacle) {
			this.addObstacleForEntity(sprite);
		}
	}

	public placeEntityByPixel(
		sprite: Container,
		x: number,
		y: number,
		isObstacle = true,
	) {
		// even when placing by pixel we want to use the scale factor so we
		// tend to land on a multiple of SCALE_FACTOR (smallest positioning unit)
		const bottom = sprite.getLocalBounds().maxY * sprite.scale.y;
		sprite.x = TOP_LEFT_OFFSET_X + x * SCALE_FACTOR;
		sprite.y = TOP_LEFT_OFFSET_Y + y * SCALE_FACTOR - bottom;
		if (isObstacle) {
			this.addObstacleForEntity(sprite);
		}
	}

	public positionEntityOntoEntityByTile(
		positionedSprite: Container,
		baseSprite: Container,
		x: number,
		y: number,
		isObstacle = true,
	) {
		positionedSprite.x = x * TILE_SIZE * SCALE_FACTOR;
		positionedSprite.y = y * TILE_SIZE * SCALE_FACTOR;
		baseSprite.addChild(positionedSprite);
		if (isObstacle) {
			this.addObstacleForEntity(positionedSprite);
		}
	}

	public positionEntityOntoEntityByPixel(
		positionedSprite: Container,
		baseSprite: Container,
		x: number,
		y: number,
		isObstacle = true,
	) {
		positionedSprite.x = x * SCALE_FACTOR;
		positionedSprite.y = y * SCALE_FACTOR;
		baseSprite.addChild(positionedSprite);
		if (isObstacle) {
			this.addObstacleForEntity(positionedSprite);
		}
	}
	public showStoryText(text: string): void {
		if (this.storyText !== null) {
			this.removeChild(this.storyText);
		}
		this.storyText = new StoryText();
		this.storyText.text = text;
		this.storyText.x = this.mainContainer.width / 2;
		this.storyText.y = this.mainContainer.height - 100;
		this.addChild(this.storyText);
	}

	public hideStoryText(): void {
		if (this.storyText !== null) {
			this.removeChild(this.storyText);
			this.storyText = null;
		}
	}

	public showInteractionText(text: string): void {
		this.hideInteractionText();
		this.interactionText = new InteractionText(text);
		// pinned to the top-right corner of the room
		this.interactionText.position.set(
			TOP_LEFT_OFFSET_X +
				ROOM_WIDTH * TILE_SIZE * SCALE_FACTOR -
				INTERACTION_TEXT_OFFSET,
			this.roomTop + INTERACTION_TEXT_OFFSET,
		);
		this.addChild(this.interactionText);
	}

	public hideInteractionText(): void {
		if (this.interactionText !== null) {
			this.removeChild(this.interactionText);
			this.interactionText = null;
		}
	}
}
