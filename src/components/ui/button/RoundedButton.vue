<template>
  <b-button
    :type="type"
    :variant="variant"
    :disabled="loading || disabled"
    @click="onClick"
    :size="size"
    :class="['rounded-button', { 'is-add-button': isAddButton, 'is-close-button': isCloseButton }]"
  >
    <span><slot /></span>
  </b-button>
</template>

<script>
import baseButtonMixin from '@/mixins/baseButtonMixin';

export default {
  mixins: [baseButtonMixin],

  props: {
    isAddButton: {
      type: Boolean,
      default: false,
    },
    isCloseButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../sass/variables';
@import '../../../sass/flexBox';

.rounded-button {
  position: relative;
  padding: 0;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  @include flexBox(inline-flex, center, center);

  &.btn-sm {
    height: 1rem;
    width: 1rem;
  }

  &.btn-lg {
    height: 2rem;
    width: 2rem;
    font-size: 1rem;
  }

  &.is-add-button,
  &.is-close-button {
    span {
      visibility: hidden;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: currentColor;
    }

    &::before {
      width: 2px;
      height: 10px;
    }

    &::after {
      width: 10px;
      height: 2px;
    }
  }

  &.is-close-button {
    &::before,
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
