import React from "react";
import axios from "axios";
import Cart from "@/components/Cart/Cart";

import { ArrowLeftCircle } from "lucide-react";

// const getCartItems = async () =>{
//   const response = await axios.get('http://localhost:5000/v1/cart/get-cart-items')
//   console.log(response)
// }

async function page() {
  // const cart = await getCartItems()
  return (
    <article className=" h-[100vh] p-5 flex xl:items-center xl:justify-center relative">
      <Cart/>
      <ArrowLeftCircle className="absolute xl:size-12 mb:size-6 top-12 xl:left-10 mb:left-5" />
    </article>
  );
}

export default page;
