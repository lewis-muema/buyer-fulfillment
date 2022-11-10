<!-- eslint-disable -->
<template>
  <div>
    <el-dialog
      :title="$t('updateDetails.updateDeliveryInfo')"
      v-model="visibleDialog"
      :width="$store.getters.getMobile ? '100%' : '30%'"
      :fullscreen="$store.getters.getMobile ? true : false"
      :show-close="true"
      center
      :close-on-click-modal="true"
    >
      <form>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            :disabled="isToday"
            id="floatingInput"
            v-model="params.name"
            @blur="v$.params.name.$touch"
          />
          <label htmlFor="floatingInput">{{ $t("reviewChanges.recipientName") }}</label>
        </div>
        <div v-if="v$.params.name.$error" class="invalidFeedback">
          {{ $t("updateDetails.recipientName") }}
        </div>
        <div class="form-floating mb-3">
          <div :class="isToday ? 'phone-no-enabled' : 'phone-no-disabled'"></div>
          <label for="floatingInput" class="location-input-label">
            {{ $t("updateDetails.phoneNumber") }}
          </label>
          <vue-tel-input
            class="phone-input"
            v-model="params.phone"
            name="phone"
            value=""
            data-vv-validate-on="blur"
            v-bind="sendyPhoneProps"
            :input-options="vueTelInputProps"
            @blur="v$.params.phone.$touch"
          ></vue-tel-input>
        </div>
        <div v-if="v$.params.phone.$error" class="invalidFeedback">
          {{ $t("updateDetails.phoneNumberRequired") }}
        </div>
        <div class="form-floating mb-3">
          <label for="floatingInput" class="location-input-label">
            {{ $t("updateDetails.location") }}
          </label>
          <GMapAutocomplete
            :value="params.deliveryLocation.description"
            :disabled="isToday"
            :options="map_options"
            class="form-control form"
            id="floatingInput location"
            placeholder="Enter location"
            :select-first-on-enter="true"
            @place_changed="setLocation"
          >
          </GMapAutocomplete>
          <div class="mobile-changeLocation-warning-container" v-if="isToday"></div>
        </div>
        <div class="form-floating mb-3">
          <input
            :disabled="isToday"
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Floor, apartment or house number"
            v-model="params.house_location"
            @blur="v$.params.house_location.$touch"
          />
          <label for="floatingInput">{{ $t("updateDetails.floorNumber") }}</label>
          <div v-if="v$.params.house_location.$error" class="invalidFeedback">
          {{ $t("updateDetails.floorNumberRequired") }}
        </div>
        </div>
        <div class="mobile-changeLocation-warning-container" v-if="isToday">
          <el-icon class="ml-2"><InfoFilled /></el-icon>
          <p class="ml-2 mobile-changeLocation-warning-text">
            {{ $t("updateDetails.changeLocation") }}
          </p>
        </div>
        <div class="mt-3">
          <label for="Delivery options" class="form-label">
            {{ $t("updateDetails.deliveryOptions") }}
          </label>
          <div class="mb-3">
            <el-row>
              <el-col :span="12">
                <div
                  :class="
                    deliveryOption === 'Leave with guard'
                      ? 'delivery-options-tag-active'
                      : 'delivery-options-tag-inactive'
                  "
                  @click="deliveryOption = 'Leave with guard'"
                >
                  {{ $t("updateDetails.leaveWithGuard") }}
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  :class="
                    deliveryOption === 'Leave at the reception'
                      ? 'delivery-options-tag-active'
                      : 'delivery-options-tag-inactive'
                  "
                  @click="deliveryOption = 'Leave at the reception'"
                >
                  {{ $t("updateDetails.leaveAtTheReception") }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div
                  :class="
                    deliveryOption === 'Leave at the door'
                      ? 'delivery-options-tag-active'
                      : 'delivery-options-tag-inactive'
                  "
                  @click="deliveryOption = 'Leave at the door'"
                >
                  {{ $t("updateDetails.leaveAtTheDoor") }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto">
          <el-button
            class="btn btn-primary update-info-button"
            @click="showReviewModal"
            :class="
              !$store.getters.getMobile ? 'update-info-button-desktop' : 'update-info-button-mobile'
            "
          >
            {{ $t("updateDetails.updateDeliveryInfo") }}
          </el-button>
        </div>
      </form>
    </el-dialog>
    <ReviewChanges
      :name="params.name"
      :phone="params.phone"
      :deliveryLocationDescription="params.deliveryLocation.description"
      :deliveryLocationLongitude="params.deliveryLocation.longitude"
      :deliveryLocationLatitude="params.deliveryLocation.latitude"
      :houseLocation="params.house_location"
      :deliveryOption="deliveryOption"
      @close="cancelReviewModal"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { InfoFilled } from '@element-plus/icons';
import moment from 'moment';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';
import eventsMixin from '../../../mixins/events_mixin';
import statusMixin from '../../../mixins/status_mixin';
import notificationMxn from '../../../mixins/nofication_mixin';
import ReviewChanges from './reviewChanges.vue';

export default {
  name: 'UpdateDetails',
  mixins: [eventsMixin, statusMixin, notificationMxn],
  components: {
    InfoFilled,
    ReviewChanges,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      showDialog: false,
      visibleDialog: false,
      locations: this.location,
      params: {
        name: this.$store.getters.getData.data.destination.name,
        phone: this.$store.getters.getData.data.destination.phone_number,
        deliveryLocation: {
          description: this.$store.getters.getData.data.destination.delivery_location.description,
          longitude: this.$store.getters.getData.data.destination.delivery_location.longitude,
          latitude: this.$store.getters.getData.data.destination.delivery_location.latitude,
        },
        house_location: this.$store.getters.getData.data.destination.house_location,
      },
      map_options: {
        componentRestrictions: {
          country: ['ke', 'ug', 'ci', 'ng'],
        },
        bounds: {
          north: 35.6,
          east: 59.4,
          south: -28.3,
          west: -19.1,
        },
        strictBounds: true,
        type: ['establishment'],
      },
      sendyPhoneProps: {
        mode: 'international',
        defaultCountry: 'ke',
        preferredCountries: ['ke', 'ug', 'tz'],
      },
      vueTelInputProps: {
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: 'Enter phone number',
        required: false,
        enabledCountryCode: false,
        enabledFlags: true,
        autocomplete: 'off',
        name: 'telephone',
        maxLen: 25,
        dropdownOptions: {
          disabledDialCode: false,
        },
        inputOptions: {
          showDialCode: false,
        },
      },
      deliveryOption: '',
    };
  },
  validations: {
    params: {
      name: {
        required,
      },
      phone: {
        required,
        maxLength: maxLength(25),
      },
      house_location: {
        required,
      },
    },
  },
  watch: {
    '$store.getters.getDialogVisible': function setDialogStatus(val) {
      this.visibleDialog = val;
    },
    visibleDialog(val) {
      this.$store.commit('setDialogVisible', val);
      if (this.getChangeInfo && !val) {
        this.$store.commit('setDetailsDialogVisible', true);
        this.setChangeInfo(false);
      }
      this.deliveryOption = val
        ? this.$store.getters.getData.data.destination.delivery_instructions
        : '';
    },
    deliveryOption(val) {
      this.sendSegmentEvents({
        event: 'Select_delivery_method',
        data: {
          userId: this.$store.getters.getData.data.destination.name,
          // eslint-disable-next-line max-len
          region: this.$store.getters.getData.data.destination.delivery_location.description,
          deliveryMethod: val,
        },
      });
    },
  },
  computed: {
    ...mapGetters(['getData', 'getChangeInfo']),
    countryCodes() {
      return [this.$store.getters.getCountryData.countryCode.toLowerCase()];
    },
    isToday() {
      return (
        moment(new Date(this.$store.getters.getData.data.scheduled_delivery_date)).format(
          'YYYY-MM-DD',
        ) === moment().format('YYYY-MM-DD')
        || !this.getStatus([0, 1, 13, 14, 15]).includes(this.$store.getters.getDeliveryStatus)
      );
    },
  },
  beforeMount() {
    this.map_options.componentRestrictions.country = this.countryCodes;
    this.sendyPhoneProps.defaultCountry = this.$store.getters.getCountryData.countryCode
      .toLowerCase();
    this.sendyPhoneProps.preferredCountries = this.countryCodes;
  },
  methods: {
    ...mapMutations(['setReviewDialogVisible', 'setChangeInfo']),
    cancelReviewModal(val) {
      this.setReviewDialogVisible(val);
    },
    handleClose() {
      this.$emit('close', false);
    },
    showReviewModal() {
      if (this.v$.$invalid) return;
      this.setReviewDialogVisible(true);
    },
    showDatePicker() {
      this.$store.commit('setDatePickerVisible', true);
    },
    setLocation(place) {
      this.params.deliveryLocation.description = document.querySelector('#location').value;
      this.params.deliveryLocation.latitude = place.geometry.location.lat();
      this.params.deliveryLocation.longitude = place.geometry.location.lng();
    },
  },
};
</script>

<style>
.update-info-button {
  background: #324ba8 !important;
}
.location-input-label {
  padding: 5px 0.75rem !important;
}
.delivery-options-tag-inactive {
  border-radius: 30px;
  padding: 15px 0px;
  background: #f3f3f3;
  color: black;
  cursor: pointer;
  width: 100%;
  text-align: center;
}
.delivery-options-tag-active {
  border-radius: 30px;
  padding: 15px 0px;
  background: #324ba8;
  color: white;
  cursor: pointer;
  width: 100%;
  text-align: center;
}
.pac-icon {
  display: none;
}
.invalidFeedback {
  color: red !important;
}
.pac-target-input {
  user-select: none;
}
.mobile-changeLocation-warning-text {
  font-size: 12px;
}
.mobile-changeLocation-warning-text a {
  text-decoration: none;
  color: #324ba8 !important;
}
.mobile-changeLocation-warning-container {
  display: flex;
}
.el-icon-info {
  color: #324ba8 !important;
  font-size: 20px;
}
.phone-no-disabled {
  height: 100%;
  width: 100%;
  position: absolute;
  display: none;
  background: #c5cad370;
}
.phone-no-enabled {
  height: 100%;
  width: 100%;
  position: absolute;
  display: block;
  background: #c5cad370;
}
.vue-tel-input {
  height: 55px !important;
  border-radius: 3px !important;
}
.phone-input {
  padding-top: 20px;
}
.el-loading-spinner {
  width: 20px !important;
  left: 50%;
  top: 70%;
}
</style>
