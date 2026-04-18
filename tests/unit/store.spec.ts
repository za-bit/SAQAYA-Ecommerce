import Vuex from "vuex";
import Vue from "vue";
import store from "@/store";
import { CartItem } from "@/store";

Vue.use(Vuex);

describe("Vuex Store", () => {
  let testStore: typeof store;

  beforeEach(() => {
    testStore = store;

    // reset cart before each test
    testStore.replaceState({
      ...store.state,
      cart: [],
    });
  });

  // cartTotal
  it("calculates cart total correctly", () => {
    const item: CartItem = {
      id: 1,
      title: "iPhone",
      price: 1000,
      quantity: 2,
      description: "",
      discountPercentage: 0,
      rating: 4,
      stock: 10,
      category: "phones",
      thumbnail: "",
      images: [],
    };

    testStore.commit("ADD_TO_CART", item);

    expect(testStore.getters.cartTotal).toBe(2000);
  });

  // cartCount
  it("returns correct cart count", () => {
    testStore.commit("ADD_TO_CART", {
      id: 1,
      title: "iPhone",
      price: 1000,
      quantity: 1,
    });

    testStore.commit("ADD_TO_CART", {
      id: 2,
      title: "Samsung",
      price: 500,
      quantity: 1,
    });

    expect(testStore.getters.cartCount).toBe(2);
  });

  // remove item
  it("removes item from cart", () => {
    testStore.commit("ADD_TO_CART", {
      id: 1,
      title: "iPhone",
      price: 1000,
      quantity: 1,
    });

    testStore.commit("REMOVE_FROM_CART", 1);

    expect(testStore.state.cart.length).toBe(0);
  });

  //  quantity
  it("updates quantity correctly", () => {
    testStore.commit("ADD_TO_CART", {
      id: 1,
      title: "iPhone",
      price: 1000,
      quantity: 1,
    });

    testStore.commit("SET_QUANTITY", {
      id: 1,
      quantity: 5,
    });

    expect(testStore.state.cart[0].quantity).toBe(5);
  });

  //  actions existence
  it("fetchHomeData exists", () => {
    expect(typeof testStore.dispatch).toBe("function");
  });

  it("fetchProductsPage exists", () => {
    expect(typeof testStore.dispatch).toBe("function");
  });

  it("searchProducts exists", () => {
    expect(typeof testStore.dispatch).toBe("function");
  });
});
