<template>
  <div class="app">
    <div v-if="winner === ''">
      <health-bar
        :target-name="monsterStats.name"
        :health="monsterStats.health"
      />
      <health-bar
        :target-name="playerStats.name"
        :health="playerStats.health"
      />
      <game-buttons />
    </div>
    <game-winner :winner="winner" v-else />
    <combat-log />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import HealthBar from "./components/HealthBar.vue";
import GameButtons from "./components/GameButtons.vue";
import GameWinner from "./components/GameWinner.vue";
import CombatLog from "./components/CombatLog.vue";

export default {
  name: "App",
  components: {
    HealthBar,
    GameButtons,
    GameWinner,
    CombatLog,
  },
  computed: {
    ...mapGetters({
      playerStats: "getPlayerStats",
      monsterStats: "getMonsterStats",
      winner: "getWinner",
    }),
  },
  methods: {
    ...mapActions({
      initGame: "initGame",
    }),
  },
  mounted() {
    this.initGame();
  },
};
</script>

<style scoped lang="scss">
.app {
  padding: 20px;
}
</style>
