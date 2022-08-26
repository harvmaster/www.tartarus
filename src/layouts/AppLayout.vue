<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-blue-grey-10">
      <q-toolbar class="mobile-only">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="mobile-only"
        />

        <q-toolbar-title>
          Tartarus
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>

      <q-bar class="desktop-only bg-blue-grey-10">
        <q-icon name="laptop_chromebook" />
        <div>Tartarus</div>

        <q-space />

        <q-btn dense flat icon="minimize" />
        <q-btn dense flat icon="crop_square" />
        <q-btn dense flat icon="close" />
      </q-bar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-blue-grey-10 row"
    >
      <div class="transparent full-height col-auto overflow-auto hide-scrollbar" style="width: 75px" >
        <div class="full-width row q-py-sm">
          <!-- To friends menu -->
          <div class="col-12 q-pb-xs relative-position cursor-pointer q-px-sm" >
            <div class="full-width round t-icon bg-primary ">
              <div class="text-h6 text-center rounded-borders" style="aspect-ratio: 1;" />
            </div>
          </div>
          <div class="col-12 q-py-xs">
            <q-separator />
          </div>
  
          <!-- Group chats -->
          <group-icon-bubble class="col-12 q-py-xs non-selectable" v-for="i in 20" :key="i" />

          <!-- New chat Button -->
          <div class="col-12 q-py-xs non-selectable">
            <div class="full-width round bordered cursor-pointer bg-secondary row" style="aspect-ratio: 1">
              <q-icon class="col self-center" size="2em" name="add" />
            </div>
          </div>
        </div>
      </div>
      <!-- :width="75" -->
      <div class="col bg-blue-grey-9 rounded-top-left overflow-auto hide-scrollbar ">
        test
      </div>

    </q-drawer>

    <q-page-container class="bg-blue-grey-14">
      <router-view class=""/>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.rounded-top-left {
  border-top-left-radius: 2em;
}
.round {
  border-radius: 50%;
  transition: all 0.2s ease;
}
.round:hover {
  border-radius: 25%;
}
.t-icon {
  padding: 20%;
  transition: all 0.2s ease
}
.t-icon:hover {
  background-color: $primary;
}
.t-icon:after {
  content: 'T';
  opacity: 1;
  font-size: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  transition: all 0.2s ease;
}
.t-icon:hover:after {
  content: 'T';
  opacity: 1;
  transform: translate(-50%, -50%) scale(2);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import GroupIconBubble from 'src/components/app/Layout/GroupIconBubble.vue';

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
