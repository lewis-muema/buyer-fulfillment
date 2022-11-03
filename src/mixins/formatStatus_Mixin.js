import { mapGetters } from 'vuex';
import moment from 'moment';

const formatStatusMixin = {
  computed: {
    ...mapGetters(['getOrderEvents']),
  },
  methods: {
    showEventLabels(status, item) {
      let date = '';
      const newStatus = status.split('_').join('.');
      if (
        [
          'orderCreated',
          'deliveryCompletedDate',
          'orderFailed',
          'rescheduledBySeller',
          'rescheduledBySendy',
          'rescheduledByBuyer',
        ].includes(this.getOrderEvents[newStatus].split('.')[1])
      ) {
        date = item.event_date !== null ? moment(item.event_date).format('dddd, Do MMMM') : '';
      }
      return this.$t(this.getOrderEvents[newStatus], { Date: date });
    },
  },
};
export default formatStatusMixin;
