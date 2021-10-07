<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :width="$store.getters.getMobile ? '80%' : '30%'"
      center
      :show-close="false"
      :close-on-click-modal="true"
    >
      <form action="">
        <div class="">
          <div class="review-modal-title">Review changes</div>
          <br />
        </div>
        <div class="">
          <div class="review-modal-description">Name of Recepient</div>
          <div class="review-modal-item">{{ name }}</div>
        </div>
        <div class="mt-3">
          <div class="review-modal-description">Phone Number</div>
          <div class="review-modal-item">{{ phone }}</div>
        </div>
        <div class="mt-3">
          <div class="review-modal-description">Floor, apartment or HouseNo</div>
          <div class="review-modal-item">{{ houseLocation }}</div>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
          <el-button
            class="btn btn-primary update-info-button"
            type="button"
            @click="updateDeliveryInfo"
          >
            Confirm Changes
          </el-button>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
          <button class="btn btn-light" type="button" @click="handleClose">
            Cancel
          </button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import eventsMixin from '../../mixins/events_mixin';
import NotificationMxn from '../../mixins/nofication_mixin';

export default {
  props: [
    'dialogVisible',
    'name',
    'phone',
    'deliveryLocationDescription',
    'deliveryLocationLongitude',
    'deliveryLocationLatitude',
    'houseLocation',
    'deliveryOption',
  ],
  name: 'ReviewChanges',
  mixins: [NotificationMxn, eventsMixin],
  data() {
    return {};
  },
  methods: {
    ...mapActions(['updateDeliveryInformation']),
    async updateDeliveryInfo() {
      const payload = {
        name: this.name,
        phone_number: this.phone,
        delivery_location: {
          description: this.deliveryLocationDescription,
          longitude: this.deliveryLocationLongitude,
          latitude: this.deliveryLocationLatitude,
        },
        house_location: this.houseLocation,
        delivery_instructions: this.deliveryOption,
      };
      const fullPayload = {
        app: 'https://fulfillment-biz-logic-service-dev.sendyit.com/',
        values: payload,
        endpoint: `buyer/orders/${this.$route.params.deliveryId}/recipient/update`,
      };
      try {
        const data = await this.updateDeliveryInformation(fullPayload);
        if (data.errors.length === 0) {
          const notification = {
            title: 'Delivery information changed successfully',
            level: 1,
            message: '',
          };
          this.displayNotification(notification);
          this.$emit('close', false);
          this.$store.commit('setDialogVisible', false);
          this.sendSegmentEvents({
            event: 'Update Delivery Info',
            data: {
              userId: this.$store.getters.getData.data.destination.name,
              // eslint-disable-next-line max-len
              region: this.$store.getters.getData.data.destination.delivery_location.description,
            },
          });
          this.sendSegmentEvents({
            event: 'Confirm Delivery Details',
            data: {
              userId: this.$store.getters.getData.data.destination.name,
              // eslint-disable-next-line max-len
              region: this.$store.getters.getData.data.destination.delivery_location.description,
            },
          });
        }
        return data;
      } catch (error) {
        return error;
      }
    },
    handleClose() {
      this.$emit('close', false);
    },
  },
};
</script>

<style>
.review-modal-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: black;
}
.review-modal-description {
  font-size: 14px;
  color: #606266;
  letter-spacing: 0.4px;
}
.review-modal-item {
  font-size: 16px;
  color: black;
  letter-spacing: 0.4px;
  font-weight: 600;
}
</style>
