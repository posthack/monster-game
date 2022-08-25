<template>
  <div class="game-buttons">
    <button
      :disabled="isLoading"
      @click.prevent="handleAttack"
      class="button _attack"
    >
      Attack
    </button>
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
    }),
    monsterAttack() {
      let monsterDamage = Math.floor(Math.random() * 10) + 1;
      console.log("monster attack -> ", monsterDamage);
      this.pushStats({
        player: this.playerHealth - monsterDamage,
      });
    },
    playerAttack() {
      let playerDamage = Math.floor(Math.random() * 10) + 1;
      console.log("player attack -> ", playerDamage);
      this.pushStats({
        monster: this.monsterHealth - playerDamage,
      });
    },
    playerSpecialAttack() {
      let playerDamage = Math.floor(Math.random() * 10) + 5;
      console.log("player SPECIAL attack -> ", playerDamage);
      this.pushStats({
        monster: this.monsterHealth - playerDamage,
      });
    },
    playerHeal() {
      let playerHeal = Math.floor(Math.random() * 20) + 1;
      console.log("player heal -> ", playerHeal);
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
      isLoading: "getIsLoading",
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
