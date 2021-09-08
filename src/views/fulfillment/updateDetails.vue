<template>
  <div>
    <el-dialog
      title="Update delivery Info"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :show-close="false"
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
          <input type="email" class="form-control" id="floatingInput" :value="location" />
          <label for="floatingInput">Location</label>
        </div>
        <div>
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="Floor, apartment or house number"
          />
        </div>
        <div class="mt-3">
          <label for="exampleFormControlInput1" class="form-label">Delivery options</label>
          <div class="mb-3">
            <el-row>
              <el-col :span="12">
                <el-tag type="info">Leave With Guard</el-tag>
              </el-col>
              <el-col :span="12">
                <el-tag type="info">Leave At the Reception</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-tag type="info">Leave At the door</el-tag>
              </el-col>
              <el-col :span="12">
                <el-tag type="primary" icon="el-icon-plus">Other</el-tag>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto">
          <button class="btn btn-primary updateInfoButton" type="button" @click="showReviewModal">
            Update Delivery Info
          </button>
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
  props: ['dialogVisible', 'name', 'phone', 'location'],
  components: {
    ReviewChanges,
  },
  data() {
    return {
      showDialog: false,
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
  },
};
</script>

<style>
.updateInfoButton {
  background: #324ba8 !important;
}
</style>
