<template>
  <b-button
    block
    :type="type"
    :variant="variant"
    class="button"
    :disabled="loading || disabled"
    @click="onClick"
    :pill="pill"
    :size="size"
    :to="to"
    :href="href"
  >
    <slot />
  </b-button>
</template>

<script>
import baseButtonMixin from '@/mixins/baseButtonMixin';

export default {
  mixins: [baseButtonMixin],

  props: {
    href: {
      type: String,
      default: null,
    },
  },
};
</script>
