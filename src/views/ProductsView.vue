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
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import ProductCard from "@/components/product/ProductCard.vue";
import { useProductStore } from "@/store";
import { Product } from "@/types/product";

export default defineComponent({
  name: "ProductsView",

  components: {
    ProductCard,
  },

  setup() {
    const router = useRouter();
    const store = useProductStore();

    const visibleCount = ref(12);
    const sortBy = ref("default");

    const allProducts = computed<Product[]>(() => store.allProducts);

    const displayedProducts = computed(() => {
      let products = [...store.allProducts];

      if (sortBy.value === "price-asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortBy.value === "price-desc") {
        products.sort((a, b) => b.price - a.price);
      } else if (sortBy.value === "rating") {
        products.sort((a, b) => b.rating - a.rating);
      }

      return products.slice(0, visibleCount.value);
    });

    const hasMore = computed(() => {
      const totalInApi = store.total;

      return (
        store.allProducts.length < totalInApi ||
        visibleCount.value < store.allProducts.length
      );
    });

    const handleLoadMore = async () => {
      visibleCount.value += 12;

      if (visibleCount.value >= store.allProducts.length) {
        await store.fetchProductsPage();
      }
    };

    const goToDetails = (id: number) => {
      router.push({
        name: "productDetails",
        params: { id: id.toString() },
      });
    };

    onMounted(async () => {
      if (store.allProducts.length === 0) {
        await store.fetchProductsPage();
      }
    });

    return {
      sortBy,
      visibleCount,
      allProducts,
      displayedProducts,
      hasMore,
      handleLoadMore,
      goToDetails,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/pages/products.scss";
</style>
