<!-- eslint-disable -->
<template lang="">
      <div v-if="getRatingcardVisible" :class="$store.getters.getMobile ? 'rate-delivery-mobile' : 'rate-delivery-desktop'">
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
            <i class="bi bi-hand-thumbs-up-fill h1"></i>
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
            <i class="bi bi-hand-thumbs-down-fill h1"></i>
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
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import NotificationMxn from '../../../mixins/nofication_mixin';
import eventsMixin from '../../../mixins/events_mixin';

export default {
  name: 'RatingCard',
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
  mounted() {
    if (this.$store.getters.getData.data.rated === true) {
      this.$store.commit('setRatingVisible', !this.$store.getters.getRatingVisible);
    }
    if (this.$store.getters.getData.data.rated === true) {
      this.setRatingcardVisible(false);
    }
    window.addEventListener('language-changed', () => {
      this.title = this.rating === 1 ? this.$t('rating.whatDidYouLike') : this.$t('rating.whatWentWrong');
      this.placeholder = this.rating === 1 ? this.$t('rating.tellUsWhatYouLiked') : this.$t('rating.tellUsWhatWentWrong');
    });
  },
  watch: {
    rating() {
      this.title = this.rating === 1 ? this.$t('rating.whatDidYouLike') : this.$t('rating.whatWentWrong');
      this.placeholder = this.rating === 1 ? this.$t('rating.tellUsWhatYouLiked') : this.$t('rating.tellUsWhatWentWrong');
      this.comment = '';
      this.submitStatus = false;
    },
  },
  computed: {
    ...mapGetters(['getRatingcardVisible']),
    activeClass() {
      return !this.$store.getters.getMobile ? 'thumbs-outline-desktop' : 'thumbs-outline-mobile';
    },
  },
  methods: {
    ...mapActions(['rateOrder']),
    ...mapMutations(['setTimelineVisible', 'setRatingcardVisible']),
    async submitRating(status) {
      const payload = {
        love: status === 1,
        comment: this.comment,
      };
      const fullPayload = {
        app: process.env.FULFILMENT_SERVER,
        values: payload,
        endpoint: `buyer/orders/${this.$store.getters.getData.data.order_id}/rate`,
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
        this.setRatingcardVisible(false);
        this.sendSegmentEvents({
          event: 'Rate_delivery',
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
<style lang="">
</style>
