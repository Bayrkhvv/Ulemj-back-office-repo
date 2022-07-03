import store from '@/store';
import * as Sentry from '@sentry/browser';
import { USER_REGISTER } from '@/store/actions/user';

const RegistrationService = {
  async register(payload) {
    await store.dispatch(USER_REGISTER, payload);
  },
  setSegmentAndSentry(payload) {
    Sentry.configureScope(scope => {
      scope.setUser({
        email: payload.email,
      });
    });
  },
};

export default RegistrationService;
