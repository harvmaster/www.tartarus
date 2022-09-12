<template>
  <!-- Chat input -->
  <div class="full-width q-pa-xs bg-layout-2 row rounded-borders">
    <div class="col-auto self-center q-px-sm">
      <q-btn class="col-auto bg-grey-6" text-color="black" round unelevated icon="add" padding="0.5em"/>
    </div>
    <q-input class="col" borderless v-model="message" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

</script>
