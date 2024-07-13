import instance from "../config/axios";
import { IProduct } from "../interface/Product";

export const GetAllProduct = async () => {
  try {
    const { data } = await instance.get("products");
    return data;
  } catch {}
};

export const GetProductById = async (id: string | number) => {
  try {
    const { data } = await instance.get(`product/${id}`);
    return data;
  } catch {}
};

export const AddProduct = async (productData: IProduct) => {
  try {
    const { data } = await instance.post("products", productData);
    return data;
  } catch {}
};

export const EditProduct = async (
  productData: IProduct,
  id: string | number
) => {
  try {
    const { data } = await instance.put(`product/${id}`, productData);
    return data;
  } catch {}
};

export const DeleteProduct = async (id: string | number) => {
  try {
    const { data } = await instance.delete(`product/${id}`);
    return data;
  } catch {}
};
