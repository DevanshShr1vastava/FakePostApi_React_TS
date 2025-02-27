import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ModeToggle } from "../mode-toggle";
import { deleteProduct, IProductData } from "../utils/productApi";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { CategoryContext, ProductStoreContext } from "../utils/AppContexts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [category, setCategory] = useState<string[]>();

  const productStoreContext = useContext(ProductStoreContext);

  const categoryData = useContext(CategoryContext);

  
  const product = productStoreContext?.productData;

  const filteredData = selectedCategory
    ? product?.filter(
        (prod: IProductData) => prod.category === selectedCategory,
      )
    : product;

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    retry: false,
    onSuccess: (data) => {
      console.log("Product Successfully Deleted", data);
      toast("Product Deleted Successfully!");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleDelete = (id: number) => {
    productStoreContext?.productDelete(id);
    mutate(id);
  };

  useEffect(() => {
    if (categoryData) setCategory(categoryData);
  }, []);

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex justify-between items-center">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mr-4" variant="destructive">
              Category Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-200 dark:bg-gray-800 shadow-md rounded-md">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <DropdownMenuRadioItem
                value={""}
                onClick={() => setSelectedCategory(undefined)}
              >
                All
              </DropdownMenuRadioItem>
              {categoryData?.map((category, index) => (
                <DropdownMenuRadioItem key={index} value={category}>
                  {category}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredData?.map((prod: IProductData) => (
          <Card key={prod.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg truncate font-semibold">
                {prod.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-between">
              <img className="h-48 w-full object-contain" alt="productImageAlternateText" src={prod.image} />
              <div className="mt-4 flex flex-col gap-2 w-full">
                <Button variant="default" asChild>
                  <Link to={`/product/${prod.id}`}>Show Product</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to={`/edit/${prod.id}`}>Edit Product</Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Product</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will delete the
                        product.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(prod.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
            <CardFooter className="text-lg font-medium">
              <p>${prod.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
