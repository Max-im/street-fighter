interface ICoordinates {
  x: number
  y: number
}

interface ISpriteData {
  position?: ICoordinates
  imgSrc: string;
  scale?: number
  framesMax?: number
  offset?: ICoordinates
}

export class Sprite {
    position: ICoordinates;
    width: number;
    height: number;
    image = new Image();
    scale: number;
    framesMax: number;
    framesCurrent: number;
    framesElapsed: number;
    framesHold: number;
    offset: ICoordinates;

  constructor(data: ISpriteData) {
    this.position = data.position || { x: 0, y: 0 }
    this.width = 50;
    this.height = 150;
    this.image.src = data.imgSrc;
    this.scale = data.scale || 1;
    this.framesMax = data.framesMax || 1;
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.offset = data.offset || { x: 0, y: 0 }
  }

  draw(ctx: any) {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update(ctx: any) {
    this.draw(ctx);
    this.animateFrames();
  }
}
