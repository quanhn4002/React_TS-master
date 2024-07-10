import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";

type Props = {
  product: IProduct;
  setProducts: (products: IProduct[]) => void;
  products: IProduct[];
  setFlag: (flag: number | string) => void;
  //
};

type formType = Pick<IProduct, "title" | "price" | "image" | "category">;

const EditProduct = ({ product, setProducts, products, setFlag }: Props) => {
  const { register, handleSubmit, reset } = useForm<formType>({
    defaultValues: {
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    },
  });

  const onSubmitUpdate = async (formData: formType) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        formData
      );
      const newProducts = products.map((p: IProduct) =>
        p.id === product.id ? data : p
      );
      setProducts(newProducts);
      setFlag(0);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg">
      <form onSubmit={handleSubmit(onSubmitUpdate)} className="form">
        <div className="form-group">
          <input
            className="form-control input"
            type="text"
            {...register("title")}
            placeholder="Title"
          />
          <input
            className="form-control input"
            type="text"
            {...register("price")}
            placeholder="price"
          />
          <input
            className="form-control input"
            type="text"
            {...register("image")}
            placeholder="image"
          />
          <input
            className="form-control input"
            type="text"
            {...register("category")}
            placeholder="category"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setFlag(0)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
