<template>
  <div id="app">
    <Header @open-cart="isCartOpen = true" />
    <div class="page-content">
      <router-view />
    </div>
    <Footer />
    <transition name="slide">
      <CartSidebar v-if="isCartOpen" @close-cart="isCartOpen = false" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/layout/AppHeader.vue";
import Footer from "@/components/layout/AppFooter.vue";
import CartSidebar from "@/components/cart/CartSidebar.vue";
export default Vue.extend({
  components: {
    Header,
    Footer,
    CartSidebar,
  },
  data() {
    return {
      isCartOpen: false,
    };
  },
  mounted() {
    this.$store.dispatch("fetchHomeData");

    if (this.$store.state.allProducts.length === 0) {
      this.$store.dispatch("fetchProductsPage");
    }
  },
});
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
