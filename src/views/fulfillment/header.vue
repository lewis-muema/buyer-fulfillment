<template>
  <div>
    <el-menu>
      <el-menu-item>
        <el-col :span="12" pull=4>
          Sendy
        </el-col>
      </el-menu-item>
      <el-menu-item>
        <el-col :span="12" push=3>
          <el-dropdown>
            <span class="el-dropdown-link">
              English<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>French</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown></el-col
        >
      </el-menu-item>
    </el-menu>
    <br />
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.el-row {
  padding-top: 15px;
}
/* .el-divider {
  padding-top: 120px;
} */
</style>
