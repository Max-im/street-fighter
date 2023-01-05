import { Sprite } from './Sprite'
import { Drawer } from './Drawer'
import { Game } from './Game'
import { Control } from './Control'

import { default as bgImage } from '../images/background.png'
import { default as shopImage } from '../images/shop.png'

import { mackFighter } from './Fighters/MackFighter'
import { kenjiFighter } from './Fighters/KenjiFighter'

const drawer = Drawer.init()

const shop = new Sprite({
  position: { x: 650, y: 225 },
  imgSrc: shopImage,
  scale: 2,
  framesMax: 6
})
const background = new Sprite({ imgSrc: bgImage })

const sprites = [background, shop]


new Control(mackFighter, { left: 'a', right: 'd', up: 'w', attack: ' ' });
new Control(kenjiFighter, {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  attack: 'ArrowDown'
})

const game = new Game({
  firstFighter: mackFighter,
  secondFighter: kenjiFighter,
  sprites,
  drawer
})

game.animate();
