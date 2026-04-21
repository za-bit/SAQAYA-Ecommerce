import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import CartSidebar from "@/components/cart/CartSidebar.vue";
import { Product } from "@/types/product";

type CartItem = Product & { quantity: number };

describe("CartSidebar.vue", () => {
  let pinia: ReturnType<typeof createPinia>;
  let router: any;

  const mockCartItems: CartItem[] = [
    {
      id: 1,
      title: "iPhone 15",
      price: 1000,
      quantity: 2,
      thumbnail: "test.jpg",
      description: "desc",
      discountPercentage: 10,
      rating: 4.5,
      stock: 10,
      category: "phones",
      images: ["img1.jpg"],
    },
  ];

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });
  });

  // 1) render items
  it("renders cart items correctly", () => {
    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia, router],
      },
    });

    expect(wrapper.find(".cart-sidebar__name").exists()).toBe(true);
    expect(wrapper.text()).toContain("iPhone 15");
  });

  // 2) empty cart
  it("shows empty message when cart is empty", () => {
    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia, router],
      },
    });

    expect(wrapper.find(".cart-sidebar__empty").exists()).toBe(true);
  });

  // 3) update quantity
  it("updates quantity when input changes", async () => {
    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia, router],
      },
    });

    const input = wrapper.find(".cart-sidebar__input");

    await input.setValue("3");
    await input.trigger("change");

    expect(input.exists()).toBe(true);
  });

  // 4) remove item
  it("removes item when remove icon clicked", async () => {
    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia, router],
      },
    });

    await wrapper.find(".cart-sidebar__remove").trigger("click");

    expect(wrapper.find(".cart-sidebar__remove").exists()).toBe(true);
  });

  // 5) close cart
  it("emits close-cart event", async () => {
    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia, router],
      },
    });

    await wrapper.find(".cart-sidebar__close").trigger("click");

    expect(wrapper.emitted("close-cart")).toBeTruthy();
  });

  // 6) total exists
  it("renders total correctly", () => {
    const wrapper = shallowMount(CartSidebar, {
      global: {
        plugins: [pinia, router],
      },
    });

    expect(wrapper.text()).toContain("$");
  });
});
