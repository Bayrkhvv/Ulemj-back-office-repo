<template>
  <b-form-group
    :label="label"
    :label-class="labelClass"
    :label-for="`input-${uuid}`"
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
  >
    <currency-input
      :value="checkedValue"
      :placeholder="placeholder"
      locale="en"
      :currency="suffix ? { currency, suffix } : { currency }"
      :allow-negative="allowNegative"
      :value-as-integer="valueAsInteger"
      :value-range="{ min: min, max: max }"
      :disabled="disabled"
      @input="onChange"
      @focus="onFocusToggle"
      @blur="onFocusToggle"
      :class="[
        `form-control ${size ? `form-control-${size}` : ''}`,
        { 'is-invalid': $_state === false },
        { 'is-valid': $_state === true },
      ]"
    />
  </b-form-group>
</template>

<script>
import { isNil } from 'lodash';
import baseInputMixin from '@/mixins/baseInputMixin';
import { CurrencyInput } from 'vue-currency-input';

export default {
  mixins: [baseInputMixin],

  props: {
    currency: {
      type: String,
      default: 'USD',
    },
    suffix: {
      type: String,
      default: null,
    },
    allowNegative: {
      type: Boolean,
      default: false,
    },
    valueAsInteger: {
      type: Boolean,
      default: true,
    },
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
  },

  data() {
    return {
      isFocused: false,
    };
  },

  computed: {
    checkedValue() {
      if (this.isFocused) {
        return this.value > 0 ? this.value : 0;
      }
      return this.value;
    },
  },

  components: {
    CurrencyInput,
  },

  methods: {
    onChange(value) {
      this.$emit('input', isNil(value) ? 0 : value);
    },
    onFocusToggle() {
      this.isFocused = !this.isFocused;
    },
  },
};
</script>
