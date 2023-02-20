import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import moxios from 'moxios';
import axios from 'axios';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import VueTelInput from 'vue-tel-input';
import messages from './messages';
import ReviewChanges from '../../src/views/fulfillment/changeInfo/reviewChanges.vue';
import store from './store';
import './localStorage';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

describe('ReviewChanges.vue', () => {
  let wrapper;
  beforeEach(() => {
    moxios.install(axios);
    window.axios = axios;
    wrapper = mount(ReviewChanges, {
      global: {
        plugins: [store, ElementPlus, i18n, VueTelInput, VueGoogleMaps],
      },
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should render member props in the component', () => {
    expect(wrapper.props()).to.have.any.keys('name');
    expect(wrapper.props()).to.have.any.keys('deliveryLocationDescription');
    expect(wrapper.props()).to.have.any.keys('deliveryLocationLongitude');
    expect(wrapper.props()).to.have.any.keys('deliveryLocationLatitude');
    expect(wrapper.props()).to.have.any.keys('houseLocation');
    expect(wrapper.props()).to.have.any.keys('deliveryOption');
  });
  it('submits the updated details', (done) => {
    wrapper.vm.updateDeliveryInfo();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            message: 'order.reschedule.success',
            data: null,
            errors: [],
          },
        })
        .then((response) => {
          expect(response.data.message).to.equal('order.reschedule.success');
          expect(store.getters.getDetailsDialogVisible).to.equal(false);
          done();
        })
        .catch((error) => {
          console.log('caught', error.message);
        });
    });
  });
});
