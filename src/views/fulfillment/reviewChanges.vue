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
          <br>
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
          <div class="review-modal-item">{{ house }}</div>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
          <el-button
            class="btn btn-primary update-info-button"
            type="button"
            @click="reviewChanges"
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
import NotificationMxn from '../../mixins/nofication_mixin';

export default {
  props: ['dialogVisible'],
  name: 'ReviewChanges',
  mixins: [NotificationMxn],
  data() {
    return {
      name: 'James Doe',
      phone: '+254 7000000',
      house: 'House 27',
    };
  },
  methods: {
    reviewChanges() {
      const notification = {
        title: 'Delivery information changed successfully',
        level: 1,
        message: '',
      };
      this.displayNotification(notification);
      this.$emit('close', false);
      this.$store.commit('setDialogVisible', false);
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
