import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import HomeView from "@/views/HomeView.vue";
import { useProductStore } from "@/store";

describe("HomeView", () => {
  let store: ReturnType<typeof useProductStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useProductStore();
  });

  it("renders home page without crashing", () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: ["ProductCard", "router-link"],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("has store data available", () => {
    store.flashSales = [
      {
        id: 1,
        title: "iPhone",
        price: 1000,
        rating: 4,
        description: "",
        discountPercentage: 10,
        stock: 10,
        category: "phones",
        thumbnail: "",
        images: [],
        quantity: 1,
      },
    ];

    expect(store.flashSales.length).toBe(1);
  });
});
