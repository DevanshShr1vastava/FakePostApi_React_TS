import axios from "axios";

export interface ICartProducts {
  productId: number;
  quantity: number;
}

export interface ICartData {
  id: number;
  userId: number;
  date: Date;
  products: ICartProducts[];
  __v: number;
}

const instance = axios.create({
  baseURL: "https://fakestoreapi.com/carts",
});

export const getUserCart = async (userId: number): Promise<ICartData> => {
  try {
    const response = await instance.get(`/user/${userId}`);
    const cartData = await response.data;
    return cartData;
  } catch (error) {
    console.error(error);
    return {
      id: 0,
      userId: 1,
      date: new Date(),
      products: [],
      __v: 0,
    };
  }
};

export const addToCart = async (userId: number, prodData: ICartProducts) => {
  const response = await instance.post("/", {
    body: JSON.stringify({
      userId,
      date: new Date(),
      products: prodData,
    }),
  });
  const responseData = await response.data;

  return responseData;
};

export const updateCart = async (userId: number, prodData: ICartProducts) => {
 
    const response = await instance.patch(`/${userId}`, {
        userId,
        date: new Date(),
        products: prodData,
    });
    const responseData = await response.data;
    
    return responseData;
  
};

export const deleteCart = async () => {
  const response = await instance.delete("/6");
  const responseData = await response.data;
  return responseData;
};
