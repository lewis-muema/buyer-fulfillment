<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12" pull="4">
            Sendy
          </el-col>
          <el-col :span="12" push="3">
            <el-dropdown>
              <span class="el-dropdown-link">
                English<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>French</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown></el-col
          >
        </el-row>
      </el-header>
      <el-divider></el-divider>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-row {
  padding-top: 15px;
}
</style>
