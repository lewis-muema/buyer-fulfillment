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
          <input type="text" class="form-control" id="floatingInput" :value="name" />
          <label for="floatingInput">Name of recipient</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" :value="phone" />
          <label for="floatingInput">Phone number</label>
        </div>
        <div class="form-floating mb-3">
          <label for="floatingInput" class="location-input-label">Location</label>
          <gmap-autocomplete
            :options="map_options"
            :value="location"
            class="form-control"
            id="floatingInput"
            placeholder="Enter location"
            :select-first-on-enter="true"
            @place_changed="setLocation($event)"
          />
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Floor, apartment or house number"
            :value="house"
          />
          <label for="floatingInput">Description</label>
        </div>
        <div class="mt-3">
          <label for="Delivery options" class="form-label">Delivery options</label>
          <div class="mb-3">
            <el-row>
              <el-col :span="12">
                <div :class="deliveryOption === 1
                  ? 'delivery-options-tag-active'
                  : 'delivery-options-tag-inactive'"
                  @click="deliveryOption = 1"
                >Leave With Guard</div>
              </el-col>
              <el-col :span="12">
                <div :class="deliveryOption === 2
                  ? 'delivery-options-tag-active'
                  : 'delivery-options-tag-inactive'"
                  @click="deliveryOption = 2"
                >Leave At the Reception</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div :class="deliveryOption === 3
                  ? 'delivery-options-tag-active'
                  : 'delivery-options-tag-inactive'"
                  @click="deliveryOption = 3"
                >Leave At the door</div>
              </el-col>
              <el-col :span="12">
                <div
                   :class="deliveryOption === 4
                  ? 'delivery-options-tag-active'
                  : 'delivery-options-tag-inactive'"
                  @click="deliveryOption = 4"
                ><i class="el-icon-plus"></i> Other</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto">
          <el-button
            class="btn btn-primary update-info-button"
            type="button"
            @click="showReviewModal"
          >
            Update Delivery Info
          </el-button>
        </div>
      </form>
    </el-dialog>
    <ReviewChanges :dialog-visible="showDialog" @close="showDialog = false" />
  </div>
</template>

<script>
import ReviewChanges from './reviewChanges.vue';

export default {
  name: 'UpdateDetails',
  props: ['name', 'phone', 'location', 'house'],
  components: {
    ReviewChanges,
  },
  watch: {
    '$store.getters.getDialogVisible': function setDialogStatus(val) {
      this.visibleDialog = val;
    },
    visibleDialog(val) {
      this.$store.commit('setDialogVisible', val);
    },
  },
  data() {
    return {
      showDialog: false,
      visibleDialog: false,
      locations: this.location,
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
      },
      deliveryOption: 0,
    };
  },
  methods: {
    updateDeliveryInfo() {},
    handleClose() {
      this.$emit('close', false);
    },
    showReviewModal() {
      this.showDialog = true;
    },
    setLocation(place) {
      console.log(place);
    },
  },
};
</script>

<style>
.update-info-button {
  background: #324ba8 !important;
}
.location-input-label {
  padding: 5px .75rem !important;
}
.delivery-options-tag-inactive {
  border-radius: 30px;
  padding: 15px 30px;
  background: #F3F3F3;
  color: black;
  cursor: pointer;
  width: 95%;
  text-align: center;
}
.delivery-options-tag-active {
  border-radius: 30px;
  padding: 15px 30px;
  background: #324ba8;
  color: white;
  cursor: pointer;
  width: 95%;
  text-align: center;
}
</style>
