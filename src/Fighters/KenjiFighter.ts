import { Sprite } from '../Sprite'
import { Fighter } from '../Fighter'

import { default as kenjiAtack } from '../../images/kenji/Attack1.png'
import { default as kenjiIdle } from '../../images/kenji/Idle.png'
import { default as kenjiRun } from '../../images/kenji/Run.png'
import { default as kenjiJump } from '../../images/kenji/Jump.png'
import { default as kenjiFall } from '../../images/kenji/Fall.png'
import { default as kenjiTakeHit } from '../../images/kenji/TakeHit.png'
import { default as kenjiDeath } from '../../images/kenji/Death.png';

const kenjiData = {
  position: { x: 750, y: 335 },
  velocity: { x: 0, y: 0 },
  imgSrc: kenjiIdle,
  framesMax: 4,
  scale: 2.5,
  offset: { x: 215, y: 170 },
  attackFrame: 1,
  fighterNum: 2,
  sprites: {
    idle: new Sprite({ imgSrc: kenjiIdle, framesMax: 4 }),
    run: new Sprite({ imgSrc: kenjiRun, framesMax: 8 }),
    jump: new Sprite({ imgSrc: kenjiJump, framesMax: 2 }),
    fall: new Sprite({ imgSrc: kenjiFall, framesMax: 2 }),
    attack1: new Sprite({ imgSrc: kenjiAtack, framesMax: 4 }),
    takeHit: new Sprite({ imgSrc: kenjiTakeHit, framesMax: 3 }),
    death: new Sprite({ imgSrc: kenjiDeath, framesMax: 7 })
  },
  attackBox: {
    offset: { x: 100, y: 50 },
    width: 160,
    height: 50
  }
}

export const kenjiFighter = new Fighter(kenjiData)
