import Vuex from 'vuex';
import { expect } from 'chai';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Header from '../../../src/views/fulfillment/header.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(ElementUI);

let wrapper;
describe('header component', () => {
  wrapper = shallowMount(Header, { localVue });
  it('check if language dropdown  is set to false ', () => {
    expect(wrapper.vm.showLanguageDropdown).to.equal(false);
  });
});
