import { Fighter } from './Fighter'

interface IMovementMap {
  left: string;
  right: string;
  up: string;
  attack: string;
}

export class Control {
  public canAttack = true;
  public isJumped = false;

  constructor(public fighter: Fighter, public movementMap: IMovementMap) {
    fighter.control = this;
    window.addEventListener('keydown', this.keydownHandle.bind(this));
    window.addEventListener('keyup', this.keyupHandle.bind(this));
  }

  keyupHandle(event: KeyboardEvent) {
    if (this.fighter.dead) return;

    if (event.key === this.movementMap.left) {
      this.fighter.stop();
    } else if (event.key === this.movementMap.right) {
      this.fighter.stop();
    }
  }

  keydownHandle(event: KeyboardEvent) {
    if (this.fighter.dead) return;

    if (event.key === this.movementMap.left) {
      this.fighter.moveBack();
    } else if (event.key === this.movementMap.right) {
      this.fighter.move();
    } else if (event.key === this.movementMap.up && !this.isJumped) {
      this.fighter.jump();
      this.isJumped = true;
    } else if (event.key === this.movementMap.attack && this.canAttack) {
      this.fighter.attack();
      this.canAttack = false;
    }
  }
}
