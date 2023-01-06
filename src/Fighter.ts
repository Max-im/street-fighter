import { Control } from './Control';
import { Game, Mediator } from './Game';
import { ICoordinates, ISpriteData, Sprite } from './Sprite';

interface IFighterData {
  position: ICoordinates
  velocity: ICoordinates
  imgSrc: string
  framesMax: number
  scale: number
  offset: ICoordinates
  sprites: {
    idle: Sprite;
    run: Sprite;
    jump: Sprite;
    fall: Sprite;
    attack1: Sprite;
    takeHit: Sprite;
    death: Sprite;
  }
  attackBox: {
    offset: ICoordinates
    width: number
    height: number
  }
}


class FighterComponent extends Sprite {
  protected mediator: Mediator;

  constructor(spriteData: ISpriteData, mediator?: Mediator) {
      super(spriteData);
      this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
      this.mediator = mediator;
  }
}

export class Fighter extends FighterComponent {
  public velocity: ICoordinates
  public attackBox: {
    position: ICoordinates
    offset: ICoordinates
    width: number
    height: number
  }
  public lastKey: undefined | string;
  public health: number
  public dead: boolean
  public isAttacking: boolean
  public sprites: { [key: string]: Sprite };
  public control: Control | undefined;

  constructor(data: IFighterData) {
    super({
      position: data.position,
      imgSrc: data.imgSrc,
      scale: data.scale,
      framesMax: data.framesMax,
      offset: data.offset
    });
    this.velocity = data.velocity;
    this.width = 50;
    this.height = 150;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      offset: data.attackBox.offset,
      width: data.attackBox.width,
      height: data.attackBox.height
    };
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.dead = false;
    this.isAttacking = false;
    this.sprites = data.sprites;
  }

  attack() {
    this.switchSprite('attack1');
    this.isAttacking = true;
    this.mediator.notify(this, {type: 'attack', payload: ''});
  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) {
      this.switchSprite('death')
    } else this.switchSprite('takeHit')
  }

  switchSprite(sprite: string) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true
      return
    }

    // overriding all other animations with the attack animation
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return

    // override when fighter gets hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break

      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break

      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.framesCurrent = 0
        }
        break

      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break

      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break
    }
  }

  update(ctx: any) {
    this.draw(ctx);
    if (!this.dead) this.animateFrames();

    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    // draw the attack box
    // ctx.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // )

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // gravity function
    // if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
    //   this.velocity.y = 0
    //   this.position.y = 330
    // } else this.velocity.y += gravity
  }
}
