<template>
  <div class="combat-log">
    <div class="combat-log__title">Combat log:</div>
    <div class="combat-log__list">
      <div v-for="(el, idx) in combatLog" :key="idx" class="combat-log__item">
        {{ el }}
      </div>
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

<style scoped lang="scss"></style>
