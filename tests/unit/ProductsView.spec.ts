import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useProductStore } from "@/store";
import ProductsView from "@/views/ProductsView.vue";
import { Product } from "@/types/product";

describe("ProductsView.vue", () => {
  let store: ReturnType<typeof useProductStore>;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: "iPhone",
      price: 1000,
      rating: 4.5,
      description: "desc",
      discountPercentage: 10,
      stock: 10,
      category: "phones",
      thumbnail: "img.jpg",
      images: ["img.jpg"],
      quantity: 1,
    },
    {
      id: 2,
      title: "Samsung",
      price: 500,
      rating: 4.9,
      description: "desc",
      discountPercentage: 5,
      stock: 10,
      category: "phones",
      thumbnail: "img.jpg",
      images: ["img.jpg"],
      quantity: 1,
    },
  ];

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useProductStore();

    store.allProducts = mockProducts;
    store.total = 100;
  });

  // 1) render products
  it("renders product cards", () => {
    const wrapper = shallowMount(ProductsView, {
      global: {
        stubs: ["router-link", "ProductCard"],
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findAllComponents({ name: "ProductCard" }).length).toBe(2);
  });

  // 2) price sort
  it("sorts products by price ascending", async () => {
    const wrapper = shallowMount(ProductsView, {
      global: {
        stubs: ["router-link", "ProductCard"],
        plugins: [createPinia()],
      },
    });

    await wrapper.setData({ sortBy: "price-asc" });

    const vm = wrapper.vm as any;

    expect(vm.displayedProducts[0].price).toBe(500);
  });

  // 3) rating sort
  it("sorts products by rating", async () => {
    const wrapper = shallowMount(ProductsView, {
      global: {
        stubs: ["router-link", "ProductCard"],
        plugins: [createPinia()],
      },
    });

    await wrapper.setData({ sortBy: "rating" });

    const vm = wrapper.vm as any;

    expect(vm.displayedProducts[0].rating).toBe(4.9);
  });

  // 4) load more
  it("loads more products when button clicked", async () => {
    const wrapper = shallowMount(ProductsView, {
      global: {
        stubs: ["router-link", "ProductCard"],
        plugins: [createPinia()],
      },
    });

    await wrapper.find(".btn").trigger("click");

    expect((wrapper.vm as any).visibleCount).toBe(24);
  });

  // 5) fetch on mount if empty
  it("dispatches fetchProductsPage on mount if empty", async () => {
    setActivePinia(createPinia());
    const store = useProductStore();

    store.allProducts = [];

    const spy = jest.spyOn(store, "fetchProductsPage");

    shallowMount(ProductsView, {
      global: {
        stubs: ["router-link", "ProductCard"],
        plugins: [createPinia()],
      },
    });

    expect(spy).toHaveBeenCalled();
  });
});
