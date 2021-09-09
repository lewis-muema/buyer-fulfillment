<template>
  <div>
    <el-menu>
      <el-menu-item>
        <el-col :span="12">
          <img
            src="https://assets.website-files.com/5be92ce6e4a547dcc61b976c/60253f92874eabf1a8ecf88f_Logo_SendyMain_Colored_Normal_SVG.svg"
            alt="Sendy logo"
            class="sc-dFtzdE kLsqsK logo"
            height="50px"
          />
        </el-col>
      </el-menu-item>
      <el-menu-item>
        <el-col :span="12">
          <el-dropdown>
            <span class="el-dropdown-link language-change ">
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
.logo {
  margin-right: 65%;
}
.language-change {
  margin-left: 350px;
  font-size: 20px;
}
</style>
