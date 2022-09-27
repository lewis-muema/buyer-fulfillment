<template lang="">
  <div>
    <div
      class="fulfillemnt-order-items-expected-deivery"
      v-if="getStatus([8]).includes($store.getters.getDeliveryStatus)"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        {{ $t("desktop.givePin") }}
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        <span class="rider-pin-mobile">
          {{ $t("mobile.pin") }}
          {{ Object.keys(data).length > 0 ? data.data.confirmation_pin : "--" }}
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import statusMixin from '../../../mixins/status_mixin';

export default {
  mixins: [statusMixin],
  name: 'DeliveryPin',
  computed: {},
};
</script>
<style lang=""></style>
