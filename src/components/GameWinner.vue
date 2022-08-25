<template>
  <div class="game-winner">
    <div class="game-winner__title">Game winner is {{ winner }}</div>
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
