import React from 'react';
import './arena.css';

export default function FighterHealth({ maxHealth, currentHealth }) {
  const healthPercentage = (currentHealth / maxHealth) * 100;
  const healthPercentageText = Math.round(healthPercentage);

  return (
    <div className='health-bar__container'>
      <div
        className='health-bar__inner'
        style={{ width: `${healthPercentage > 0 ? healthPercentage : 0}%` }}
      ></div>
      <span className='health-bar__text'>{`${
        healthPercentageText > 0 ? healthPercentageText : 0
      }%`}</span>
    </div>
  );
}
