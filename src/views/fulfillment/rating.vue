<template>
  <div>
    <div v-if="!$store.getters.getMobile" class="rate-delivery-desktop">
      <p class="pt-3">How was your delivery?</p>
      <div class="icons">
      <font-awesome-icon icon="thumbs-up" class="h1 thumbs-up" />
      <font-awesome-icon icon="thumbs-down" class="h1" />
      </div>
    </div>
    <div v-else class="rate-delivery-mobile">
      <p class="pt-3">How was your delivery?</p>
      <div class="icons-mobile">
        <div class="thumbs-desktop">
          <div
            class="thumbs-outline"
            :class="rating === 1 ? 'thumbs-outline-active' : ''"
            @click="rating = 1"
          >
            <font-awesome-icon icon="thumbs-up" class="h1 thumbs-icon" />
          </div>
          <div>
            I liked it
          </div>
        </div>
        <div class="thumbs-desktop">
          <div
            class="thumbs-outline"
            :class="rating === 2 ? 'thumbs-outline-active' : ''"
            @click="rating = 2"
          >
            <font-awesome-icon icon="thumbs-down" class="h1 thumbs-icon" />
          </div>
          <div>
            I didn't like it
          </div>
        </div>
      </div>
      <div
        v-if="rating === 2"
        class="rating-feedback-container"
      >
        <div class="rating-feedback">
          <div>
            What went wrong?
          </div>
          <textarea class="feedback-input" cols="40" rows="5" placeholder="Tell us what went wrong">
          </textarea>
          <button
            class="feedback-submit-button"
          >
            Submit feedback
          </button>
        </div>
      </div>
    </div>
    <div :class="!$store.getters.getMobile ? 'items mt-3' : 'items-mobile'">
      <h5 :class="$store.getters.getMobile ? 'items-title-mobile' : ''">
        Issues with your items
      </h5>
      <p>If you have issues with your items, contact Marini Natural</p>
      <br />
      <div class="div">
        <h5 :class="$store.getters.getMobile ? 'items-title-mobile' : ''">
          Delivery history
        </h5>
        <div>
          <span class="el-dropdown-link">
            View Delivery history<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  data() {
    return {
      rating: 0,
    };
  },
};
</script>

<style>
.rate-delivery-desktop {
  background: rgb(231, 228, 228);
  margin-left: 80px;
}
.rate-delivery-mobile {
  margin: 20px;
  border: 1px solid #C8C8C8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.thumbs-desktop {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #C0C4CC;
  font-size: 14px;
  padding-bottom: 20px;
}
.thumbs-icon {
  margin: 0px !important;
}
.thumbs-outline {
  border: 1px solid #C0C4CC;
  border-radius: 100px;
  height: 70px;
  width: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.rating-feedback-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 20px 0px;
}
.rating-feedback {
  width: min-content;
  font-size: 14px;
}
.feedback-input {
  border: 1px solid #C0C4CC;
  border-radius: 5px;
  margin: 10px 0px;
}
.feedback-submit-button {
  border: 1px solid #324BA8;
  border-radius: 5px;
  padding: 10px 20px;
  background: white;
  color: #324BA8;
  font-weight: 600;
}
.thumbs-outline-active {
  background: #EDF1FF;
  border: 1px solid #EDF1FF !important;
  color: #324BA8;
}
.font-awesome-icon {
  margin-left: 50px !important;
}
.items{
  text-align: left;
  margin-left: 80px;
}
.items-mobile {
  margin: 40px 20px;
  font-size: 14px;
}
.items-title-mobile {
  font-size: 16px !important;
  font-weight: 600;
}
.icons{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.icons-mobile {
  display: flex;
  width: 100%;
}
.el-dropdown-link {
  color: #324ba8;
}
.thumbs-up {
  margin-right: 20px !important;
}
</style>
