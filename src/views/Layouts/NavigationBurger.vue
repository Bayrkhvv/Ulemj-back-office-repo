<template>
  <button
    @click="$emit('click')"
    type="button"
    :class="['navigation-burger', { 'is-active': isActive }]"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/variables';

.navigation-burger {
  position: relative;
  background-color: transparent;
  border: none;
  outline: none;
  color: currentColor;
  font-size: 1rem;
  margin: 0;
  padding: 1.5rem;
  cursor: pointer;
  display: block;
  height: 4rem;
  width: 4rem;

  span {
    background-color: $gray-300;
    display: block;
    height: 2px;
    width: 0.875rem;
    position: absolute;
    left: calc(50% - 0.4375rem);
    transform-origin: center;
    transition-duration: 86ms;
    transition-property: background-color, opacity, transform;
    transition-timing-function: ease-out;

    &:nth-child(1) {
      top: calc(50% - 6px);
    }
    &:nth-child(2) {
      top: calc(50% - 1px);
    }
    &:nth-child(3) {
      top: calc(50% + 4px);
    }
  }

  &.is-active {
    span {
      &:nth-child(1) {
        transform: translateY(5px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(-5px) rotate(-45deg);
      }
    }
  }
}
</style>
