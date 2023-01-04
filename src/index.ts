import { Sprite } from "./Sprite";
import { Drawer } from "./Drawer";
import * as bgImage from '../images/background.png';
import * as shopImage from '../images/shop.png';
import { Game } from "./Game";
import { Fighter } from "./Fighter";

const drawer = Drawer.init();

const shop = new Sprite({
    position: { x: 650, y: 225 },
    imgSrc: shopImage.default,
    scale: 2,
    framesMax: 6
});
const background = new Sprite({imgSrc: bgImage.default});

const sprites = [
    background, 
    shop
];

const firstFighter = new Fighter();
const secondFighter = new Fighter();

const game = new Game({
    firstFighter,
    secondFighter,
    sprites,
    drawer
});

game.animate();