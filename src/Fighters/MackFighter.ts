import { Sprite } from '../Sprite';
import { Fighter } from '../Fighter';

import { default as mackAtack } from '../../images/mack/Attack1.png';
import { default as mackIdle } from '../../images/mack/Idle.png';
import { default as mackRun } from '../../images/mack/Run.png';
import { default as mackJump } from '../../images/mack/Jump.png';
import { default as mackFall } from '../../images/mack/Fall.png';
import { default as mackTakeHit } from '../../images/mack/TakeHit.png';
import { default as mackDeath } from '../../images/mack/Death.png';

const mackData = {
    position: { x: 250, y: 335 },
    velocity: { x: 0, y: 0 },
    imgSrc: mackIdle,
    framesMax: 8,
    scale: 2.5,
    offset: { x: 215, y: 157 },
    attackFrame: 4,
    fighterNum: 1,
    sprites: {
      idle: new Sprite({ imgSrc: mackIdle, framesMax: 8 }),
      run: new Sprite({ imgSrc: mackRun, framesMax: 8 }),
      jump: new Sprite({ imgSrc: mackJump, framesMax: 2 }),
      fall: new Sprite({ imgSrc: mackFall, framesMax: 2 }),
      attack1: new Sprite({ imgSrc: mackAtack, framesMax: 6 }),
      takeHit: new Sprite({ imgSrc: mackTakeHit, framesMax: 4 }),
      death: new Sprite({ imgSrc: mackDeath, framesMax: 6 })
    },
    attackBox: {
      offset: { x: 100, y: 50 },
      width: 160,
      height: 50
    }
  }

export const mackFighter = new Fighter(mackData);