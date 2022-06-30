<template>
  <b-form-group
    :label="label"
    :label-class="labelClass"
    :label-for="`select-${uuid}`"
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
  >
    <b-form-select
      :id="`select-${uuid}`"
      :value="value"
      :options="$_options"
      :placeholder="firstItemLabel"
      :size="size"
      :state="$_state"
      :value-field="valueField"
      :text-field="textField"
      :disabled-field="disabledField"
      :disabled="disabled"
      :class="{ 'rounded-pill': pill }"
      @input="onChange"
    />
  </b-form-group>
</template>

<script>
import { isNil } from 'lodash';
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  props: {
    options: Array,
    firstItemLabel: String,
    firstItemDisabled: {
      type: Boolean,
      default: true,
    },
    valueField: {
      type: String,
      default: 'id',
    },
    textField: {
      type: String,
      default: 'name',
    },
    disabledField: {
      type: String,
      default: 'disabled',
    },
    pill: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  computed: {
    $_options() {
      const options = this.options.map(option => option);

      if (!isNil(this.firstItemLabel)) {
        options.unshift({
          [this.valueField]: null,
          [this.textField]: this.firstItemLabel,
          [this.disabledField]: this.firstItemDisabled,
        });
      }
      return options;
    },
  },
};
</script>

<style lang="scss" scoped>
.rounded-pill {
  padding-left: 1.5rem;
  padding-right: 2rem;
}
</style>
