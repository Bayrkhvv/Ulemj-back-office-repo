<template>
  <BeatLoader :size="`${size}px`" :color="color" />
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader';

export default {
  components: {
    BeatLoader,
  },
  props: {
    size: {
      type: Number,
      default: 10,
    },
    color: {
      type: String,
      default: '#CE9F95',
    },
  },
};
</script>
