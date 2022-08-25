<template>
  <div v-if="combatLog.length" class="combat-log">
    <div class="combat-log__title">Combat log:</div>
    <div class="combat-log__list">
      <div
        v-for="(el, idx) in combatLog"
        :key="idx"
        class="combat-log__item"
        v-html="el"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CombatLog",
  computed: {
    ...mapGetters({
      combatLog: "getCombatLog",
    }),
  },
};
</script>

<style lang="scss">
.combat-log {
  font-size: 12px;
}
span._heal {
  color: #00cc00;
}
span._damage {
  color: #df2935;
}
</style>
