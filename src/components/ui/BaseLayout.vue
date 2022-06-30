<template>
  <div class="layout">
    <header class="layout-header">
      <div class="layout-header-title">{{ title }}</div>
      <div class="layout-header-actions">
        <slot name="actions"></slot>
      </div>
    </header>
    <main :class="['layout-content', { 'has-padding': padding }]">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    padding: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/flexBox';

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-header {
  flex-shrink: 0;
  padding: 0.75rem 0.75rem;
}

.layout-header-title {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  padding-left: 3rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.layout-header-actions {
  @include flexBox(flex, center, flex-start);

  & > * {
    & + * {
      margin-left: 0.75rem;
    }
  }
}

.layout-content {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;

  &.has-padding {
    padding: 2.5rem;
    padding-top: 0;
    overflow: inherit;
  }
}

@media (min-width: $breakpoint-md) {
  .layout-header {
    padding: 0 2.5rem;
    padding-right: 1.5rem;
    height: 6.25rem;
    @include flexBox(flex, center, space-between);
  }

  .layout-header-title {
    font-size: 1.875rem;
    margin-bottom: 0;
  }
}

@media (min-width: $breakpoint-lg) {
  .layout-header-title {
    padding-left: 0;
  }
}
</style>
