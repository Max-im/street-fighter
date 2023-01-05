import { ICoordinates, Sprite } from './Sprite'

interface IFighterData {
  position: ICoordinates
  velocity: ICoordinates
  imgSrc: string
  framesMax: number
  scale: number
  offset: ICoordinates
  color: string
  sprites: {
    idle: { imgSrc: string; framesMax: number }
    run: { imgSrc: string; framesMax: number }
    jump: { imgSrc: string; framesMax: number }
    fall: { imgSrc: string; framesMax: number }
    attack1: { imgSrc: string; framesMax: number }
    takeHit: { imgSrc: string; framesMax: number }
    death: { imgSrc: string; framesMax: number }
  }
  attackBox: {
    offset: ICoordinates
    width: number
    height: number
  }
}

type FightersType = 'mack' | 'kenji'

export class Fighter extends Sprite {
  public velocity: ICoordinates
  public attackBox: {
    position: ICoordinates
    offset: ICoordinates
    width: number
    height: number
  }
  public health: number
  public dead: boolean
  public isAttacking: boolean
  public color: string
  public sprites: { [key: string]: { imgSrc: string; framesMax: number } } = {};

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
    this.color = data.color;
    this.isAttacking = false;

    for (const key in data.sprites) {
      // @ts-ignore
      this.sprites[key] = new Sprite({ imgSrc: data.sprites[key].imgSrc })
    }
  }
}
