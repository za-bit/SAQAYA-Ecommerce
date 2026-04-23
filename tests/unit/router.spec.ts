import router from "@/router";

describe("Vue Router", () => {
  it("has main routes defined", () => {
    const routes = router.getRoutes();

    const names = routes.map((r) => r.name);

    // Check only essential routes exist
    expect(names).toContain("home");
    expect(names).toContain("products");
    expect(names).toContain("productDetails");
  });

  it("products route is lazy loaded", () => {
    const routes = router.getRoutes();

    const productsRoute = routes.find((r) => r.name === "products");

    // Lazy loaded route should have component as function
    expect(typeof productsRoute?.components?.default).toBe("function");
  });
});
