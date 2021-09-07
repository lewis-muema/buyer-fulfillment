<template>
  <div>
    <el-dialog
      title="Review Changes"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :show-close="true"
      :close-on-click-modal="true"
    >
      Test
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialogVisible'],
  name: 'ReviewChanges',
};
</script>

<style></style>
