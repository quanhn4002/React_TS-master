import React, { useContext } from "react";

import ProductItem from "./productItem";
import { IProduct } from "../interface/Product";
import { productCT } from "../context/ProductContext";

const Home = () => {
  const { products } = useContext(productCT);
  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-[36px] text-center">Trang chủ</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product: IProduct) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
