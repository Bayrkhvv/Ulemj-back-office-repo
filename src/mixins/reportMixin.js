import { SALES_REPORT_REQUEST, SALES_REPORT_EXPORT } from '@/store/actions/report';
import { mapGetters } from 'vuex';
import ReportLayout from '@/components/manage/reports/ReportLayout';
import TableBox from '@/components/ui/TableBox';

export default {
  components: {
    ReportLayout,
    TableBox,
  },

  props: {
    title: String,
  },

  data() {
    return {
      dateRange: {
        startDate: this.$moment().subtract(1, 'month'),
        endDate: this.$moment(),
      },
      datePicker: {
        opens: 'left',
        localeData: { firstDay: 0 },
        maxDate: new Date(this.$moment().format()),
        singleDatePicker: false,
        linkedCalendars: true,
        autoApply: true,
        ranges: {
          Today: [new Date(this.$moment().format()), new Date(this.$moment().format())],
          Yesterday: [
            new Date(this.$moment().subtract(1, 'day')),
            new Date(this.$moment().subtract(1, 'day')),
          ],
          'Last month': [
            new Date(this.$moment().subtract(1, 'month').startOf('month')),
            new Date(this.$moment().subtract(1, 'month').endOf('month')),
          ],
          'This Quarter': [
            new Date(this.$moment().startOf('quarter')),
            new Date(this.$moment().endOf('quarter')),
          ],
          'This Year': [
            new Date(this.$moment().startOf('year')),
            new Date(this.$moment().endOf('year')),
          ],
        },
      },
      reportType: '',
      currentPage: 1,
      perPage: 10,
    };
  },

  watch: {
    currentPage() {
      this.fetchData();
    },
  },

  computed: {
    ...mapGetters(['reportList', 'reportStatus', 'reportMeta', 'reportLink']),
    isLoading() {
      return this.reportStatus === 'loading';
    },
    isDownloading() {
      return this.reportStatus === 'downloading';
    },
  },

  methods: {
    async fetchData() {
      await this.$store.dispatch(SALES_REPORT_REQUEST, {
        type: this.reportType,
        startAt: this.dateRange.startDate,
        endAt: this.dateRange.endDate,
        page: this.currentPage,
        limit: this.perPage,
      });
    },
    updateValues(range) {
      this.dateRange = range;
      this.fetchData();
    },
    async onDownload() {
      await this.$store.dispatch(SALES_REPORT_EXPORT, {
        type: this.reportType,
        startAt: this.dateRange.startDate,
        endAt: this.dateRange.endDate,
        page: this.currentPage,
        limit: this.perPage,
      });

      if (this.reportStatus === 'success') {
        window.open(this.reportLink, '_blank');
      }
    },
    onChangePage(page) {
      this.currentPage = page;
    },
  },
};
