import React from 'react';
import './arena.css';

export default function FighterHealth({ maxHealth, currentHealth }) {
  const healthPercentage = (currentHealth / maxHealth) * 100;

  return (
    <div className='health-bar__container'>
      <div
        className='health-bar__inner'
        style={{ width: `${healthPercentage}%` }}
      ></div>
      <span className='health-bar__text'>{`${Math.round(
        healthPercentage
      )}%`}</span>
    </div>
  );
}
