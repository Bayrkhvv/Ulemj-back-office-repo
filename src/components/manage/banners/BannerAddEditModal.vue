<template>
  <ModalMain
    :id="modalId"
    :title="title"
    :ok-title="saveButtonTitle"
    :loading="isLoading"
    :delete-disabled="!banner"
    @hidden="onHidden"
    @ok="onSave"
    @cancel="onCancel"
    @remove="$emit('onRemove', banner.id)"
  >
    <b-form @submit.prevent="onSave">
      <InputString
        class="banner-name"
        label="Нэр"
        size="lg"
        v-model="$v.form.name.$model"
        :vuelidate="$v.form.name"
        :invalidFeedback="$t('validation.nameRequired')"
      />
      <InputPhoto
        :is-loading="isLoading"
        :photo="form.file"
        size-type="card"
        class="mb-3"
        @change="onChangePhoto"
        @remove="onDeletePhoto"
      />

      <InputString
        class="banner-link"
        label="Линк"
        size="lg"
        v-model="$v.form.link.$model"
        :vuelidate="$v.form.link"
      />
      <InputRadioButton
        class="banner-status"
        label="Статус"
        size="lg"
        v-model="form.isActive"
        :options="statusOptions"
      />
      <InputDatepicker
        class="start-date"
        label="Эхлэх огноо"
        size="lg"
        v-model="$v.form.startDate.$model"
        :vuelidate="$v.form.startDate"
      />
      <InputDatepicker
        class="endDate"
        label="Дуусах огноо"
        size="lg"
        v-model="$v.form.endDate.$model"
        :vuelidate="$v.form.endDate"
      />
    </b-form>
  </ModalMain>
</template>

<script>
import { isNil } from 'lodash';
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { BANNER_CREATE, BANNER_UPDATE } from '@/store/actions/banner';
import { FILE_UPLOAD } from '@/store/actions/file';
import { STATUS_OPTIONS } from '@/utils/constants';
import editModalMixin from '@/mixins/editModalMixin';
import ModalMain from '@/components/ui/ModalMain';
import InputString from '@/components/ui/input/InputString';
import InputRadioButton from '@/components/ui/input/InputRadioButton';
import InputDatepicker from '@/components/ui/input/InputDatepicker';
import InputPhoto from '@/components/ui/input/InputPhoto';

const defaultValuesForForm = () => ({
  name: '',
  file: null,
  link: '',
  startDate: null,
  endDate: null,
  isActive: true,
});

export default {
  mixins: [validationMixin, editModalMixin],

  props: {
    banner: Object,
  },

  data() {
    return {
      modalId: 'manage-banner-modal',
      form: defaultValuesForForm(),
      statusOptions: STATUS_OPTIONS,
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
      file: {
        required,
      },
      isActive: {
        required,
      },
      startDate: {
        required,
      },
      endDate: {
        required,
      },
    },
  },

  watch: {
    banner() {
      this.updateForm();
    },
  },

  computed: {
    ...mapGetters(['bannerStatus', 'getFileUpload']),
    isLoading() {
      return this.bannerStatus === 'loading';
    },
    title() {
      return isNil(this.banner) ? 'Баннер үүсгэх' : 'Баннер засах';
    },
    saveButtonTitle() {
      return isNil(this.banner) ? 'Нэмэх' : 'Засах';
    },
  },

  methods: {
    updateForm() {
      this.form = this.banner
        ? {
            name: this.banner.name,
            file: this.banner.file,
            link: this.banner.link,
            startDate: this.banner.startDate,
            endDate: this.banner.endDate,
            isActive: this.banner.isActive,
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

      if (isNil(this.banner)) {
        await this.$store.dispatch(BANNER_CREATE, data);
      } else {
        const payload = {
          id: this.banner.id,
          data,
        };

        await this.$store.dispatch(BANNER_UPDATE, payload);
      }
      if (this.bannerStatus === 'success') {
        this.hideEditModal();
      }
    },
  },

  components: {
    ModalMain,
    InputString,
    InputRadioButton,
    InputDatepicker,
    InputPhoto,
  },
};
</script>
