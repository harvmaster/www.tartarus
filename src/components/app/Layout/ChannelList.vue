<template>
  <div class="row full-width">
    <div class="col-12 column q-px-sm">
      <channel-tag class="q-py-xs" v-for="channel of channels" :key="channel.name" :channel="channel" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ChannelTag, { ChannelProps } from './ChannelTag.vue'

export interface ChannelListProps {
  channels: [ChannelProps]
}
const props = defineProps<ChannelListProps>()
const emit = defineEmits(['selected'])


</script>
