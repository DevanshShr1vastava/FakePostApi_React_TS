import { createContext } from "react";
import { IProductStore, ICartStore } from "./AppStores";


export const CategoryContext = createContext<string[]>([]);

export const ProductStoreContext = createContext<IProductStore | null>(null);
export const CartStoreContext = createContext<ICartStore | null>(null);
