<template>
  <div class="app">
    <health-bar
      :target-name="monsterStats.name"
      :health="monsterStats.health"
    />
    <health-bar :target-name="playerStats.name" :health="playerStats.health" />
    <game-buttons />
    <combat-log />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import HealthBar from "./components/HealthBar.vue";
import GameButtons from "./components/GameButtons.vue";
import CombatLog from "./components/CombatLog.vue";

export default {
  name: "App",
  components: {
    HealthBar,
    GameButtons,
    CombatLog,
  },
  computed: {
    ...mapGetters({
      playerStats: "getPlayerStats",
      monsterStats: "getMonsterStats",
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
