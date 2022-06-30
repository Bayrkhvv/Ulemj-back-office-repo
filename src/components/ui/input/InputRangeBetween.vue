<template>
  <div class="d-flex flex-column w-100">
    <InputLabel v-if="label"> {{ label }} </InputLabel>
    <vue-slider v-model="range" v-bind="options" @change="emitToForm"> </vue-slider>
    <div class="d-flex flex-row justify-content-between">
      <p>{{ `$${range[0]}` }}</p>
      <p>{{ `$${range[1]}` }}</p>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],
  components: {
    VueSlider,
  },

  props: {
    min: Number,
    max: Number,
    interval: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    value(selected) {
      this.range = selected;
    },
  },
  data() {
    return {
      range: [this.min, this.max],
      options: {
        value: this.value,
        min: this.min,
        max: this.max,
        tooltip: 'none',
        interval: this.interval,
      },
    };
  },
  methods: {
    emitToForm() {
      this.$emit('change', this.range);
    },
  },
};
</script>

<style lang="scss">
@import '../../../sass/variables';

$themeColor: $primary;
@import '~vue-slider-component/lib/theme/default.scss';
</style>
