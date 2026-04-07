<template>
  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <span class="products">Products</span>
    <span class="slash"> / </span>
    <span class="product-name">Gaming</span>
    <span class="slash"> / </span>
    <span class="current">Havic</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style scoped>
/* breadcrumb */
.breadcrumb {
  padding-left: 20px;
  margin-bottom: 35px;
  font-size: 14px;
}

.products {
  color: #888;
}
.product-name {
  color: #888;
}
.slash {
  color: #888;
}
.current {
  color: #000;
  font-weight: bold;
}
</style>
