<template>
  <div class="game-buttons">
    <button @click.prevent="handleAttack" class="button _attack">Attack</button>
    <button @click.prevent="handleSpecialAttack" class="button _special-attack">
      Special Attack
    </button>
    <button @click.prevent="handleHeal" class="button _heal">Heal</button>
    <button @click.prevent="restartGame" class="button _restart">
      Restart
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GameButtons",
  methods: {
    ...mapActions({
      pushStats: "pushStats",
      restartGame: "restartGame",
      addCombatLog: "addCombatLog",
    }),
    monsterAttack() {
      const monsterDamage = Math.floor(Math.random() * 10) + 1;
      const logMessage = `Monster hits player for <span class="_damage">${monsterDamage} damage</span> (${
        this.playerHealth
      } -> ${this.playerHealth - monsterDamage})`;
      this.addCombatLog(logMessage);
      this.pushStats({
        player: this.playerHealth - monsterDamage,
      });
    },
    playerAttack() {
      const playerDamage = Math.floor(Math.random() * 10) + 1;
      const logMessage = `Player hits monster for <span class="_damage">${playerDamage} damage</span> (${
        this.monsterHealth
      } -> ${this.monsterHealth - playerDamage})`;
      this.addCombatLog(logMessage);
      this.pushStats({
        monster: this.monsterHealth - playerDamage,
      });
    },
    playerSpecialAttack() {
      const playerDamage = Math.floor(Math.random() * 10) + 5;
      const logMessage = `Player hits monster for <span class="_damage">${playerDamage} damage with SPECIAL attack</span> (${
        this.monsterHealth
      } -> ${this.monsterHealth - playerDamage})`;
      this.addCombatLog(logMessage);
      this.pushStats({
        monster: this.monsterHealth - playerDamage,
      });
    },
    playerHeal() {
      const playerHeal = Math.floor(Math.random() * 20) + 1;
      const logMessage = `Player heals for <span class="_heal">${playerHeal} health</span> (${
        this.playerHealth
      } -> ${this.playerHealth + playerHeal})`;
      this.addCombatLog(logMessage);
      this.pushStats({
        player:
          this.playerHealth + playerHeal < 100
            ? this.playerHealth + playerHeal
            : 100,
      });
    },
    handleAttack() {
      this.playerAttack();
      this.monsterAttack();
    },
    handleSpecialAttack() {
      this.playerSpecialAttack();
      this.monsterAttack();
    },
    handleHeal() {
      this.playerHeal();
      this.monsterAttack();
    },
  },
  computed: {
    ...mapGetters({
      playerHealth: "getPlayerHealth",
      monsterHealth: "getMonsterHealth",
    }),
  },
};
</script>

<style scoped lang="scss">
.game-buttons {
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.button {
  font-size: 18px;
  font-weight: bold;
  padding: 10px 0;
  border: 1px solid rgba(#000, 0.4);
  border-radius: 6px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  &:hover {
    transform: scale(1.02) rotate(1deg);
  }
  &._attack {
    background-color: #df2935;
  }
  &._special-attack {
    background-color: #3772ff;
  }
  &._heal {
    background-color: #00cc00;
  }
  &._restart {
    background-color: #fdca40;
  }
}
</style>
