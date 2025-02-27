import { useContext } from "react";
import { ModeToggle } from "../mode-toggle";
import { useParams } from "react-router-dom";
import { ProductContext } from "../utils/AppContexts";

const ProductDetail = () => {
  const { id } = useParams();
  const productContext = useContext(ProductContext);

  const { productData: product } = productContext;

  const productData =
    product.length > 0 ? product.find((prod) => prod.id === Number(id)) : null;

  if (!productData) {
    return <h1>Loading Product Details....</h1>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="w-full bg-card shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-mono font-bold bg-card">
            Product Description
          </h1>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="bg-card p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-[460px] rounded-lg bg-muted">
                <img
                  className="w-full h-full object-contain rounded-lg"
                  src={productData.image}
                  alt="Product Image"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button className="flex-grow bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {productData.title}
              </h2>

              <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-300 mb-4">
                <div>
                  <span className="font-bold">Price:</span> ${productData.price}
                </div>
                <div>
                  <span className="font-bold">Availability:</span> In Stock
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {productData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
