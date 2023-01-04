import { Sprite } from "./Sprite";
import { Drawer } from "./Drawer";
import * as bgImage from '../images/background.png';
import * as shopImage from '../images/shop.png';


const shop = new Sprite({
    position: { x: 600, y: 128 },
    imgSrc: shopImage.default,
    scale: 2.75,
    framesMax: 6
});
const background = new Sprite({imgSrc: bgImage.default});
const drawer = Drawer.init(background, shop);
drawer.animate();