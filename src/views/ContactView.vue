<template>
  <div class="contact">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span class="home">Home</span>
      <span class="slash"> / </span>
      <span class="current">Contact</span>
    </div>
    <img src="@/assets/contact Image.svg" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style scoped>
.contact {
  padding-top: 50px;
  padding-bottom: 150px;
}
.contact {
  padding-top: 45px;
  padding-bottom: 150px;
}

/* breadcrumb */
.breadcrumb {
  padding-left: 20px;
  margin-bottom: 35px;
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
