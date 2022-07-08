<template>
  <b-modal
    :id="id"
    :title="title"
    :scrollable="true"
    :ok-title="okTitle"
    :ok-disabled="okDisabled"
    :cancel-title="cancelTitle"
    :cancel-disabled="cancelDisabled"
    centered
    no-fade
    modal-class="modal-main"
    dialog-class="modal-main-dialog"
    content-class="modal-main-content"
    header-class="modal-main-header"
    :body-class="['modal-main-body', { 'p-0': paddingless }]"
    footer-class="modal-main-footer"
    @hide="$emit('hide')"
    @hidden="$emit('hidden')"
    @show="$emit('show')"
    @shown="$emit('shown')"
  >
    <template #modal-header>
      <div class="modal-main-header-content">
        <p class="modal-title">{{ title }}</p>
      </div>
      <slot name="header-content"></slot>
    </template>

    <slot></slot>

    <template #modal-footer>
      <div v-if="!deleteDisabled" class="modal-main-footer-before-actions">
        <InlineButton @click="$emit('remove')" size="lg" variant="outline-danger" dashed>
          {{ deleteTitle }}
        </InlineButton>
      </div>
      <div class="modal-main-footer-actions">
        <InlineButton
          v-if="!cancelDisabled"
          @click="$emit('cancel')"
          size="lg"
          variant="light"
          class="text-uppercase"
        >
          {{ cancelTitle }}
        </InlineButton>
        <InlineButton
          v-if="!okDisabled"
          @click="$emit('ok')"
          type="submit"
          :loading="loading"
          size="lg"
          class="text-uppercase font-weight-bold"
        >
          {{ okTitle }}
        </InlineButton>
      </div>
    </template>
  </b-modal>
</template>

<script>
import i18n from '@/i18n';
import InlineButton from '@/components/ui/button/InlineButton';

export default {
  name: 'ModalMain',

  props: {
    id: String,
    title: String,
    loading: Boolean,
    okTitle: {
      type: String,
      default: i18n.t('modal.ok'),
    },
    okDisabled: {
      type: Boolean,
      default: false,
    },
    cancelTitle: {
      type: String,
      default: 'Буцах',
    },
    cancelDisabled: {
      type: Boolean,
      default: false,
    },
    deleteTitle: {
      type: String,
      default: 'Устгах',
    },
    deleteDisabled: {
      type: Boolean,
      default: false,
    },
    paddingless: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    InlineButton,
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';
@import '../../sass/flexBox';

.modal-main {
  .modal-main-content {
    border-radius: 0 !important;
    border-width: 0;
  }

  .modal-main-header {
    border-radius: 0 !important;
    padding: 0;
    position: relative;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom-width: 0;
    background-color: lighten($primary, 25%);

    .modal-title {
      font-size: 1.25rem;
      line-height: 1;
      text-align: center;
    }
  }

  .modal-main-header-content {
    padding: 1.5rem;
    @include flexBox(flex, center, center);
  }

  .modal-main-body {
    padding: 1.5rem;
  }

  .modal-main-footer {
    border-radius: 0 !important;
    border-top-width: 0;
    padding: 0;
    @include flexBox(flex, stretch, flex-start, column);

    & > * {
      margin: 0;
    }
  }

  .modal-main-footer-before-actions {
    padding: 1.5rem;

    & > * {
      display: block;
      width: 100%;
    }
  }

  .modal-main-footer-actions {
    @include flexBox(flex, center, flex-start);

    & > * {
      flex: 1;
      border-radius: 0;
      border-width: 0;
    }
  }

  & + .modal-backdrop {
    opacity: 0.65;
  }

  .button-container {
    margin-top: 1.5rem;
    display: flex;
    flex: 1;

    button {
      width: calc(50% - 10px);
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
  }
}

@media (min-width: $breakpoint-md) {
  .modal-main {
    .modal-main-dialog {
      max-height: 100%;
      min-height: 100%;
      height: 100%;
      margin: 0;
      margin-left: auto;
    }

    .modal-main-content {
      height: 100%;
    }

    .modal-main-body {
      padding: 2rem;
    }

    .modal-main-header-content {
      min-height: 6.25rem;
      padding: 2rem;
    }

    .modal-main-footer-before-actions {
      padding: 2rem;
    }

    .modal-main-footer-actions {
      & > * {
        height: 5rem;
      }
    }
  }
}
</style>
