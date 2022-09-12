<template>
  <div class="rounded-borders channel-tag q-py-xs q-px-md cursor-pointer full-width row" :class="channelClass" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div class="col-auto q-pr-sm">#</div>
    <div class="col ellipsis">{{ channel.name }}</div>
  </div>
</template>

<style lang="scss" scoped>
.channel-tag {
  font-size: 1.2em;
  font-weight: 400;
  transition: all 0.2s ease;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface Channel {
  name: string
}

export interface ChannelProps {
  channel: Channel
}

const props = defineProps<ChannelProps>()
const emit = defineEmits(['selected'])

const hovered = ref(false)
const channelClass = computed(() => {
  const isHovered = hovered.value
  return isHovered ? 'bg-layout-1' : 'bg-layout-2'
})


</script>
