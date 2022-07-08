<template>
  <TableBox :current-page="currentPage" :meta="meta" @onChangePage="$emit('onChangePage', $event)">
    <b-table
      sticky-header
      id="my-table"
      :fields="fields"
      :items="partners"
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
      <template #cell(logo)="data">
        <div
          class="logo"
          v-if="data.item.logo"
          :style="`background-image: url(${data.item.logo.path ? data.item.logo.path : ''});`"
        ></div>
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
    partners: Array,
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
          key: 'logo',
          label: 'Лого',
        },

        {
          key: 'link',
          label: 'Линк',
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

<style lang="scss" scoped>
.logo {
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
