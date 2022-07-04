<template>
  <ModalMain
    :id="modalId"
    :title="title"
    :ok-title="saveButtonTitle"
    :loading="isLoading"
    :delete-disabled="!service"
    @hidden="onHidden"
    @ok="onSave"
    @cancel="onCancel"
    @remove="$emit('onRemove', service.id)"
  >
    <b-form @submit.prevent="onSave">
      <InputString
        class="service-name"
        :label="$t('text.name')"
        size="lg"
        v-model="$v.form.name.$model"
        :vuelidate="$v.form.name"
        :invalidFeedback="$t('validation.nameRequired')"
      />
      <InputLabel>Banner</InputLabel>
      <InputPhoto
        :is-loading="isLoading"
        :photo="form.file"
        size-type="card"
        class="mb-3"
        @change="onChangePhoto"
        @remove="onDeletePhoto"
      />
      <InputText
        class="service-description"
        label="Тайлбар"
        size="lg"
        v-model="$v.form.description.$model"
        :vuelidate="$v.form.description"
      />
      <InputString
        class="service-link"
        label="Link"
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
import { SERVICE_CREATE, SERVICE_UPDATE } from '@/store/actions/service';
import { FILE_UPLOAD } from '@/store/actions/file';
import editModalMixin from '@/mixins/editModalMixin';
import ModalMain from '@/components/ui/ModalMain';
import InputString from '@/components/ui/input/InputString';
import InputPhoto from '@/components/ui/input/InputPhoto';
import InputLabel from '@/components/ui/input/InputLabel';
import InputText from '@/components/ui/input/InputText';

const defaultValuesForForm = () => ({
  name: '',
  file: null,
  description: '',
  link: '',
});

export default {
  mixins: [validationMixin, editModalMixin],

  props: {
    service: Object,
  },

  data() {
    return {
      modalId: 'manage-service-modal',
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
      description: {
        required,
      },
    },
  },

  watch: {
    service() {
      this.updateForm();
    },
  },

  computed: {
    ...mapGetters(['serviceStatus', 'getFileUpload']),
    isLoading() {
      return this.serviceStatus === 'loading';
    },
    title() {
      return isNil(this.service) ? 'Үйчилгээ нэмэх' : 'Үйчилгээ засах';
    },
    saveButtonTitle() {
      return isNil(this.service) ? this.$t('text.addButton') : this.$t('text.updateButton');
    },
  },

  methods: {
    updateForm() {
      this.form = this.service
        ? {
            name: this.service.name,
            file: this.service.file,
            link: this.service.link,
            description: this.service.description,
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
        this.form.file = this.getFileUpload.item;
      }
    },
    onDeletePhoto() {
      this.form.file = null;
    },
    async onSave() {
      if (this.$v) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
      }

      const data = this.form;

      if (isNil(this.service)) {
        await this.$store.dispatch(SERVICE_CREATE, data);
      } else {
        const payload = {
          id: this.service.id,
          data,
        };
        await this.$store.dispatch(SERVICE_UPDATE, payload);
      }
      if (this.serviceStatus === 'success') {
        this.hideEditModal();
      }
    },
  },

  components: {
    ModalMain,
    InputString,
    InputPhoto,
    InputLabel,
    InputText,
  },
};
</script>
