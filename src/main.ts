import { setEngine } from "./app/getEngine.ts";
import { LoadScreen } from "./app/screens/LoadScreen.ts";
import { IntroScreen } from "./app/screens/main/IntroScreen.ts";
import { userSettings } from "./app/utils/userSettings.ts";
import { CreationEngine } from "./engine/engine.ts";

/**
 * Importing these modules will automatically register there plugins with the engine.
 */
import "@pixi/sound";
import { Assets } from "pixi.js";
// import "@esotericsoftware/spine-pixi-v8";

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

(async () => {
  // Initialize the creation engine instance
  await engine.init({
    background: "#1E1E1E",
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
  });

  // temporary asset preload
  await Assets.load([
    {
      alias: "her",
      src: "https://pixijs.com/assets/bunny.png",
    },
  ]);

  // Initialize the user settings
  userSettings.init();

  // Show the load screen
  await engine.navigation.showScreen(LoadScreen);
  // Show the main screen once the load screen is dismissed
  await engine.navigation.showScreen(IntroScreen);
})();
