/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import VueI18n from 'vue-i18n';
import messages from './messages';
import './localstorage';
import ChangeInfo from '@/views/fulfillment/header.vue';
import StatusMixin from '../../../src/mixins/status_mixin';
import store from './store';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);
localVue.use(VueRouter);
const router = new VueRouter();
let wrapper;

describe('Header.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(ChangeInfo, { i18n, store, mixins: [StatusMixin], localVue, router, sync: false, });
  });
  it('check if language dropdown  is set to false ', () => {
    expect(wrapper.vm.showLanguageDropdown).to.equal(false);
  });
  it('checks if language changes on selecting dropdown', () => {
    wrapper.vm.changeLanguage('en');
    expect(wrapper.vm.language).to.equal('en');
  });
});
