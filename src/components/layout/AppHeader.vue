<template>
  <header class="header">
    <div class="text">Exclusive</div>
    <!-- Navigation -->
    <nav class="route">
      <nav class="route">
        <router-link v-for="link in links" :key="link.path" :to="link.path">
          {{ link.name }}
        </router-link>
      </nav>
    </nav>
    <!-- Search -->
    <div class="search">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="What are you looking for?"
        @keyup.enter="handleSearch"
      />
      <img src="@/assets/icons/search.svg" @click="handleSearch" />
    </div>

    <!-- Cart -->
    <div class="cart">
      <img src="@/assets/icons/Cart.svg" @click="$emit('open-cart')" />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      searchQuery: "",
      links: [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
        { name: "About", path: "/about" },
        { name: "Products", path: "/products" },
      ],
    };
  },
  methods: {
    handleSearch() {
      if (this.$route.name === "NotFound") {
        return;
      }

      if (!this.searchQuery) return;
      this.searchQuery = "";
      this.$router.push({ name: "NotFound" });
    },
  },
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  background-color: transparent;
  border-bottom: 1px solid #ddd;
}

.text {
  font-size: 22px;
  font-weight: bold;
  color: black;
  font-weight: bold;
}

.route {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.cart {
  margin-left: auto;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 25px;
}
.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search input {
  padding: 8px 45px 8px 10px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  outline: none;
}

.search img {
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.route a {
  color: black;
  text-decoration: none;
}
.route a.router-link-active {
  color: black;
}
.route a.router-link-exact-active {
  border-bottom: 2px solid #b9b3b3;
  padding-bottom: 3px;
  font-weight: 500;
}
</style>
