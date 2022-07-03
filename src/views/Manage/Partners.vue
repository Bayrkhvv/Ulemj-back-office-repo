<template>
  <BaseLayout title="Partners">
    <template #actions>
      <InlineButton @click="onCreate" pill shadow>
        <span class="text-uppercase">Нэмэх</span>
      </InlineButton>
    </template>
    <PartnersTable
      :partners="partnerList"
      :meta="partnerListMeta"
      :current-page="currentPage"
      :is-loading="isLoading"
      @edit="onEdit"
      @onChangePage="onChangePage"
    />
    <PartnerAddEditModal
      :partner="partnerToEdit"
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
import { PARTNER_LIST_REQUEST, PARTNER_DELETE } from '@/store/actions/partner';
import PartnersTable from '@/components/manage/partners/PartnersTable';
import BaseLayout from '@/components/ui/BaseLayout';
import InlineButton from '@/components/ui/button/InlineButton';
import PartnerAddEditModal from '@/components/manage/partners/PartnerAddEditModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default {
  data() {
    return {
      currentPage: 1,
      partnerIdToEdit: null,
      partnerIdToRemove: null,
    };
  },

  computed: {
    ...mapGetters([
      'partnerList',
      'partnerListMeta',
      'partnerListStatus',
      'getPartnerById',
      'partnerStatus',
    ]),
    isLoading() {
      return this.partnerListStatus == 'loading';
    },
    partnerToEdit() {
      return this.partnerIdToEdit ? this.getPartnerById(this.partnerIdToEdit) : null;
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
      await this.$store.dispatch(PARTNER_LIST_REQUEST, payload);
    },
    emptyingDataToEdit() {
      this.partnerIdToEdit = null;
    },
    onCreate() {
      this.emptyingDataToEdit();
      this.openModal();
    },
    onEdit(id) {
      this.partnerIdToEdit = id;
      this.openModal();
    },
    openModal() {
      this.$bvModal.show('manage-partner-modal');
    },
    onChangePage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    onConfirmDelete(partnerId) {
      this.partnerIdToRemove = partnerId;
      this.$bvModal.show('delete-partner-dialog');
    },
    async remove() {
      await this.$store.dispatch(PARTNER_DELETE, this.partnerIdToRemove);
      if (this.partnerStatus === 'deleted') {
        this.emptyingDataToEdit();
        this.$bvModal.hide('manage-partner-modal');
        this.partnerIdToRemove = null;
      }
    },
  },
  components: {
    BaseLayout,
    InlineButton,
    PartnersTable,
    ConfirmDialog,
    PartnerAddEditModal,
  },
};
</script>
