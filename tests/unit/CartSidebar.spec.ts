import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import CartSidebar from "@/components/cart/CartSidebar.vue";
import { useProductStore } from "@/store";

describe("CartSidebar.vue", () => {
  let store: ReturnType<typeof useProductStore>;
  let pinia: ReturnType<typeof createPinia>;

  beforeEach(() => {
    // create ONE pinia instance
    pinia = createPinia();
    setActivePinia(pinia);

    store = useProductStore();
  });

  it("renders cart item correctly", () => {
    // set data
    store.cart = [
      {
        id: 1,
        title: "iPhone 15",
        price: 1000,
        quantity: 2,
        description: "",
        discountPercentage: 0,
        rating: 4,
        stock: 10,
        category: "phones",
        thumbnail: "",
        images: [],
      },
    ];

    // mount with SAME pinia
    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain("iPhone 15");
  });

  it("shows empty cart when no items", () => {
    store.cart = [];

    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain("Your cart is empty");
  });
});
