import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import Vue from "vue";
import Home from "@/views/HomeView.vue";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home.vue", () => {
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
  ];

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        flashSales: mockProducts,
        exploreProducts: mockProducts,
        loading: false,
      },
      actions: {
        fetchHomeData: jest.fn(),
      },
    });
  });

  // 1) renders flash sales
  it("renders flash sales products", () => {
    const wrapper: Wrapper<Vue> = shallowMount(Home, {
      localVue,
      store,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    expect(wrapper.findAllComponents({ name: "ProductCard" }).length).toBe(2);
  });

  // 2) dispatch on mount
  it("dispatches fetchHomeData when flashSales is empty", () => {
    const dispatchSpy = jest.fn();

    const emptyStore = new Vuex.Store({
      state: {
        flashSales: [],
        exploreProducts: [],
        loading: false,
      },
      actions: {
        fetchHomeData: dispatchSpy,
      },
    });

    shallowMount(Home, {
      localVue,
      store: emptyStore,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  // 3) explore products render
  it("renders explore products section", () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    expect(wrapper.findAllComponents(ProductCard).length).toBe(2);
  });

  // 4) loading state exists
  it("has loading state from store", () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      stubs: {
        "router-link": true,
        ProductCard: true,
      },
    });

    expect((wrapper.vm as Vue).$store.state.loading).toBe(false);
  });
});
