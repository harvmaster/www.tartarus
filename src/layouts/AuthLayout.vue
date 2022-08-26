<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header class="text-center bg-purple-3">
      <p class="text-h5 no-margin q-pa-md">Tartarus</p>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthLayout',

  components: {

  },

  setup () {
    return {

    }
  }
})
</script>
