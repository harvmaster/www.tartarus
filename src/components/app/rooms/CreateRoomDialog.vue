<template>
  <q-dialog v-model="isVisible" :class="themeClass">
    <div class="row limit-width contrast">
      <div class="bg-layout-1 row q-pa-md col-12">
        <div class="col-12 text-center text-weight-bolder text-h5">
          Create a server
        </div>
        <div class="col-12 text-center text-h6 text-weight-light">
          Make your server stand out with an icon and a name!
        </div>
        <div class="col-12 q-pa-lg">
          <!-- Image Uploader component -->
        </div>
        <div class="col-12 q-px-lg row">
          <div class="col-12 text-weight-bold font-125">Server Name</div>
          <q-input class="col-12 font-125 text-weight-medium" v-model="room.name" filled color="dark" :dark="!appStore.isDarkTheme" />
        </div>
      </div>
      <div class="bg-layout-2 row q-pa-md col-12 justify-between">
        <q-btn class="col-auto" label="back" size="sm" flat 
          :color="appStore.isDarkTheme ? 'grey-9' : 'white'" 
          @click="toggleVisible"
        />
        <q-btn class="col-auto" label="Create" color="primary" unelevated 
          :outline="!appStore.isDarkTheme" 
          :text-color="appStore.isDarkTheme ? 'dark' : ''" 
          @click="submitRoom"
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
</style>

<script setup lang="ts">
import { ref, computed, defineExpose } from 'vue'
import { useAppStore } from 'stores/app'
import { createRoom } from 'src/utils/app'

const appStore = useAppStore()
const themeClass = computed(() => appStore.isDarkTheme ? 'dark-theme' : 'light-theme')

const isVisible = ref(false)
const toggleVisible =  () => isVisible.value = !isVisible.value

const room = ref({ name: '' })
const submitRoom = async () => {
  createRoom(room.value.name)
}

defineExpose({
  toggleVisible,
});
</script>
