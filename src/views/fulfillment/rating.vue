<template>
  <div v-if="$store.getters.getRatingVisible">
    <div :class="$store.getters.getMobile ? 'rate-delivery-mobile' : 'rate-delivery-desktop'">
      <p :class="$store.getters.getMobile ? 'delivery-title-mobile' : 'delivery-title-desktop'">
        {{ $t('rating.howWasYourDelivery') }}
      </p>
      <div :class="$store.getters.getMobile ? 'icons-mobile' : 'icons-desktop'">
        <div class="thumbs" :class="$store.getters.getMobile ? 'thumbs-mobile' : 'thumbs-desktop'">
          <div
            class="thumbs-outline"
            :class="rating === 1 ? 'thumbs-outline-active' : activeClass"
            @click="rating = 1"
          >
            <font-awesome-icon
              icon="thumbs-up"
              class="h1 thumbs-icon"
            />
          </div>
          <div v-if="$store.getters.getMobile">
            {{ $t('rating.liked') }}
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
            {{ $t('rating.disliked') }}
          </div>
        </div>
      </div>
      <div
        v-if="[1, 2].includes(rating) && !submitStatus"
        :class="
          $store.getters.getMobile
            ? 'rating-feedback-container-mobile'
            : 'rating-feedback-container-desktop'
        "
      >
        <div class="rating-feedback">
          <div>
            {{ title }}
          </div>
          <textarea
            class="feedback-input"
            cols="40"
            rows="5"
            :placeholder="placeholder"
            v-model="comment"
          >
          </textarea>
          <button class="feedback-submit-button" @click="submitRating(rating)">
            {{ $t('rating.submitFeedback') }}
          </button>
        </div>
      </div>
    </div>
    <div :class="!$store.getters.getMobile ? 'items mt-3' : 'items-mobile'">
      <h5 :class="$store.getters.getMobile ? 'items-title-mobile' : ''">
        {{ $t('rating.issues') }}
      </h5>
      <p>
        {{ $t('rating.contact') }} {{ seller_name }}
      </p>
      <br />
      <div class="div">
        <h5 :class="$store.getters.getMobile ? 'items-title-mobile' : ''">
          {{ $t('rating.deliveryHistory') }}
        </h5>
        <div>
          <span
            class="el-dropdown-link view-history"
            @click="$store.commit('setTimelineVisible', !$store.getters.getTimelineVisible)"
          >
            {{ $t('rating.viewDeliveryHistory') }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import eventsMixin from '../../mixins/events_mixin';
import NotificationMxn from '../../mixins/nofication_mixin';

export default {
  name: 'Rating',
  mixins: [NotificationMxn, eventsMixin],
  data() {
    return {
      rating: 0,
      rate: true,
      comment: '',
      submitStatus: false,
      placeholder: '',
      title: '',
    };
  },
  watch: {
    rating() {
      this.title = this.rating === 1 ? this.$t('rating.whatDidYouLike') : this.$t('rating.whatWentWrong');
      this.placeholder = this.rating === 1 ? this.$t('rating.tellUsWhatYouLiked') : this.$t('rating.tellUsWhatWentWrong');
      this.comment = '';
      this.submitStatus = false;
    },
    '$store.getters.getTimelineVisible': function getTimelineVisible(val) {
      if (this.$store.getters.getMobile) {
        this.$store.commit('setRecipientVisible', val);
      }
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
  mounted() {
    if (this.$store.getters.getData.data.rated === true) {
      this.$store.commit('setRatingVisible', !this.$store.getters.getRatingVisible);
    }
    window.addEventListener('language-changed', () => {
      this.title = this.rating === 1 ? this.$t('rating.whatDidYouLike') : this.$t('rating.whatWentWrong');
      this.placeholder = this.rating === 1 ? this.$t('rating.tellUsWhatYouLiked') : this.$t('rating.tellUsWhatWentWrong');
    });
  },
  methods: {
    ...mapActions(['rateOrder']),
    async submitRating(status) {
      const payload = {
        love: status === 1,
        comment: this.comment,
      };
      const fullPayload = {
        app: process.env.FULFILMENT_SERVER,
        values: payload,
        endpoint: `buyer/orders/${this.$route.params.deliveryId}/rate`,
      };
      try {
        this.submitStatus = true;
        const data = await this.rateOrder(fullPayload);
        const notification = {
          title: this.$t('rating.ratingSubmitted'),
          level: 1,
          message: '',
        };
        this.displayNotification(notification);
        this.$store.commit('setRatingVisible', !this.$store.getters.getRatingVisible);
        this.sendSegmentEvents({
          event: 'Rate Delivery',
          data: {
            userId: this.$store.getters.getData.data.destination.name,
            // eslint-disable-next-line max-len
            rating: status === 1 ? status : 0,
          },
        });
        return data;
      } catch (error) {
        const notification = {
          title: this.$t('rating.ratingFailed'),
          level: 3,
          message: '',
        };
        this.displayNotification(notification);
        return error;
      }
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
  margin-bottom: 50px;
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
