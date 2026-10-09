import { Container } from "pixi.js";
import type { AppScreen } from "../../../engine/navigation/navigation.ts";

/**
 * Example screen for showing of arbitrary functionality
 */
export class ExampleScreen extends Container implements AppScreen {
    constructor() {
        super();
    }
}