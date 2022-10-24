<template>
  <div>
    <PODTimeline v-if="PODTimeline" />
    <NewTimeline v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import TrackingTimeline from './timelineV2.vue';
import PODTimeline from './PODTimeline.vue';
import NewTimeline from './newTimeline.vue';

export default {
  name: 'TrackingTimelines',
  components: {
    PODTimeline,
    NewTimeline,
  },
  computed: {
    ...mapGetters(['getData', 'getMobile']),
    PODTimeline() {
      return this.getData.data.sale_of_goods_invoice !== null && this.getMobile;
    },
  },
};
</script>
