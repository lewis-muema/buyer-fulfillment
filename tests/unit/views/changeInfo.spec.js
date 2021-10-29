// import Vuex from 'vuex';
// import ElementUI from 'element-ui';
// import { shallowMount, createLocalVue } from '@vue/test-utils';
// // import { expect } from 'chai';
// import ChangeInfo from '@/views/fulfillment/changeInfo.vue';

// const localVue = createLocalVue();
// localVue.use(Vuex);
// localVue.use(ElementUI);

// let store;
// let getters;
// let wrapper;
// const detailsDialogVisible = false;
// describe('changeInfo.vue', () => {
//   beforeEach(() => {
//     getters = {
//       getDetailsDialogVisible: () => detailsDialogVisible,
//     };
//     store = new Vuex.Store({
//       getters,
//     });
//     wrapper = shallowMount(ChangeInfo, { store, localVue });
//   });
//   it('should set dialog to false', async () => {
//     await wrapper.vm.visibleDetailsDialog;
//     console.log(wrapper.vm);
//     // expect(wrapper.vm.visibleDetailsDialog.to.equal(false));
//   });
//   it('triggers a click on change info button', async () => {
//     await wrapper.find('el-button').trigger('click');
//   });
// });
