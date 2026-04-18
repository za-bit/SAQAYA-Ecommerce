import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import Vue from "vue";
import ProductsView from "@/views/ProductsView.vue";
import { Product } from "@/types/product";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProductsView.vue", () => {
  let store: Store<unknown>;

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
    store = new Vuex.Store({
      state: {
        allProducts: mockProducts,
        total: 100,
      },
      actions: {
        fetchProductsPage: jest.fn(),
      },
    });
  });

  // 1) render
  it("renders product cards", () => {
    const wrapper = shallowMount(ProductsView, {
      localVue,
      store,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    expect(wrapper.findAllComponents({ name: "ProductCard" }).length).toBe(2);
  });

  // 2) price sort
  it("sorts products by price ascending", async () => {
    const wrapper = shallowMount(ProductsView, {
      localVue,
      store,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    await wrapper.setData({ sortBy: "price-asc" });
    await Vue.nextTick();

    const vm = wrapper.vm as Vue & {
      displayedProducts: Product[];
    };

    expect(vm.displayedProducts[0].price).toBe(500);
  });

  // 3) rating sort
  it("sorts products by rating", async () => {
    const wrapper = shallowMount(ProductsView, {
      localVue,
      store,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    await wrapper.setData({ sortBy: "rating" });
    await Vue.nextTick();

    const vm = wrapper.vm as Vue & {
      displayedProducts: Product[];
    };

    expect(vm.displayedProducts[0].rating).toBe(4.9);
  });

  // 4) load more
  it("loads more products when button clicked", async () => {
    const wrapper = shallowMount(ProductsView, {
      localVue,
      store,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    await wrapper.find(".btn").trigger("click");

    expect((wrapper.vm as Vue).$data.visibleCount).toBe(24);
  });

  // 5) fetch on empty
  it("dispatches fetchProductsPage on mount if empty", () => {
    const dispatchSpy = jest.fn();

    const emptyStore = new Vuex.Store({
      state: {
        allProducts: [],
        total: 100,
      },
      actions: {
        fetchProductsPage: dispatchSpy,
      },
    });

    shallowMount(ProductsView, {
      localVue,
      store: emptyStore,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
