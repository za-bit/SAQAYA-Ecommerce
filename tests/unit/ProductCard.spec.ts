import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import VueRouter from "vue-router";
import ProductCard from "@/components/product/ProductCard.vue";
import { Product } from "@/types/product";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("ProductCard.vue", () => {
  let store: Store<unknown>;
  let router: VueRouter;

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
    store = new Vuex.Store({
      mutations: {
        ADD_TO_CART: jest.fn(),
      },
    });

    router = new VueRouter();
  });

  it("renders product title and price correctly", () => {
    const wrapper: Wrapper<Vue> = shallowMount(ProductCard, {
      localVue,
      store,
      router,
      propsData: { product: mockProduct },
    });

    expect(wrapper.find(".product-card__title").text()).toBe(mockProduct.title);

    expect(wrapper.find(".product-card__price").text()).toContain(
      mockProduct.price.toString()
    );
  });

  it("shows discount badge when discount exists", () => {
    const wrapper: Wrapper<Vue> = shallowMount(ProductCard, {
      localVue,
      store,
      router,
      propsData: { product: mockProduct },
    });

    expect(wrapper.find(".product-card__discount").exists()).toBe(true);
  });

  it("commits ADD_TO_CART when clicking button", async () => {
    const commitSpy = jest.spyOn(store, "commit");

    const wrapper: Wrapper<Vue> = shallowMount(ProductCard, {
      localVue,
      store,
      router,
      propsData: { product: mockProduct },
    });

    await wrapper.find(".product-card__btn").trigger("click");

    expect(commitSpy).toHaveBeenCalledWith("ADD_TO_CART", mockProduct);
  });

  it("navigates to product details on card click", async () => {
    const pushSpy = jest.spyOn(router, "push").mockImplementation();

    const wrapper: Wrapper<Vue> = shallowMount(ProductCard, {
      localVue,
      store,
      router,
      propsData: { product: mockProduct },
    });

    await wrapper.find(".product-card").trigger("click");

    expect(pushSpy).toHaveBeenCalledWith({
      name: "productDetails",
      params: { id: mockProduct.id.toString() },
    });
  });

  it("does not navigate when clicking add to cart button", async () => {
    const pushSpy = jest.spyOn(router, "push").mockImplementation();

    const wrapper: Wrapper<Vue> = shallowMount(ProductCard, {
      localVue,
      store,
      router,
      propsData: { product: mockProduct },
    });

    await wrapper.find(".product-card__btn").trigger("click");

    expect(pushSpy).not.toHaveBeenCalled();
  });
});
