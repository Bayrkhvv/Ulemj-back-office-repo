<template>
  <TableBox :current-page="currentPage" :meta="meta" @onChangePage="$emit('onChangePage', $event)">
    <b-table
      sticky-header
      id="my-table"
      :fields="fields"
      :items="banners"
      :busy="isLoading"
      class="custom-table"
      thead-class="custom-table-header"
      tbody-tr-class="custom-table-body"
      :emptyText="$t('text.emptyText')"
      show-empty
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(file)="data">
        <div
          class="file"
          v-if="data.item.file"
          :style="`background-image: url(${data.item.file.path ? data.item.file.path : ''});`"
        ></div>
      </template>
      <template #cell(isActive)="data">
        <Status :value="data.item.isActive" />
      </template>
      <template #cell(action)="data">
        <div class="table-action-buttons">
          <InlineButton
            variant="outline-secondary"
            size="sm"
            pill
            @click="$emit('edit', data.item.id)"
            class="has-shadow"
          >
            Засах
          </InlineButton>
        </div>
      </template>
    </b-table>
  </TableBox>
</template>

<script>
import TableBox from '@/components/ui/TableBox';
import Status from '@/components/ui/Status';
import InlineButton from '@/components/ui/button/InlineButton';

export default {
  props: {
    banners: Array,
    meta: Object,
    currentPage: Number,
    isLoading: Boolean,
  },

  data() {
    return {
      fields: [
        {
          key: 'index',
          label: '#',
        },
        {
          key: 'name',
          label: 'Нэр',
        },
        {
          key: 'file',
          label: 'banner',
        },

        {
          key: 'link',
          label: 'Link',
        },
        {
          key: 'startDate',
          label: 'Эхлэх огноо',
        },
        {
          key: 'endDate',
          label: 'Дуусах огноо',
        },
        {
          key: 'isActive',
          label: this.$t('table.th.status'),
        },
        {
          key: 'action',
          label: '',
        },
      ],
    };
  },

  components: {
    TableBox,
    InlineButton,
    Status,
  },
};
</script>

<style lang="scss" scoped>
.file {
  height: 100px;
  width: 100px;
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #f8dcd1;
  border-radius: 12px;
}
</style>
