<template>
  <div>
    <el-dialog
      :visible.sync="visibleDatePicker"
      :width="$store.getters.getMobile ? '80%' : '30%'"
      center
      :close-on-click-modal="true"
    >
      <div class="date-picker-title">
        Pick a date that works for you
      </div>
      <v-date-picker v-model="date" color="#324BA8"></v-date-picker>
      <div>
        <button class="back-button" @click="visibleDatePicker = false">Back</button>
        <el-button class="save-button">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Reschedule',
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
      visibleDatePicker: false,
      date: moment(new Date(this.$store.getters.getData.data.expected_delivery_date)).format(
        'YYYY-MM-DD',
      ),
    };
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
</style>
