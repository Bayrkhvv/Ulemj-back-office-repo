<template>
  <ModalMain
    :id="modalId"
    :title="title"
    :ok-title="saveButtonTitle"
    :loading="isLoading"
    :delete-disabled="!company"
    @hidden="onHidden"
    @ok="onSave"
    @cancel="onCancel"
    @remove="$emit('onRemove', company.id)"
  >
    <b-form @submit.prevent="onSave">
      <InputString
        class="company-name"
        label="Нэр"
        size="lg"
        v-model="$v.form.name.$model"
        :vuelidate="$v.form.name"
      />
      <InputLabel>Лого</InputLabel>
      <InputPhoto
        :is-loading="isLoading"
        :photo="form.logo"
        size-type="card"
        class="mb-3"
        @change="onChangePhoto"
        @remove="onDeletePhoto"
      />
      <InputText
        class="company-description"
        label="Тайлбар"
        size="lg"
        v-model="$v.form.description.$model"
        :vuelidate="$v.form.description"
      />
      <InputString
        class="company-link"
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
import { FILE_UPLOAD } from '@/store/actions/file';
import { COMPANY_CREATE, COMPANY_UPDATE } from '@/store/actions/company';
import editModalMixin from '@/mixins/editModalMixin';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ModalMain from '@/components/ui/ModalMain';
import InputString from '@/components/ui/input/InputString';
import InputPhoto from '@/components/ui/input/InputPhoto';
import InputLabel from '@/components/ui/input/InputLabel';
import InputText from '@/components/ui/input/InputText';

const defaultValuesForForm = () => ({
  name: '',
  logo: null,
  dedscription: '',
  link: '',
});

export default {
  mixins: [validationMixin, editModalMixin],

  props: {
    company: Object,
  },

  data() {
    return {
      modalId: 'manage-company-modal',
      form: defaultValuesForForm(),
    };
  },

  validations() {
    return {
      form: {
        name: {
          required,
        },
        description: {
          required,
        },
        link: {
          required,
        },
      },
    };
  },
  watch: {
    company() {
      this.updateForm();
    },
  },

  computed: {
    ...mapGetters(['companyStatus', 'getFileUpload']),
    isLoading() {
      return this.companyStatus === 'loading';
    },
    title() {
      return isNil(this.company) ? 'Шинэ байгууллага үүсгэх' : 'Байгууллага засах';
    },
    saveButtonTitle() {
      return isNil(this.company) ? 'нэмэх' : 'засах';
    },
  },
  methods: {
    updateForm() {
      this.form = this.company
        ? {
            name: this.company.name,
            description: this.company.description,
            link: this.company.link,
            logo: this.company.logo,
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

      if (isNil(this.company)) {
        await this.$store.dispatch(COMPANY_CREATE, data);
      } else {
        const payload = {
          id: this.company.id,
          data,
        };
        await this.$store.dispatch(COMPANY_UPDATE, payload);
      }
      if (this.companyStatus === 'success') {
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
