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
    <b-form-input
      :id="`input-${uuid}`"
      :type="type"
      :value="value"
      :state="$_state"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      :autofocus="autofocus"
      @input="onChange"
      @focusout="onFocusout"
      @keydown.enter="onKeydownEnter"
    ></b-form-input>
  </b-form-group>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  props: {
    type: {
      type: String,
      required: false,
      default: 'text',
    },
  },
};
</script>
