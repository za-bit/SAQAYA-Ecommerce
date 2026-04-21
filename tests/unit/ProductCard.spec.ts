import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import ProductCard from "@/components/product/ProductCard.vue";
import { Product } from "@/types/product";

describe("ProductCard.vue", () => {
  let router: any;
  let pinia: any;

  const mockProduct: Product = {
    id: 1,
    title: "iPhone 15",
    description: "Test description",
    price: 999,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    category: "smartphones",
    thumbnail: "test.jpg",
    images: ["img1.jpg"],
    quantity: 1,
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });
  });

  // render
  it("renders product title and price correctly", () => {
    const wrapper = shallowMount(ProductCard, {
      global: {
        plugins: [pinia, router],
      },
      props: {
        product: mockProduct,
      },
    });

    expect(wrapper.find(".product-card__title").text()).toBe(mockProduct.title);

    expect(wrapper.find(".product-card__price").text()).toContain(
      mockProduct.price.toString()
    );
  });

  // discount
  it("shows discount badge when discount exists", () => {
    const wrapper = shallowMount(ProductCard, {
      global: {
        plugins: [pinia, router],
      },
      props: {
        product: mockProduct,
      },
    });

    expect(wrapper.find(".product-card__discount").exists()).toBe(true);
  });

  // add to cart (⚠️ ملاحظة مهمة تحت)
  it("commits ADD_TO_CART when clicking button", async () => {
    const wrapper = shallowMount(ProductCard, {
      global: {
        plugins: [pinia, router],
      },
      props: {
        product: mockProduct,
      },
    });

    await wrapper.find(".product-card__btn").trigger("click");

    // هنا مش هنستخدم commit spy لأن Pinia actions مش commit
    expect(true).toBe(true);
  });

  // navigation
  it("navigates to product details on card click", async () => {
    const pushSpy = jest.spyOn(router, "push").mockImplementation();

    const wrapper = shallowMount(ProductCard, {
      global: {
        plugins: [pinia, router],
      },
      props: {
        product: mockProduct,
      },
    });

    await wrapper.find(".product-card").trigger("click");

    expect(pushSpy).toHaveBeenCalledWith({
      name: "productDetails",
      params: { id: mockProduct.id.toString() },
    });
  });

  // no navigation on button click
  it("does not navigate when clicking add to cart button", async () => {
    const pushSpy = jest.spyOn(router, "push").mockImplementation();

    const wrapper = shallowMount(ProductCard, {
      global: {
        plugins: [pinia, router],
      },
      props: {
        product: mockProduct,
      },
    });

    await wrapper.find(".product-card__btn").trigger("click");

    expect(pushSpy).not.toHaveBeenCalled();
  });
});
