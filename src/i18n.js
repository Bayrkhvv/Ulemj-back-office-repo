import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadMessages() {
  const context = require.context('./lang', true, /[a-z0-9-_]+\.json$/i);
  const messages = context
    .keys()
    .map(key => ({ key, locale: key.match(/[a-z0-9-_]+/i)[0] }))
    .reduce(
      (messageList, { key, locale }) => ({
        ...messageList,
        [locale]: context(key),
      }),
      {}
    );
  return messages;
}

const messages = loadMessages();

export default new VueI18n({
  locale: process.env.VUE_APP_LOCALE || 'en',
  messages,
  silentTranslationWarn: process.env.NODE_ENV === 'production',
});
