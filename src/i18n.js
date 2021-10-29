import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('../locales/', true, /[A-Za-z0-9-_,\s]+\.js$/i);
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

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});

function fetchCountry() {
  window.addEventListener('language-changed', (event) => {
    i18n.locale = event.detail;
  });
  const { EXTREME_IP_KEY } = process.env;
  axios(`https://extreme-ip-lookup.com/json/?key=${EXTREME_IP_KEY}`)
    .then((response) => {
      const francoPhoneCountries = ['FR', 'CI'].includes(response.data.countryCode);
      let lang;
      let locale;
      if (francoPhoneCountries) {
        i18n.locale = 'fr';
        lang = `fr-${response.data.countryCode}`;
        locale = 'fr';
      } else if (response.data.countryCode === 'NG') {
        i18n.locale = 'en-ng';
        lang = `en-${response.data.countryCode}`;
        locale = 'en-ng';
      } else {
        i18n.locale = 'en';
        lang = 'en-US,en;q=0.9';
        locale = 'en';
      }
      localStorage.setItem('buyerTimeLocale', locale);
      localStorage.setItem('buyerLanguage', lang);
      localStorage.setItem('buyerCountryCode', response.data.countryCode);
    })
    .catch((error) => error);
}

fetchCountry();

export default i18n;
