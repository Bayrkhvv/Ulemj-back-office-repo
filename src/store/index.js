import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import company from '@/store/modules/company';
import file from '@/store/modules/file';
import banner from '@/store/modules/banner';
import partner from '@/store/modules/partner';
import service from '@/store/modules/service';
import user from '@/store/modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    file,
    auth,
    company,
    banner,
    partner,
    service,
    user,
  },
  strict: debug,
});
