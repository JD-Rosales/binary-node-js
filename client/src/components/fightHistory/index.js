import React from 'react';

import './fight.css';

export default function Fights({ fightList }) {
  return (
    <div id='fight-history__container'>
      {fightList.map((fight) => (
        <div key={fight.id}>
          <span>{`Fight ID: ${fight.id}`}</span>

          <ul>
            {fight.log.map((log, index) => (
              <li key={index}>
                {Object.entries(log).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}</strong>: {value}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// TODO redesign FightHistory
