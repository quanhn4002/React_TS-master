import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";

type Props = {
  product: IProduct;
  onUpdate: (data: any) => void;
  setFlag: (id: string | number) => void;
};

const EditProduct = ({ product, onUpdate, setFlag }: Props) => {
  type formType = Pick<IProduct, "title" | "price" | "image" | "category">;
  const { register, handleSubmit, reset } = useForm<formType>({
    defaultValues: {
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
    },
  });
  const onSubmitUpdate = (product: formType) => {
    onUpdate(product);
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
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setFlag(0)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
