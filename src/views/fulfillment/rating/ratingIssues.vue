<template lang="">
  <div v-if="$store.getters.getRatingVisible">
    <h5 :class="$store.getters.getMobile ? 'items-title-mobile' : ''">
        {{ $t('rating.issues') }}
      </h5>
      <p>
        {{ $t('rating.contact') }} {{ sellerName }}
      </p>
      <br />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RatingIssues',
  computed: {
    ...mapGetters(['getData']),
    sellerName() {
      return this.getData.data.seller_name;
    },
  },
};
</script>
<style lang="">

</style>
