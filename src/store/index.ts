import { defineStore } from "pinia";
import productService from "@/services/ProductService";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

export const useProductStore = defineStore("product", {
  state: () => ({
    flashSales: [] as Product[],
    exploreProducts: [] as Product[],
    allProducts: [] as Product[],
    cart: [] as CartItem[],
    loading: false,
    skip: 0,
    total: 0,
  }),

  getters: {
    cartTotal: (state) => {
      return state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    cartCount: (state) => state.cart.length,
  },

  actions: {
    async fetchHomeData() {
      this.loading = true;

      try {
        const res = await productService.getProducts(50);

        const shuffled = [...res.data.products].sort(() => 0.5 - Math.random());

        this.flashSales = shuffled.slice(0, 4);
        this.exploreProducts = shuffled.slice(4, 12);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProductsPage() {
      try {
        const res = await productService.getProducts(24, this.skip);

        this.allProducts = [...this.allProducts, ...res.data.products];
        this.total = res.data.total;
        this.skip += 24;
      } catch (error) {
        console.error(error);
      }
    },

    async searchProducts(query: string) {
      this.loading = true;

      try {
        const res = await productService.searchProducts(query);

        this.allProducts = res.data.products;
        this.total = res.data.total;
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        this.loading = false;
      }
    },

    addToCart(payload: Product & { quantity?: number }) {
      const item = this.cart.find((i) => i.id === payload.id);

      const qtyToAdd = payload.quantity || 1;

      if (item) {
        item.quantity += qtyToAdd;
      } else {
        this.cart.push({ ...payload, quantity: qtyToAdd });
      }
    },

    removeFromCart(id: number) {
      this.cart = this.cart.filter((i) => i.id !== id);
    },

    setQuantity(id: number, quantity: number) {
      const item = this.cart.find((i) => i.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  },
});
