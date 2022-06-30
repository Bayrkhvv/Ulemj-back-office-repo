<template>
  <div class="box" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '../../sass/variables';

.box {
  text-align: left;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid $gray-200;
  box-shadow: 0 5px 12px rgba($primary-gray, 0.25);
}

@media (min-width: $breakpoint-md) {
  .box {
    padding: 2rem;
    border-radius: 1.25rem;
  }
}
</style>
