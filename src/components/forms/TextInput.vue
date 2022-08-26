<template>
  <div class="col-12 row" >
    <div class="col-12">
      {{ title }}
    </div>
    <div class="col-12 relative-position">
      <q-input class="full-width" @update:model-value="handleInput" :type="type" :model-value="content" dark filled dense />
      
      <div :class="['error', error ? 'show-error' : '']">
        <q-icon class="fit" name="error" size="2em" color="red">
          <q-tooltip class="bg-red-5" :offset="[0, 6]">
            {{ error }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  position: absolute;
  left: 100%;
  top: calc(100% - 2.5em);
  height: 2em;
  width: 2em;
  transform: translateX(-1em) scale(0);
  transition: transform 0.25s;
}
.show-error {
  transform: translateX(0.5em) scale(1);
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextInput',
  data () {
    return {
      content: this.$props.value
    }
  },
  methods: {
    handleInput: function (e) {
      this.content = e
      // console.log(e)
      this.$emit('update:modelValue', e)
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    type: {
      type: String
    },
    error: {
      type: String
    }
  }
})
</script>
