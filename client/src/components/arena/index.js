import React, { useState } from 'react';
import './arena.css';
import FighterHealth from './fighterHealth';
import { getHitPower, getBlockPower, getDamage } from './fight';

export default function Arena({ fighter1, fighter2 }) {
  const [health, setHealth] = useState({
    fighter1: fighter1.health,
    fighter2: fighter2.health,
  });

  return (
    <div id='arena-wrapper'>
      <span id='vs__text'>VS</span>
      <div id='fighter1-wrapper'>
        <div>
          <span className='fighter__name'>{fighter1.name}</span>
          <FighterHealth
            maxHealth={fighter1.health}
            currentHealth={health.fighter1}
          />
        </div>
        <img
          style={{
            marginInline: 'auto',
          }}
          src='https://media1.tenor.com/m/ux2ZycBoVIYAAAAC/storm-x_men.gif'
          height={450}
        />
      </div>
      <div id='fighter2-wrapper'>
        <div>
          <span className='fighter__name'>{fighter2.name}</span>
          <FighterHealth
            maxHealth={fighter2.health}
            currentHealth={health.fighter2}
          />
        </div>
        <img
          style={{
            marginInline: 'auto',
            transform: 'scaleX(-1)',
          }}
          src='https://media1.tenor.com/m/ux2ZycBoVIYAAAAC/storm-x_men.gif'
          height={450}
        />
      </div>
    </div>
  );
}
