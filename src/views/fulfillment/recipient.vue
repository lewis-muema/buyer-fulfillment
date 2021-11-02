<template>
  <div v-if="$store.getters.getRecipientVisible"
  >
    <div :class="!$store.getters.getMobile ? 'recepient-info-desktop' : 'recepient-info-mobile'">
      <h3 :class="!$store.getters.getMobile ? '' : 'recepient-info-title-mobile'">
        {{ $t('changeInfo.Receiver') }}
      </h3>
      <div class="recepient">
        <div class="recipient-details">
          <p class="reciepient-details-rows">
            <i class="el-icon-user"></i>
            {{ $store.getters.getData.data.destination.name }}
          </p>
        </div>
        <div class="recipient-details">
          <p class="reciepient-details-rows">
            <i class="el-icon-phone"></i>
            {{ $store.getters.getData.data.destination.phone_number }}
          </p>
        </div>
        <div class="recipient-details">
          <p class="reciepient-details-rows">
            <i class="el-icon-location-outline"></i>
            {{
              $store.getters.getData.data.destination.delivery_location
                ? $store.getters.getData.data.destination.delivery_location.description
                : ""
            }}
          </p>
          <p class="reciepient-details-rows">
            <small class="text-muted recipient-indent-text">
              {{ $store.getters.getData.data.destination.house_location }}
            </small>
          </p>
        </div>
        <div
          v-if="!getStatus([9, 10]).includes($store.getters.getDeliveryStatus)"
          class="recipient-details"
        >
          <p
            v-if="!$store.getters.getMobile"
            class="recipient-details-leave-delivery"
          >
            <i class="el-icon-info"></i>{{ $t('recipient.whereToLeaveYourDelivery') }}
          </p>
        </div>
      </div>
      <el-button
        v-if="!getStatus([9, 10]).includes($store.getters.getDeliveryStatus)
          && !$store.getters.getMobile"
        type="primary"
        @click="showDetailsPicker"
        class="update-info-button-desktop"
        >{{ $t('mobile.changeDetails') }}</el-button
      >
    </div>
    <UpdateDetails
      :name="$store.getters.getData.data.destination.name"
      :phone="$store.getters.getData.data.destination.phone_number"
      :location="
        $store.getters.getData.data.destination.delivery_location
          ? $store.getters.getData.data.destination.delivery_location.description
          : ''
      "
      :house="$store.getters.getData.data.destination.house_location"
      :instructions="$store.getters.getData.data.destination.delivery_instructions"
    />
    <changeInfo />
  </div>
</template>

<script>
import UpdateDetails from './updateDetails.vue';
import changeInfo from './changeInfo.vue';
import statusMixin from '../../mixins/status_mixin';

export default {
  name: 'Recepient',
  components: {
    UpdateDetails,
    changeInfo,
  },
  mixins: [statusMixin],
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    showDetailsPicker() {
      this.$store.commit('setDetailsDialogVisible', true);
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
}
.update-info-button-mobile {
  width: 100%;
}
.update-info-button-desktop {
  margin-bottom: 0;
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
  justify-content: flex-start;
  flex-direction: column;
}
.recipient-indent-text {
  margin-left: 25px;
}
.recipient-details-leave-delivery {
  color: #324ba8 !important;
  margin: 10px 0px;
}
.reciepient-details-rows {
  line-height: normal;
  height: 0px !important;
}
</style>
