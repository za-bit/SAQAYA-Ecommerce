import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getProducts(limit = 30, skip = 0) {
    return apiClient.get(`/products?limit=${limit}&skip=${skip}`);
  },
  getProduct(id: number) {
    return apiClient.get(`/products/${id}`);
  },
  getCategories() {
    return apiClient.get("/products/category-list");
  },
  getProductById(id: string | number) {
    return apiClient.get(`/products/${id}`);
  },
  searchProducts(query: string) {
    return apiClient.get(`/products/search?q=${query}`);
  },
};
