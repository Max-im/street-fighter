import { Fighter } from "./Fighter";

export class HealthLine {
    private health = 100;
    private height = 30;
    private fighterNum: 1 | 2;
    private fighter: Fighter;

    constructor(fighterNum: 1 | 2, fighter: Fighter) {
        this.fighterNum = fighterNum;
        this.fighter = fighter;
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
        const nameGap = this.fighterNum === 1 ? 0 : healthLen - 20;
        ctx.fillRect(startFrom, 10, healthLen, this.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(startFrom, 10, healthLen, this.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(startFrom + currentHealthGap, 10, currentHealth, this.height);
        ctx.fillStyle = "#000000";
        ctx.font="20px Georgia";
        const textStart = this.fighterNum === 1 ? 20 : startFrom + nameGap - 40;
        ctx.fillText(this.fighter.name , textStart, this.height);
    }
}