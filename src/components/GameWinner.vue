<template>
  <div class="game-winner">
    <div class="game-winner__title">
      Game winner is a <span>{{ winner }}</span>
    </div>
    <div class="game-winner__button">
      <button @click.prevent="restartGame">Restart</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GameWinner",
  props: {
    winner: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      restartGame: "restartGame",
    }),
  },
};
</script>

<style lang="scss">
.game-winner {
  text-align: center;
  padding-bottom: 40px;
}
.game-winner__title {
  font-size: 40px;
  margin-bottom: 30px;
  span {
    color: #00cc00;
  }
}
.game-winner__button button {
  padding: 5px 20px;
  font-size: 35px;
  cursor: pointer;
}
</style>
