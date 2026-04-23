import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ProductsView from "@/views/ProductsView.vue";
import { useProductStore } from "@/store";
import { createRouter, createWebHistory } from "vue-router";

describe("ProductsView", () => {
  let store: ReturnType<typeof useProductStore>;

  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: "/", name: "home", component: {} }],
  });

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useProductStore();

    store.$patch({
      allProducts: [
        { id: 1, price: 100, rating: 4, title: "A" },
        { id: 2, price: 50, rating: 5, title: "B" },
        { id: 3, price: 200, rating: 3, title: "C" },
      ],
      total: 3,
    });
  });

  it("renders products", () => {
    const wrapper = mount(ProductsView, {
      global: { plugins: [router] },
    });

    const cards = wrapper.findAllComponents({ name: "ProductCard" });
    expect(cards.length).toBe(3);
  });

  it("sort by price", async () => {
    const wrapper = mount(ProductsView, {
      global: { plugins: [router] },
    });

    await wrapper.find("select").setValue("price-asc");

    const products = (wrapper.vm as any).displayedProducts;

    expect(products[0].price).toBe(50);
  });

  it("sort by rating", async () => {
    const wrapper = mount(ProductsView, {
      global: { plugins: [router] },
    });

    await wrapper.find("select").setValue("rating");

    const products = (wrapper.vm as any).displayedProducts;

    expect(products[0].rating).toBe(5);
  });
});
