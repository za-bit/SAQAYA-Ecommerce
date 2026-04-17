import Vue from "vue";
import Vuex from "vuex";
import productService from "@/services/ProductService";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flashSales: [] as Product[],
    exploreProducts: [] as Product[],
    allProducts: [] as Product[],
    cart: [] as CartItem[],
    loading: false,
    skip: 0,
    total: 0,
  },
  getters: {
    cartTotal: (state) => {
      return state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    cartCount: (state) => state.cart.length,
  },
  mutations: {
    SET_LOADING: (state, status) => (state.loading = status),
    SET_FLASH_SALES: (state, products) => (state.flashSales = products),
    SET_EXPLORE_PRODUCTS: (state, products) =>
      (state.exploreProducts = products),
    APPEND_PRODUCTS: (state, products) =>
      (state.allProducts = [...state.allProducts, ...products]),
    SET_TOTAL: (state, total) => (state.total = total),
    INCREMENT_SKIP: (state, amount) => (state.skip += amount),

    ADD_TO_CART(state, payload: Product & { quantity?: number }) {
      const item = state.cart.find((i) => i.id === payload.id);

      const qtyToAdd = payload.quantity || 1;

      if (item) {
        item.quantity += qtyToAdd;
      } else {
        state.cart.push({ ...payload, quantity: qtyToAdd });
      }
    },
    REMOVE_FROM_CART(state, id: number) {
      state.cart = state.cart.filter((i) => i.id !== id);
    },
    SET_QUANTITY(state, { id, quantity }) {
      const item = state.cart.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = parseInt(quantity);
      }
    },
  },
  actions: {
    async fetchHomeData({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await productService.getProducts(50);
        const shuffled = [...res.data.products].sort(() => 0.5 - Math.random());
        commit("SET_FLASH_SALES", shuffled.slice(0, 4));
        commit("SET_EXPLORE_PRODUCTS", shuffled.slice(4, 12));
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async fetchProductsPage({ state, commit }) {
      try {
        const res = await productService.getProducts(24, state.skip);
        commit("APPEND_PRODUCTS", res.data.products);
        commit("SET_TOTAL", res.data.total);
        commit("INCREMENT_SKIP", 24);
      } catch (error) {
        console.error(error);
      }
    },
    async searchProducts({ commit }, query: string) {
      commit("SET_LOADING", true);
      try {
        const res = await productService.searchProducts(query);
        commit("SET_ALL_PRODUCTS", res.data.products);
        commit("SET_TOTAL", res.data.total);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
});
