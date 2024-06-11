import React, { useState, useEffect, useRef } from 'react';
import './arena.css';
import FighterHealth from './fighterHealth';
import { getDamage, checkCriticalStrike } from './fight';
import pressKeys from '../../helpers/keyPressHelper';
import controls from '../../constants/controls';
import { createFight } from '../../services/domainRequest/fightRequest';

export default function Arena({ fighter1, fighter2 }) {
  const keys = pressKeys();
  const [currentHealth, setCurrentHealth] = useState({
    fighter1: fighter1.health,
    fighter2: fighter2.health,
  });
  const [fightLog, setFightLog] = useState([]);

  const currentHealthRef = useRef(currentHealth);

  const saveFightLog = async () => {
    await createFight({
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      log: fightLog,
    });
  };

  const handleAttack = ({ attacker, defender, defenderCurrentHealth }) => {
    const damage = getDamage(attacker, defender);
    const health = defenderCurrentHealth - damage;

    const logEntry = {
      [`${attacker.name}Shot`]: damage,
      [`${defender.name}Health`]: health >= 0 ? health : 0,
    };
    setFightLog((prev) => [...prev, logEntry]);

    return health;
  };

  function handleCriticalAttack({ attacker, defender, defendercurrentHealth }) {
    const damage = 2 * attacker.attack;
    const health = defendercurrentHealth - damage;

    const logEntry = {
      [`${attacker.name}Shot`]: damage,
      [`${defender.name}Health`]: health >= 0 ? health : 0,
    };
    setFightLog((prev) => [...prev, logEntry]);

    return health;
  }

  const keyUpHandler = (e) => {
    keys.delete(e.code);
  };

  const keyDownHandler = (e) => {
    //
    if (
      currentHealthRef.current.fighter1 <= 0 ||
      currentHealthRef.current.fighter2 <= 0
    )
      return;

    keys.set(e.code, true);

    let playerOneCriticalCooldown = false;
    let playerTwoCriticalCooldown = false;

    switch (e.code) {
      case controls.PlayerOneAttack:
        // prevent attacking if either player is blocking
        if (
          keys.data.has(controls.PlayerOneBlock) ||
          keys.data.has(controls.PlayerTwoBlock)
        )
          break;
        const playerTwoHealth = handleAttack({
          attacker: fighter1,
          defender: fighter2,
          defenderCurrentHealth: currentHealthRef.current.fighter2,
        });
        setCurrentHealth((prev) => ({ ...prev, fighter2: playerTwoHealth }));
        break;
      case controls.PlayerTwoAttack:
        // prevent attacking if either player is blocking
        if (
          keys.data.has(controls.PlayerOneBlock) ||
          keys.data.has(controls.PlayerTwoBlock)
        )
          break;
        const playerOneHealth = handleAttack({
          attacker: fighter2,
          defender: fighter1,
          defenderCurrentHealth: currentHealthRef.current.fighter1,
        });
        setCurrentHealth((prev) => ({ ...prev, fighter1: playerOneHealth }));
        break;
      default:
        break;
    }

    // fighter1 critical strike
    if (
      checkCriticalStrike(
        keys.data,
        controls.PlayerOneCriticalHitCombination
      ) &&
      !playerOneCriticalCooldown
    ) {
      const playerTwoHealth = handleCriticalAttack({
        attacker: fighter1,
        defender: fighter2,
        defenderCurrentHealth: currentHealthRef.current.fighter2,
      });
      setCurrentHealth((prev) => ({ ...prev, fighter2: playerTwoHealth }));
      playerOneCriticalCooldown = true;
      setTimeout(() => {
        playerOneCriticalCooldown = false;
      }, 10000);
    }

    // fighter2 critical strike
    if (
      checkCriticalStrike(
        keys.data,
        controls.PlayerTwoCriticalHitCombination
      ) &&
      !playerTwoCriticalCooldown
    ) {
      const playerOneHealth = handleCriticalAttack({
        attacker: fighter2,
        defender: fighter1,
        defenderCurrentHealth: currentHealthRef.current.fighter1,
      });
      setCurrentHealth((prev) => ({ ...prev, fighter1: playerOneHealth }));
      playerTwoCriticalCooldown = true;
      setTimeout(() => {
        playerTwoCriticalCooldown = false;
      }, 10000);
    }
  };

  useEffect(() => {
    if (currentHealth.fighter1 <= 0) {
      saveFightLog();
      alert(`${fighter2.name} Wins`);
    }

    if (currentHealth.fighter2 <= 0) {
      saveFightLog();
      alert(`${fighter1.name} Wins`);
    }
  }, [currentHealth]);

  useEffect(() => {
    currentHealthRef.current = currentHealth;
  }, [currentHealth]);

  useEffect(() => {
    window.addEventListener('keyup', keyUpHandler);
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keyup', keyUpHandler);
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div id='arena-wrapper'>
      <span id='vs__text'>VS</span>
      <div id='fighter1-wrapper'>
        <div>
          <span className='fighter__name'>{fighter1.name}</span>
          <FighterHealth
            maxHealth={fighter1.health}
            currentHealth={currentHealth.fighter1}
          />
        </div>
        <img
          style={{
            marginInline: 'auto',
          }}
          src='https://media1.tenor.com/m/ux2ZycBoVIYAAAAC/storm-x_men.gif'
          height={450}
          alt='Fighter'
        />
      </div>
      <div id='fighter2-wrapper'>
        <div>
          <span className='fighter__name'>{fighter2.name}</span>
          <FighterHealth
            maxHealth={fighter2.health}
            currentHealth={currentHealth.fighter2}
          />
        </div>
        <img
          style={{
            marginInline: 'auto',
            transform: 'scaleX(-1)',
          }}
          src='https://media1.tenor.com/m/ux2ZycBoVIYAAAAC/storm-x_men.gif'
          height={450}
          alt='Fighter'
        />
      </div>
    </div>
  );
}

// TODO: Refactor this component
