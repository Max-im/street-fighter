import { Drawer } from './Drawer';
import { Fighter } from './Fighter';
import { Sprite } from './Sprite';
import { Timer } from './Timer';

export interface IGameData {
  firstFighter: Fighter;
  secondFighter: Fighter;
  drawer: Drawer;
  sprites: Sprite[];
}

interface INotification {
  type: 'attack' | 'dead',
  payload: any
}

export interface Mediator {
  notify(sender: Fighter, event: INotification): void;
}
export class Game implements IGameData, Mediator {
  firstFighter: Fighter;
  secondFighter: Fighter;
  drawer: Drawer;
  sprites: Sprite[];
  timer: Timer;

  constructor(gameData: IGameData) {
    this.firstFighter = gameData.firstFighter;
    this.secondFighter = gameData.secondFighter;
    this.firstFighter.setMediator(this);
    this.secondFighter.setMediator(this);
    this.drawer = gameData.drawer;
    this.sprites = gameData.sprites;
    this.timer = new Timer();
  }

  private activeAttackCollision() : boolean {
    return (
      this.firstFighter.attackBox.position.x + this.firstFighter.attackBox.width >=
        this.secondFighter.position.x &&
      this.firstFighter.attackBox.position.x <=
        this.secondFighter.position.x + this.secondFighter.width &&
      this.firstFighter.attackBox.position.y + this.firstFighter.attackBox.height >=
        this.secondFighter.position.y &&
      this.firstFighter.attackBox.position.y <= this.secondFighter.position.y + this.secondFighter.height
    )
  }

  notify(sender: Fighter, event: INotification): void {
    if (event.type === 'attack') {
      const receiver = sender === this.firstFighter ? this.secondFighter : this.firstFighter;
      if (this.activeAttackCollision()) receiver.takeHit();
    } else if (event.type === 'dead') {
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.drawer.ctx.fillStyle = 'black';
    this.drawer.ctx.fillRect(0, 0, this.drawer.width, this.drawer.height);

    this.sprites.forEach((sprite) => sprite.update(this.drawer.ctx));

    if(!(this.firstFighter.control && this.secondFighter.control)) {
      throw new Error('Control not provided');
    }

    this.firstFighter.update(this.drawer.ctx);
    this.secondFighter.update(this.drawer.ctx);
  }
}
