import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import messages from './messages';
import RescheduleDateButton from '../../src/views/fulfillment/changeInfo/rescheduleDateButton.vue';
import store from './store';
import './localStorage';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

describe('RescheduleDateButton.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(RescheduleDateButton, {
      global: {
        plugins: [store, ElementPlus, i18n],
      },
    });
  });
  it('formats the date', () => {
    expect(wrapper.vm.formatDate(1634386603000)).to.equal('Saturday, 16th October');
  });
});
