import { isNil } from 'lodash';
import InputLabel from '@/components/ui/input/InputLabel';

let uuid = 0;

export default {
  components: {
    InputLabel,
  },

  props: {
    label: {
      type: String,
      required: false,
    },
    labelClass: {
      type: String,
      default: 'label',
    },
    value: [String, Number, Object, Array, Boolean],
    hasError: Boolean,
    state: {
      type: Boolean,
      default: null,
    },
    /**
     * The size of the button
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    vuelidate: Object,
    invalidFeedback: String,
    validFeedback: String,
    autofocus: {
      type: Boolean,
      default: false,
    },
    append: String,
  },

  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },

  computed: {
    $_state() {
      if (isNil(this.vuelidate)) {
        return this.state;
      }

      return this.vuelidate.$dirty ? !this.vuelidate.$error : null;
    },
    $_hasError() {
      return isNil(this.vuelidate) ? this.hasError : this.vuelidate.$error;
    },
  },

  methods: {
    onChange($event) {
      this.$emit('input', $event);
    },
    onKeydownEnter($event) {
      this.$emit('keydownenter', $event);
    },
    onFocusout($event) {
      this.$emit('focusout', $event);
    },
  },
};
