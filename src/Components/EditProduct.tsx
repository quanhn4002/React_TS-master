import React, { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interface/Product";
import { GetProductById } from "../service/products";
import { productCT } from "../context/ProductContext";

const EditProduct = () => {
  const { onSubmitUpdate } = useContext(productCT);
  const { register, handleSubmit, reset } = useForm<IProduct>();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const product = await GetProductById(id as string | number);
      reset({
        title: product.title,
        image: product.image,
        price: product.price,
        category: product.category,
      });
    })();
  }, []);

  const onSubmit = async (product: IProduct) => {
    await onSubmitUpdate(product, id as string | number);
    navigate("/products");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
