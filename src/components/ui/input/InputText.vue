<template>
  <b-form-group
    :label="label"
    :label-class="labelClass"
    :label-for="`textarea-${uuid}`"
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
  >
    <b-form-textarea
      :id="`textarea-${uuid}`"
      :value="value"
      :state="$_state"
      :rows="rows"
      :max-rows="maxRows"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      :autofocus="autofocus"
      no-resize
      @input="onChange"
    ></b-form-textarea>
  </b-form-group>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  props: {
    rows: {
      type: Number,
      default: 3,
    },
    maxRows: {
      type: Number,
      default: 6,
    },
  },
};
</script>
