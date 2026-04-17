<template>
  <div class="home">
    <div class="home__hero">
      <img :src="homeImg" alt="Hero" class="home__hero-img" />
    </div>

    <!-- Flash Sales -->
    <section class="home__section">
      <div class="home__tag">
        <img :src="todayIcon" />
        <span>Today's</span>
      </div>

      <h2 class="home__title">Flash Sales</h2>

      <div class="home__grid">
        <ProductCard
          v-for="item in flashSales"
          :key="item.id"
          :product="item"
        />
      </div>

      <div class="home__center">
        <router-link to="/products" class="home__btn">
          View All Products
        </router-link>
      </div>
    </section>

    <hr class="home__divider" />

    <!-- Explore -->
    <section class="home__section">
      <div class="home__tag">
        <img :src="todayIcon" />
        <span>Our Products</span>
      </div>

      <h2 class="home__title">Explore Our Products</h2>

      <div class="home__grid home__grid--explore">
        <ProductCard
          v-for="item in exploreProducts"
          :key="item.id"
          :product="item"
        />
      </div>

      <div class="home__center">
        <router-link to="/products" class="home__btn">
          View All Products
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductCard from "@/components/product/ProductCard.vue";
import homeImg from "@/assets/images/illustrations/HomeImage.svg";
import todayIcon from "@/assets/images/icons/RectangleOrange.svg";

export default Vue.extend({
  components: { ProductCard },
  data: () => ({ homeImg, todayIcon }),
  computed: {
    flashSales() {
      return this.$store.state.flashSales;
    },
    exploreProducts() {
      return this.$store.state.exploreProducts;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  async mounted() {
    if (this.$store.state.flashSales.length === 0) {
      await this.$store.dispatch("fetchHomeData");
    }
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/pages/home.scss";
</style>
