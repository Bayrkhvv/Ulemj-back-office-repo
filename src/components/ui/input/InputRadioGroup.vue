<template>
  <b-form-group
    :label="label"
    :label-class="labelClass"
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
    class="input-checkbox-group"
  >
    <b-form-radio-group
      :id="`radio-group-${uuid}`"
      :name="`radio-group-${uuid}`"
      v-model="selected"
      :size="size"
      :options="$_options"
      @input="onChange"
      stacked
      disabled-field="disabled"
    />
  </b-form-group>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

const getValue = option => option && option.id;
const getLabel = option => option && option.name;
export default {
  mixins: [baseInputMixin],
  props: {
    checkAllOption: {
      type: Boolean,
      default: false,
    },
    options: Array,
    value: {
      default() {
        return [];
      },
    },
    getValue: {
      type: Function,
      default: getValue,
    },
    getLabel: {
      type: Function,
      default: getLabel,
    },
  },
  data() {
    return {
      selected: this.value,
    };
  },
  watch: {
    value() {
      if (this.selected.length !== this.value.length) {
        this.selected = this.value;
      }
    },
  },
  computed: {
    $_options() {
      return this.options.map(option => ({
        text: this.getLabel(option),
        value: this.getValue(option),
        disabled: !option.status,
      }));
    },
  },
  methods: {
    onChange() {
      this.$emit('input', this.selected);
    },
  },
};
</script>
