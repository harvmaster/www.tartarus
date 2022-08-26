<template>
  <div class="info-container relative-position">
    <div class="row justify-center align-center">
      <q-circular-progress :value="value" class="login-progress" size="15em" color="green-11" :angle="180"/>
      <!-- <q-icon class="col-10 align-center" color="primary" size="6em" name="lock" /> -->
      <div class="col-auto text-primary">{{ status }}</div>
      <div class="col-12 text-primary text-center">{{ value }}%</div>
    </div>
  </div>
</template>

<style scoped>
.info-container {
  display: grid;
  place-items: center;
  height: 15em;
  width: 15em;
}
.login-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressLoader',
  data () {
    return {
      
    }
  },
  methods: {

  },
  props: {
    title: {
      type: String
    },
    value: {
      type: Number
    },
    status: {
      type: String
    }
  }
})
</script>
