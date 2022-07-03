<template>
  <BaseLayout title="Үйчилгээ">
    <template #actions>
      <InlineButton @click="onCreate" pill shadow>
        <span class="text-uppercase">Нэмэх</span>
      </InlineButton>
    </template>
    <ServicesTable
      :services="serviceList"
      :meta="serviceListMeta"
      :current-page="currentPage"
      :is-loading="isLoading"
      @edit="onEdit"
      @onChangePage="onChangePage"
    />
    <ServiceAddEditModal
      :service="serviceToEdit"
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
import { SERVICE_LIST_REQUEST, SERVICE_DELETE } from '@/store/actions/service';
import BaseLayout from '@/components/ui/BaseLayout';
import InlineButton from '@/components/ui/button/InlineButton';
import ServicesTable from '@/components/manage/services/ServicesTable';
import ServiceAddEditModal from '@/components/manage/services/ServiceAddEditModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default {
  data() {
    return {
      currentPage: 1,
      serviceIdToEdit: null,
      serviceIdToRemove: null,
    };
  },

  computed: {
    ...mapGetters([
      'serviceList',
      'serviceListMeta',
      'serviceListStatus',
      'serviceStatus',
      'getServiceById',
    ]),
    isLoading() {
      return this.serviceListStatus == 'loading';
    },
    serviceToEdit() {
      return this.serviceIdToEdit ? this.getServiceById(this.serviceIdToEdit) : null;
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
      await this.$store.dispatch(SERVICE_LIST_REQUEST, payload);
    },
    emptyingDataToEdit() {
      this.serviceIdToEdit = null;
    },
    onCreate() {
      this.emptyingDataToEdit();
      this.openModal();
    },
    onEdit(id) {
      this.serviceIdToEdit = id;
      this.openModal();
    },
    openModal() {
      this.$bvModal.show('manage-service-modal');
    },
    onChangePage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    onConfirmDelete(serviceId) {
      this.serviceIdToRemove = serviceId;
      this.$bvModal.show('delete-confirm-dialog');
    },
    async remove() {
      await this.$store.dispatch(SERVICE_DELETE, this.serviceIdToRemove);
      if (this.serviceStatus === 'deleted') {
        this.emptyingDataToEdit();
        this.$bvModal.hide('manage-service-modal');
        this.serviceIdToRemove = null;
      }
    },
  },

  components: {
    BaseLayout,
    InlineButton,
    ServicesTable,
    ServiceAddEditModal,
    ConfirmDialog,
  },
};
</script>
