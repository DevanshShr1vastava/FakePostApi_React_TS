import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ICartProducts, deleteCart, updateCart } from "../utils/cartAPI";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { useContext } from "react";
import { CartStoreContext, ProductStoreContext } from "../utils/AppContexts";

export interface IAddParams {
    userId : number,
    prodData : ICartProducts
}


const Cart = () => {
    
      
    const {mutate : deleteMutator} = useMutation({
    mutationKey : ["carts"],
    mutationFn : deleteCart,
    retry : false,
    onSuccess : ()=>{
        toast("Cart Deleted successfully");
    },
    onError : (error) =>{
        alert(error.message);
    }
    })
    
    const {mutate : updateMutator} = useMutation({
    mutationKey : ["carts"],
    mutationFn : ({userId, prodData}:IAddParams)=>updateCart(userId, prodData),
    onSuccess : ()=>{
        toast("Cart Updated successfully ");
    },
    onError : (error) =>{
        alert(error.message);
    }
    })

    const cartContext = useContext(CartStoreContext);
    const productContext = useContext(ProductStoreContext);

    const products = productContext?.productData;

    const cart = cartContext?.cartData;

   
    const handleUpdateCart = (userId : number, updatedProduct : ICartProducts)=>{
        updateMutator(
            {userId,prodData:updatedProduct},
            {
                onSuccess : ()=>{
                    cartContext?.cartUpdate(updatedProduct);
                }
            }
        )
        
    }

    const removeFromCart = (userId : number, productId : number)=>{
        cartContext?.removeFromCart(productId);
    }
    const clearCart = ()=>{
        deleteMutator();
        cartContext?.cartdelete();
    }
    
    return (
        <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Shopping Cart</h2>

      {cart?.products.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {
          cart?.products.map((item:ICartProducts) => 
            {
                const product = products?.find((prod)=>prod.id === item.productId);
                return product ? (
                    <Card key={product.id} className="flex items-center justify-between p-4">
                <CardHeader className="flex flex-row items-center gap-4">
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-contain rounded-lg" />
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Button size="icon" variant="outline" onClick={() => {
                        if(item.quantity === 1){
                            removeFromCart(1,item.productId);
                        }
                        handleUpdateCart(1, {
                            productId : item.productId, quantity : item.quantity  - 1
                        })
                    }}>
                    <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <Button size="icon" variant="outline" onClick={() => {
                         handleUpdateCart(1, {
                            productId : item.productId, quantity : item.quantity  + 1
                        })
                    }}>
                    <Plus className="w-4 h-4" />
                    </Button>
                </CardContent>
                <CardFooter className="flex items-center gap-4">
                    <p className="font-semibold">${(product.price * item.quantity).toFixed(2)}</p>
                    <Button variant="destructive" size="icon" onClick={() => removeFromCart(1,item.productId)}>
                    <Trash className="w-4 h-4" />
                    </Button>
                </CardFooter>
                </Card>
            ) : null
        })
        }
        <div className="flex justify-between items-center mt-4">
        <p className="text-xl font-bold">
            Total: ${cart?.products.reduce((total, item) => total + Number(products?.find((prod)=>prod.id === item.productId)!.price) * item.quantity, 0).toFixed(2)}
        </p>
        <Button variant="destructive" onClick={clearCart}>
            Clear Cart
        </Button>
        </div>
    </div>
      )}
    </div>
    );
};

export default Cart;
