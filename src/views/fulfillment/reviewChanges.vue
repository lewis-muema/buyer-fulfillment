<template>
  <div>
    <el-dialog
      title="Review Changes"
      :visible.sync="dialogVisible"
      :width="$store.getters.getMobile ? '80%' : '30%'"
      center
      :show-close="false"
      :close-on-click-modal="true"
    >
      <form action="">
        <div class="">
          <h5>Name of Recepient</h5>
          {{ name }}
        </div>
        <div class="mt-3">
          <h5>Phone Number</h5>
          {{ phone }}
        </div>
        <div class="mt-3">
          <h5>Floor, apartment or HouseNo</h5>
          {{ house }}
        </div>
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
          <button class="btn btn-primary update-info-button" type="button" @click="reviewChanges">
            Confirm Changes
          </button>
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
    },
    handleClose() {
      this.$emit('close', false);
    },
  },
};
</script>

<style></style>
