<template>
  <q-page class="row items-stretch items-center justify-evenly">
    <div class="col-12 column">
      <div class="col">

      </div>

      <!-- Chat input -->
      <div class="col-auto full-width q-pa-md">
        <message-input />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import messageInput from 'components/app/channels/messageInput.vue'


</script>
