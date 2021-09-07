<template>
  <div>
    <h2>Items being delivered</h2>
    <div v-for="orderItem in orderItems" :key="orderItem.name">
      <p>{{ orderItem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItems',
  data() {
    return {
      title: 'Marini Natural Order',
      orderItems: [
        {
          name: 'Shea Butter',
          price: 1300,
        },
        {
          name: 'Mango Butter',
          price: 1300,
        },
        {
          name: 'Creamy Cowash',
          price: 1300,
        },
      ],
    };
  },

};
</script>

<style></style>
