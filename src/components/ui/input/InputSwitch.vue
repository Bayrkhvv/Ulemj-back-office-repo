<template>
  <div class="custom-input-component">
    <InputLabel v-if="label"> {{ label }} </InputLabel>

    <b-form-group
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="$_state"
    >
      <b-form-checkbox :checked="value" @input="onChange" switch :disabled="disabled" :size="size">
        <slot></slot>
      </b-form-checkbox>
    </b-form-group>
  </div>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  props: {
    size: {
      type: String,
      default: 'default',
    },
  },
};
</script>

<style></style>
