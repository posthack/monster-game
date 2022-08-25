<template>
  <div class="health-bar">
    <div class="health-bar__title">{{ targetName }}</div>
    <div class="health-bar__outer">
      <div
        :class="{
          'health-bar__inner': true,
          _yellow: health <= 50 && health > 20,
          _red: health <= 20,
        }"
        :style="`width: ${health}%`"
      >
        {{ health }}HP
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HealthBar",
  props: {
    targetName: {
      type: String,
      required: true,
    },
    health: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.health-bar:not(:last-of-type) {
  padding-bottom: 20px;
}
.health-bar__title {
  text-align: center;
  font-size: 24px;
  line-height: 1;
  padding-bottom: 20px;
}
.health-bar__outer {
  height: 30px;
  border: 1px solid #000;
  border-radius: 5px;
  overflow: hidden;
}
.health-bar__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #00e400;
  transition: width 0.5s ease-in-out;
  color: #000;
  &._yellow {
    background-color: #fdca40;
  }
  &._red {
    background-color: #df2935;
  }
}
</style>
