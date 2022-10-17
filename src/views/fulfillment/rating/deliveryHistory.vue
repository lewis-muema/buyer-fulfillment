<!-- eslint-disable -->
<template lang="">
  <div>
    <div class="div">
        <h5 :class="$store.getters.getMobile ? 'items-title-mobile' : ''">
          {{ $t('rating.deliveryHistory') }}
        </h5>
        <div>
          <span
            class="el-dropdown-link view-history"
            @click="$store.commit('setTimelineVisible', !$store.getters.getTimelineVisible)"
          >
            {{ $t('rating.viewDeliveryHistory') }}
            <el-icon><ArrowDown /></el-icon>
          </span>
        </div>
      </div>
  </div>
</template>
<script>
import { ArrowDown } from '@element-plus/icons';
import { mapMutations, mapGetters } from 'vuex';

export default {
  components: { ArrowDown },
  watch: {
    '$store.getters.getTimelineVisible': function getTimelineVisible(val) {
      if (this.$store.getters.getMobile) {
        this.$store.commit('setRecipientVisible', val);
      }
      this.sendSegmentEvents({
        event: 'View_delivery_history',
        data: {
          userId: this.$store.getters.getData.data.destination.name,
        },
      });
    },
  },
  computed: {
    ...mapGetters(['getTimelineVisible']),
  },
  methods: {
    ...mapMutations(['setRecipientVisible']),
  },
};
</script>
<style lang="">

</style>
