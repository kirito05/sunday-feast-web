import React from "react";

function ProductDetailsPage({params}) {
    const {ProductDetails} = params;
  return (
    <div>
        <div>Home/{ProductDetails}</div>
      <h1>Product Details Page</h1>
    </div>
  );
}

export default ProductDetailsPage;
