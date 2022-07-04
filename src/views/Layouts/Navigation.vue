<template>
  <nav :class="['navigation', { 'is-small': isSmall }]">
    <header class="navigation-header">
      <img src="@/assets/logo.jpeg" />
      <NavigationBurger @click="$emit('click')" :is-active="isSmall" />
    </header>
    <section class="navigation-body">
      <p class="nav-section-title">General</p>
      <div class="nav-section">
        <router-link :to="{ name: 'Companies' }" class="nav-link" exact-active-class="is-active">
          <span class="nav-link-icon bubbletea-icon-nav-orders"></span>
          <span>Компаниуд</span>
        </router-link>
        <router-link :to="{ name: 'Banners' }" class="nav-link" exact-active-class="is-active">
          <span class="nav-link-icon bubbletea-icon-nav-orders"></span>
          <span>Banners</span>
        </router-link>
        <router-link :to="{ name: 'Partners' }" class="nav-link" exact-active-class="is-active">
          <span class="nav-link-icon bubbletea-icon-nav-orders"></span>
          <span>Түнш</span>
        </router-link>
        <router-link :to="{ name: 'Services' }" class="nav-link" exact-active-class="is-active">
          <span class="nav-link-icon bubbletea-icon-nav-orders"></span>
          <span>Үйчилгээ</span>
        </router-link>
      </div>
      <p class="nav-section-title">Manage</p>
      <div class="nav-section">
        <router-link :to="{ name: 'Users' }" class="nav-link" exact-active-class="is-active">
          <span class="nav-link-icon bubbletea-icon-nav-orders"></span>
          <span>Admin</span>
        </router-link>
      </div>
    </section>
    <footer class="navigation-footer">
      <div class="navigation-footer-content">
        <p>Admin</p>
      </div>
      <button type="button" @click="onConfirmLogout" class="navigation-footer-caret">
        <!-- <img src="@/assets/icons/ic_caret.svg" /> -->
        <b-icon icon="power"></b-icon>
      </button>
    </footer>
    <ConfirmDialog
      id="logout-confirm-dialog"
      @ok="logout"
      :message="$t('modal.areYouSureYouWantToLogout')"
      :ok-title="$t('text.logout')"
      ok-variant="primary"
    />
  </nav>
</template>

<script>
import NavigationBurger from '@/views/Layouts/NavigationBurger';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import * as Sentry from '@sentry/browser';
import meMixin from '@/mixins/meMixin';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default {
  mixins: [meMixin],

  props: {
    isSmall: Boolean,
  },

  methods: {
    onConfirmLogout() {
      this.$bvModal.show('logout-confirm-dialog');
    },
    async logout() {
      await this.$store.dispatch(AUTH_LOGOUT);
      Sentry.configureScope(scope => scope.setUser(null));
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' });
      }
    },
  },

  components: {
    NavigationBurger,
    ConfirmDialog,
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/flexBox';

.navigation {
  color: $gray-600;
  z-index: 5;
  @include flexBox(flex, stretch, flex-start, column);
}

.navigation-header,
.navigation-footer {
  border-color: $gray-100;
  border-width: 0;
  border-style: solid;
  flex-shrink: 0;
}

.navigation-header {
  height: 6.25rem;
  border-bottom-width: 4px;
  @include flexBox(flex, center, space-between);

  img {
    margin-left: 1.5rem;
    width: 3.5rem;
  }
}

.navigation-body {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.navigation-footer {
  padding: 1.5rem;
  border-top-width: 4px;
  transition: padding 0.3s ease-out;
  @include flexBox(flex, center, space-between);

  p {
    margin-bottom: 0;
  }

  .navigation-footer-caret {
    background-color: $white;
    border-width: 0;
    outline-width: 0;
    padding: 1rem 1.5rem;
    line-height: 5px;
  }
}

.navigation-footer-content {
  opacity: 1;
  overflow: hidden;
  transition: opacity 0.3s ease-out;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.nav-section {
  border-bottom: 1px solid $gray-100;
}

.nav-section-title,
.nav-link {
  padding: 0.875rem 1.5rem;
  display: block;
  line-height: 1.2;
  margin-bottom: 0;
}

.nav-link {
  font-size: 0.875rem;
  color: $gray-500;
  @include flexBox(flex, center, flex-start);

  &.is-active {
    color: $black;
    font-weight: bold;

    span {
      color: $black;
    }
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.nav-link-icon {
  font-size: 1rem;
  flex-shrink: 0;

  & + span {
    opacity: 1;
    margin-left: 0.875rem;
    transition: opacity 0.3s ease-out;
  }
}

.nav-section-title {
  font-size: 0.5625rem;
  color: $primary;
  text-transform: uppercase;
  line-height: 1.5;
  padding-top: 1.5rem;
  padding-bottom: 0;
}

@media (min-width: $breakpoint-lg) {
  .navigation.is-small {
    .navigation-header {
      img {
        display: none;
      }
    }
    .nav-section-title {
      padding-left: 0;
      padding-right: 0;
      text-align: center;
    }
    .nav-link-icon {
      & + span {
        opacity: 0;
      }
    }
    .navigation-footer {
      padding: 0;
    }
    .navigation-footer-content {
      opacity: 0;
    }
  }
}
</style>
