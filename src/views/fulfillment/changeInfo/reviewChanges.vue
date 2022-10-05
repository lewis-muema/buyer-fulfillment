<template>
  <div>
    <el-dialog
      v-model="reviewDialogStatus"
      :width="$store.getters.getMobile ? '80%' : '30%'"
      center
      :show-close="false"
      :close-on-click-modal="true"
    >
      <form action="">
        <div class="">
          <div class="review-modal-title">{{ $t("reviewChanges.reviewChanges") }}</div>
          <br />
        </div>
        <div class="">
          <div class="review-modal-description">{{ $t("reviewChanges.recipientName") }}</div>
          <div class="review-modal-item">{{ name }}</div>
        </div>
        <div class="mt-3">
          <div class="review-modal-description">{{ $t("reviewChanges.phoneNumber") }}</div>
          <div class="review-modal-item">{{ phone }}</div>
        </div>
        <div class="mt-3">
          <div class="review-modal-description">{{ $t("reviewChanges.houseLocation") }}</div>
          <div class="review-modal-item">{{ houseLocation }}</div>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
          <el-button
            class="btn btn-primary update-info-button"
            type="primary"
            @click="updateDeliveryInfo"
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
          >
            {{ $t("reviewChanges.confirmChanges") }}
          </el-button>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
          <button class="btn btn-light" type="primary" @click="handleClose">
            {{ $t("reviewChanges.cancel") }}
          </button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import eventsMixin from '../../../mixins/events_mixin';
import NotificationMxn from '../../../mixins/nofication_mixin';

export default {
  props: [
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
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['getReviewDialogVisible']),
    reviewDialogStatus: {
      get() {
        return this.getReviewDialogVisible;
      },
      set(val) {
        return this.setReviewDialogVisible(val);
      },
    },
  },
  methods: {
    ...mapMutations(['setReviewDialogVisible', 'setDialogVisible', 'setDetailsDialogVisible']),
    ...mapActions(['updateDeliveryInformation']),
    async updateDeliveryInfo() {
      this.loading = true;
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
        app: process.env.FULFILMENT_SERVER,
        values: payload,
        endpoint: `buyer/orders/${this.$store.getters.getData.data.order_id}/recipient/update`,
      };
      try {
        const data = await this.updateDeliveryInformation(fullPayload);
        if (data.errors.length === 0) {
          this.loading = false;
          const notification = {
            title: this.$t('reviewChanges.infoChanged'),
            level: 1,
            message: '',
          };
          this.displayNotification(notification);
          this.$emit('close', false);
          this.setReviewDialogVisible(false);
          this.setDialogVisible(false);
          this.setDetailsDialogVisible(false);
          this.$store
            .dispatch('requestAxiosGet', {
              app: process.env.FULFILMENT_SERVER,
              endpoint: `buyer/orders/${this.$route.params.deliveryId}`,
            })
            .then((response) => {
              this.$store.commit('setData', response.data);
              this.$store.commit('setDeliveryStatus', response.data.data.order_event_status);
            });
          this.sendSegmentEvents({
            event: 'Update_delivery_info',
            data: {
              userId: this.$store.getters.getData.data.destination.name,
              // eslint-disable-next-line max-len
              region: this.$store.getters.getData.data.destination.delivery_location.description,
            },
          });
          this.sendSegmentEvents({
            event: 'Confirm_delivery_details',
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
