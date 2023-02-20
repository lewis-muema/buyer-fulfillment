import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import messages from './messages';
import ChangeInfo from '../../src/views/fulfillment/changeInfo/changeInfo.vue';
import store from './store';
import './localStorage';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

describe('ChangeInfo.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ChangeInfo, {
      global: {
        plugins: [store, ElementPlus, i18n],
      },
    });
  });
  it('should set dialog to false', () => {
    expect(wrapper.vm.setDetailsDialogStatus).to.equal(false);
  });
});
