<template>
  <q-page class="flex flex-center row">
    <div class="background-image"></div>
    <transition
      appear
      enter-active-class="animated bounceIn"
      leave-active-class="animated bounceOut"
      mode="out-in"
    >
      <q-card v-if="!user.loading" class="col-12 col-sm-6 limit-width row q-pa-lg bg-blue-grey-10 q-col-gutter-y-md" dark>
        <div class="col-12 row text-center text-weight-bold text-h6 no-padding">
          <p class="col-12 no-margin text-primary">Tartarus</p>
          <p class="col-12 no-margin">Login to your account</p>
        </div>

        <text-input class="text-weight-bold" title="Email" type="email" v-model="user.email" :error="user.errors.email" />

        <text-input class="text-weight-bold" title="Password" type="password" v-model="user.password" :error="user.errors.password" />
        
        <div class="col-12 q-py-lg" />

        <div class="col-12 row q-col-gutter-y-sm">
          <q-btn class="col-12" label="Continue" color="primary" text-color="dark" unelevated @click="() => user.login()" />

          <div class="col-12">
            <p class="cursor-pointer no-padding no-margin hover-underline-animation text-weight-bold" @click="$router.push('/signup')">Don't have an account?</p>
          </div>
        </div>
        
      </q-card>
      
      <q-card v-else-if="user.loading" class="col-12 col-sm-6 login-container q-pa-lg bg-blue-grey-10">
        <auth-progress :value="loginProgress" status="help me" />
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
.limit-width-20 {
  max-width: 20em !important;
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
import { reactive } from 'vue'

import TextInput from 'src/components/forms/TextInput.vue';
import AuthProgress from 'src/components/auth/AuthProgress.vue';

import User from 'src/utils/auth/User.ts'

const user = reactive(new User())

</script>
