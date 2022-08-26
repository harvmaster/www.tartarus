<template>
  <q-page class="flex flex-center row">
    <div class="background-image" />
    <transition
      appear
      enter-active-class="animated bounceIn"
      leave-active-class="animated bounceOut"
      mode="out-in"
    >
      <q-card v-if="!user.loading" class="col-12 col-sm-6 limit-width row q-pa-lg bg-blue-grey-10 q-col-gutter-y-lg" dark>
        <div class="col-12 row text-center text-weight-bold text-h6 no-padding">
          <p class="col-12 no-margin text-primary">Join Tartarus</p>
          <p class="col-12 no-margin">Create an account</p>
        </div>

        <text-input class="text-weight-bold" title="Username" v-model="user.username" :error="user.errors.username" />

        <text-input class="text-weight-bold" title="Email" type="email" v-model="user.email" :error="user.errors.email" />

        <text-input class="text-weight-bold" title="Password" type="password" v-model="user.password" />

        <div class="col-12 row q-col-gutter-sm">
          <div class="col-12 text-weight-bold">Date of Birth</div>
          <q-select class="col-4" label="Month" dark popup-content-class="options-height" filled v-model="month" use-input hide-selected fill-input :options="months" @filter="filterMonth" />
          <q-select class="col-3" label="Day" dark popup-content-class="options-height" filled v-model="day" use-input hide-selected fill-input :options="days" @filter="filterDay" />
          <q-select class="col-3" label="Year" dark popup-content-class="options-height" filled v-model="year" use-input hide-selected fill-input :options="years" @filter="filterYear" />
        </div>
        
        <div class="col-12 row q-col-gutter-y-sm">
          <q-btn class="col-12" label="Continue" color="primary" text-color="dark" unelevated @click="register" />

          <div class="col-12">
            <p class="cursor-pointer no-padding no-margin hover-underline-animation text-weight-bold" @click="$router.push('/login')">Already have an account?</p>
          </div>
        </div>
        
      </q-card>

      <q-card v-else-if="user.loading" class="col-12 col-sm-6 login-container q-pa-lg bg-blue-grey-10">
        <auth-progress :value="loadingProgress" :status="loadingStatus" />
      </q-card>
    </transition>
  </q-page>
</template>

<style lang="scss">
.options-height {
  max-height: 20em;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  background-color: #f6d4fe;
}
.limit-width {
  max-width: 40em !important;
}
.login-container {
  height: 25em !important;
  width: 18em !important;
  display: grid;
  place-items: center;
}
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: $grey-1;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: $grey-1;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>

<script setup>
import { reactive, ref, watchEffect } from 'vue'

import TextInput from 'src/components/forms/TextInput.vue';
import AuthProgress from 'src/components/auth/AuthProgress.vue';

import User from 'src/utils/auth/User.ts'

import { filterDays, filterMonths, filterYears, computeDate } from 'src/utils/dates';

const user = reactive(new User())
const register = async () => {
  const authed = await user.register()
}


// Date input form
const day = ref(1)
const days = ref(filterDays())
const filterDay = (val, update) => update(() => days.value = filterDays(val))
const month = ref('January')
const months = ref(filterMonths())
const filterMonth = (val, update) => update(() => months.value = filterMonths(val))
const year = ref(2000)
const years = ref(filterYears())
const filterYear = (val, update) => update(() => years.value = filterYears(val))

watchEffect(() => {
  user.dob = computeDate(day.value, month.value, year.value)
})



</script>
