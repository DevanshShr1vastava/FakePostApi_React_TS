import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import AddProduct from "./components/pages/AddProduct"
import EditProducts from "./components/pages/EditProducts"
import ProductDetail from "./components/pages/ProductDetail"
import Layout from "./components/layout/layout"
import { ThemeProvider } from "./components/theme-provider"
import { useEffect, useReducer } from "react"
import { getAllProducts, getCategories, IProductData } from "./components/utils/productApi"
import { useQuery } from "@tanstack/react-query"
import { productReducer } from "./components/utils/productReducer"
import { CategoryContext, ProductContext } from "./components/utils/AppContexts"



function App() {

  const {data: product} = useQuery<IProductData[]>({
    queryKey : ['products'],
    queryFn : getAllProducts,
    retry : false,
    refetchOnWindowFocus : false,
    refetchOnMount : false
  });
  
  const {data: categoryData} = useQuery<string[]>({
    queryKey : ['category'],
    queryFn : getCategories,
    retry : false,
    refetchOnWindowFocus : false,
    refetchOnMount : false
  });

  const [productData, productDispatch] = useReducer(productReducer, product ?? []);

  useEffect(()=>{
    if(product) productDispatch({type:"AddProductList",productData:product});
  },[product]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProductContext.Provider value={{productData, productDispatch}}>
        <CategoryContext.Provider value ={categoryData ?? []}>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path ="/add" element = {<AddProduct />} />
                <Route path = "/edit/:id" element = {<EditProducts />} />
                <Route path = "/product/:id" element = {<ProductDetail />} />
              </Routes>
            </Layout>
          </Router>
        </CategoryContext.Provider>  
      </ProductContext.Provider>
    </ThemeProvider>
  )
}

export default App
