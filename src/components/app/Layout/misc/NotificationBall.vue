<template>
  <div v-if="value" class="notification-icon" />
</template>

<style lang="scss" scoped>
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
</style>

<script setup lang="ts">
import { ref } from 'vue'

export interface NotificationBallProps {
  value: boolean
}
withDefaults(defineProps<NotificationBallProps>(), {
  value: true
});
</script>
