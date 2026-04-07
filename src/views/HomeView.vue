<template>
  <div class="container">
    <img src="@/assets/Home image.svg" />
    <div class="row">
      <img src="@/assets/icons/RectangleHome.svg" />
      <p>Today’s</p>
    </div>
    <p style="padding-right: 71%; font-size: 25px; font-weight: bold">
      Flash Sales
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 20px;
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: #db4444;
  padding-right: 71%;
}
</style>
