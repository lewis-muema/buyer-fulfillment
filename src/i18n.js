import { createI18n } from 'vue-i18n';
import axios from 'axios';
import moment from 'moment';

function loadLocaleMessages() {
  const locales = require.context(
    '../locales/',
    true,
    /[A-Za-z0-9-_,\s]+\.js$/i,
  );
  console.log('locale', locales);
  const messages = {};

  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});
function ipLookUp() {
  axios(`https://extreme-ip-lookup.com/json/?key=${process.env.EXTREME_IP_KEY}`)
    .then((response) => {
      window.dispatchEvent(
        new CustomEvent('country-fetched', { detail: response.data }),
      );
    })
    .catch((error) => error);
}
function changeLanguage() {
  window.addEventListener('language-changed', (event) => {
    i18n.locale = event.detail;
    moment.locale(event.detail);
  });
  window.addEventListener('country-default', () => {
    ipLookUp();
  });
}

changeLanguage();

export default i18n;
