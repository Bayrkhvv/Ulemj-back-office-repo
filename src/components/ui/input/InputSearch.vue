<template>
  <b-form-group
    :label="label"
    :label-class="labelClass"
    :label-for="`input-${uuid}`"
    :invalid-feedback="invalidFeedback"
    :valid-feedback="validFeedback"
    :state="$_state"
    :disabled="disabled"
    class="search-input-group"
  >
    <b-form-input
      :id="`input-${uuid}`"
      :type="type"
      :value="value"
      :state="$_state"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      class="search-input"
      @input="onChange"
      @focusout="onFocusout"
      @keydown.enter="onKeydownEnter"
    ></b-form-input>

    <div @click="$emit('clear')" :class="['search-input-icon', { searching: value }]"></div>
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
    placeholder: {
      type: String,
      default: 'Search ...',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../sass/variables';

.search-input-group {
  position: relative;
}

.search-input {
  border-radius: 1000px;
  padding-left: 1.5em;
  padding-right: 2.625rem;
  background-color: $gray-200;
  border-width: 0;
}

.search-input-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  height: 1.125rem;
  width: 1.125rem;
  background-image: url('~@/assets/icons/ic_search.svg');
  background-repeat: no-repeat;
  background-size: 100%;

  &.searching {
    background-image: url('~@/assets/icons/ic_modal_close.svg');
    cursor: pointer;
  }
}
</style>
