import React, { Suspense, use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductPageCard from "@/components/Product/ProductPageCard";
import axios from "axios";
import { IndianRupeeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/navbar/NavBar";

const getProductDetails = async (productId) => {
  const response = await axios.get(
    `http://localhost:5000/v1/products/product/:${productId}`
  );
  return response.data[0];
};

export default async function ProductDetailsPage({ params }) {
  const slug = (await params).slug;
  const productDetails = await getProductDetails(slug);

  return (
    <Suspense fallback={<Skeleton />}>
      <NavBar />
      <div className="xl:h-[80vh] mb:h-[90vh] w-full mb:p-6 xl:p-0 flex xl:justify-center mb:flex-col gap-4 mb:items-center relative">
        <ProductPageCard
          title={productDetails.name}
          description={productDetails.description}
          price={productDetails.price}
          weight={"1kg"}
        />
        <div className="xl:hidden mb:flex relative p-3 w-[18em] mt-2 flex-col">
          <div className="p-3 absolute -top-1 left-0">
            <h1 className="text-2xl">Product Details</h1>
            <p>{productDetails.description}</p>
          </div>
          <div className="flex flex-row gap-[8em] absolute top-[6em] left-0">
            <span className="p-3 text-2xl">
              <h1 className="text-2xl">Price</h1>
              <p className="flex flex-row items-center"><IndianRupeeIcon className="size-4" />{productDetails.price}</p>
            </span>
            <span className="p-3 text-2xl">
              <h1>Weight</h1>
              <p>1kg</p>
            </span>
          </div>
        </div>
        <div className="xl:hidden mb:absolute bottom-0 left-0 w-full flex justify-center">
            <Button className="self-center hover:bg-red-300 hover:scale-105 text-xl p-[1.2em]"> Add to Cart </Button>
          </div>
      </div>
    </Suspense>
  );
}
