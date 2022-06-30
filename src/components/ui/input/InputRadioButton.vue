<template>
  <b-form-group
    :label="label"
    :label-class="labelClass"
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
  >
    <b-form-radio-group
      :id="`button-radios-${uuid}`"
      v-model="modelData"
      :options="options"
      :size="size"
      buttons
      :value-field="valueField"
      :text-field="textField"
      :disabled-field="disabledField"
      :disabled="disabled"
      name="radios-btn-default"
      class="radio-button-group"
    ></b-form-radio-group>
  </b-form-group>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  props: {
    options: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
    },
    valueField: {
      type: String,
      default: 'value',
    },
    textField: {
      type: String,
      default: 'name',
    },
    disabledField: {
      type: String,
      default: 'disabled',
    },
  },

  data() {
    return {
      modelData: this.value,
    };
  },

  watch: {
    value() {
      this.modelData = this.value;
    },
    modelData() {
      return this.$emit('input', this.modelData);
    },
  },
};
</script>

<style lang="scss">
@import '../../../sass/variables';

.radio-button-group {
  display: flex;
  padding: 0.25rem;
  background-color: $gray-200;
  border-radius: 0.3rem;

  .btn {
    background-color: transparent;
    border-width: 0;
    border-radius: 0.1875rem !important;
    padding: calc(#{$input-btn-padding-y} - 1px) 0;

    flex: 1;

    &.active {
      background-color: $white !important;
      box-shadow: 0 2px 4px rgba($black, 0.15);
    }
  }

  &.btn-group-sm {
    border-radius: 0.2rem;

    .btn {
      padding: calc(#{$input-btn-padding-y-sm} - 2px) 0;
      border-radius: 0 !important;
    }
  }

  &.btn-group-lg {
    border-radius: 0.5rem;

    .btn {
      padding: calc(#{$input-btn-padding-y-lg} - 2px) 0;
      border-radius: 0.3125rem !important;
    }
  }
}
</style>
