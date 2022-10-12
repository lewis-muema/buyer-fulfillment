<template>
<div>
  <PODTimeline  v-if="PODOrder"/>
  <TrackingTimeline v-else />
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TrackingTimeline from './timelineV2.vue';
import PODTimeline from './PODTimeline.vue';

export default {
  name: 'TrackingTimelines',
  components: {
    TrackingTimeline,
    PODTimeline,
  },
  computed: {
    ...mapGetters(['getData']),
    PODOrder() {
      return this.getData.data.sale_of_goods_invoice !== null;
    },
  },
};
</script>
