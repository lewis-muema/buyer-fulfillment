import moment from 'moment';

const formatDates = {
  methods: {
    formatDate(date) {
      return moment(new Date(date)).format('dddd, Do MMMM');
    },
    formatCompletionDate(date) {
      return `${moment(new Date(date)).format('ddd, Do MMMM')} at ${moment(new Date(date)).format(
        'h:mm a',
      )}`;
    },
    formatDeliveryWindow(date) {
      if (date.estimated_delivery_time !== null) {
        const lowerLimit = moment(
          new Date(date.estimated_delivery_time - date.large_lower_limit * 60 * 1000),
        ).format('h a');
        const upperLimit = moment(
          new Date(date.estimated_delivery_time + date.large_upper_limit * 60 * 1000),
        ).format('h a');
        return `${lowerLimit} - ${upperLimit}`;
      }
      return '';
    },
  },
};
export default formatDates;
