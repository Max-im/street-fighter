import { Fighter } from "../Fighter";

export abstract class Health {
    protected health = 100;
    protected height = 30;
    protected fighter: Fighter;
    protected healthLen = (1024 - 100) / 2;

    abstract gap: number;
    abstract startFrom: number;
    abstract nameGap: number;
    abstract textStart: number;
    abstract shiftMultiply: number;

    constructor(fighter: Fighter) {
        this.fighter = fighter;
    }

    minusHealth(val: number) {
        this.health -= val;
    }

    getHealth() {
        return this.health;
    }

    hasHealth() {
        return this.health > 0;
    }

    update(ctx: any) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.startFrom, 20, this.healthLen, this.height);

        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.startFrom, 20, this.healthLen, this.height);
        
        ctx.fillStyle = 'blue';
        const currentHealth = this.healthLen * this.health / 100;
        const healthShift = (this.healthLen - currentHealth) * this.shiftMultiply + this.startFrom;
        const healthStart = this.health > 0 ? healthShift : 0;
        ctx.fillRect(healthStart, 20, currentHealth, this.height);
        
        ctx.fillStyle = "#000000";
        ctx.font="20px Georgia";
        ctx.fillText(this.fighter.name, this.startFrom + this.textStart, this.height + 10);
    }
}