import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import VueTelInput from 'vue-tel-input';
import messages from './messages';
import ReceiverSummaryInfo from '../../src/views/fulfillment/changeInfo/receiverSummaryInfo.vue';
import store from './store';
import './localStorage';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

describe('ReceiverSummary.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ReceiverSummaryInfo, {
      global: {
        plugins: [store, ElementPlus, i18n, VueTelInput, VueGoogleMaps],
      },
    });
  });
  it('should check the recepient info details', () => {
    expect(wrapper.vm.recepientInfo).to.be.an('object');
  });
});
