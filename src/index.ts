import { Sprite } from "./Sprite";
import { Drawer } from "./Drawer";
import * as bgImage from '../images/background.png';

const background = new Sprite({imgSrc: bgImage.default});
const drawer = Drawer.init(background);
drawer.animate();