<template>
  <div class="row">
    <div class="colum">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <span class="home">Home</span>
        <span class="slash"> / </span>
        <span class="current">About</span>
      </div>
      <h1 class="title">Our Story</h1>
      <p class="paragraph">
        Launced in 2015, Exclusive is South Asia’s premier online shopping
        makterplace with an active presense in Bangladesh. Supported by wide
        range of tailored marketing, data and service solutions, Exclusive has
        10,500 sallers and 300 brands and serves 3 millioons customers across
        the region.Exclusive has more than 1 Million products to offer, growing
        at a very fast. Exclusive offers a diverse assotment in categories
        ranging from consumer.
      </p>
    </div>
    <img src="@/assets/about image.svg" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 50px 50px 150px 50px;
}
.colum {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 400px;
}
/* breadcrumb */
.breadcrumb {
  padding-left: 20px;
  font-size: 14px;
}

.home {
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
