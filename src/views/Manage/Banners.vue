<template>
  <BaseLayout title="Баннер">
    <template #actions>
      <InlineButton @click="onCreate" pill shadow>
        <span class="text-uppercase">Нэмэх</span>
      </InlineButton>
    </template>
    <BannersTable
      :banners="bannerList"
      :meta="bannerListMeta"
      :current-page="currentPage"
      :is-loading="isLoading"
      @edit="onEdit"
      @onChangePage="onChangePage"
    />

    <BannerAddEditModal
      :banner="bannerToEdit"
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
import { BANNER_LIST_REQUEST, BANNER_DELETE } from '@/store/actions/banner';
import BaseLayout from '@/components/ui/BaseLayout';
import InlineButton from '@/components/ui/button/InlineButton';
import BannersTable from '@/components/manage/banners/BannersTable';
import BannerAddEditModal from '@/components/manage/banners/BannerAddEditModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default {
  data() {
    return {
      currentPage: 1,
      bannerIdToEdit: null,
      bannerIdToRemove: null,
    };
  },

  computed: {
    ...mapGetters([
      'bannerList',
      'bannerListMeta',
      'bannerListStatus',
      'getBannerById',
      'bannerStatus',
    ]),
    isLoading() {
      return this.bannerListStatus == 'loading';
    },
    bannerToEdit() {
      return this.bannerIdToEdit ? this.getBannerById(this.bannerIdToEdit) : null;
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
      await this.$store.dispatch(BANNER_LIST_REQUEST, payload);
    },

    emptyingDataToEdit() {
      this.bannerIdToEdit = null;
    },
    onCreate() {
      this.emptyingDataToEdit();
      this.openModal();
    },
    onEdit(id) {
      this.bannerIdToEdit = id;
      this.openModal();
    },
    openModal() {
      this.$bvModal.show('manage-banner-modal');
    },
    onChangePage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    onConfirmDelete(bannerId) {
      this.bannerIdToRemove = bannerId;
      this.$bvModal.show('delete-confirm-dialog');
    },
    async remove() {
      await this.$store.dispatch(BANNER_DELETE, this.bannerIdToRemove);
      if (this.bannerStatus === 'deleted') {
        this.emptyingDataToEdit();
        this.$bvModal.hide('manage-banner-modal');
        this.bannerIdToRemove = null;
      }
    },
  },
  components: {
    BaseLayout,
    InlineButton,
    BannersTable,
    ConfirmDialog,
    BannerAddEditModal,
  },
};
</script>
