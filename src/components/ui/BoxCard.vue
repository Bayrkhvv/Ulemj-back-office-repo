<template>
  <div class="box-card">
    <header class="box-card-header">
      <span :class="titleClass">{{ title }}</span>
      <InlineButton
        v-if="!noButton"
        @click="$emit('click')"
        pill
        size="sm"
        :loading="isLoading"
        :variant="buttonVariant"
        shadow
      >
        {{ buttonLabel }}
      </InlineButton>
    </header>
    <section :class="['box-card-body', { 'p-0': bodyPaddingless }]">
      <slot></slot>
    </section>
  </div>
</template>

<script>
import InlineButton from '@/components/ui/button/InlineButton';
import i18n from '@/i18n';

export default {
  props: {
    title: String,
    titleClass: {
      type: String,
      default: '',
    },
    bodyPaddingless: {
      type: Boolean,
      default: false,
    },
    buttonLabel: {
      type: String,
      default: i18n.t('text.edit'),
    },
    buttonVariant: {
      type: String,
      default: 'outline-secondary',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    noButton: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    InlineButton,
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/flexBox';

.box-card {
  text-align: left;
  border-radius: 1rem;
  border: 1px solid $gray-200;
  box-shadow: 0 5px 12px rgba($primary-gray, 0.25);
  background-color: $white;
  z-index: 1;
}

.box-card-header,
.box-card-body {
  padding: 1.5rem;
}

.box-card-header {
  @include flexBox(flex, center, space-between);

  & > span {
    font-size: 1.25rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    & + * {
      margin-left: 1rem;
    }
  }

  & + .box-card-body {
    border-top: 3px solid $gray-200;
  }
}

.box-card-body {
  p:last-child {
    margin-bottom: 0;
  }
}

@media (min-width: $breakpoint-md) {
  .box-card {
    border-radius: 1.25rem;
  }

  .box-card-header,
  .box-card-body {
    padding: 2rem;
  }
}
</style>
