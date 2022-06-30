<template>
  <div class="login">
    <section class="login-section">
      <b-container>
        <b-row>
          <b-col
            cols="12"
            lg="6"
            class="d-flex align-items-center justify-content-center"
          >
            <img src="@/assets/logo.png" />
          </b-col>
          <b-col cols="12" lg="6">
            <b-form @submit.prevent="onSubmit" class="login-form">
              <p class="h1">
                <strong>{{ $t("login.title") }}</strong>
              </p>

              <InputString
                class="email"
                size="lg"
                v-model="$v.form.email.$model"
                :vuelidate="$v.form.email"
                :placeholder="$t('placeholder.email')"
                autofocus
              />

              <InputPassword
                class="password"
                size="lg"
                v-model="$v.form.password.$model"
                :vuelidate="$v.form.password"
                :placeholder="$t('placeholder.password')"
                can-visible
              />

              <InlineButton type="submit" block size="lg" :loading="isLoading">
                <strong class="text-uppercase">{{
                  $t("login.buttonLabel")
                }}</strong>
              </InlineButton>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <div class="login-footer">{{ $t("footer") }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { email as emailValidator, required } from "vuelidate/lib/validators";
import InputPassword from "@/components/ui/input/InputPassword";
import InputString from "@/components/ui/input/InputString";
import InlineButton from "@/components/ui/button/InlineButton";
import { AUTH_REQUEST } from "@/store/actions/auth";

export default {
  mixins: [validationMixin],

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  validations: {
    form: {
      email: {
        required,
        email: emailValidator,
      },
      password: {
        required,
      },
    },
  },

  computed: {
    ...mapGetters(["me", "authStatus"]),
    isLoading() {
      return this.authStatus === "loading";
    },
  },

  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async onSubmit() {
      if (this.$v) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
      }

      try {
        await this.$store.dispatch(AUTH_REQUEST, this.form);
        if (this.$store.getters.isAuthenticated) {
          this.$router.push("/manage");
        }
      } catch (error) {
        if (error.response.status === 422) {
          this.form = { email: "", password: "" };
          this.$v.$reset();
          this.$bvToast.toast(this.$t("toast.incorrectCredentials"), {
            title: this.$t("text.error"),
            variant: "danger",
            solid: true,
          });
        } else {
          this.$bvToast.toast(error.message, {
            title: this.$t("text.error"),
            variant: "danger",
            solid: true,
          });
        }
      }
    },
  },

  components: { InputPassword, InputString, InlineButton },
};
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/flexBox";

.login {
  min-height: 100vh;
  background-color: $gray-100;
  @include flexBox(flex, stretch, center, column);
}

.login-section {
  flex-grow: 1;
  flex-shrink: 1;
  @include flexBox(flex, center, center, column);
}

.login-footer {
  flex-shrink: 0;
  margin-bottom: 0;
  font-size: 13px;
  padding: 2rem 1rem;
  text-align: center;
}

.h1 {
  margin-bottom: 1rem;
}

img {
  max-width: 140px;
  margin-bottom: 2rem;
}

@media (min-width: $breakpoint-sm) {
  img {
    max-width: 200px;
  }

  .login-form {
    background-color: $white;
    padding: 2.5rem;
    border-radius: 1.25rem;
    border: 1px solid $gray-200;
    box-shadow: 0 5px 12px rgba($primary-gray, 0.25);
  }
}

@media (min-width: $breakpoint-md) {
  img {
    max-width: 300px;
  }

  .h1 {
    margin-bottom: 3.5rem;
  }

  .login-form {
    padding: 3.75rem;
  }
}

@media (min-width: $breakpoint-lg) {
  img {
    margin-bottom: 0;
    margin-right: 3rem;
  }
}
</style>
