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
    <b-form-checkbox
      class="checkbox-all"
      v-if="checkAllOption"
      @change="checkAll"
      v-model="isAllSelected"
      :size="size"
      :disabled="allOptionDisabled"
    >
      {{ $t('text.selectAll') }}
    </b-form-checkbox>

    <b-form-checkbox-group
      class="checkbox-single"
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
import { map } from 'lodash';
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
      isAllSelected:
        this.value.length === this.options.filter(option => option.status).length &&
        this.value.length > 0,
      selected: this.value,
    };
  },
  watch: {
    selected(newValue) {
      if (newValue.length === this.activeOptions.length && newValue.length > 0) {
        this.isAllSelected = true;
      } else {
        this.isAllSelected = false;
      }
    },
    value() {
      if (this.selected.length !== this.value.length) {
        this.selected = this.value;
      }
    },
  },
  computed: {
    activeOptions() {
      return this.options.filter(option => option.status);
    },
    $_options() {
      return this.options.map(option => ({
        text: this.getLabel(option),
        value: this.getValue(option),
        disabled: !option.status,
      }));
    },
    allOptionDisabled() {
      let disabled = false;
      this.options.forEach(option => {
        if (!option.status) {
          disabled = true;
        } else {
          disabled = false;
        }
      });
      return disabled;
    },
  },
  methods: {
    checkAll(checked) {
      const slice = map(this.activeOptions, this.getValue).slice();
      this.selected = checked ? slice : [];
      this.$emit('input', this.selected);
    },
    onChange() {
      this.$emit('input', this.selected);
    },
  },
};
</script>
