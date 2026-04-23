# ecommerce

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### Live Demo
https://mellifluous-marshmallow-d235a4.netlify.app

## 📌 Project Overview

This is a modern E-Commerce web application built using **Vue 3**, **Pinia**, and **TypeScript**.
The project was migrated from **Vue 2 + Vuex** to **Vue 3 + Composition API + Pinia** as part of a refactoring and improvement process.

The application allows users to browse products, view details, and manage a shopping cart.

---

## 🚀 Features

* View products (Home & Products pages)
* Product details page
* Add to cart
* Update product quantity
* Remove items from cart
* Cart total calculation
* Lazy-loaded routes
* Responsive UI (basic)

---

## 🛠️ Tech Stack

* **Vue 3** (Composition API)
* **Pinia** (State Management)
* **TypeScript**
* **Vue Router**
* **Jest + Vue Test Utils** (Unit Testing)
* **SCSS**

---

## 🔄 Migration Summary

### From:

* Vue 2
* Vuex
* Options API

### To:

* Vue 3
* Pinia
* Composition API

### Key Changes:

* Replaced `data`, `methods`, `computed` with `setup()`
* Replaced Vuex store with Pinia store
* Simplified state management
* Improved code readability and maintainability

---
## 📁 Project Structure

```
src/
│
├── assets/
│   ├── fonts/                # Custom fonts
│   ├── images/               # Images, icons, illustrations
│   └── styles/               # Global SCSS structure
│       ├── abstracts/        # Variables, mixins, functions
│       ├── base/             # Reset, typography
│       ├── components/       # Component styles
│       ├── layout/           # Layout styles (header, footer)
│       ├── pages/            # Page-specific styles
│       └── main.scss         # Main SCSS entry file
│
├── components/
│   ├── cart/
│   │   └── CartSidebar.vue   # Shopping cart sidebar
│   │
│   ├── layout/
│   │   ├── AppHeader.vue     # Header component
│   │   └── AppFooter.vue     # Footer component
│   │
│   └── product/
│       └── ProductCard.vue   # Product display card
│
├── views/
│   ├── HomeView.vue          # Home page (flash sales & explore)
│   ├── ProductsView.vue      # Products listing page
│   ├── ProductDetailsView.vue # Product details page
│   ├── AboutView.vue         # About page
│   ├── ContactView.vue       # Contact page
│   └── NotFound.vue          # 404 page
│
├── router/
│   └── index.ts              # Vue Router configuration
│
├── store/
│   └── index.ts              # Pinia store (products + cart logic)
│
├── services/
│   └── ProductService.ts     # API calls (products & search)
│
├── types/
│   └── product.ts            # TypeScript interfaces (Product, CartItem)
│
└── main.ts                   # App entry point
```

---

## 🧩 Structure Explanation

* **assets/** → All static resources (images, styles, fonts)
* **components/** → Reusable UI components
* **views/** → Pages (connected to router)
* **store/** → Global state using Pinia
* **router/** → Navigation between pages
* **services/** → API handling
* **types/** → TypeScript definitions

---

## 💡 Architecture Notes

* The project follows a **modular structure** for scalability
* UI is separated into:

  * Reusable components
  * Page-level views
* State is centralized using **Pinia**
* API logic is isolated in **services layer**
* Styles are organized using **SCSS architecture (7-1 pattern inspired)**

---

## 🧠 State Management (Pinia)

### Store: `useProductStore`

#### State:

* `flashSales`
* `exploreProducts`
* `allProducts`
* `cart`
* `loading`

#### Getters:

* `cartTotal` → calculates total price
* `cartCount` → number of items in cart

#### Actions:

* `fetchHomeData()`
* `fetchProductsPage()`
* `searchProducts()`
* `addToCart()`
* `removeFromCart()`
* `setQuantity()`

---

## 🧩 Components Overview

### 🟦 ProductCard

* Displays product information
* Allows adding product to cart
* Navigates to product details

### 🟩 CartSidebar

* Displays cart items
* Updates quantity
* Removes items
* Shows total price

### 🟨 HomeView

* Displays flash sales and explore products
* Fetches data on mount

---

## 🧪 Testing

Unit tests are implemented using **Jest** and **Vue Test Utils**.

### Covered:

* ✅ Store logic (cart operations)
* ✅ ProductCard rendering & actions
* ✅ CartSidebar basic behavior
* ✅ Basic component rendering

### Approach:

* Focus on **store logic** instead of complex DOM interactions
* Use **shallowMount** for simplicity
* Avoid unnecessary complexity in UI testing

---

## ⚙️ Installation & Setup

```bash
# install dependencies
npm install

# run development server
npm run serve

# run tests
npm run test:unit

# build project
npm run build
```

---

## 📌 Notes

* The project focuses on **clean architecture and simplicity**
* Tests are kept minimal and stable
* Avoided over-engineering in testing

---

## ✨ Future Improvements

* Add authentication
* Improve UI/UX
* Add full E2E testing
* Optimize performance
* Add pagination & filters

---
