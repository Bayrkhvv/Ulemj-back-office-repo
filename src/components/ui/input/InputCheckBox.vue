<template>
  <b-form-group
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
  >
    <b-form-checkbox
      v-model="modelData"
      :name="`input-checkbox-${uuid}`"
      :value="true"
      :unchecked-value="false"
    >
      {{ label }}
    </b-form-checkbox>
  </b-form-group>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  data() {
    return {
      modelData: this.value,
    };
  },

  watch: {
    value(newValue) {
      this.modelData = newValue;
    },
    modelData() {
      return this.$emit('input', this.modelData);
    },
  },
};
</script>
