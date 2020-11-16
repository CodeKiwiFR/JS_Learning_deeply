const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack');
const strongAttackBtn = document.getElementById('strong-attack');
const healBtn = document.getElementById('heal');
const logBtn = document.getElementById('show-log');

function adjustHealthBars(maxLife) {
    monsterHealthBar.max = maxLife;
    monsterHealthBar.value = maxLife;
    playerHealthBar.max = maxLife;
    playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
    const dealtDamage = Math.random() * damage;
    monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
    return dealtDamage;
}

function dealPlayerDamage(damage) {
    const dealtDamage = Math.random() * damage;
    playerHealthBar.value = +playerHealthBar.value - dealtDamage;
    return dealtDamage;
}

function increasePlayerHealth(healValue) {
    return (playerHealthBar.value = Math.min(+playerHealthBar.value + healValue, chosenMaxLife));
}

function resetGame(value) {
    playerHealthBar.value = value;
    monsterHealthBar.value = value;
}

function setPlayerHealth(health) {
    playerHealthBar.value = health;
}
