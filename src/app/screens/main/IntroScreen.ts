import { Container, Text, TextStyle } from "pixi.js";
import { MainScreen } from "./MainScreen.ts";
import type { AppScreen } from "../../../engine/navigation/navigation.ts";

const QUOTE = '"Slept, awoke, slept, awoke, miserable life."';
const AUTHOR = "- Franz Kafka";
const ADDITION = ", from his diaries";
const TEXT_STYLE: Partial<TextStyle> = {
  fill: "#ffffff",
  fontSize: 72,
  fontFamily: "Arial",
  align: "right",
  dropShadow: {
    color: "#eeeeee",
    blur: 4,
    distance: 6,
    alpha: 0,
    angle: 0,
  },
};

const QUOTE_DURATION_MS = QUOTE.length * 100;

export class IntroScreen extends Container implements AppScreen {
  public mainContainer: Container;
  textContainer: Container;
  public quoteText: Text;
  public authorText: Text;
  private startTimeMs!: number;
  private skipListener = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      MainScreen.show();
    }
  };

  constructor() {
    super();
    this.mainContainer = new Container();
    this.textContainer = new Container();
    this.quoteText = new Text({
      style: TEXT_STYLE,
    });
    this.quoteText.anchor.set(0.5);
    this.authorText = new Text({
      style: {
        ...TEXT_STYLE,
        fontSize: 48,
      },
    });
    this.addChild(this.mainContainer);
    this.mainContainer.addChild(this.textContainer);
    this.textContainer.addChild(this.quoteText);
    this.textContainer.addChild(this.authorText);
  }

  resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    this.quoteText.x = centerX;
    this.quoteText.y = centerY;
    this.authorText.y = centerY + this.quoteText.style.fontSize;
  }

  update() {
    // we don't rely on the ticker as we want actual time durations instead of relative speed.
    const elapsed = performance.now() - this.startTimeMs;
    this.quoteText.text = QUOTE.substring(
      0,
      QUOTE.length * (Math.min(elapsed, QUOTE_DURATION_MS) / QUOTE_DURATION_MS),
    );
    // keep the author text left-aligned with the actual quote
    this.authorText.x = this.quoteText.x - this.quoteText.width / 2;

    if (elapsed >= QUOTE_DURATION_MS + 3000) {
      MainScreen.show();
    } else if (elapsed >= QUOTE_DURATION_MS + 2000) {
      this.authorText.text = AUTHOR + ADDITION;
    } else if (elapsed >= QUOTE_DURATION_MS + 1000) {
      this.authorText.text = AUTHOR;
    }
  }

  async show() {
    this.startTimeMs = performance.now();
    window.addEventListener("keydown", this.skipListener);
  }

  async hide() {
    window.removeEventListener("keydown", this.skipListener);
  }
}
