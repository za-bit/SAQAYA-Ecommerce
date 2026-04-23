import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ProductCard from "@/components/product/ProductCard.vue";
import { useProductStore } from "@/store";

// Mock router
const mockPush = jest.fn();

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ProductCard.vue", () => {
  let store: ReturnType<typeof useProductStore>;

  const product = {
    id: 1,
    title: "iPhone 15",
    price: 1000,
    rating: 4,
    category: "phones",
    description: "",
    discountPercentage: 10,
    stock: 10,
    thumbnail: "",
    images: [],
    quantity: 1,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useProductStore();
    jest.clearAllMocks();
  });

  // 1) Render test
  it("renders product data correctly", () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
    });

    expect(wrapper.text()).toContain("iPhone 15");
    expect(wrapper.text()).toContain("1000");
    expect(wrapper.text()).toContain("phones");
  });

  // 2) Add to cart
  it("calls store.addToCart when button clicked", async () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
    });

    const spy = jest.spyOn(store, "addToCart");

    await wrapper.find(".product-card__btn").trigger("click");

    expect(spy).toHaveBeenCalledWith(product);
  });

  // 3) Navigation
  it("navigates to product details page", async () => {
    const wrapper = shallowMount(ProductCard, {
      props: { product },
    });

    await wrapper.trigger("click");

    expect(mockPush).toHaveBeenCalledWith({
      name: "productDetails",
      params: { id: "1" },
    });
  });
});
