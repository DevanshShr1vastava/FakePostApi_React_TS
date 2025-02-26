import { createContext } from "react";
import { IProductData } from "./productApi";
import { ActionType as ProductActionType } from "./productReducer"

interface IProductContext { 
    productData : IProductData[];
    productDispatch : React.Dispatch<ProductActionType>
  }
export const ProductContext = createContext<IProductContext>({
    productData : [],
    productDispatch : ()=> {}
  });
  export const CategoryContext = createContext<string[]>([]);