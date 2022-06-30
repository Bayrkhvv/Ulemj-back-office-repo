<template>
  <div class="custom-input-component">
    <InputLabel v-if="label">{{ label }}</InputLabel>
    <b-form-group
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="$_state"
      :disabled="disabled"
    >
      <b-form-select :value="value" :size="size" @input="onChange">
        <b-form-select-option :value="null" disabled
          >{{ firstItemLabel ? firstItemLabel : 'Please select an option' }}
        </b-form-select-option>
        <b-form-select-option-group
          v-for="(group, groupIndex) in options"
          :key="`group-${groupIndex}`"
          :label="group.label"
        >
          <b-form-select-option
            v-for="(option, index) in group.options"
            :key="`option-${index}`"
            :value="option"
            >{{ option.name }}</b-form-select-option
          >
        </b-form-select-option-group>
      </b-form-select>
    </b-form-group>
  </div>
</template>

<script>
import baseInputMixin from '@/mixins/baseInputMixin';

export default {
  mixins: [baseInputMixin],

  props: {
    options: Array,
    firstItemLabel: String,
  },
};
</script>
