import router from "@/router";
// import type { RouteRecordRaw } from "vue-router";

describe("Vue Router", () => {
  const routes = router.getRoutes();

  it("has all required routes", () => {
    const names = routes.map((r) => r.name);

    expect(names).toContain("home");
    expect(names).toContain("products");
    expect(names).toContain("productDetails");
    expect(names).toContain("contact");
    expect(names).toContain("about");
    expect(names).toContain("NotFound");
  });

  it("product details route is dynamic", () => {
    const route = routes.find((r) => r.name === "productDetails");

    expect(route?.path).toBe("/product/:id");
  });

  it("home route is correct", () => {
    const route = routes.find((r) => r.name === "home");

    expect(route?.path).toBe("/");
  });

  it("fallback route exists", () => {
    const route = routes.find((r) => r.name === "NotFound");

    expect(route?.path).toBe("/:pathMatch(.*)*");
  });

  it("products route is lazy loaded", () => {
    const route = routes.find((r) => r.name === "products");

    expect(route && typeof route === "function").toBe(true);
  });
});
