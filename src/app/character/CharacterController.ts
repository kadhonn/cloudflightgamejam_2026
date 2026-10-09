type ControlKey = "up" | "down" | "left" | "right";

const keyMap: { [key: string]: ControlKey } = {
  KeyW: "up",
  ArrowUp: "up",
  KeyA: "left",
  ArrowLeft: "left",
  KeyS: "down",
  ArrowDown: "down",
  KeyD: "right",
  ArrowRight: "right",
};

type KeyControl = {
  pressed: boolean;
  doubleTap: boolean;
  timestamp: number;
};

type KeyControls = {
  [key in ControlKey]: KeyControl;
};

export class CharacterController {
  keys: KeyControls;

  keyDownHandler = (event: KeyboardEvent) => {
    const key = keyMap[event.code];

    if (!key) return;

    const now = Date.now();

    // If not already in the double-tap state, toggle the double tap state if the key was pressed twice within 300ms.
    this.keys[key].doubleTap =
      this.keys[key].doubleTap || now - this.keys[key].timestamp < 300;

    // Toggle on the key pressed state.
    this.keys[key].pressed = true;
  };

  keyUpHandler = (event: KeyboardEvent) => {
    const key = keyMap[event.code];

    if (!key) return;

    const now = Date.now();

    // Reset the key pressed state.
    this.keys[key].pressed = false;

    // Reset double tap only if the key is in the double-tap state.
    if (this.keys[key].doubleTap) this.keys[key].doubleTap = false;
    // Otherwise, update the timestamp to track the time difference till the next potential key down.
    else this.keys[key].timestamp = now;
  };

  constructor() {
    // The controller's state.
    this.keys = {
      up: { pressed: false, doubleTap: false, timestamp: 0 },
      left: { pressed: false, doubleTap: false, timestamp: 0 },
      down: { pressed: false, doubleTap: false, timestamp: 0 },
      right: { pressed: false, doubleTap: false, timestamp: 0 },
    };
  }

  activate() {
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  }

  deactivate() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }
}
