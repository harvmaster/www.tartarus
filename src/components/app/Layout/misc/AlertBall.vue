<template>
  <div class="ball" :class="ballClass" />
</template>

<style lang="scss" scoped>
.dark-ball {
  background-color: rgb(45, 45, 45);
}
.light-ball {
  background-color: white;
}

.ball {
  position: absolute;
  left: 0;
  top: 50%;
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
  border-radius: 100%;
}
.lg-ball {
  clip-path: circle(100% at center);
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getCssVar } from 'quasar'
import { useAppStore } from 'stores/app'

const appStore = useAppStore()

export interface NotificationBallProps {
  value: boolean,
  size: string,
}
const props = withDefaults(defineProps<NotificationBallProps>(), {
  value: true,
  size: 'sm',
});


const ballClass = computed(() => {
  return [
    props.size + '-ball',
    appStore.isDarkTheme ? 'light-ball' : 'dark-ball'
  ]
})
</script>
