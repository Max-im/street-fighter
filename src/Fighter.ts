
export class Fighter {
    health: number;

    constructor() {
        this.health = 100;
    }

    minusHealth(hit: number) {
        this.health -= hit;
    }
}
