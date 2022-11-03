<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div>
  <div v-if="showRecepient">
    <div :class="!$store.getters.getMobile ? 'recepient-info-desktop' : 'recepient-info-mobile'">
      <h3 :class="!$store.getters.getMobile ? '' : 'recepient-info-title-mobile'">
        {{ $t("changeInfo.Receiver") }}
      </h3>
      <div class="recepient">
        <div class="recipient-details">
          <p class="reciepient-details-rows">
            <el-icon><User /></el-icon>
            {{ $store.getters.getData.data.destination.name }}
          </p>
        </div>
        <div class="recipient-details">
          <p class="reciepient-details-rows">
            <el-icon><PhoneFilled /></el-icon>
            {{ $store.getters.getData.data.destination.phone_number }}
          </p>
        </div>
        <div class="recipient-details">
          <p class="reciepient-details-rows">
            <el-icon><Location /></el-icon>
            {{
              $store.getters.getData.data.destination.delivery_location
                ? $store.getters.getData.data.destination.delivery_location.description
                : ""
            }}
          </p>
          <div
            class="recipient-details"
            v-if="getStatus([0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 15])
              .includes($store.getters.getDeliveryStatus)"
          >
            <a class="reciepient-delivery-instructions-mobile pt-3" @click="showUpdateModal"
              >{{$t("recipient.deliveryInstructions")}}</a
            >
          </div>
        </div>
        <div
          v-if="!getStatus([9, 10]).includes($store.getters.getDeliveryStatus)"
          class="recipient-details"
        >
        </div>
      </div>
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
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { User, PhoneFilled, Location } from '@element-plus/icons';
import UpdateDetails from '../changeInfo/updateDetails.vue';
import changeInfo from '../changeInfo/changeInfo.vue';
import statusMixin from '../../../mixins/status_mixin';

export default {
  name: 'RecepientDetails',
  components: {
    UpdateDetails,
    changeInfo,
    User,
    PhoneFilled,
    Location,
  },
  mixins: [statusMixin],
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters(['getRecipientVisible', 'getMobile', 'getData']),
    showRecepient() {
      if (this.getData.data.order_status === 'ORDER_COMPLETED' && this.getMobile) {
        return this.getRecipientVisible;
      }
      return !this.getRecipientVisible;
    },
  },
  methods: {
    showDetailsPicker() {
      this.$store.commit('setDetailsDialogVisible', true);
    },
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
.reciepient-delivery-instructions-mobile {
  margin-left: 30px;
  text-decoration: none !important;
  line-height: 3em !important;
  color: #324ba8 !important;
  padding-top: 25px;
  cursor: pointer;
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
