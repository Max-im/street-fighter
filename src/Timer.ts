export class Timer {
    seconds = 60;
    private instance: number;

    constructor() {
        this.instance = setInterval(this.update, 1000);
    }

    finish() {    }

    update(ctx) {
        this.seconds--;
        console.log('timer');

    }
}