import Products from "../Components/products";
import instance from "../config/axios";
import { formType, IProduct } from "../interface/Product";

export const GetAllProduct = async () => {
  try {
    const { data } = await instance.get("products");
    return data;
  } catch {}
};

export const GetProductById = async (id: string | number) => {
  try {
    const { data } = await instance.get(`products/${id}`);
    return data;
  } catch {}
};

export const AddProduct = async (product: formType) => {
  try {
    const { data } = await instance.post("products", product);
    return data;
  } catch {}
};

export const UpdateProduct = async (
  productData: IProduct,
  id: string | number
) => {
  try {
    const { data } = await instance.put(`products/${id}`, productData);
    return data;
  } catch {}
};

export const DeleteProduct = async (id: string | number) => {
  try {
    const { data } = await instance.delete(`product/${id}`);
    return data;
  } catch {}
};
