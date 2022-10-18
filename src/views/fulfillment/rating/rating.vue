<template>
  <!-- eslint-disable -->
  <div v-if="$store.getters.getRatingVisible">
    <div :class="$store.getters.getMobile ? 'rate-delivery-mobile' : 'rate-delivery-desktop'">
      <RatingCard />
    </div>
    <PaymentsCard v-if="payCard" />
    <div :class="!$store.getters.getMobile ? 'items mt-3' : 'items-mobile'">
      <RatingIssues />
      <DeliveryHistory />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RatingCard from './ratingCard.vue';
import RatingIssues from './ratingIssues.vue';
import DeliveryHistory from './deliveryHistory.vue';
import PaymentsCard from '../POD/paymentsCard.vue';
import statusMixin from '../../../mixins/status_mixin';

export default {
  name: 'RateOrder',
  mixins: [statusMixin],
  components: {
    RatingCard, RatingIssues, DeliveryHistory, PaymentsCard,
  },
  computed: {
    ...mapGetters(['getDeliveryStatus']),
    payCard() {
      return this.getStatus([9]).includes(this.getDeliveryStatus)
      && this.getData.data.rated === false;
    },
  },
};
</script>

<style>
.rate-delivery-desktop {
  margin-left: 80px;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.rate-delivery-mobile {
  margin: 20px;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.thumbs {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding-bottom: 20px;
}
.thumbs-desktop {
  color: #c0c4cc;
}
.thumbs-mobile {
  color: #c0c4cc;
}
.thumbs-icon {
  color: #324ba8 !important;
}
.thumbs-outline {
  border-radius: 100px;
  height: 70px;
  width: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.thumbs-outline-desktop {
  border: 1px solid #c0c4cc;
}
.thumbs-outline-mobile {
  border: 1px solid #c0c4cc;
}
.rating-feedback-container-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 20px 0px;
}
.rating-feedback-container-desktop {
  display: flex;
  align-items: center;
  padding: 0px 0px 20px 20px;
}
.rating-feedback {
  width: min-content;
  font-size: 14px;
}
.feedback-input {
  border: 1px solid #c0c4cc;
  border-radius: 5px;
  margin: 10px 0px;
}
.feedback-submit-button {
  border: 1px solid #324ba8;
  border-radius: 5px;
  padding: 10px 20px;
  background: white;
  color: #324ba8;
  font-weight: 600;
}
.thumbs-outline-active {
  background: #edf1ff;
  border: 1px solid #edf1ff !important;
  color: #324ba8;
}
.font-awesome-icon {
  margin-left: 50px !important;
}
.items {
  text-align: left;
  margin-left: 80px;
  margin-bottom: 50px;
}
.items-mobile {
  margin: 40px 20px;
  font-size: 14px;
}
.items-title-mobile {
  font-size: 16px !important;
  font-weight: 600;
}
.icons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.icons-mobile {
  display: flex;
  width: 100%;
}
.icons-desktop {
  display: flex;
  width: 30%;
}
.el-dropdown-link {
  color: #324ba8;
}
.thumbs-up {
  margin-right: 20px !important;
}
.delivery-title-desktop {
  padding: 20px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.delivery-title-mobile {
  margin: 15px 0px;
}
.view-history {
  cursor: pointer;
}
</style>
