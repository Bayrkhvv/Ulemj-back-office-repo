<template>
  <b-form-group
    :label="label"
    :label-class="labelClass"
    :label-for="`input-number-${uuid}`"
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
  >
    <b-form-input
      v-if="!append"
      :id="`input-number-${uuid}`"
      type="number"
      :value="value"
      :step="step"
      :min="min"
      :max="max"
      :state="$_state"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      :autofocus="autofocus"
      @input="onChange"
      @focusout="onFocusout"
      @keydown.enter="onKeydownEnter"
    ></b-form-input>

    <b-input-group v-else :append="append">
      <b-form-input
        :id="`input-number-${uuid}`"
        type="number"
        :value="value"
        :step="step"
        :min="min"
        :max="max"
        :state="$_state"
        :disabled="disabled"
        :placeholder="placeholder"
        :size="size"
        :autofocus="autofocus"
        @input="onChange"
        @focusout="onFocusout"
        @keydown.enter="onKeydownEnter"
      ></b-form-input>
    </b-input-group>
  </b-form-group>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style></style>
