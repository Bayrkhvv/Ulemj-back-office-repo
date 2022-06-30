export default {
  props: {
    label: String,
    type: {
      type: String,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      required: false,
    },
    /**
     * The size of the button
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: 'md',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    pill: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    to: Object,
    tag: {
      type: String,
      default: 'button',
    },
    href: String,
  },

  data() {
    return {};
  },

  methods: {
    onClick($event) {
      this.$emit('click', $event);
    },
  },
};
