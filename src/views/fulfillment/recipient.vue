<template>
  <div>
    <div class="recepient-info">
      <h3>Receiver</h3>
      <div class="recepient">
        <div class="">
          <p><i class="el-icon-user"></i>{{ recepientInfo.name }}</p>
        </div>
        <div class="">
          <p><i class="el-icon-phone"></i>{{ recepientInfo.phone }}</p>
        </div>
        <div class="">
          <p><i class="el-icon-location-outline"></i>{{ recepientInfo.location }}</p>
          <p class=""><small class="text-muted">Building name, floor or flat number</small></p>
        </div>
        <div class="">
          <p class="text-primary">
            <i class="el-icon-info"></i>Tell us where you leave your delivery
          </p>
        </div>
      </div>
      <el-button type="primary" @click="showUpdateModal">Update Delivery Info</el-button>
    </div>
    <UpdateDetails
      :dialog-visible="showDialog"
      @close="showDialog = false"
      :name="recepientInfo.name"
      :phone="recepientInfo.phone"
      :location="recepientInfo.location"
    />
  </div>
</template>

<script>
import UpdateDetails from './updateDetails.vue';

export default {
  name: 'Recepient',
  components: {
    UpdateDetails,
  },
  data() {
    return {
      showDialog: false,
      recepientInfo: {
        name: 'James Doe',
        phone: ' +254 700 000 000',
        location: 'Umoja Heights, Lumumba Drive',
      },
    };
  },
  methods: {
    showUpdateModal() {
      this.showDialog = true;
    },
  },
};
</script>

<style>
.el-button {
  background: #324ba8 !important;
}
.recepient-info {
  text-align: left;
  padding-left: 100px;
}
.recepient > div > p > i {
  margin-right: 10px;
}
.recepient {
  line-height: 0;
}
</style>
