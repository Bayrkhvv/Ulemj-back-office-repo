<template>
  <div class="switch-with-popover">
    <a tabindex="0" class="switch" :id="id" :class="{ 'is-checked': status }" role="button"></a>
    <b-popover :target="id" triggers="focus">
      <template v-slot:title>{{ popoverTitle }}</template>
      <InlineButton @click="onClose" size="sm" variant="danger" label="Cancel" />
      <InlineButton
        @click="onOk(item)"
        size="sm"
        variant="primary"
        label="Ok"
        class="ml-2 shadow-none"
      />
    </b-popover>
  </div>
</template>

<script>
import InlineButton from '@/components/ui/button/InlineButton';

export default {
  components: {
    InlineButton,
  },
  props: {
    status: [Boolean],
    item: [Object, Boolean, String],
    id: {
      type: String,
      default: 'popover-switch-button',
    },
    popoverTitle: {
      type: String,
      default: 'Are you sure?',
    },
  },
  methods: {
    onClose() {
      this.$emit('clickClose');
    },
    onOk(item) {
      this.$emit('click', item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../sass/variables';
@import '../../../sass/flexBox';

.switch-with-popover {
  @include flexBox(flex, center, center);

  .switch {
    position: relative;
    height: 22px;
    width: 40px;
    padding: 0;
    border-width: 0;
    outline-width: 0;
    background-color: transparent;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 22px;
      width: 40px;
      border-radius: 11px;
      background-color: $gray81;
      transition: background-color 0.15s ease-in-out;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 3px;
      transform: translateY(-50%);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background-color: $white;
      transition: left 0.15s ease-in-out, background-color 0.15s ease-in-out;
    }

    &.is-checked {
      &::before {
        background-color: $primary;
      }
      &::after {
        left: 21px;
      }
    }
  }
}
</style>
