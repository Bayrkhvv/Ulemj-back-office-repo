<template>
  <TableBox :current-page="currentPage" :meta="meta" @onChangePage="$emit('onChangePage', $event)">
    <b-table
      sticky-header
      id="my-table"
      :fields="fields"
      :items="users"
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
import InlineButton from '@/components/ui/button/InlineButton';

export default {
  props: {
    users: Array,
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
          key: 'email',
          label: 'E-mail',
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
  },
};
</script>
