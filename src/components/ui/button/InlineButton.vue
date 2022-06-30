<template>
  <b-button
    :block="block"
    :type="type"
    @click="onClick"
    :disabled="loading || disabled"
    :variant="variant"
    :size="size"
    :to="to"
    :href="href"
    :pill="pill"
    :tag="tag"
    :class="[
      'inline-button',
      { 'rounded-button': pill },
      { 'has-shadow': shadow },
      { 'is-dashed': dashed },
    ]"
  >
    <b-spinner v-if="loading" small variant="light"></b-spinner>
    <template v-else>
      <slot />
    </template>
  </b-button>
</template>

<script>
import baseButtonMixin from '@/mixins/baseButtonMixin';

export default {
  mixins: [baseButtonMixin],
};
</script>

<style lang="scss" scoped>
@import '../../../sass/variables';

.inline-button {
  &.rounded-button {
    padding-left: 2em;
    padding-right: 2em;

    &.btn-lg,
    &.btn-md {
      padding-left: 2.75rem;
      padding-right: 2.75rem;
    }
  }
  &.is-dashed {
    border-style: dashed;
    border-width: 1px;
  }
  &.btn-outline-secondary {
    color: $gray-600;
  }
  &.btn-sm {
    border-width: 1px;
  }
  &.has-shadow {
    @each $color, $value in $theme-colors {
      &.btn-#{$color},
      &.btn-outline-#{$color} {
        box-shadow: 0 5px 10px rgba($value, 0.65);

        &.btn-sm {
          box-shadow: 0 3px 6px rgba($value, 0.65);
        }
      }
    }
  }
}
</style>
