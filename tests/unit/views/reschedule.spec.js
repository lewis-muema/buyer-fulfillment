import Vuex from 'vuex';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
// import { expect } from 'chai';
import Reschedule from '@/views/fulfillment/reschedule.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

let store;
let getters;
let wrapper;
const datePickerVisible = false;
describe('Reschedule.vue', () => {
  beforeEach(() => {
    getters = {
      getDatePickerVisible: () => datePickerVisible,
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(Reschedule, { store, localVue });
  });
  it('should set dialog to false', async () => {
    await wrapper.vm.datePickerVisible;
    console.log(wrapper.vm);
    // expect(wrapper.vm.visibleDetailsDialog.to.equal(false));
  });
});
