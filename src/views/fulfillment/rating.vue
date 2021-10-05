<template>
  <div>
    <div :class="$store.getters.getMobile ? 'rate-delivery-mobile' : 'rate-delivery-desktop'">
      <p :class="$store.getters.getMobile ? 'delivery-title-mobile' : 'delivery-title-desktop'">
        How was your delivery?
      </p>
      <div :class="$store.getters.getMobile ? 'icons-mobile' : 'icons-desktop'">
        <div class="thumbs" :class="$store.getters.getMobile ? 'thumbs-mobile' : 'thumbs-desktop'">
          <div
            class="thumbs-outline"
            :class="rating === 1 ? 'thumbs-outline-active' : activeClass"
            @click="rating = 1"
          >
            <font-awesome-icon icon="thumbs-up" class="h1 thumbs-icon" @click="likeRating" />
          </div>
          <div v-if="$store.getters.getMobile">
            I liked it
          </div>
        </div>
        <div class="thumbs" :class="$store.getters.getMobile ? 'thumbs-mobile' : 'thumbs-desktop'">
          <div
            class="thumbs-outline"
            :class="rating === 2 ? 'thumbs-outline-active' : activeClass"
            @click="rating = 2"
          >
            <font-awesome-icon icon="thumbs-down" class="h1 thumbs-icon" />
          </div>
          <div v-if="$store.getters.getMobile">
            I didn't like it
          </div>
        </div>
      </div>
      <div
        v-if="rating === 2"
        :class="
          $store.getters.getMobile
            ? 'rating-feedback-container-mobile'
            : 'rating-feedback-container-desktop'
        "
      >
        <div class="rating-feedback">
          <div>
            What went wrong?
          </div>
          <textarea class="feedback-input" cols="40" rows="5" placeholder="Tell us what went wrong">
          </textarea>
          <button class="feedback-submit-button">
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
          <span
            class="el-dropdown-link view-history"
            @click="
              $store.commit('setTimelineVisible', !$store.getters.getTimelineVisible)
            "
          >
            View Delivery history<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventsMixin from '../../mixins/events_mixin';
import NotificationMxn from '../../mixins/nofication_mixin';

export default {
  name: 'Rating',
  mixins: [NotificationMxn, eventsMixin],
  data() {
    return {
      rating: 0,
    };
  },
  watch: {
    rating(val) {
      this.sendSegmentEvents({
        event: 'Rate Delivery',
        data: {
          userId: this.$store.getters.getData.data.destination.name,
          // eslint-disable-next-line max-len
          rating: val === 1 ? val : 0,
        },
      });
    },
    '$store.getters.getTimelineVisible': function getTimelineVisible() {
      this.sendSegmentEvents({
        event: 'View Delivery History',
        data: {
          userId: this.$store.getters.getData.data.destination.name,
        },
      });
    },
  },
  computed: {
    activeClass() {
      return !this.$store.getters.getMobile ? 'thumbs-outline-desktop' : 'thumbs-outline-mobile';
    },
  },
  methods: {
    likeRating() {
      const notification = {
        title: 'Rating submitted successfully',
        level: 1,
        message: '',
      };
      this.displayNotification(notification);
    },
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
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.thumbs {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding-bottom: 20px;
}
.thumbs-desktop {
  color: black;
}
.thumbs-mobile {
  color: #c0c4cc;
}
.thumbs-icon {
  margin: 0px !important;
}
.thumbs-outline {
  border-radius: 100px;
  height: 70px;
  width: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.thumbs-outline-desktop {
  border: 1px solid black;
}
.thumbs-outline-mobile {
  border: 1px solid #c0c4cc;
}
.rating-feedback-container-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 20px 0px;
}
.rating-feedback-container-desktop {
  display: flex;
  align-items: center;
  padding: 0px 0px 20px 20px;
}
.rating-feedback {
  width: min-content;
  font-size: 14px;
}
.feedback-input {
  border: 1px solid #c0c4cc;
  border-radius: 5px;
  margin: 10px 0px;
}
.feedback-submit-button {
  border: 1px solid #324ba8;
  border-radius: 5px;
  padding: 10px 20px;
  background: white;
  color: #324ba8;
  font-weight: 600;
}
.thumbs-outline-active {
  background: #edf1ff;
  border: 1px solid #edf1ff !important;
  color: #324ba8;
}
.font-awesome-icon {
  margin-left: 50px !important;
}
.items {
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
.icons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.icons-mobile {
  display: flex;
  width: 100%;
}
.icons-desktop {
  display: flex;
  width: 30%;
}
.el-dropdown-link {
  color: #324ba8;
}
.thumbs-up {
  margin-right: 20px !important;
}
.delivery-title-desktop {
  padding: 20px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.delivery-title-mobile {
  margin: 15px 0px;
}
.view-history {
  cursor: pointer;
}
</style>
