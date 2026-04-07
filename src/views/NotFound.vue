<template>
  <div class="not-found">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span class="home">Home</span>
      <span class="slash"> / </span>
      <span class="current">404 Error</span>
    </div>
    <h1>404 Not Found</h1>
    <p>Your visited page not found. You may go home page</p>
    <button @click="$router.push('/')">Back to home page</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
.not-found {
  margin-top: 30px;
}
button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: none;
  background: #db4444;
  color: white;
  cursor: pointer;
  height: 45px;
  width: 220px;
}
h1,
p,
button {
  text-align: center;
}
/* breadcrumb */
.breadcrumb {
  text-align: left;
  margin-left: 30px;
  margin-bottom: 100px;
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
.h1 {
  font-size: 30px;
  margin-bottom: 25px;
}
.p {
  margin-bottom: 40px;
}
</style>
