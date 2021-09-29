const eventsMixin = {
  methods: {
    sendSegmentEvents(payload) {
      // eslint-disable-next-line no-undef
      analytics.track(payload.event, payload.data);
    },
  },
};
export default eventsMixin;
