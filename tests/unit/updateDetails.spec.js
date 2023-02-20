import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import VueTelInput from 'vue-tel-input';
import messages from './messages';
import UpdateDetails from '../../src/views/fulfillment/changeInfo/updateDetails.vue';
import store from './store';
import './localStorage';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

describe('UpdateDetails.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(UpdateDetails, {
      global: {
        plugins: [store, ElementPlus, i18n, VueTelInput, VueGoogleMaps],
      },
    });
  });
  it('should bind the location long and lat coordintes to params', () => {
    wrapper.vm.setLocation({
      geometry: {
        location: { lat() { return -1.2994605; }, lng() { return 36.7906854; } },
      },
      name: 'Ngong Road',
    });
    expect(wrapper.vm.params.deliveryLocation.latitude).to.equal(-1.2994605);
    expect(wrapper.vm.params.deliveryLocation.longitude).to.equal(36.7906854);
  });
});
