<template>
  <div>
    <div :class="!$store.getters.getMobile ? 'recepient-info-desktop' : 'recepient-info-mobile'">
      <h3 :class="!$store.getters.getMobile ? '' : 'recepient-info-title-mobile'">Receiver</h3>
      <div class="recepient">
        <div class="recipient-details">
          <p><i class="el-icon-user"></i>{{ recepientInfo.customer_name }}</p>
        </div>
        <div class="recipient-details">
          <p><i class="el-icon-phone"></i>{{ recepientInfo.customer_phone_number }}</p>
        </div>
        <div class="recipient-details">
          <p><i class="el-icon-location-outline"></i>
            {{ recepientInfo.customer_delivery_location
            ? recepientInfo.customer_delivery_location.description
            : '' }}
          </p>
          <p class="">
            <small class="text-muted recipient-indent-text">
              {{ recepientInfo.house_location }}
            </small>
          </p>
        </div>
        <div v-if="$store.getters.getDeliveryStatus !== 3" class="recipient-details">
          <p class="recipient-details-leave-delivery">
            <i class="el-icon-info"></i>Tell us where you leave your delivery
          </p>
        </div>
      </div>
      <el-button
        v-if="$store.getters.getDeliveryStatus !== 3"
        type="primary" @click="showUpdateModal"
      >Update Delivery Info</el-button>
    </div>
    <UpdateDetails
      :name="recepientInfo.customer_name"
      :phone="recepientInfo.customer_phone_number"
      :location="recepientInfo.customer_delivery_location
      ? recepientInfo.customer_delivery_location.description
      : ''"
      :house="recepientInfo.house_location"
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
  mounted() {
    this.recepientInfo = this.$store.getters.getData.data.recipientContactInformation;
  },
  methods: {
    showUpdateModal() {
      this.$store.commit('setDialogVisible', true);
    },
  },
};
</script>

<style>
.el-button {
  background: #324ba8 !important;
  border-color: #324ba8 !important;
  margin: 10px 0px;
  color: white !important;
}
.recepient-info-desktop {
  padding-left: 100px;
}
.recepient-info-mobile {
  margin-left: 20px;
  margin-top: -30px;
}
.recepient-info-title-mobile {
  margin: 20px 0px;
  color: #606266;
  text-transform: uppercase;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 1.5px;
  text-align: left;
}
.recepient > div > p > i {
  margin-right: 10px;
}
.recepient {
  line-height: 0;
}
.recipient-details {
  display: flex;
  height: 40px;
  justify-content: center;
  flex-direction: column;
}
.recipient-indent-text {
  margin-left: 25px;
}
.recipient-details-leave-delivery {
  color: #324BA8 !important;
  margin: 10px 0px;
}
</style>
