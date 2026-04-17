<template>
  <div class="product-details" v-if="product">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/home" class="breadcrumb__link">Home</router-link>
      <span class="breadcrumb__slash"> / </span>
      <router-link to="/products" class="breadcrumb__link"
        >Products</router-link
      >
      <span class="breadcrumb__slash"> / </span>
      <span class="breadcrumb__current">{{ product.title }}</span>
    </div>

    <div class="product-details__main">
      <!-- Gallery -->
      <div class="product-details__gallery">
        <div class="product-details__thumbnails">
          <div
            v-for="(img, index) in product.images"
            :key="index"
            class="product-details__thumb"
            :class="{ active: mainImage === img }"
            @click="mainImage = img"
          >
            <img :src="img" />
          </div>
        </div>

        <div class="product-details__image">
          <img :src="mainImage || product.thumbnail" />
        </div>
      </div>

      <!-- Info -->
      <div class="product-details__info">
        <h1 class="product-details__title">{{ product.title }}</h1>

        <div class="product-details__rating">
          <span>⭐⭐⭐⭐⭐</span>
          <span>({{ product.stock }} Reviews)</span>
          <span>|</span>
          <span>In Stock</span>
        </div>

        <div class="product-details__price">${{ product.price }}</div>

        <p class="product-details__desc">{{ product.description }}</p>

        <div class="product-details__category">
          <span class="product-details__label">Category:</span>
          <span class="product-details__value">{{ product.category }}</span>
        </div>

        <!-- Actions -->
        <div class="product-details__actions">
          <div class="product-details__qty">
            <button @click="updateQty(-1)" class="product-details__qty-btn">
              -
            </button>
            <span class="product-details__qty-value">{{ qty }}</span>
            <button @click="updateQty(1)" class="product-details__qty-btn">
              +
            </button>
          </div>

          <button class="btn" @click="handleAddToCart">Buy Now</button>

          <div class="product-details__wishlist">
            <img src="@/assets/images/icons/HeartIcon.svg" />
          </div>
        </div>

        <!-- Delivery -->
        <div class="product-details__delivery">
          <div class="product-details__delivery-item">
            <img src="@/assets/images/icons/DeliveryIcon.svg" />
            <div>
              <h4>Free Delivery</h4>
              <p>Enter postal code for availability</p>
            </div>
          </div>

          <div class="product-details__delivery-item">
            <img src="@/assets/images/icons/ReturnIcon.svg" />
            <div>
              <h4>Return Delivery</h4>
              <p>30 days return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="product-details__loading">Loading Product...</div>
</template>

<script lang="ts">
import Vue from "vue";
import productService from "@/services/ProductService";
import { Product } from "@/types/product";

export default Vue.extend({
  data() {
    return {
      product: null as Product | null,
      mainImage: "",
      qty: 1,
    };
  },
  methods: {
    async loadProduct() {
      const id = this.$route.params.id;
      try {
        const res = await productService.getProductById(id);
        this.product = res.data;
        this.mainImage = res.data.thumbnail;
      } catch (error) {
        this.$router.push({ name: "NotFound" });
      }
    },
    updateQty(val: number) {
      if (this.qty + val >= 1) this.qty += val;
    },
    handleAddToCart() {
      if (this.product) {
        this.$store.commit("ADD_TO_CART", {
          ...this.product,
          quantity: this.qty,
        });
      }
    },
  },
  mounted() {
    this.loadProduct();
  },
  watch: {
    "$route.params.id": "loadProduct",
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/pages/productDetails.scss";
</style>
