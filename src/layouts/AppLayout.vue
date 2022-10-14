<template>
  <q-layout view="hHh Lpr lFf" :class="themeClass" class="app-colour" >
    <q-header class="bg-layout-4">
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
      </q-toolbar>

      <q-bar class="desktop-only bg-layout-4">
        <q-icon name="laptop_chromebook" />
        <div>Tartarus</div>
        <q-toggle
          :model-value="appStore.isDarkTheme"
          @update:model-value="toggleDarkTheme"
        />
        <q-btn label="load Rooms" @click="loadRooms" />
        <q-btn label="test ServiceWorker" @click="testServiceWorker" />

        <q-space />

        <q-btn dense flat icon="minimize" />
        <q-btn dense flat icon="crop_square" />
        <q-btn dense flat icon="close" />
      </q-bar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-layout-4 row"
    >
      <div class="transparent full-height col-auto overflow-auto hide-scrollbar" style="width: 75px" >
        <div class="full-width row q-py-sm">
          <!-- To friends menu -->
          <div class="col-12 q-pb-xs relative-position cursor-pointer q-px-sm" >
            <div class="full-width round t-icon bg-primary ">
              <div class="text-h6 text-center rounded-borders" style="aspect-ratio: 1;" />
            </div>
          </div>
          <div class="col-12 q-py-xs q-px-sm">
            <q-separator size="2px" />
          </div>
  
          <!-- Group chats -->
          <group-icon-bubble class="col-12 q-py-xs non-selectable" v-for="(server, index) of servers" :key="server.name" :name="server.name" :unread="server.unread" :imgURL="server.imgURL" :isSelected="selectedIndex == index" @selected="selectedIndex = index"/>

          <!-- New chat Button -->
          <div class="col-12 q-py-xs q-px-sm">
            <q-separator size="2px" />
          </div>
          <div class="col-12 q-py-xs q-px-sm non-selectable">
            <div class="full-width round bordered cursor-pointer bg-secondary row" style="aspect-ratio: 1" @click="toggleCreateServer">
              <q-icon class="col self-center" size="2em" name="add" />
            </div>
          </div>
        </div>
      </div>
      <!-- :width="75" -->
      <div class="col bg-layout-2 rounded-top-left overflow-auto hide-scrollbar column justify-end q-py-md">
        <div class="col-auto row q-px-md justify-center">
          <div class="col-auto ellipsis self-center" style="font-size: 1.1rem">
            Text Channels
          </div>
          <div class="col-auto q-px-sm">
            <q-btn flat icon="add" size="sm" round @click="toggleChannelDialog">
              <q-tooltip>
                Add Channel
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <channel-list class="col" :channels="selectedServer?.channels" />
      </div>

    </q-drawer>

    <q-page-container class="bg-layout-1">
      <router-view class=""/>
    </q-page-container>

    <create-server-dialog ref="createServerDialog" />
    <create-channel-dialog ref="createChannelDialog"  :room="selectedServer" />
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
  border-radius: 33%;
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
import { ref, computed } from 'vue';
import { useAppStore } from 'stores/app'
import GroupIconBubble from 'src/components/app/Layout/GroupIconBubble.vue';
import ChannelList from 'components/app/Layout/ChannelList.vue'
import CreateServerDialog from 'components/app/rooms/CreateRoomDialog.vue'
import CreateChannelDialog from 'components/app/channels/CreateChannelDialog.vue'

import { generateMockServers } from '../data'
// import Database from '../db/Database'
import api from '../api'

const appStore = useAppStore()
const toggleDarkTheme = appStore.toggleDarkTheme
const themeClass = computed(() => appStore.isDarkTheme ? 'dark-theme' : 'light-theme')


const loadRooms = () => {
  appStore.loadRooms()
}
// const servers = ref(generateMockServers())
const servers = computed(() => appStore.getRooms)

const selectedIndex = ref(0)
const selectedServer = computed(() => servers.value[selectedIndex.value])

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const createServerDialog = ref()
const toggleCreateServer = () => createServerDialog.value.toggleVisible()

const createChannelDialog = ref()
const toggleChannelDialog = () => createChannelDialog.value.toggleVisible()

// const userDB = new Database('users')
const testServiceWorker = async () => {
  const { cache, api: server } = api.Servers.getAllServers().promises()
  cache.then(data => console.log('cachePromise', data))
  server.then(data => console.log('serverPromise', data))

  const observable = api.Servers.getAllServers().observable()
  observable.subscribe((data) => {
    console.log('Observable', data)
  })

  // console.log('t')
  // console.log(await userDB.find({ username: 'Test User2' }))
  // console.log(navigator.serviceWorker.controller)
  // navigator.serviceWorker?.controller?.postMessage({type: 'db', command: 'find', params: { storeName: 'users' }})
}
</script>
