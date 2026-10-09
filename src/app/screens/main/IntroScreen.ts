import { Container, Ticker, Text, TextStyle } from "pixi.js";

const GOAL_QUTOE = "\"Slept, awoke, slept, awoke, miserable life.\"";
const AUTHOR = "- Franz Kafka";
const ADDITION = ", from his diaries";
const TEXT_STYLE: Partial<TextStyle> = {
                    fill: '#ffffff',
                    fontSize: 72,
                    fontFamily: 'Arial',
                    align: 'right',
            dropShadow: {
                color: '#eeeeee',
                blur: 4,
                distance: 6,
                alpha: 0,
                angle: 0
            }
};

export class IntroScreen extends Container {
    public mainContainer: Container;
    public currentShownQuote: string;
    public quoteText: Text;
    public authorText: Text;
    private elapsed: number;

    constructor() {
        super();
        this.mainContainer = new Container();
        this.currentShownQuote = '';
        this.quoteText = new Text({
                text: '',
                style: TEXT_STYLE,
                y: this.height / 2 - 50,
                x: this.width / 2 - 150
            });
            console.log(this.height);
            console.log(this.width);
        this.authorText = new Text({
            text: '',
            style: TEXT_STYLE,
            y: this.height / 2 + 50,
            x: this.width / 2 - 50
        })
        this.addChild(this.mainContainer);
        this.elapsed = 0;
    }

    public resize(width: number, height: number) {
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        console.log(centerX);
        console.log(centerY);
        this.quoteText.x = centerX - 450;
        this.quoteText.y = centerY - 50;
        this.authorText.x = centerX - 50;
        this.authorText.y = centerY + 50;
    }

    public update(_time: Ticker) {
        this.elapsed += _time.deltaMS;
            if (this.currentShownQuote.length < GOAL_QUTOE.length) {
                if (this.elapsed > 100) {
                    this.currentShownQuote = this.currentShownQuote + GOAL_QUTOE[this.currentShownQuote.length];
                    this.quoteText.text = this.currentShownQuote;
                    this.elapsed = 0
                }
            } else {
                if (this.elapsed > 1000) {
                    if (this.authorText.text.length == 0) {
                        this.authorText.text = AUTHOR;
                    } else if (this.authorText.text.length == AUTHOR.length) {
                        this.authorText.text = AUTHOR + ADDITION;
                    }
                    this.elapsed = 0;
                }
            }
    }

    public async show(): Promise<void> {
        this.mainContainer.addChild(this.quoteText);
        this.mainContainer.addChild(this.authorText);
    }

}