import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import { IProduct } from "./interface/Product";
import { useForm } from "react-hook-form";
import { Route, Routes } from "react-router-dom";
import home from "./Components/home";
import detail from "./Components/detail";
import dashboard from "./Components/dashboard";
import Products from "./Components/products";
import Home from "./Components/home";
import { GetAllProduct } from "./service/products";

function App() {
  type formType = Pick<IProduct, "title" | "price" | "image" | "category">;
  const [products, setProducts] = useState<IProduct[]>([]);
  const { register, handleSubmit, reset } = useForm<formType>({});
  const [flag, setFlag] = useState<string | number>(0); //
  //hien thi
  useEffect(() => {
    (async () => {
      const data = await GetAllProduct();
      setProducts(data);
    })();
  }, []);
  //delete
  const onDelete = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete")) {
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert("Xóa thành công");
        setProducts(products.filter((product: IProduct) => product.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitUpdate = async (formData: any) => {
    // console.log(data);
    try {
      const { data } = await axios.put(
        "http://localhost:3000/products/" + flag,
        formData
      );
      //  console.log(data);
      console.log(flag);
      const newproduct = products.map((product: IProduct) => {
        if (product.id == flag) {
          product = data;
        }
        return product;
      });
      setProducts(newproduct);
      setFlag(0);
      alert("Cập nhật thành công");
      // reset()
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = (id: number | string) => {
    setFlag(id);
    const product = products.filter((p: IProduct) => p.id === id);
    reset({
      title: product[0].title,
      image: product[0].image,
      price: product[0].price,
      category: product[0].category,
    });
  };
  // add

  const onAddSP = async (dataproduct: formType) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        dataproduct
      );
      setProducts([...products, data]);
      alert("Thêm mới thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home products={products} />} />
      <Route path="detail" Component={detail} />
      <Route path="dashboard" Component={dashboard}>
        <Route path="product" Component={Products} />
      </Route>
    </Routes>
  );
}

export default App;
