<template>
  <div>
    <el-dialog
      :visible.sync="visibleDialog"
      :width="$store.getters.getMobile ? '80%' : '30%'"
      center
      :close-on-click-modal="true"
    >
      <div>
        Pick a date that works for you
      </div>
      <el-calender>
      </el-calender>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibleDialog: true,
    };
  },
};
</script>

<style>

</style>
