<template>
  <b-modal
    :id="id"
    :title="title"
    size="sm"
    cancel-variant="light"
    :ok-variant="okVariant"
    :ok-title="okTitle"
    centered
    v-on="$listeners"
    footer-class="justify-content-between"
    @hidden="onHidden"
  >
    <p class="mb-0">{{ message }}</p>
  </b-modal>
</template>

<script>
import i18n from '@/i18n';

export default {
  props: {
    id: {
      type: String,
      default: 'confirm-dialog',
    },
    title: {
      type: String,
      default: i18n.t('text.confirmation'),
    },
    message: {
      type: String,
      default: i18n.t('text.areYouSure'),
    },
    okTitle: {
      type: String,
      default: i18n.t('text.yesButton'),
    },
    okVariant: {
      type: String,
      default: 'success',
    },
  },
  methods: {
    onHidden() {
      this.$emit('onHidden');
    },
  },
};
</script>
