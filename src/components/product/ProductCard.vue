<template>
  <div class="product-card" @click="goToDetails">
    <!-- Image -->
    <div class="product-card__image">
      <span v-if="product.discountPercentage" class="product-card__discount">
        -{{ Math.round(product.discountPercentage) }}%
      </span>

      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="product-card__img"
      />

      <button class="product-card__btn" @click.stop="addToCart">
        Add To Cart
      </button>
    </div>

    <!-- Info -->
    <div class="product-card__info">
      <h3 class="product-card__title">
        {{ product.title }}
      </h3>

      <span class="product-card__category">
        {{ product.category }}
      </span>

      <div class="product-card__footer">
        <span class="product-card__price"> ${{ product.price }} </span>

        <span class="product-card__rating"> ⭐ {{ product.rating }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/store";
import { Product } from "@/types/product";

export default defineComponent({
  name: "ProductCard",

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const store = useProductStore();

    const addToCart = () => {
      store.addToCart(props.product);
    };

    const goToDetails = () => {
      router.push({
        name: "productDetails",
        params: {
          id: props.product.id.toString(),
        },
      });
    };

    return {
      addToCart,
      goToDetails,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/productcard.scss";
</style>
