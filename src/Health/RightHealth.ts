import { Fighter } from "../Fighter";
import { Health } from "./Health";

export class RightHealth extends Health {
    public gap: number;
    public nameGap: number;
    public textStart: number;
    public startFrom: number;
    public shiftMultiply: number;

    constructor(fighter: Fighter) {
        super(fighter);
        this.shiftMultiply = 1;
        this.gap = 80;
        this.startFrom = this.gap + this.healthLen;
        this.nameGap = 0;
        this.textStart = this.healthLen - 60;
    }
}