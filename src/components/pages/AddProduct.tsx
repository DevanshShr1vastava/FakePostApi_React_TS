import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { addNewProduct, IProductData } from "../utils/productApi";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { useContext } from "react";
import { Button } from "../ui/button";
import { CategoryContext, ProductContext } from "../utils/AppContexts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const formSchema = z.object({
  title : z.string().min(2,{
    message : "Enter Product Title"
  }),
  description : z.string().min(2,{
    message : "Enter Product Description"
  }),
  image : z.string().min(2,{
    message : "Enter Product Image url"
  }),
  category : z.string().min(2,{
    message : "Select Product Category"
  }),
  price : z.string().min(2,{
    message : "Enter Product Price"
  })
});

const AddProduct = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : {
      title : "",
      description : "",
      image : "",
      category : "",
      price : ""
    }
  })

  const productContext = useContext(ProductContext);
  const categoryData = useContext(CategoryContext);

  const {productData,productDispatch} = productContext;

  const {mutate} = useMutation({
    mutationFn : (newProduct:IProductData)=> addNewProduct(newProduct),
    retry : false,
    onSuccess:(data)=>{
      toast("Product Added Successfully",data);
      navigate("/");
      console.log("Product added successfully", data);
    },
    onError : (error)=>{
      alert(error.message);
    }
  })
  


  const onSubmit = (values : z.infer<typeof formSchema>)=>{
    const newProduct:IProductData = {
      id : productData.length + 1,
      title : values.title,
      description : values.description,
      image : values.image,
      category : values.category,
      price : Number(values.price)
    }  
    productDispatch({type:"AddProduct",newProduct})
    mutate(newProduct);
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <ModeToggle />
      </div>
      
      <div className="flex w-full justify-center items-center min-h-screen px-4">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="bg-card p-6 rounded-lg shadow-md w-full max-w-4xl space-y-6"
          >
            <h2 className="text-xl font-semibold text-center text-primary">Add New Product</h2>
    
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product title" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
    
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product description" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
    
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryData?.map((category, index) => (
                          <SelectItem key={index} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
    
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product image URL" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
    
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product price" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
    
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
