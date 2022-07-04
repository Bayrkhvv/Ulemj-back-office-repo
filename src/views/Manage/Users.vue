<template>
  <BaseLayout title="Admins">
    <template #actions>
      <InlineButton @click="onCreate" pill shadow>
        <span class="text-uppercase">Нэмэх</span>
      </InlineButton>
    </template>
    <UsersTable
      :users="userList"
      :meta="userListMeta"
      :current-page="currentPage"
      :is-loading="isLoading"
      @edit="onEdit"
      @onChangePage="onChangePage"
    />
    <UserAddEditModal
      :user="userToEdit"
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
import { USER_LIST_REQUEST, USER_DELETE } from '@/store/actions/user';
import UsersTable from '@/components/manage/users/UsersTable';
import BaseLayout from '@/components/ui/BaseLayout';
import InlineButton from '@/components/ui/button/InlineButton';
import UserAddEditModal from '@/components/manage/users/UserAddEditModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default {
  data() {
    return {
      currentPage: 1,
      userIdToEdit: null,
      userIdToRemove: null,
    };
  },

  computed: {
    ...mapGetters(['userList', 'userListMeta', 'userListStatus', 'getUserById', 'userStatus']),
    isLoading() {
      return this.userListStatus == 'loading';
    },
    userToEdit() {
      return this.userIdToEdit ? this.getUserById(this.userIdToEdit) : null;
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
      await this.$store.dispatch(USER_LIST_REQUEST, payload);
    },
    emptyingDataToEdit() {
      this.userIdToEdit = null;
    },
    onCreate() {
      this.emptyingDataToEdit();
      this.openModal();
    },
    onEdit(id) {
      this.userIdToEdit = id;
      this.openModal();
    },
    openModal() {
      this.$bvModal.show('manage-user-modal');
    },
    onChangePage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    onConfirmDelete(userId) {
      this.userIdToRemove = userId;
      this.$bvModal.show('delete-confirm-dialog');
    },
    async remove() {
      await this.$store.dispatch(USER_DELETE, this.userIdToRemove);
      if (this.userStatus === 'deleted') {
        this.emptyingDataToEdit();
        this.$bvModal.hide('manage-user-modal');
        this.userIdToRemove = null;
      }
    },
  },
  components: {
    BaseLayout,
    InlineButton,
    UsersTable,
    ConfirmDialog,
    UserAddEditModal,
  },
};
</script>
