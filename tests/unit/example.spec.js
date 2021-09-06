import Vue from 'vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Pagination,
  Dropdown,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Icon,
  Rate,
  Steps,
  Step,
  Row,
  Col,
  Loading,
  Popover,
  RadioGroup,
  RadioButton,
  Autocomplete,
  Upload,
  CheckboxGroup,
  Progress,
} from 'element-ui';
import Fulfillment from '../../src/components/fulfillment/fulfillment.vue';

locale.use(lang);

Vue.use(Pagination);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dropdown);
Vue.use(Dialog);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Icon);
Vue.use(Rate);
Vue.use(Popover);
Vue.use(Autocomplete);
Vue.use(Loading.directive);
Vue.use(Upload);
Vue.use(CheckboxGroup);
Vue.use(Progress);

describe('Fulfillment.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Fulfillment);
    expect(wrapper.vm.data).to.equal('');
  });
});
