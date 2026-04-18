import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import Vue from "vue";
import CartSidebar from "@/components/cart/CartSidebar.vue";
import { CartItem } from "@/store";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartSidebar.vue", () => {
  let store: Store<unknown>;

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
    store = new Vuex.Store({
      state: {
        cart: mockCartItems,
      },
      getters: {
        cartTotal: () => 2000,
      },
      mutations: {
        SET_QUANTITY: jest.fn(),
        REMOVE_FROM_CART: jest.fn(),
      },
    });
  });

  //  1) UI Rendering
  it("renders cart items correctly", () => {
    const wrapper: Wrapper<Vue> = shallowMount(CartSidebar, {
      localVue,
      store,
    });

    expect(wrapper.find(".cart-sidebar__name").text()).toBe("iPhone 15");
    expect(wrapper.find(".cart-sidebar__price").text()).toContain("$2,000");
  });

  //  2) Empty cart
  it("shows empty message when cart is empty", () => {
    store = new Vuex.Store({
      state: { cart: [] },
      getters: { cartTotal: () => 0 },
    });

    const wrapper = shallowMount(CartSidebar, {
      localVue,
      store,
    });

    expect(wrapper.find(".cart-sidebar__empty").exists()).toBe(true);
  });

  //  3) Update quantity
  it("commits SET_QUANTITY when quantity changes", async () => {
    const commitSpy = jest.spyOn(store, "commit");

    const wrapper = shallowMount(CartSidebar, {
      localVue,
      store,
    });

    const input = wrapper.find(".cart-sidebar__input");

    await input.setValue("3");
    await input.trigger("change");

    expect(commitSpy).toHaveBeenCalledWith("SET_QUANTITY", {
      id: 1,
      quantity: 3,
    });
  });

  //  4) Remove item
  it("commits REMOVE_FROM_CART when remove icon clicked", async () => {
    const commitSpy = jest.spyOn(store, "commit");

    const wrapper = shallowMount(CartSidebar, {
      localVue,
      store,
    });

    await wrapper.find(".cart-sidebar__remove").trigger("click");

    expect(commitSpy).toHaveBeenCalledWith("REMOVE_FROM_CART", 1);
  });

  //  5) Close cart event
  it("emits close-cart when clicking close button", async () => {
    const wrapper = shallowMount(CartSidebar, {
      localVue,
      store,
    });

    await wrapper.find(".cart-sidebar__close").trigger("click");

    expect(wrapper.emitted("close-cart")).toBeTruthy();
  });

  //  6) Total rendering
  it("renders total correctly", () => {
    const wrapper = shallowMount(CartSidebar, {
      localVue,
      store,
    });

    expect(wrapper.text()).toContain("$2,000");
  });
});
