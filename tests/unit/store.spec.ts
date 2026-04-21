import { setActivePinia, createPinia } from "pinia";
import { useProductStore } from "@/store";

describe("Product Pinia Store", () => {
  let store: ReturnType<typeof useProductStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useProductStore();

    // reset cart before each test
    store.cart = [];
  });

  // cartTotal
  it("calculates cart total correctly", () => {
    store.addToCart({
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
    });

    expect(store.cartTotal).toBe(2000);
  });

  // cartCount
  it("returns correct cart count", () => {
    store.addToCart({
      id: 1,
      title: "iPhone",
      price: 1000,
      quantity: 1,
      description: "",
      discountPercentage: 0,
      rating: 4,
      stock: 10,
      category: "phones",
      thumbnail: "",
      images: [],
    });

    store.addToCart({
      id: 2,
      title: "Samsung",
      price: 500,
      quantity: 1,
      description: "",
      discountPercentage: 0,
      rating: 4,
      stock: 10,
      category: "phones",
      thumbnail: "",
      images: [],
    });

    expect(store.cartCount).toBe(2);
  });

  // remove item
  it("removes item from cart", () => {
    store.addToCart({
      id: 1,
      title: "iPhone",
      price: 1000,
      quantity: 1,
      description: "",
      discountPercentage: 0,
      rating: 4,
      stock: 10,
      category: "phones",
      thumbnail: "",
      images: [],
    });

    store.removeFromCart(1);

    expect(store.cart.length).toBe(0);
  });

  // quantity update
  it("updates quantity correctly", () => {
    store.addToCart({
      id: 1,
      title: "iPhone",
      price: 1000,
      quantity: 1,
      description: "",
      discountPercentage: 0,
      rating: 4,
      stock: 10,
      category: "phones",
      thumbnail: "",
      images: [],
    });

    store.setQuantity(1, 5);

    expect(store.cart[0].quantity).toBe(5);
  });

  // actions existence (simple check)
  it("has actions defined", () => {
    expect(typeof store.addToCart).toBe("function");
    expect(typeof store.removeFromCart).toBe("function");
    expect(typeof store.setQuantity).toBe("function");
  });
});
