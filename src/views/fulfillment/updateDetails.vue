<template>
  <div>
    <el-dialog
      title="Update delivery Info"
      :visible.sync="visibleDialog"
      :width="$store.getters.getMobile ? '100%' : '30%'"
      :fullscreen="$store.getters.getMobile ? true : false"
      :show-close="$store.getters.getMobile ? true : false"
      center
      :close-on-click-modal="true"
    >
      <form>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="params.name"/>
          <label for="floatingInput">{{ $t("reviewChanges.recipientName") }}</label>
        </div>
        <div v-if="!$v.params.name.required" class="invalidFeedback">
          {{ $t('updateDetails.recipientName') }}
        </div>
        <div class="form-floating mb-3">
          <vue-tel-input
            v-model.trim="params.phone"
            class="form-control cop-edit-form phone-input-display"
            name="phone"
            value=""
            data-vv-validate-on="blur"
            v-bind="sendyPhoneProps"
            :input-options="vueTelInputProps"
          />
          <label for="floatingInput">{{ $t('updateDetails.phoneNumber') }}</label>
        </div>
        <div v-if="!$v.params.phone.required" class="invalidFeedback">
          {{ $t('updateDetails.phoneNumberRequired') }}
        </div>
        <div v-if="!$v.params.phone.maxLength" class="invalidFeedback">
          {{ $t('updateDetails.validPhoneNumber') }}
        </div>
        <div class="form-floating mb-3">
          <label for="floatingInput" class="location-input-label">
            {{ $t('updateDetails.location') }}
          </label>
          <gmap-autocomplete
            :value="params.deliveryLocation.description"
            :disabled="!getStatus([0, 1]).includes($store.getters.getDeliveryStatus)"
            :options="map_options"
            class="form-control form"
            id="floatingInput"
            placeholder="Enter location"
            :select-first-on-enter="true"
            @place_changed="setLocation($event)"
          />
        </div>
        <div class="form-floating mb-3">
          <input
           :disabled="!getStatus([0, 1]).includes($store.getters.getDeliveryStatus)"
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Floor, apartment or house number"
            v-model="params.house_location"
          />
          <label for="floatingInput">{{ $t('updateDetails.floorNumber') }}</label>
        </div>
        <div class="mt-3">
          <label for="Delivery options" class="form-label">
            {{ $t('updateDetails.deliveryOptions') }}
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
                  {{ $t('updateDetails.leaveWithGuard') }}
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
                  {{ $t('updateDetails.leaveAtTheReception') }}
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
                  {{ $t('updateDetails.leaveAtTheDoor') }}
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
            {{ $t('updateDetails.updateDeliveryInfo') }}
          </el-button>
        </div>
      </form>
    </el-dialog>
    <ReviewChanges
      :dialog-visible="showDialog"
      :name="params.name"
      :phone="params.phone"
      :deliveryLocationDescription="params.deliveryLocation.description"
      :deliveryLocationLongitude="params.deliveryLocation.longitude"
      :deliveryLocationLatitude="params.deliveryLocation.latitude"
      :houseLocation="params.house_location"
      :deliveryOption="deliveryOption"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
import eventsMixin from '../../mixins/events_mixin';
import statusMixin from '../../mixins/status_mixin';
import notificationMxn from '../../mixins/nofication_mixin';
import ReviewChanges from './reviewChanges.vue';

const { required, maxLength } = require('vuelidate/lib/validators');

export default {
  name: 'UpdateDetails',
  mixins: [eventsMixin, statusMixin, notificationMxn],
  components: {
    ReviewChanges,
  },
  data() {
    return {
      test: '',
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
          country: ['ke', 'ug', 'tz', 'ci'],
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
    },
  },
  watch: {
    '$store.getters.getDialogVisible': function setDialogStatus(val) {
      this.visibleDialog = val;
    },
    visibleDialog(val) {
      this.$store.commit('setDialogVisible', val);
      this.deliveryOption = val
        ? this.$store.getters.getData.data.destination.delivery_instructions
        : '';
    },
    deliveryOption(val) {
      this.sendSegmentEvents({
        event: 'Select Delivery Method',
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
    countryCodes() {
      return [this.$store.getters.getCountryData.countryCode.toLowerCase()];
    },
  },
  beforeMount() {
    this.map_options.componentRestrictions.country = this.countryCodes;
    this.sendyPhoneProps.defaultCountry = this.$store.getters.getCountryData.countryCode
      .toLowerCase();
    this.sendyPhoneProps.preferredCountries = this.countryCodes;
  },
  methods: {
    handleClose() {
      this.$emit('close', false);
    },
    showReviewModal() {
      if (this.$v.$invalid) return;
      this.showDialog = true;
    },
    setLocation(place) {
      this.params.deliveryLocation.description = place.name;
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
</style>
