import { Fighter } from './Fighter'

interface IMovementMap {
  left: string;
  right: string;
  up: string;
  attack: string;
}

export class Control {
  public move = {
    left: { pressed: false },
    right: { pressed: false }, 
    up: { pressed: false }, 
    attack: { pressed: false }, 
  }

  constructor(public fighter: Fighter, public movementMap: IMovementMap) {
    fighter.control = this;
    window.addEventListener('keydown', this.keydownHandle.bind(this));
    window.addEventListener('keyup', this.keyupHandle.bind(this));
  }

  keyupHandle(event: KeyboardEvent) {
    if (this.fighter.dead) return;

    if (event.key === this.movementMap.left) {
      this.move.left.pressed = false;
    } else if (event.key === this.movementMap.right) {
      this.move.right.pressed = false;
    }
  }

  keydownHandle(event: KeyboardEvent) {
    if (this.fighter.dead) return;

    if (event.key === this.movementMap.left) {
      this.move.left.pressed = true;
      this.fighter.lastKey = this.movementMap.left;
    } else if (event.key === this.movementMap.right) {
      this.move.right.pressed = true;
      this.fighter.lastKey = this.movementMap.right;
    } else if (event.key === this.movementMap.up) {
      this.fighter.velocity.y = -20
    } else if (event.key === this.movementMap.attack) {
      this.fighter.attack();
    }
  }
}
