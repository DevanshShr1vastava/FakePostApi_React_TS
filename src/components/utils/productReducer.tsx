import { IProductData } from "./productApi";

interface IProductAdd {
  type: "AddProduct";
  newProduct: IProductData;
}

interface IProductDelete {
  type: "DeleteProduct";
  id: number;
}

interface IProductUpdate {
  type: "UpdateProduct";
  updatedProduct: IProductData;
}

interface IProductList {
  type: "AddProductList";
  productData: IProductData[];
}

export type ActionType =
  | IProductAdd
  | IProductDelete
  | IProductUpdate
  | IProductList;

export const productReducer = (
  state: IProductData[],
  action: ActionType,
): IProductData[] => {
  switch (action.type) {
    case "AddProduct":
      return [...state, action.newProduct];
    case "DeleteProduct":
      return state.filter((prod) => prod.id !== action.id);
    case "UpdateProduct":
      return state.map((prod) =>
        prod.id === action.updatedProduct.id
          ? (prod = action.updatedProduct)
          : prod,
      );
    case "AddProductList":
      return [...action.productData];
    default:
      return state;
  }
};
