<template>
  <div class="products-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb__link">Home</router-link>
      <span class="breadcrumb__slash"> / </span>
      <span class="breadcrumb__current">Products</span>
    </div>

    <div class="products-page__header">
      <h2 class="products-page__title">Explore Our Products</h2>

      <div class="sorting-container">
        <label for="sort">Sort by:</label>
        <select id="sort" v-model="sortBy" class="sort-dropdown">
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>
    </div>
    <div class="products-page__grid">
      <ProductCard
        v-for="product in displayedProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Load more -->
    <div class="products-page__load-more" v-if="hasMore">
      <button class="btn" @click="handleLoadMore">Load More Products</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductCard from "@/components/product/ProductCard.vue";
import { Product } from "@/types/product";

export default Vue.extend({
  components: { ProductCard },
  data() {
    return {
      visibleCount: 12,
      sortBy: "default",
    };
  },
  computed: {
    allProducts(): Product[] {
      return this.$store.state.allProducts;
    },
    displayedProducts(): Product[] {
      let products = [...this.$store.state.allProducts];

      if (this.sortBy === "price-asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === "price-desc") {
        products.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === "rating") {
        products.sort((a, b) => b.rating - a.rating);
      }

      return products.slice(0, this.visibleCount);
    },
    hasMore(): boolean {
      const totalInApi = this.$store.state.total;
      return (
        this.allProducts.length < totalInApi ||
        this.visibleCount < this.allProducts.length
      );
    },
  },
  methods: {
    async handleLoadMore() {
      this.visibleCount += 12;

      if (this.visibleCount >= this.allProducts.length) {
        await this.$store.dispatch("fetchProductsPage");
      }
    },
    goToDetails(id: number) {
      this.$router.push({
        name: "ProductDetails",
        params: { id: id.toString() },
      });
    },
  },
  async mounted() {
    if (this.allProducts.length === 0) {
      await this.$store.dispatch("fetchProductsPage");
    }
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/pages/products.scss";
</style>
