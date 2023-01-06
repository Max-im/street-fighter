import { Drawer } from './Drawer';
import { Fighter } from './Fighter';
import { Sprite } from './Sprite';

export interface IGameData {
  firstFighter: Fighter;
  secondFighter: Fighter;
  drawer: Drawer;
  sprites: Sprite[];
}

interface INotification {
  type: 'attack',
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

  constructor(gameData: IGameData) {
    this.firstFighter = gameData.firstFighter;
    this.secondFighter = gameData.secondFighter;
    this.firstFighter.setMediator(this);
    this.secondFighter.setMediator(this);
    this.drawer = gameData.drawer;
    this.sprites = gameData.sprites;
  }

  rectangularCollision({ rectangle1, rectangle2 }: {rectangle1: Fighter, rectangle2: Fighter}) : boolean {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
  }

  notify(sender: Fighter, event: INotification): void {
    const receiver = sender === this.firstFighter ? this.secondFighter : this.firstFighter;
    if (this.rectangularCollision({rectangle1: this.firstFighter, rectangle2: this.secondFighter})) {
      receiver.takeHit();
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.drawer.ctx.fillStyle = 'black'
    this.drawer.ctx.fillRect(0, 0, this.drawer.width, this.drawer.height)
    this.sprites.forEach((sprite) => {
      sprite.update(this.drawer.ctx)
    })

    if (!(this.firstFighter.control && this.secondFighter.control))
      throw new Error('Control not provided')

    this.firstFighter.velocity.x = 0;
    this.secondFighter.velocity.x = 0;

    if (this.firstFighter.control.move.right.pressed) {
      this.firstFighter.velocity.x = +5;
      this.firstFighter.switchSprite('run');
    } else if (this.firstFighter.control.move.left.pressed) {
      this.firstFighter.velocity.x = -5;
      this.firstFighter.switchSprite('run');
    } else {
      this.firstFighter.switchSprite('idle');
    }
    this.firstFighter.update(this.drawer.ctx);

    if (this.secondFighter.control.move.right.pressed) {
      this.secondFighter.velocity.x = +5;
      this.secondFighter.switchSprite('run');
    } else if (this.secondFighter.control.move.left.pressed) {
      this.secondFighter.velocity.x = -5;
      this.secondFighter.switchSprite('run');
    } else {
      this.secondFighter.switchSprite('idle');
    }
    this.secondFighter.update(this.drawer.ctx);
  }
}
