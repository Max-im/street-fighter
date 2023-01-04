import { Sprite } from './Sprite';

export class Drawer {
  public top = 0
  public left = 0
  public width = 1024
  public height = 567

  constructor(public ctx: CanvasRenderingContext2D, public background: Sprite, public shop: Sprite) {}

  static init(background: Sprite, shop: Sprite): Drawer {
    const canvas = <HTMLCanvasElement>document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Error while creating context');
    canvas.width = 1024;
    canvas.height = 567;

    document.body.appendChild(canvas);
    return new Drawer(ctx, background, shop);
  }

  animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.width, this.height)
      this.background.update(this.ctx);
      this.shop.update(this.ctx);
  }
}
