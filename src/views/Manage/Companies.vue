<template>
  <BaseLayout title="Компаниуд">
    <template #actions>
      <InlineButton @click="onCreate" pill shadow>
        <span class="text-uppercase">Нэмэх</span>
      </InlineButton>
    </template>
    <CompaniesTable
      :companies="companyList"
      :meta="companyListMeta"
      :current-page="currentPage"
      :is-loading="isLoading"
      @edit="onEdit"
      @onChangePage="onChangePage"
    />

    <CompanyAddEditModal
      :company="companyToEdit"
      @onHidden="emptyingDataToEdit"
      @onRemove="onConfirmDelete"
    />

    <ConfirmDialog
      id="delete-confirm-dialog"
      :message="$t('modal.areYouSureYouWantToRemove')"
      :ok-title="$t('text.deleteButton')"
      ok-variant="danger"
      @ok="remove"
    />
  </BaseLayout>
</template>
<script>
import { mapGetters } from 'vuex';
import { COMPANY_LIST_REQUEST, COMPANY_DELETE } from '@/store/actions/company';
import BaseLayout from '@/components/ui/BaseLayout';
import InlineButton from '@/components/ui/button/InlineButton';
import CompaniesTable from '@/components/manage/companies/CompaniesTable';
import CompanyAddEditModal from '@/components/manage/companies/CompanyAddEditModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default {
  data() {
    return {
      currentPage: 1,
      companyIdToEdit: null,
      companyIdToRemove: null,
    };
  },

  computed: {
    ...mapGetters([
      'companyList',
      'companyListMeta',
      'companyListStatus',
      'getCompanyById',
      'companyStatus',
    ]),
    isLoading() {
      return this.companyListStatus == 'loading';
    },
    companyToEdit() {
      return this.companyIdToEdit ? this.getCompanyById(this.companyIdToEdit) : null;
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const payload = {
        limit: 10,
        page: this.currentPage,
      };
      await this.$store.dispatch(COMPANY_LIST_REQUEST, payload);
    },

    emptyingDataToEdit() {
      this.companyIdToEdit = null;
    },
    onCreate() {
      this.emptyingDataToEdit();
      this.openModal();
    },
    onEdit(id) {
      this.companyIdToEdit = id;
      this.openModal();
    },
    openModal() {
      this.$bvModal.show('manage-company-modal');
    },
    onChangePage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    onConfirmDelete(companyId) {
      this.companyIdToRemove = companyId;
      this.$bvModal.show('delete-confirm-dialog');
    },
    async remove() {
      await this.$store.dispatch(COMPANY_DELETE, this.companyIdToRemove);
      if (this.companyStatus === 'deleted') {
        this.emptyingDataToEdit();
        this.$bvModal.hide('manage-company-modal');
        this.companyIdToRemove = null;
      }
    },
  },
  components: {
    BaseLayout,
    InlineButton,
    CompaniesTable,
    ConfirmDialog,
    CompanyAddEditModal,
  },
};
</script>
