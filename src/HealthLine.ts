export class HealthLine {
    private health = 100;
    private height = 30;
    private fighterNum: 1 | 2;

    constructor(fighterNum: 1 | 2) {
        this.fighterNum = fighterNum;
    }

    minusHealth(val: number) {
        this.health -= val;
    }

    hasHealth() {
        return this.health > 0;
    }

    update(ctx: any) {
        ctx.fillStyle = 'red';
        const healthLen = (1024 - 100) / 2;
        const gap = this.fighterNum === 1 ? 0 : 80;
        const startFrom = 10 + healthLen * (this.fighterNum - 1) + gap;
        const currentHealth = healthLen * this.health / 100;
        const currentHealthGap = this.fighterNum === 1 ? 0 : healthLen - currentHealth;
        ctx.fillRect(startFrom, 10, healthLen, this.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(startFrom, 10, healthLen, this.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(startFrom + currentHealthGap, 10, currentHealth, this.height);
    }
}