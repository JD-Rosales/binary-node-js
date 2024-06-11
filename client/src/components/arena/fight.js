export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  const hitPower = fighter.power * criticalHitChance;

  return hitPower;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  const blockPower = fighter.defense * dodgeChance;

  return blockPower;
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);

  if (blockPower >= hitPower) return 0;

  return hitPower - blockPower;
}

export function checkCriticalStrike(pressedKeys, criticalCombination) {
  return criticalCombination.every((key) => pressedKeys.has(key));
}

export function handleAttack({ attacker, defender, defenderCurrentHealth }) {
  const damage = getDamage(attacker, defender);
  const health = defenderCurrentHealth - damage;

  return health;
}
