<template>
  <ModalMain
    :id="modalId"
    :title="title"
    :ok-title="saveButtonTitle"
    :loading="isLoading"
    :delete-disabled="!partner"
    @hidden="onHidden"
    @ok="onSave"
    @cancel="onCancel"
    @remove="$emit('onRemove', partner.id)"
  >
    <b-form @submit.prevent="onSave">
      <InputString
        class="partner-name"
        label="Нэр"
        size="lg"
        v-model="$v.form.name.$model"
        :vuelidate="$v.form.name"
        :invalidFeedback="$t('validation.nameRequired')"
      />
      <InputPhoto
        :is-loading="isLoading"
        :photo="form.logo"
        size-type="card"
        class="mb-3"
        @change="onChangePhoto"
        @remove="onDeletePhoto"
      />

      <InputString
        class="partner-link"
        label="Линк"
        size="lg"
        v-model="$v.form.link.$model"
        :vuelidate="$v.form.link"
      />
    </b-form>
  </ModalMain>
</template>

<script>
import { isNil } from 'lodash';
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { PARTNER_CREATE, PARTNER_UPDATE } from '@/store/actions/partner';
import { FILE_UPLOAD } from '@/store/actions/file';
import editModalMixin from '@/mixins/editModalMixin';
import ModalMain from '@/components/ui/ModalMain';
import InputString from '@/components/ui/input/InputString';
import InputPhoto from '@/components/ui/input/InputPhoto';

const defaultValuesForForm = () => ({
  name: '',
  logo: null,
  link: '',
});

export default {
  mixins: [validationMixin, editModalMixin],

  props: {
    partner: Object,
  },

  data() {
    return {
      modalId: 'manage-partner-modal',
      form: defaultValuesForForm(),
    };
  },

  validations: {
    form: {
      name: {
        required,
      },
      link: {
        required,
      },
      logo: {
        required,
      },
    },
  },

  watch: {
    partner() {
      this.updateForm();
    },
  },

  computed: {
    ...mapGetters(['partnerStatus', 'getFileUpload']),
    isLoading() {
      return this.partnerStatus === 'loading';
    },
    title() {
      return isNil(this.partner) ? 'Түнш үүсгэх' : 'Түнш засах';
    },
    saveButtonTitle() {
      return isNil(this.partner) ? 'Нэмэх' : 'Засах';
    },
  },

  methods: {
    updateForm() {
      this.form = this.partner
        ? {
            name: this.partner.name,
            logo: this.partner.logo,
            link: this.partner.link,
          }
        : defaultValuesForForm();
      this.$v.$reset();
    },
    resetForm() {
      this.form = defaultValuesForForm();
      this.$v.$reset();
    },
    onHidden() {
      this.$emit('onHidden');
      this.resetForm();
    },
    onCancel() {
      this.hideEditModal();
    },
    async onChangePhoto(e) {
      const file = e.target.files[0];
      await this.$store.dispatch(FILE_UPLOAD, file);

      if (this.getFileUpload.status === 'success') {
        this.form.logo = this.getFileUpload.item;
      }
    },
    onDeletePhoto() {
      this.form.logo = null;
    },
    async onSave() {
      if (this.$v) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
      }

      const data = this.form;

      if (isNil(this.partner)) {
        await this.$store.dispatch(PARTNER_CREATE, data);
      } else {
        const payload = {
          id: this.partner.id,
          data,
        };

        await this.$store.dispatch(PARTNER_UPDATE, payload);
      }
      if (this.partnerStatus === 'success') {
        this.hideEditModal();
      }
    },
  },

  components: {
    ModalMain,
    InputString,
    InputPhoto,
  },
};
</script>
