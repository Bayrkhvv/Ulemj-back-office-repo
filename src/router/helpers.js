import store from '@/store';
import { USER_REQUEST } from '@/store/actions/user';
import AuthTokenStorageService from '@/services/AuthTokenStorageService';

export const ifNotAuthenticated = (to, from, next) => {
  if (!AuthTokenStorageService.getAccessToken()) {
    next();
  } else {
    next('/manage');
  }
};

export const ifAuthenticated = async (to, from, next) => {
  if (store.getters.isProfileLoaded) {
    next();
  } else if (AuthTokenStorageService.getAccessToken()) {
    await store.dispatch(USER_REQUEST);
    next();
  } else {
    next(`/?redirect=${to.path}`);
  }
};
