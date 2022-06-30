<template>
  <date-range-picker
    ref="picker"
    :opens="config.opens"
    :locale-data="config.localeData"
    :minDate="config.minDate"
    :maxDate="config.maxDate"
    :singleconfig="config.singleconfig"
    :autoApply="config.autoApply"
    :date-range="value"
    @select="updateValues"
    :linkedCalendars="config.linkedCalendars"
    :ranges="config.ranges"
    class="date-range-picker"
  >
    <template v-slot:input="picker">
      {{ $moment(picker.startDate).format('DD MMM, YYYY') }} -
      {{ $moment(picker.endDate).format('DD MMM, YYYY') }}
    </template>
  </date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  props: {
    config: Object,
    value: [String, Number, Object, Array, Boolean],
  },
  components: { DateRangePicker },
  data() {
    return {
      date: null,
    };
  },
  methods: {
    updateValues(range) {
      this.$emit('clickUpdate', range);
    },
  },
};
</script>
<style lang="scss">
@import '../../../sass/variables';

.date-range-picker {
  & > * {
    &.form-control {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: $black;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      padding-left: 2em;
      padding-right: 2em;
      border-radius: 50rem;
    }

    &.daterangepicker {
      top: 100%;

      &.opensleft {
        right: 0;
      }
      td.active,
      td.active:hover {
        background-color: $primary;
      }
    }
  }
}

@media (min-width: $breakpoint-md) {
  .date-range-picker {
    & > * {
      &.daterangepicker {
        & > .calendars {
          flex-wrap: nowrap;
        }
      }
    }
  }
}
</style>
