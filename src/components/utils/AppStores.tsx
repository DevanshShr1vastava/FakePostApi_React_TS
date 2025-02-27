import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProductData } from "./productApi";
import { ICartData, ICartProducts } from "./cartAPI";


export interface IProductStore {
  productData: IProductData[];
  productAdd: (newProduct: IProductData) => void;
  productDelete: (id: number) => void;
  productUpdate: (updatedProduct: IProductData) => void;
  productList: (retrievedProducts : IProductData[]) => void;
}

export interface ICartStore {
  cartData : ICartData,
  cartAdd : (prodData : ICartProducts)=>void;
  cartUpdate : (prodData : ICartProducts)=>void;
  cartdelete : ()=>void;
  removeFromCart : (productId : number)=>void;
}

export const useProductStore = create<IProductStore>()(
  persist(
    (set) => ({
      productData: [
        {
          title: "",
          category: "",
          description: "",
          price: 0,
          id: 0,
          image: "",
        },
      ],
      productAdd: (newProduct: IProductData) =>
        set((state) => ({
          productData: [...state.productData, newProduct],
        })),
      productDelete: (id: number) =>
        set((state) => ({
          productData: [...state.productData.filter((prod) => prod.id !== id)],
        })),
      productUpdate: (updatedProduct: IProductData) =>
        set((state) => ({
          productData: state.productData.map((prod) =>
              prod.id === updatedProduct.id ? (prod = updatedProduct) : prod,
            ),
        })),
        productList : (retrievedProducts : IProductData[]) => set(()=>({
            productData : retrievedProducts
        }))
    }),
    {
      name: "Ecommerce_FAKESTOREAPI_Products",
    },
  ),
);


export const useCartStore = create<ICartStore>()(
  persist(
    (set)=>({
      cartData : {
        id : 0,
        userId : 0,
        date : new Date(),
        products : [
          {productId : 1, quantity : 1}
        ],
        __v : 0
      },
      cartAdd : (prodData : ICartProducts) => 
        {
          
          set ((state)=>({
            cartData : {...state.cartData, products : [...(state.cartData.products ?? []),prodData]}
          }))},
      cartdelete : ()=> {
      
        set ((state)=>({
          cartData : {
            ...state.cartData,
            products: []
          }
        }))
      },
      cartUpdate : (prodData : ICartProducts) =>{
       
        set ((state)=>({
          cartData : {
            ...state.cartData,
            products : (state.cartData.products ?? []).map((prod) =>
              prod.productId === prodData.productId ? prodData : prod)
          }
        }))
      },
      removeFromCart : (productId : number) =>{
        set ((state)=>({
          cartData : {
            ...state.cartData,
            products: (state.cartData.products ?? []).filter((item)=>item.productId !== productId)
          }
        }))
      }
    }),
    {
      name : "Ecommerce_FAKESTOREAPI_Cart"
    }
  )
)