<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <q-input class="" v-model="user.email" />
    <q-btn label="log" @click="() => user.login()" />
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import AuthRequest from 'src/utils/auth/AuthRequest'

const user = reactive(new AuthRequest())
user.login()

</script>
