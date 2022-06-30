<template>
  <div class="table-box">
    <div class="table-responsive">
      <slot></slot>
    </div>
    <div class="table-pagination">
      <p class="table-pagination-text">
        <template v-if="meta">
          {{ $t('pagination.showingResults', { from: meta.from, to: meta.to, total: meta.total }) }}
        </template>
      </p>
      <b-pagination
        :value="currentPage"
        :total-rows="meta.total"
        :per-page="meta.perPage"
        @input="$emit('onChangePage', $event)"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: [Number, String],
    meta: Object,
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/flexBox';

.table-box {
  height: 100%;
  @include flexBox(flex, stretch, flex-start, column);

  .pagination {
    margin-bottom: 0;
    font-size: 0.875rem;
  }
}

.table-pagination {
  border-top: 3px solid $table-border-color;
  padding: 0.75rem;
}

.table-pagination-text {
  display: none;
  font-size: 0.875rem;
  color: $gray-600;
  margin-bottom: 0;
}

@media (min-width: $breakpoint-md) {
  .table-pagination {
    padding: 1.5rem 2.5rem;
    padding-right: 1.5rem;
    @include flexBox(flex, center, space-between);
  }

  .table-pagination-text {
    display: block;
  }
}
</style>
