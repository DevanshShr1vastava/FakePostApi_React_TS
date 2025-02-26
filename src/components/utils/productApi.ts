import axios from "axios";

export interface IProductData {
    id:number,
    title:string;
    price : number;
    description : string;
    image : string;
    category : string;
}

const prodInstance = axios.create({
    baseURL : "https://fakestoreapi.com/"
})

export const getAllProducts = async()=>{
    const response = await prodInstance.get('/products');
    const data = await response.data;

    return data;
}

export const getSingleProduct = async(id : number)=>{
    const response = await prodInstance.get(`/products/${id}`);
    const data = await response.data;

    return data;
}

export const limitProductData = async (limit : number)=>{
    const response = await prodInstance.get(`/products?limit=${limit}`);
    const data = await response.data;
    
    return data;
}

type orderType = "desc" | "asc";
export const sortProductData = async(order:orderType)=>{
    const response = await prodInstance.get(`/products?sort=${order}`);
    const data = await response.data;

    return data;
}

export const getCategories = async()=>{
    const response = await prodInstance.get('/products/categories');
    const data = await response.data;

    return data;
}

export const getCategoryProducts = async(category : string)=>{
    const response = await prodInstance.get(`/category/${category}`);
    const data = response.data;

    return data;
}

export const addNewProduct = async(newProduct:IProductData)=>{
    const response = await prodInstance.post('/products',{
        body : JSON.stringify(newProduct)
    });
    const data = await response.data;

    return data;
}

export const updateProduct = async(id:number,updatedProduct:IProductData)=>{
    const response = await prodInstance.patch(`/products/${id}`,{
        body: JSON.stringify(updatedProduct)
    });
    const data = response.data;
    
    return data;
}

export const deleteProduct = async(id : number)=>{
    const response = await prodInstance.delete(`/products/${id}`);
    const data = response.data;

    return data;
}