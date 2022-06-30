<template>
  <div v-if="typeof value === 'boolean'">
    <b-badge v-if="value" pill variant="success" class="status">Active</b-badge>
    <b-badge v-else pill variant="secondary" class="status">Inactive</b-badge>
  </div>
  <div v-else>
    <b-badge pill :variant="getVariant(value)" class="status">{{ value.toLowerCase() }}</b-badge>
  </div>
</template>

<script>
export default {
  props: {
    value: [Boolean, String],
  },

  data() {
    return {
      successOptions: ['PAID', 'PRINTED'],
    };
  },

  methods: {
    getVariant(status) {
      if (this.successOptions.includes(status)) {
        return 'success';
      }
      return 'light';
    },
  },
};
</script>

<style lang="scss" scoped>
.status {
  line-height: 1.5;
  min-width: 5.625rem;
  text-transform: capitalize;
}
</style>
