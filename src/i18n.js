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
      i18n.locale = francoPhoneCountries ? 'fr' : 'en';
      const lang = francoPhoneCountries ? `fr-${response.data.countryCode}` : 'en-US,en;q=0.9';
      const locale = francoPhoneCountries ? 'fr' : 'en';
      localStorage.setItem('buyerTimeLocale', locale);
      localStorage.setItem('buyerLanguage', lang);
      localStorage.setItem('buyerCountryCode', response.data.countryCode);
    })
    .catch((error) => error);
}

fetchCountry();

export default i18n;
