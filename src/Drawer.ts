export class Drawer {
  public top = 0
  public left = 0
  public width = 1024
  public height = 567

  constructor(public ctx: CanvasRenderingContext2D) {}

  static init(): Drawer {
    const canvas = <HTMLCanvasElement>document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Error while creating context');
    canvas.width = 1024;
    canvas.height = 567;

    document.body.appendChild(canvas);
    return new Drawer(ctx);
  }
}
