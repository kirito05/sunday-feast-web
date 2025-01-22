import React, { Suspense , use} from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductPageCard from "@/components/Product/ProductPageCard";



function ProductDetailsPage({params}) {
    const {ProductDetails} = params;
  return (
    <Suspense fallback = {<Skeleton />}>
      <ProductPageCard />
    </Suspense>
  );
}

export default ProductDetailsPage;
