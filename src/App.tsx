import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import { formType, IProduct } from "./interface/Product";
import { useForm } from "react-hook-form";
import { Route, Routes, useRoutes } from "react-router-dom";
import home from "./Components/home";
import detail from "./Components/detail";

import Products from "./Components/products";
import Home from "./Components/home";
import { GetAllProduct, UpdateProduct } from "./service/products";
import Client from "./layout/client";
import Dashboard from "./layout/dashboard";
import ProductList from "./Components/Product-list";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { register, handleSubmit, reset } = useForm<formType>();
  const [flag, setFlag] = useState<string | number>(0);
  const [click, setClick] = useState<boolean>(false);
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
        const { data } = await axios.delete(
          `http://localhost:3000/products/${id}`
        );
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

  //c2
  const routes = useRoutes([
    {
      path: "",
      Component: Client,
      children: [
        { path: "", element: <Home products={products} /> },
        {
          path: "products",
          element: <ProductList onDelete={onDelete} products={products} />,
        },
        {
          path: "product/add",
          element: <AddProduct title="Thêm mới sản phẩm" onAdd={onAddSP} />,
        },
        {
          path: "product/edit/:id",
          element: (
            <EditProduct title="Sửa sản phẩm" onUpdate={onSubmitUpdate} />
          ),
        },

        { path: "detail", Component: detail },
      ],
    },
    {
      path: "dashboard",
      Component: Dashboard,
      children: [{ path: "product", Component: Products }],
    },
  ]);
  return routes;
  //c1
  // return (
  // <Routes>
  //   <Route path="/" element={<Home products={products} />} />
  //   <Route path="detail" Component={detail} />
  //   <Route path="dashboard" Component={dashboard}>
  //     <Route path="product" Component={Products} />
  //   </Route>
  // </Routes>

  // );
}

export default App;
