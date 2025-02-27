import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AddProduct from "./components/pages/AddProduct";
import EditProducts from "./components/pages/EditProducts";
import ProductDetail from "./components/pages/ProductDetail";
import Layout from "./components/layout/layout";
import { ThemeProvider } from "./components/theme-provider";
import { useEffect } from "react";
import {
  getAllProducts,
  getCategories,
  IProductData,
} from "./components/utils/productApi";
import { useQuery } from "@tanstack/react-query";
import {
  CartStoreContext,
  CategoryContext,
  ProductStoreContext,
} from "./components/utils/AppContexts";
import { useCartStore, useProductStore } from "./components/utils/AppStores";
import Cart from "./components/pages/Cart";

function App() {
  const { data: product } = useQuery<IProductData[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: categoryData } = useQuery<string[]>({
    queryKey: ["category"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const productStore = useProductStore();
  const cartStore = useCartStore();

  useEffect(() => {
    if (product) productStore.productList(product);
  }, [product]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProductStoreContext.Provider value={productStore}>
        <CartStoreContext.Provider value={cartStore}>
          <CategoryContext.Provider value={categoryData ?? []}>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add" element={<AddProduct />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/edit/:id" element={<EditProducts />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
              </Layout>
            </Router>
          </CategoryContext.Provider>
        </CartStoreContext.Provider>
      </ProductStoreContext.Provider>
    </ThemeProvider>
  );
}

export default App;
