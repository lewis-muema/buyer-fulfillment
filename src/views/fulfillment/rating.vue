<template>
  <div>
    <div class="rate-delivery">
      <p class="pt-3">How was your delivery?</p>
      <div class="icons">
      <font-awesome-icon icon="thumbs-up" class="h1 thumbs-up" />
      <font-awesome-icon icon="thumbs-down" class="h1" />
      </div>
    </div>
    <div class="items mt-3">
      <h5>Issues with your items</h5>
      <p>If you have issues with your items, contact Marini Natural</p>
      <br />
      <div class="div">
        <h5>Delivery history</h5>
        <el-dropdown>
          <span class="el-dropdown-link">
            View Delivery history<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rating',
};
</script>

<style>
.rate-delivery {
  background: rgb(231, 228, 228);
  margin-left: 80px;
}
.font-awesome-icon {
  margin-left: 50px !important;
}
.items{
  text-align: left;
  margin-left: 80px;
}
.icons{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.el-dropdown-link {
  color: #324ba8;
}
.thumbs-up {
  margin-right: 20px !important;
}
</style>
