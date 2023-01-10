import { Control } from './Control';
import { Mediator } from './Game';
import { ICoordinates, ISpriteData, Sprite } from './Sprite';

interface IFighterData {
  position: ICoordinates
  velocity: ICoordinates
  imgSrc: string
  framesMax: number
  attackFrame: number
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
  public sprites: { [key: string]: Sprite };
  public control: Control | undefined;
  public gravity = 0.7;
  public attackFrame: number;
  private killed = false;

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
    this.attackFrame = data.attackFrame;
    this.dead = false;
    this.sprites = data.sprites;
  }

  private setSpriteState(sprite: Sprite) {
    this.image = sprite.image;
    this.framesMax = sprite.framesMax;
    this.framesCurrent = 0;
  }

  move() {
    if (this.dead || this.killed) return;
    this.setSpriteState(this.sprites.run);
    this.velocity.x = +5;
  }
  
  moveBack() {
    if (this.dead || this.killed) return;
    this.setSpriteState(this.sprites.run);
    this.velocity.x = -5;
  }
  
  stop() {
    if (this.dead || this.killed) return;
    this.setSpriteState(this.sprites.idle);
    this.velocity.x = 0;
  }

  attack() {
    if (this.dead || this.killed) return;
    this.setSpriteState(this.sprites.attack1);
  }
  
  jump() {
    if (this.dead || this.killed) return;
    this.setSpriteState(this.sprites.jump);
    this.velocity.y = -20;
  }

  kill() {
    if (this.image !== this.sprites.death.image) {
      this.setSpriteState(this.sprites.death);
      this.killed = true;
    }
  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) return this.kill();
    this.setSpriteState(this.sprites.takeHit);
  }

  update(ctx: any) {
    this.draw(ctx);
    if (!this.dead) this.animateFrames();
    if (this.image === this.sprites.idle.image) this.control!.canAttack = true;

    // move attack box
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // gravity function
    if (this.position.y + this.height + this.velocity.y >= 567 - 96) {
      this.velocity.y = 0
      this.position.y = 330
    } else this.velocity.y += this.gravity;


    // attack notify
    if (this.image === this.sprites.attack1.image && this.framesCurrent === this.framesMax - 1) {
      this.mediator.notify(this, {type: 'attack', payload: ''});
    }

    // stop attack
    if (this.image === this.sprites.attack1.image && this.framesCurrent === this.framesMax - 1) {
      this.setSpriteState(this.sprites.idle);
      this.control!.canAttack = true;
    }

    // change jumping sprites
    if (this.velocity.y < 0) this.setSpriteState(this.sprites.jump);
    else if (this.velocity.y > 0) this.setSpriteState(this.sprites.fall);
    
    // change skin after jump
    if (this.control?.isJumped && this.position.y === 330) {
      this.setSpriteState(this.sprites.idle);
      this.control!.isJumped = false;
      this.control.canAttack = true;
    }

    // change skin after taking a hit
    if (this.image === this.sprites.takeHit.image && this.framesCurrent === this.framesMax - 1) {
      this.setSpriteState(this.sprites.idle);
    }

    // dead
    if (this.image === this.sprites.death.image && this.framesCurrent === this.framesMax - 1) {
      this.dead = true;
      this.mediator.notify(this, {type: 'dead', payload: ''});
    }
  }
}
