<template>
  <div class="d-flex flex-column w-100">
    <InputLabel v-if="label"> {{ label }} </InputLabel>
    <b-form-input
      v-model="value"
      type="range"
      :min="min"
      :max="max"
      step="1"
      v-on:change="emitToForm"
    ></b-form-input>
    <div class="d-flex flex-row justify-content-between">
      <p>{{ `$${min}` }}</p>
      <p class="text-primary">{{ value }}</p>
      <p>{{ `$${max}` }}</p>
    </div>
  </div>
</template>

<script>
import InputLabel from '@/components/ui/input/InputLabel';

export default {
  components: {
    InputLabel,
  },

  props: {
    label: String,
    min: Number,
    max: Number,
    selected: Number,
  },
  mounted() {
    this.$watch(
      'selected',
      selected => {
        this.value = selected;
      },
      { immediate: true }
    );
  },
  data() {
    return {
      value: this.selected,
    };
  },
  methods: {
    emitToForm() {
      this.$emit('change', this.value);
    },
  },
};
</script>

<style></style>
