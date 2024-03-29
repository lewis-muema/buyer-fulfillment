<template>
  <div class="desktop-container">
    <TopHeader />
    <PaymentsCard v-if="!showPaidCard" />
    <div>
      <el-row>
        <el-col :span="12">
          <el-card shadow="never" class="expected-delivery-desktop-container">
            <div>
              <SellerInfo />
              <hr />
              <ExpectedDelivery />
              <DeliveryPin />
              <ItemDelivered />
              <OrderCanceled />
              <RescheduleOrderButton />
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <PaymentsCard v-if="showPaidCard" class="desktop-paid-card" />
          <RecepientDetails />
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="12">
          <Rating />
          <TrackingTimelines v-if="showTimeline" />
        </el-col>
        <el-col
          :span="12"
          :class="
            orderedItemsStyling
              ? 'ordered-items-container-desktop'
              : 'ordered-items-container-desktp'
          "
        >
          <OrderedItemsHeader />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TopHeader from '../../../views/fulfillment/header.vue';
import SellerInfo from '../../../views/fulfillment/deliveryTimelines/sellerInfo.vue';
import RecepientDetails from '../../../views/fulfillment/recipient/recipient.vue';
import TrackingTimelines from '../../../views/fulfillment/timeline/timelines.vue';
import ExpectedDelivery from '../../../views/fulfillment/deliveryTimelines/expectedDelivery.vue';
import DeliveryPin from '../../../views/fulfillment/deliveryTimelines/deliveryPin.vue';
import ItemDelivered from '../../../views/fulfillment/deliveryTimelines/itemDelivered.vue';
import OrderCanceled from '../../../views/fulfillment/deliveryTimelines/orderCanceled.vue';
import RescheduleOrderButton from '../../../views/fulfillment/deliveryTimelines/rescheduleOrderButton.vue';
import OrderedItemsHeader from '../../../views/fulfillment/orderedItems/orderedItemsHeader.vue';
import PaymentsCard from '../../../views/fulfillment/POD/paymentsCard.vue';
import Rating from '../../../views/fulfillment/rating/rating.vue';
import statusMixin from '../../../mixins/status_mixin';

export default {
  name: 'DesktopLayout',
  components: {
    TopHeader,
    TrackingTimelines,
    RecepientDetails,
    ExpectedDelivery,
    ItemDelivered,
    OrderCanceled,
    RescheduleOrderButton,
    DeliveryPin,
    Rating,
    PaymentsCard,
    OrderedItemsHeader,
    SellerInfo,
  },
  mixins: [statusMixin],
  data() {
    return {
      showTimeline: true,
    };
  },
  mounted() {
    window.addEventListener('language-changed', () => {
      this.showTimeline = false;
      this.$nextTick().then(() => {
        this.showTimeline = true;
      });
    });
  },
  computed: {
    ...mapGetters(['getDeliveryStatus', 'getData']),
    showPaidCard() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data?.sale_of_goods_invoice?.invoice_status === 'INVOICE_COMPLETELY_PAID'
        : false;
    },
    orderedItemsStyling() {
      let paddingStyle = false;
      if (
        this.getData.data.sale_of_goods_invoice !== null
        && !this.getStatus([8, 9, 10, 11]).includes(this.$store.getters.getDeliveryStatus)
        && !this.showPaidCard
      ) {
        paddingStyle = true;
      } else if (
        this.getData.data.sale_of_goods_invoice === null
        && !this.getStatus([8, 9, 10, 11]).includes(this.$store.getters.getDeliveryStatus)
      ) {
        paddingStyle = true;
      } else {
        paddingStyle = false;
      }
      return paddingStyle;
    },
  },
};
</script>

<style>
.date {
  color: #324ba8;
  font-weight: 700;
}
.el-row {
  padding-top: 2%;
}
.delivery {
  line-height: 1.1;
}
.rider-pin {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.4px;
}
.rider-pin-value {
  font-size: 20px;
  color: #ee7d00;
}
.rider-pin-description {
  font-size: 12px;
}
.rider-pin-description-text {
  margin-left: 10px;
  font-size: 14px;
  letter-spacing: 0.4px;
}
.ordered-items-container-desktop {
  margin-top: -10%;
  padding-left: 100px;
}
.ordered-items-container-desktp {
  margin-top: -3%;
  padding-left: 80px;
}
.desktop-paid-card {
  margin-top: -20px;
  margin-left: 80px;
}
.desktop-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>
