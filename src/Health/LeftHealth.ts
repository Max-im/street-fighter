import { Fighter } from "../Fighter";
import { Health } from "./Health";

export class LeftHealth extends Health {
    public gap: number;
    public currentHealthGap: number;
    public nameGap: number;
    public textStart: number;
    public startFrom: number;
    public shiftMultiply: number;

    constructor(fighter: Fighter) {
        super(fighter);
        this.gap = 0;
        this.startFrom = 10 + this.gap;
        this.shiftMultiply = 0;
        this.currentHealthGap = 0;
        this.nameGap = 0;
        this.textStart = 20;
    }
}