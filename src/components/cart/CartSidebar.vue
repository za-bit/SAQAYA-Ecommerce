<template>
  <div class="cart-sidebar">
    <!-- Header -->
    <div class="cart-sidebar__header">
      <h2 class="cart-sidebar__title">Shopping Cart</h2>

      <img
        src="@/assets/images/icons/CloseIcon.svg"
        class="cart-sidebar__close"
        @click="$emit('close-cart')"
      />
    </div>

    <!-- Items -->
    <div class="cart-sidebar__body">
      <div v-if="cartItems.length === 0" class="cart-sidebar__empty">
        Your cart is empty
      </div>

      <div v-for="item in cartItems" :key="item.id" class="cart-sidebar__item">
        <!-- Info -->
        <div class="cart-sidebar__info">
          <img :src="item.thumbnail" class="cart-sidebar__img" />

          <div class="cart-sidebar__details">
            <p class="cart-sidebar__name">{{ item.title }}</p>

            <input
              type="number"
              :value="item.quantity"
              @change="updateQty(item.id, $event)"
              min="1"
              class="cart-sidebar__input"
            />
          </div>
        </div>

        <!-- Price -->
        <div class="cart-sidebar__price">
          ${{ (item.price * item.quantity).toLocaleString() }}
        </div>

        <!-- Remove -->
        <img
          src="@/assets/images/icons/CancelIcon.svg"
          class="cart-sidebar__remove"
          @click="removeItem(item.id)"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="cart-sidebar__footer" v-if="cartItems.length > 0">
      <div class="cart-sidebar__line">
        <span>Subtotal:</span>
        <span>${{ cartTotal.toLocaleString() }}</span>
      </div>

      <div class="cart-sidebar__line">
        <span>Shipping:</span>
        <span class="cart-sidebar__free">Free</span>
      </div>

      <hr />

      <div class="cart-sidebar__line cart-sidebar__line--total">
        <span>Total:</span>
        <span>${{ cartTotal.toLocaleString() }}</span>
      </div>

      <button class="cart-sidebar__btn">Place Order</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CartItem } from "@/store/index";

export default Vue.extend({
  computed: {
    cartItems(): CartItem[] {
      return this.$store.state.cart;
    },
    cartTotal(): number {
      return this.$store.getters.cartTotal;
    },
  },
  methods: {
    updateQty(id: number, event: Event) {
      const target = event.target as HTMLInputElement;
      const val = parseInt(target.value);

      if (val > 0) {
        this.$store.commit("SET_QUANTITY", { id, quantity: val });
      }
    },
    removeItem(id: number) {
      this.$store.commit("REMOVE_FROM_CART", id);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/cart.scss";
</style>
