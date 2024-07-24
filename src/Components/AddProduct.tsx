import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { productCT } from "../context/ProductContext";

const AddProductElement = () => {
  const { onAdd } = useContext(productCT);
  const { register, handleSubmit, reset } = useForm<IProduct>();
  const navigate = useNavigate();
  const onSubmitadd = async (formData: IProduct) => {
    onAdd(formData);
    navigate("/products");
    reset(); //reset lại form sau khi thêm
  };

  return (
    <div>
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

export default AddProductElement;
