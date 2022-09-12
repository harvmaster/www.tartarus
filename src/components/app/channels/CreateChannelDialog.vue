<template>
  <q-dialog v-model="isVisible" :class="themeClass">
    <div class="row limit-width">
      <div class="bg-layout-1 row q-pa-md col-12">
        <div class="col-12 text-start text-weight-bolder text-h5">
          Create channel
        </div>
        <div class="col-12 q-py-sm row">

          <!-- Text Channel -->
          <div class="col-12 row bordered q-pa-sm">
            <div class="col-auto text-h5 q-pr-md q-pl-sm self-center">
              <q-icon name="tag" />
            </div>
            <div class="col row">
              <div class="col-auto self-end text-h6 no-margin no-padding">
                Text Channel
              </div>
              <div class="col-auto ellipsis">
                Send Messages, memes, jokes, or bully the channel runt
              </div>
            </div>
            <div class="col-auto row">
              <q-checkbox class="col-auto self-center" :model-value="selectedType == 'text'" @update:model-value="setType('text')" />
            </div>
          </div>

          <!-- Voice channel -->
          <div class="col-12 q-pt-sm">
            <div class="col-12 row bordered q-pa-sm">
              <div class="col-auto text-h5 q-pr-md q-pl-sm self-center">
                <q-icon name="mic" />
              </div>
              <div class="col row">
                <div class="col-auto self-end text-h6 no-margin no-padding">
                  Voice Channel
                </div>
                <div class="col-auto ellipsis">
                  Hangout in a call, yell, sing, or chat on a video call
                </div>
              </div>
              <div class="col-auto row">
                <q-checkbox class="col-auto self-center" :model-value="selectedType == 'voice'" @update:model-value="setType('voice')" />
              </div>
            </div>
          </div>
        </div>

        <!-- Channel Name -->
        <div class="col-12  row">
          <div class="col-12 text-weight-bold">Channel Name</div>
          <q-input class="col-12 font-125 text-weight-medium" v-model="channelName" filled :dark="appStore.isDarkTheme" />
        </div>
      </div>
      <div class="bg-layout-2 row q-pa-md col-12 justify-between">
        <q-btn class="col-auto" label="back" size="sm" flat 
          :color="!appStore.isDarkTheme ? 'grey-9' : 'white'" 
          @click="toggleVisible"
        />
        <q-btn class="col-auto" label="Create" color="primary" unelevated 
          :outline="!appStore.isDarkTheme" 
          :text-color="!appStore.isDarkTheme ? 'dark' : ''" 
          @click="submitChannel"
        />
      </div>
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
.font-125 {
  font-size: 1.25rem;
}
.limit-width {
  max-width: 30em;
}
.bordered {
  border: 1px solid #2b2b2b;
  border-radius: .5em;
}
</style>

<script setup lang="ts">
import { ref, computed, defineExpose } from 'vue'
import { useAppStore } from 'stores/app'
import Room from 'src/utils/app/Room'

const props = defineProps<{ room: Room }>()
const channelName = ref('')
const submitChannel = async () => {
  props.room.createChannel(channelName.value, selectedType.value)
}

const appStore = useAppStore()
const themeClass = computed(() => appStore.isDarkTheme ? 'dark-theme' : 'light-theme')

const isVisible = ref(false)
const toggleVisible =  () => isVisible.value = !isVisible.value


const selectedType = ref('text')
const setType = (type) => {
  if (selectedType.value == type) return selectedType.value = ''
  selectedType.value = type
}

defineExpose({
  toggleVisible,
});
</script>
