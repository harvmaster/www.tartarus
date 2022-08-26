<template>
  <div v-if="value" class="ball" :class="ballClass" />
</template>

<style lang="scss" scoped>
$alert-ball-color: white;

.ball {
  position: absolute;
  left: 0;
  top: 50%;
  background-color: $alert-ball-color;
  height: 66%;
  width: 0.75em;
  transform: translate(-55%, -50%);
  border-radius: 0.33em;
  clip-path: circle(0 at center);

  transition: all 0.2s ease;
}
.sm-ball {
  clip-path: circle(calc(0.75em/2) at center);
}
.md-ball {
  clip-path: circle(50% at center);
}
.lg-ball {
  clip-path: circle(100% at center);
}

.notification-icon {
  position: absolute;
  height: 0.75em;
  width: 0.75em;
  background-color: white;
  left: 0;
  top: 50%;
  transform: translate(-55%, -50%);
  border-radius: 50%;
}
.bubble:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  background-color: white;
  height: 60%;
  width: calc(0.75em/2);
  transform: translateY(-50%) scale(0);
  transition: all 0.2s ease;
  border-top-right-radius: 0.2em;
  border-bottom-right-radius: 0.2em;
}
.bubble:hover:before {
  transform: translateY(-50%) scale(1);
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'

const ballClass = computed(() => {
  return props.size + '-ball'
})

export interface NotificationBallProps {
  value: boolean,
  size: string
}
const props = withDefaults(defineProps<NotificationBallProps>(), {
  value: true,
  size: 'sm'
});
</script>
