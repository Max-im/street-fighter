import { Game } from "./Game";

export class Timer {
    secondsLeft = 60;
    private instance: number;
    private game: Game;
    private width = 50;

    constructor(game: Game) {
        this.game = game;
        this.instance = setInterval(() => this.secondsLeft--, 1000);
    }

    draw(ctx: any) {
        const strartPoint = 1024 / 2 - 30;
        ctx.fillStyle = 'white';
        ctx.fillRect(strartPoint, 10, this.width, this.width);

        ctx.strokeStyle = 'black';
        ctx.strokeRect(strartPoint, 10, this.width, this.width);

        ctx.fillStyle = "#000000";
        ctx.font="26px Georgia";
        let xSwitch = 10;
        if (this.secondsLeft.toString().length === 1) xSwitch = 15;
        ctx.fillText(this.secondsLeft, strartPoint + xSwitch, 40, this.width);
    }

    private timeLeft() {
        this.game.notify(undefined, {type: 'timeLeft', payload: null});
    }

    stopTimer() {
        clearInterval(this.instance);
    }

    update(ctx: any) {
        this.draw(ctx);

        if (this.secondsLeft <= 0) {
            clearInterval(this.instance);
            this.timeLeft();
        }
    }
}