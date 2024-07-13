import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";

type Props = {
  title: string;
  onAdd: (dataproduct: formType) => void;
};
type formType = Pick<IProduct, "title" | "price" | "image" | "category">;
const AddProduct = ({ onAdd }: Props) => {
  const { register, handleSubmit, reset } = useForm<formType>();
  const onSubmitadd = async (formData: any) => {
    onAdd(formData);
    reset(); //reset lại form sau khi thêm
  };

  return (
    <div className="div1">
      <form onSubmit={handleSubmit(onSubmitadd)}>
        <h2 className="flex items-center justify-center text-2xl">
          Thêm Sản Phẩm
        </h2>
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
          <button type="submit">Thêm Sản Phẩm</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
