<template>
  <div :class="['main', { 'has-small-navigation': isSmall }]">
    <Navigation class="main-navigation" :is-small="isSmall" @click="isSmall = !isSmall" />
    <div v-if="isSmall" @click="isSmall = !isSmall" class="main-navigation-backdrop"></div>
    <div class="main-container">
      <BeatLoader v-if="loading" />
      <template v-else>
        <NavigationBurger
          @click="isSmall = !isSmall"
          :is-active="isSmall"
          class="main-container-burger"
        />
        <router-view :title="title" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navigation from '@/views/Layouts/Navigation';
import BeatLoader from '@/components/ui/BeatLoader';
import NavigationBurger from '@/views/Layouts/NavigationBurger';

export default {
  data() {
    return {
      loading: false,
      isSmall: false,
    };
  },

  watch: {
    $route: {
      handler() {
        this.isSmall = false;
      },
    },
  },

  computed: {
    ...mapGetters([]),
    title() {
      if (this.$route.meta?.title) {
        return this.$route.meta.title;
      }
      return this.$route.name
        .replace('Index', '')
        .replace(/([A-Z])/g, ' $1')
        .trim();
    },
  },

  components: {
    Navigation,
    BeatLoader,
    NavigationBurger,
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/variables';

.main {
  padding-left: 0;
  position: relative;
  width: 100%;
  height: 100vh;
  transition: padding-left 0.3s ease-out;

  .main-navigation {
    position: fixed;
    top: 0;
    left: -240px;
    bottom: 0;
    width: 240px;
    box-shadow: 0 5px 15px rgba($black, 0.1);
    transition: all 0.3s ease-out;
    background-color: $white;

    &.is-small {
      left: 0;
    }
  }

  .main-navigation-backdrop {
    background-color: $black;
    opacity: 0.65;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
  }
}

.main-container-burger {
  position: fixed;
  top: 0;
  left: 0;
  height: 3rem;
  width: 3rem;
}

@media (min-width: $breakpoint-md) {
  .main-container-burger {
    height: 6.25rem;
    width: 4rem;
  }
}

@media (min-width: $breakpoint-lg) {
  .main {
    padding-left: 240px;

    .main-navigation {
      left: 0;
    }

    &.has-small-navigation {
      padding-left: 4rem;

      .main-navigation {
        width: 4rem;
      }
    }

    .main-navigation-backdrop {
      display: none;
    }
  }

  .main-container-burger {
    display: none;
  }
}
</style>
