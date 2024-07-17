import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interface/Product";
import { GetProductById } from "../service/products";

type Props = {
  title: string;
  onUpdate: (data: IProduct, id: number | string) => void;
};

const EditProduct = ({ title, onUpdate }: Props) => {
  const { register, handleSubmit, reset } = useForm<IProduct>();
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    (async () => {
      const product = await GetProductById(param.id as string | number);
      reset({
        title: product.title,
        image: product.image,
        price: product.price,
        category: product.category,
      });
    })();
  }, []);
  const onSubmitUpdate = async (product: IProduct) => {
    await onUpdate(product, param.id as string | number);
    navigate("/products");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitUpdate)}>
        <div className="form-group  ">
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
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
