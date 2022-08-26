<template>
  <div>
    <div class="col-12 text-weight-bold">Date of Birth</div>
    <q-select class="col-4" label="Month" dark popup-content-class="options-height" filled v-model="user.dob.m" use-input hide-selected fill-input :options="monthsOptions" @input-value="(val) => user.dob.m = val" @filter="filterMonths" />
    <q-select class="col-3" label="Day" dark popup-content-class="options-height" filled v-model="user.dob.d" use-input hide-selected fill-input :options="daysOptions" @input-value="(val) => user.dob.d = val" @filter="filterDays" />
    <q-select class="col-3" label="Year" dark popup-content-class="options-height" filled v-model="user.dob.y" use-input hide-selected fill-input :options="yearsOptions" @input-value="(val) => user.dob.y = val" @filter="filterYears" />
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'

  const props = defineProps({

  })

  const emit = defineEmits(['change'])
</script>
