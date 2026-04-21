<template>
  <header class="header">
    <div class="header__logo">Exclusive</div>
    <!-- Navigation -->
    <nav class="header__nav">
      <router-link v-for="link in links" :key="link.path" :to="link.path">
        {{ link.name }}
      </router-link>
    </nav>
    <!-- Search -->
    <div class="header__search">
      <input
        class="header__input"
        type="text"
        v-model="searchQuery"
        placeholder="What are you looking for?"
        @keyup.enter="handleSearch"
      />
      <img
        class="header__search-icon"
        src="@/assets/images/icons/SearchIcon.svg"
        @click="handleSearch"
      />
    </div>

    <!-- Cart -->
    <div class="header__cart">
      <div class="cart-icon-wrapper">
        <img
          src="@/assets/images/icons/CartIc.svg"
          @click="$emit('open-cart')"
        />
        <span class="cart-badge" v-if="cartCount > 0">
          {{ cartCount }}
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "@/store";

export default defineComponent({
  name: "AppHeader",

  setup(_, { emit }) {
    const router = useRouter();
    const route = useRoute();

    const store = useProductStore();

    const searchQuery = ref("");

    const links = [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
      { name: "About", path: "/about" },
      { name: "Products", path: "/products" },
    ];

    const cartCount = computed(() => store.cartCount);

    const handleSearch = async () => {
      if (!searchQuery.value.trim()) return;

      if (route.name !== "Products") {
        await router.push({ name: "Products" });
      }

      await store.searchProducts(searchQuery.value);
    };

    return {
      searchQuery,
      links,
      cartCount,
      handleSearch,
      emit,
    };
  },
});
</script>

<style scoped>
@import "@/assets/styles/layout/header.scss";
.cart-icon-wrapper {
  position: relative;
  cursor: pointer;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #db4444;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}
</style>
