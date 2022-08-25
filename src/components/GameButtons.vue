<template>
  <div class="game-buttons">
    <button @click.prevent="handleAttack" class="button _attack">Attack</button>
    <button @click.prevent="handleSpecialAttack" class="button _special-attack">
      Special Attack
    </button>
    <button @click.prevent="handleHeal" class="button _heal">Heal</button>
    <button @click.prevent="handleSurrender" class="button _surrender">
      Surrender
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GameButtons",
  methods: {
    ...mapActions({
      setHealth: "setHealth",
    }),
    monsterAttack() {
      let monsterDamage = Math.floor(Math.random() * 10) + 1;
      console.log("monster attack -> ", monsterDamage);
      this.setHealth({
        player: this.playerHealth - monsterDamage,
      });
    },
    playerAttack() {
      let playerDamage = Math.floor(Math.random() * 10) + 1;
      console.log("player attack -> ", playerDamage);
      this.setHealth({
        monster: this.monsterHealth - playerDamage,
      });
    },
    playerSpecialAttack() {
      let playerDamage = Math.floor(Math.random() * 10) + 5;
      console.log("player SPECIAL attack -> ", playerDamage);
      this.setHealth({
        monster: this.monsterHealth - playerDamage,
      });
    },
    playerHeal() {
      let playerHeal = Math.floor(Math.random() * 20) + 1;
      console.log("player heal -> ", playerHeal);
      this.setHealth({
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
    handleSurrender() {
      this.setHealth({
        player: 100,
        monster: 100,
      });
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
  &._surrender {
    background-color: #fdca40;
  }
}
</style>
