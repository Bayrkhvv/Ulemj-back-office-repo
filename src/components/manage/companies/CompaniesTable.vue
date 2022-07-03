<template>
  <TableBox :current-page="currentPage" :meta="meta" @onChangePage="$emit('onChangePage', $event)">
    <b-table
      sticky-header
      id="my-table"
      :fields="fields"
      :items="companyList"
      :busy="isLoading"
      class="custom-table"
      thead-class="custom-table-header"
      tbody-tr-class="custom-table-body"
      empty-text="Компани олдсонгүй"
      show-empty
    >
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
            {{ $t('text.editButton') }}
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
    companyList: Array,
    meta: Object,
    currentPage: Number,
    isLoading: Boolean,
  },

  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Нэр',
        },
        {
          key: 'logo',
          label: 'Лого',
        },
        {
          key: 'description',
          label: 'Тайлбар',
        },
        {
          key: 'link',
          label: 'Link',
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
