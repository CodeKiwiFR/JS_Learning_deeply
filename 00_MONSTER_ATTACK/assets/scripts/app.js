const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 30;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_STRONG_ATTACK_VALUE = 40;
const HEAL_VALUE = 50;
const NUMBER_OF_BONUS = '3';

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler(strength) {
    const damage = dealMonsterDamage(strength);
    currentMonsterHealth -= damage;
    endRound(strength);
}

function healIfNecessary() {
    bonusRemaining = parseInt(bonusLifeEl.innerText);
    if (isNaN(bonusRemaining) || bonusRemaining === 0) {
        return;
    }
    if (currentPlayerHealth <= 0) {
        bonusRemaining -= 1;
        currentPlayerHealth = increasePlayerHealth(HEAL_VALUE);
        bonusLifeEl.innerText = bonusRemaining.toString();
    }
}

function reset() {
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    bonusLifeEl.innerText = NUMBER_OF_BONUS;
    resetGame(chosenMaxLife);
}

function endRound(strength) {
    const playerDamage = dealPlayerDamage(strength === ATTACK_VALUE ? MONSTER_ATTACK_VALUE : MONSTER_STRONG_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    healIfNecessary();
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('Monster killed you, sorry about this...');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('You have a draw...');
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function healHandler() {
    bonusRemaining = parseInt(bonusLifeEl.innerText);
    if (isNaN(bonusRemaining) || bonusRemaining === 0) {
        return;
    } else if (currentPlayerHealth === chosenMaxLife) {
        alert('Your life bar is full');
        return;
    }
    bonusRemaining -= 1;
    currentPlayerHealth = increasePlayerHealth(HEAL_VALUE);
    bonusLifeEl.innerText = bonusRemaining.toString();
    endRound(ATTACK_VALUE);
}

bonusLifeEl.innerText = NUMBER_OF_BONUS;
attackBtn.addEventListener('click', () => attackHandler(ATTACK_VALUE));
strongAttackBtn.addEventListener('click', () => attackHandler(STRONG_ATTACK_VALUE));
healBtn.addEventListener('click', healHandler);
bonusLifeEl.addEventListener('click', healHandler);
