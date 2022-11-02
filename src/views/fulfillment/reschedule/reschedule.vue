<template>
  <div>
    <el-dialog
      v-model="visibleDatePicker"
      :width="$store.getters.getMobile ? '80%' : '30%'"
      :center="true"
      :align-center="true"
      :close-on-click-modal="true"
      :fullscreen="$store.getters.getMobile ? true : false"
    >
      <div class="date-picker-title">
        {{ $t("reschedule.pickADate") }}
      </div>
      <datepicker
        :inline="true"
        :value="date"
        :disabled-dates="disabledDates"
        v-model="date"
        :wrapper-class="this.$store.getters.getMobile ? '' : 'date-picker-desktop'"
      ></datepicker>
      <div>
        <button class="back-button" @click="visibleDatePicker = false">
          {{ $t("reschedule.back") }}
        </button>
        <el-button class="save-button" @click="rescheduleDelivery()">
          {{ $t("reschedule.save") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Datepicker from 'vuejs3-datepicker';
import moment from 'moment';
import notificationMxn from '../../../mixins/nofication_mixin';

export default {
  name: 'RescheduleCard',
  mixins: [notificationMxn],
  components: { Datepicker },
  watch: {
    '$store.getters.getDatePickerVisible': function setDialogStatus(val) {
      this.visibleDatePicker = val;
    },
    visibleDatePicker(val) {
      this.$store.commit('setDatePickerVisible', val);
    },
  },
  data() {
    return {
      loading: false,
      visibleDatePicker: false,
      date: moment().add(1, 'days').format('YYYY-MM-DD'),
      locale: '',
      disabledDates: {
        preventDisableDateSelection: true,
        customPredictor(date) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const sunday = new Date().getDay() === 6;
          return (
            date < today
            || date >= new Date(today.getTime() + 1000 * 60 * 60 * 24 * 3)
            || sunday
          );
        },
      },
    };
  },
  mounted() {
    window.addEventListener('language-changed', (event) => {
      this.locale = event.detail;
    });
  },
  methods: {
    rescheduleDelivery() {
      const date = moment().format('YYYY-MM-DD') === this.date
        ? new Date().getTime() + 60000
        : new Date(this.date).getTime();
      this.$store.commit('setLoading', true);
      this.$store.commit('setDatePickerVisible', false);
      this.$store
        .dispatch('requestAxiosPut', {
          app: process.env.FULFILMENT_SERVER,
          endpoint: `buyer/orders/${this.$store.getters.getData.data.order_id}/reschedule`,
          values: {
            proposed_scheduled_date: date,
          },
        })
        .then((res) => {
          this.$store.commit('setLoading', false);
          if (res.status === 200) {
            const message = this.$t('reschedule.success');
            const notification = {
              title: '',
              level: 1,
              message,
            };
            this.displayNotification(notification);
            this.$store.commit('setDetailsDialogVisible', false);
            this.$store
              .dispatch('requestAxiosGet', {
                app: process.env.FULFILMENT_SERVER,
                endpoint: `buyer/orders/${this.$route.params.deliveryId}`,
              })
              .then((response) => {
                this.$store.commit('setData', response.data);
                this.$store.commit('setDeliveryStatus', response.data.data.order_event_status);
              });
          } else {
            let message = res.data.message.replaceAll('.', ' ');
            message = message.charAt(0).toUpperCase() + message.slice(1);
            const notification = {
              title: '',
              level: 3,
              message,
            };
            this.displayNotification(notification);
          }
        });
    },
  },
};
</script>

<style>
.date-picker-title {
  text-align: center;
  margin: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #324ba8;
}
.save-button {
  float: right;
}
.back-button {
  height: 40px;
  padding: 0px 25px;
  margin: 10px 0px;
  font-weight: 600;
  color: black;
  text-transform: uppercase;
  font-size: 12px;
}
.v-picker__body {
  width: auto !important;
}
.v-date-picker-table {
  padding: 0, 0 !important;
  height: auto !important;
}
.vuejs3-datepicker__calendar {
  box-shadow: none !important;
}
.vuejs3-datepicker__calendar-topbar {
  background-color: #324ba8 !important;
}
.vuejs3-datepicker__calendar .cell.selected {
  background: #324ba8 !important ;
}
.vuejs3-datepicker__calendar .cell {
  border-radius: 50%;
}
.vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid #324ba8;
}
.date-picker-desktop {
  margin-left: 17%;
}
.date-picker-mobile {
  margin-left: 30px;
}
.vuejs3-datepicker__calendar .disabled {
  color: grey !important;
}
</style>
