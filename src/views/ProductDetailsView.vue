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
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import productService from "@/services/ProductService";
import { useProductStore } from "@/store";
import { Product } from "@/types/product";

export default defineComponent({
  name: "ProductDetails",

  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useProductStore();

    const product = ref<Product | null>(null);
    const mainImage = ref("");
    const qty = ref(1);

    const loadProduct = async () => {
      const id = route.params.id as string;

      try {
        const res = await productService.getProductById(id);

        product.value = res.data;
        mainImage.value = res.data.thumbnail;
      } catch (error) {
        router.push({ name: "NotFound" });
      }
    };

    const updateQty = (val: number) => {
      if (qty.value + val >= 1) qty.value += val;
    };

    const handleAddToCart = () => {
      if (product.value) {
        store.addToCart({
          ...product.value,
          quantity: qty.value,
        });
      }
    };

    onMounted(() => {
      loadProduct();
    });

    watch(
      () => route.params.id,
      () => {
        loadProduct();
      }
    );

    return {
      product,
      mainImage,
      qty,
      loadProduct,
      updateQty,
      handleAddToCart,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/pages/productDetails.scss";
</style>
