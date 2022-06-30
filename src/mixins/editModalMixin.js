export default {
  data() {
    return {
      modalId: 'edit-modal',
    };
  },
  methods: {
    validateState(key) {
      const { $dirty, $error } = this.$v.form[key];
      return $dirty ? !$error : null;
    },

    hideEditModal() {
      this.$bvModal.hide(this.modalId);
    },
  },
};
