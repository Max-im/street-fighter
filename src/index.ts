import { Sprite } from './Sprite';
import { Drawer } from './Drawer';
import { Game } from './Game';
import { Fighter } from './Fighter';

import { default as bgImage } from '../images/background.png';
import { default as shopImage } from '../images/shop.png';

import { default as mackAtack } from '../images/mack/Attack1.png';
import { default as mackIdle } from '../images/mack/Idle.png';
import { default as mackRun } from '../images/mack/Run.png';
import { default as mackJump } from '../images/mack/Jump.png';
import { default as mackFall } from '../images/mack/Fall.png';
import { default as mackTakeHit } from '../images/mack/TakeHit.png';
import { default as mackDeath } from '../images/mack/Death.png';

const drawer = Drawer.init()

const shop = new Sprite({
  position: { x: 650, y: 225 },
  imgSrc: shopImage,
  scale: 2,
  framesMax: 6
})
const background = new Sprite({ imgSrc: bgImage })

const sprites = [background, shop]

const data = {
  position: { x: 250, y: 335 },
  velocity: { x: 0, y: 0 },
  imgSrc: mackIdle,
  framesMax: 8,
  scale: 2.5,
  offset: { x: 215, y: 157 },
  color: 'red',
  sprites: {
    idle: { imgSrc: mackIdle, framesMax: 8 },
    run: { imgSrc: mackRun, framesMax: 8 },
    jump: { imgSrc: mackJump, framesMax: 2 },
    fall: { imgSrc: mackFall, framesMax: 2 },
    attack1: { imgSrc: mackAtack, framesMax: 6 },
    takeHit: { imgSrc: mackTakeHit, framesMax: 4 },
    death: { imgSrc: mackDeath, framesMax: 6 }
  },
  attackBox: {
    offset: { x: 100, y: 50 },
    width: 160,
    height: 50
  }
}

const firstFighter = new Fighter(data);
const secondFighter = new Fighter(data)

const game = new Game({
  firstFighter,
  secondFighter,
  sprites,
  drawer
})

game.animate()
