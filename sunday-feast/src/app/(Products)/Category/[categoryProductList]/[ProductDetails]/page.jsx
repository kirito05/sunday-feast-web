import React, { Suspense, use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductPageCard from "@/components/Product/ProductPageCard";
import axios from "axios";

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
      <div>{slug}</div>
      <ProductPageCard
        title={productDetails.name}
        description={productDetails.description}
        price={productDetails.price}
        weight={"1kg"}
      />
    </Suspense>
  );
}
