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
  type: 'attack' | 'dead' | 'timeLeft',
  payload: any
}

export interface Mediator {
  notify(sender: Fighter, event: INotification): void;
  active: boolean;
}
export class Game implements IGameData, Mediator {
  firstFighter: Fighter;
  secondFighter: Fighter;
  drawer: Drawer;
  sprites: Sprite[];
  timer: Timer;
  active = true;

  constructor(gameData: IGameData) {
    this.firstFighter = gameData.firstFighter;
    this.secondFighter = gameData.secondFighter;
    this.firstFighter.setMediator(this);
    this.secondFighter.setMediator(this);
    this.drawer = gameData.drawer;
    this.sprites = gameData.sprites;
    this.timer = new Timer(this);
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

  notify(sender: Fighter | undefined, event: INotification): void {
    if (event.type === 'attack') {
      const receiver = sender === this.firstFighter ? this.secondFighter : this.firstFighter;
      if (this.activeAttackCollision()) receiver.takeHit();
    } else if (event.type === 'dead') {
      this.active = false;
      this.timer.stopTimer();
      const winner = sender === this.firstFighter ? this.secondFighter : this.firstFighter;
      this.showResultMessage(`${winner.name} WIN!`);
    } else if (event.type === 'timeLeft') {
      this.active = false;
      const firstFighterHealth = this.firstFighter.health.getHealth();
      const secondFighterHealth = this.secondFighter.health.getHealth();

      let message = 'Draw!';
      if (firstFighterHealth > secondFighterHealth) {
        message =`${this.firstFighter.name} WIN!`;
        this.secondFighter.kill();
      }
      else if(firstFighterHealth < secondFighterHealth) {
        message =`${this.secondFighter.name} WIN!`;
        this.firstFighter.kill();
      }
      this.showResultMessage(message);
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

    this.timer.update(this.drawer.ctx);
  }

  private showResultMessage(msg: string) {
    const ctx = this.drawer.ctx;
    ctx.fillStyle = "#000000";
    ctx.font="50px Georgia";

    const textSwitch = 1024 / 2 - msg.length * 15 / 2;
    ctx.fillText(msg, textSwitch, 567 / 2, 100);
  }
}
