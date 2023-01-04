import { Drawer } from "./Drawer";
import { Fighter } from "./Fighter";
import { Sprite } from "./Sprite";

export interface IGameData {
    firstFighter: Fighter;
    secondFighter: Fighter;
    drawer: Drawer;
    sprites: Sprite[];
}

export class Game implements IGameData{
    firstFighter: Fighter; 
    secondFighter: Fighter;
    drawer: Drawer;
    sprites: Sprite[];

    constructor(gameData: IGameData) {
        this.firstFighter = gameData.firstFighter;
        this.secondFighter = gameData.secondFighter;
        this.drawer = gameData.drawer;
        this.sprites = gameData.sprites;
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.drawer.ctx.fillStyle = 'black';
        this.drawer.ctx.fillRect(0, 0, this.drawer.width, this.drawer.height);
        this.sprites.forEach(sprite => {
            sprite.update(this.drawer.ctx);
        });
    }
}