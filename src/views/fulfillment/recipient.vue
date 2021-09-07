<template>
  <div>
    <h2>Receiver</h2>
    <p>{{ recepientInfo.name }}</p>
    <p>{{ recepientInfo.phone }}</p>
    <p>{{ recepientInfo.location }}</p>
    <el-button type="primary" @click="showUpdateModal">Update Delivery Info</el-button>
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
</style>
