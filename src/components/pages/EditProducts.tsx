import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addNewProduct, IProductData } from "../utils/productApi";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useContext } from "react";
import { Button } from "../ui/button";
import { CategoryContext, ProductContext } from "../utils/AppContexts";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ModeToggle } from "../mode-toggle";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Enter Product Title",
  }),
  description: z.string().min(2, {
    message: "Enter Product Description",
  }),
  image: z.string().min(2, {
    message: "Enter Product Image url",
  }),
  category: z.string().min(2, {
    message: "Select Product Category",
  }),
  price: z.string().min(2, {
    message: "Enter Product Price",
  }),
});

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryData = useContext(CategoryContext);
  const productContext = useContext(ProductContext);

  const { productData, productDispatch } = productContext;

  const productDetails =
    productData.length > 0
      ? productData.find((prod) => prod.id === Number(id))
      : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: productDetails?.title,
      description: productDetails?.description,
      image: productDetails?.image,
      category: productDetails?.category,
      price: String(productDetails?.price),
    },
  });

  const { mutate } = useMutation({
    mutationFn: (newProduct: IProductData) => addNewProduct(newProduct),
    retry: false,
    onSuccess: (data) => {
      toast("Product Modified Successfully!");
      navigate("/");
      console.log("Product added successfully", data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedProduct: IProductData = {
      id: Number(productDetails?.id),
      title: values.title,
      description: values.description,
      image: values.image,
      category: values.category,
      price: Number(values.price),
    };
    productDispatch({
      type: "UpdateProduct",
      updatedProduct,
    });
    mutate(updatedProduct);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <h2>Edit Product</h2>
      </div>
      <div className="flex justify-between items-center flex-row-reverse">
        <ModeToggle />
      </div>

      <div className="flex w-full justify-center items-center min-h-screen px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-card p-6 rounded-lg shadow-md w-full max-w-4xl space-y-6"
          >
            <h2 className="text-xl font-semibold text-center text-primary">
              Edit Product
            </h2>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product title"
                        {...field}
                        className="w-full"
                      />
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
                      <Input
                        placeholder="Enter product description"
                        {...field}
                        className="w-full"
                      />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                      <Input
                        placeholder="Enter product image URL"
                        {...field}
                        className="w-full"
                      />
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
                      <Input
                        placeholder="Enter product price"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProducts;
