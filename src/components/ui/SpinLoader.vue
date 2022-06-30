<template>
  <div class="py-2 d-flex align-items-center justify-content-center">
    <b-spinner
      label="Spinning"
      variant="secondary"
      :style="`width: ${size}rem; height: ${size}rem; display: block;`"
    ></b-spinner>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2,
    },
  },
};
</script>
