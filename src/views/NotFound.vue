<template>
  <div class="not-found">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb__link">Home</router-link>
      <span class="breadcrumb__slash"> / </span>
      <span class="breadcrumb__current">404 Error</span>
    </div>
    <h1 class="not-found__title">404 Not Found</h1>
    <p class="not-found__text">
      Your visited page not found. You may go home page
    </p>
    <button class="btn" @click="$router.push('/')">Back to home page</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
@import "@/assets/styles/pages/not-found.scss";
</style>
