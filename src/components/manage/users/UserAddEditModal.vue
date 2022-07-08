<template>
  <ModalMain
    :id="modalId"
    :title="title"
    :ok-title="saveButtonTitle"
    :loading="isLoading"
    :delete-disabled="!user"
    @hidden="onHidden"
    @ok="onSave"
    @cancel="onCancel"
    @remove="$emit('onRemove', user.id)"
  >
    <b-form @submit.prevent="onSave">
      <InputString
        class="name"
        label="Нэр"
        size="lg"
        v-model="$v.form.name.$model"
        :vuelidate="$v.form.name"
      />
      <InputString
        class="user-email"
        label="Линк"
        size="lg"
        v-model="$v.form.email.$model"
        :vuelidate="$v.form.email"
      />
      <InputPassword
        class="user-password"
        label="Нууц үг"
        size="lg"
        v-model="$v.form.password.$model"
        :vuelidate="$v.form.password"
        :invalidFeedback="$t('validation.passwordInvalidFeedback')"
      />
    </b-form>
  </ModalMain>
</template>

<script>
import { isNil } from 'lodash';
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email, helpers } from 'vuelidate/lib/validators';
import { USER_CREATE, USER_PROFILE_UPDATE } from '@/store/actions/user';
import passwordRegExp from '@/utils/password';
import editModalMixin from '@/mixins/editModalMixin';
import ModalMain from '@/components/ui/ModalMain';
import InputString from '@/components/ui/input/InputString';
import InputPassword from '@/components/ui/input/InputPassword';

const defaultValuesForForm = () => ({
  name: '',
  email: '',
  password: '',
});

export default {
  mixins: [validationMixin, editModalMixin],

  props: {
    user: Object,
  },

  data() {
    return {
      modalId: 'manage-user-modal',
      form: defaultValuesForForm(),
    };
  },

  validations() {
    if (isNil(this.user)) {
      return {
        form: {
          name: {
            required,
          },
          email: {
            required,
            email,
          },
          password: {
            required,
            password: helpers.regex('password', passwordRegExp),
          },
        },
      };
    }
    return {
      form: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        password: {
          password: helpers.regex('password', passwordRegExp),
        },
      },
    };
  },

  watch: {
    user() {
      this.updateForm();
    },
  },

  computed: {
    ...mapGetters(['userStatus', 'getFileUpload']),
    isLoading() {
      return this.userStatus === 'loading';
    },
    title() {
      return isNil(this.user) ? 'Хэрэглэгч үүсгэх' : 'Хэрэглэгч засах';
    },
    saveButtonTitle() {
      return isNil(this.user) ? 'Нэмэх' : 'Засах';
    },
  },

  methods: {
    updateForm() {
      this.form = this.user
        ? {
            name: this.user.name,
            email: this.user.email,
            password: '',
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
    async onSave() {
      if (this.$v) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
      }

      const data = this.form;

      if (isNil(this.user)) {
        await this.$store.dispatch(USER_CREATE, data);
      } else {
        const payload = {
          id: this.user.id,
          data,
        };

        await this.$store.dispatch(USER_PROFILE_UPDATE, payload);
      }
      if (this.userStatus === 'success') {
        this.hideEditModal();
      }
    },
  },

  components: {
    ModalMain,
    InputString,
    InputPassword,
  },
};
</script>
