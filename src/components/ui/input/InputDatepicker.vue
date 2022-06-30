<template>
  <div :class="`custom-input-component ${size}`">
    <InputLabel v-if="label"> {{ label }} </InputLabel>

    <b-form-group
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="$_state"
    >
      <b-input-group>
        <b-form-datepicker
          :value="value"
          @input="onChange"
          :disabled="disabled"
          :size="size"
          :min="min"
          :max="max"
          :label-no-date-selected="labelNoDateSelected"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          :today-button="showButtons"
          :reset-button="showButtons"
          :close-button="showButtons"
        />
        <template v-if="clearable" v-slot:append>
          <BlockButton variant="black" size="sm" :disabled="!value" @click="$emit('clear')">
            <b-icon icon="x" variant="light"></b-icon>
          </BlockButton>
        </template>
      </b-input-group>
    </b-form-group>
  </div>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';
import BlockButton from '@/components/ui/button/BlockButton';

export default {
  mixins: [baseInputMixin],
  props: {
    min: [Date],
    max: [Date],
    labelNoDateSelected: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    showButtons: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BlockButton,
  },
};
</script>
