<!-- 普通页面 - 用于商品详情中使用 uni.navigateTo 跳转到购物车 -->
<template>
  <CartMainVue />
</template>

<script lang="ts" setup>
import CartMainVue from './components/CartMain.vue';
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $gray-2-4;
}
</style>
