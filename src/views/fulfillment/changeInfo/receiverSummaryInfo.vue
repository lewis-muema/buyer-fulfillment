<template lang="">
  <div>
    <div v-loading="getLoading">
      <div class="ml-2 change-info-title">
        {{ $t("changeInfo.firstAttempt") }}
      </div>
      <div class="change-info-section-divider">
        <div class="section-alignment">
          <div class="recepient-info-mobile">
            <h3 class="recepient-info-title-mobile">{{ $t("changeInfo.Receiver") }}</h3>
            <div class="recepient">
              <div class="recipient-details">
                <p class="change-info-data-fields">
                  <el-icon><User /></el-icon>
                  {{ recepientInfo.name }}
                </p>
              </div>
              <div class="recipient-details">
                <p class="change-info-data-fields">
                  <el-icon><PhoneFilled /></el-icon>
                  {{ recepientInfo.phone_number }}
                </p>
              </div>
              <div class="recipient-details">
                <p class="change-info-data-fields text-muted">
                  <el-icon><Location /></el-icon>
                  {{
                    recepientInfo.delivery_location
                      ? recepientInfo.delivery_location.description
                      : ""
                  }}
                </p>
                <p class="">
                  <small class="text-muted recipient-indent-text">
                    {{ recepientInfo.house_location }}
                  </small>
                </p>
              </div>
              <div
                v-if="!getStatus([9, 10]).includes($store.getters.getDeliveryStatus)"
                class="recipient-details"
              ></div>
            </div>
            <el-button
              v-if="!getStatus([9, 10]).includes($store.getters.getDeliveryStatus)"
              type="primary"
              @click="showUpdateModal"
              class="change-info-button-mobile"
              >{{ $t("changeInfo.changeRecieverInfo") }}</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <UpdateDetails />
  </div>
</template>
<script>
import { User, PhoneFilled, Location } from '@element-plus/icons';
import { mapMutations, mapGetters } from 'vuex';
import statusMixin from '../../../mixins/status_mixin';
import UpdateDetails from './updateDetails.vue';

export default {
  name: 'ReceiverSummaryInfo',
  components: {
    UpdateDetails,
    User,
    PhoneFilled,
    Location,
  },
  mixins: [statusMixin],
  computed: {
    ...mapGetters(['getLoading', 'getData']),
    recepientInfo() {
      return this.getData.data.destination;
    },
  },
  methods: {
    ...mapMutations(['setDialogVisible', 'setChangeInfo']),
    showUpdateModal() {
      this.$store.commit('setDetailsDialogVisible', false);
      this.setChangeInfo(true);
      this.setDialogVisible(true);
    },
  },
};
</script>
<style lang=""></style>
