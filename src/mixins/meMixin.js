import { mapGetters, mapState } from 'vuex';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default {
  computed: {
    ...mapGetters(['me', 'isProfileLoaded']),
    ...mapState({
      isProfileLoading: state => state.user.status === 'loading',
    }),
  },

  methods: {
    getName(user) {
      if (user && user.firstName) {
        return user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName;
      }
      return null;
    },

    getId(user) {
      return user.id;
    },

    getInternationalPhoneNumber(phone) {
      const parsedPhone = parsePhoneNumberFromString(phone);
      return parsedPhone ? parsedPhone.formatNational() : phone;
    },

    getFullGender(gender) {
      return gender === 'M' ? 'Male' : 'Female';
    },
  },
};
