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
import { defineComponent, ref, onMounted } from "vue";
import Header from "@/components/layout/AppHeader.vue";
import Footer from "@/components/layout/AppFooter.vue";
import CartSidebar from "@/components/cart/CartSidebar.vue";
import { useProductStore } from "@/store";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    CartSidebar,
  },

  setup() {
    const isCartOpen = ref(false);
    const store = useProductStore();

    onMounted(async () => {
      await store.fetchHomeData();

      if (store.allProducts.length === 0) {
        await store.fetchProductsPage();
      }
    });

    return {
      isCartOpen,
    };
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
