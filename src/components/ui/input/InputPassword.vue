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
    <b-input-group :size="size">
      <b-form-input
        v-if="visibilityIsPassword"
        type="password"
        class="password"
        :value="value"
        :state="$_state"
        :placeholder="placeholder"
        :size="size"
        @input="onChange"
      />
      <b-form-input
        v-else
        type="text"
        class="password"
        :value="value"
        :state="$_state"
        :placeholder="placeholder"
        :size="size"
        @input="onChange"
      />
      <b-input-group-append v-if="canVisible" is-text role="button" @click="toggleVisibility">
        <b-icon v-if="visibilityIsPassword" icon="eye-slash-fill"></b-icon>
        <b-icon v-else icon="eye-fill"></b-icon>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

const TYPE_PASSWORD = 'password';
const TYPE_INPUT = 'input';

export default {
  mixins: [baseInputMixin],
  props: {
    canVisible: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      type: TYPE_PASSWORD,
    };
  },

  computed: {
    visibilityIsPassword() {
      return this.type === TYPE_PASSWORD;
    },
  },

  methods: {
    toggleVisibility() {
      this.type = this.type === TYPE_PASSWORD ? TYPE_INPUT : TYPE_PASSWORD;
    },
  },
};
</script>
