import React, { createContext, useEffect, useState } from "react";
import { IProduct } from "../interface/Product";
import {
  addAllProduct,
  DeleteProduct,
  GetAllProduct,
  UpdateProduct,
} from "../service/products";

type Props = {
  children: React.ReactNode;
};
export const productCT = createContext({} as any);
const ProductContext = ({ children }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  //hien thi
  useEffect(() => {
    (async () => {
      const data = await GetAllProduct();
      setProducts(data);
    })();
  }, []);
  const onDelete = async (id: number | string) => {
    try {
      if (confirm("Are you sure you want to delete")) {
        await DeleteProduct(id);

        alert("Xóa thành công");
        setProducts(products.filter((product: IProduct) => product.id !== id));
      }
    } catch (error) {}
  };

  const onSubmitUpdate = async (formData: IProduct, id: string | number) => {
    try {
      const data = await UpdateProduct(formData, id);
      const newproducts = products.map((product) =>
        product.id == id ? data : product
      );
      setProducts(newproducts);
      alert("Cập nhật thành công");
    } catch (error) {}
  };

  // add

  const onAdd = async (product: IProduct) => {
    try {
      const newPro = await addAllProduct(product);
      setProducts([...products, newPro]);
      alert("Thêm mới thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <productCT.Provider value={{ products, onDelete, onAdd, onSubmitUpdate }}>
      {children}
    </productCT.Provider>
  );
};

export default ProductContext;
