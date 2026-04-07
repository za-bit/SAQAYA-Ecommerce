<template>
  <div class="cart-sidebar">
    <div class="cart-header">
      <h2>Shopping Cart</h2>

      <img
        src="@/assets/icons/closeCart.svg"
        class="close-btn"
        @click="$emit('close-cart')"
      />
    </div>
  </div>
</template>
<style>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
}
.cart-header {
  margin-left: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
  font-weight: inherit;
}
.close-btn {
  margin-right: 2%;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
