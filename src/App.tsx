import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import EditProduct from "./Components/EditProduct";
import { formType, IProduct } from "./interface/Product";
import { useForm } from "react-hook-form";
import { Route, Routes, useRoutes } from "react-router-dom";
import home from "./Components/home";
import detail from "./Components/detail";

import Products from "./Components/products";

import Client from "./layout/client";
import Dashboard from "./layout/dashboard";

import ProductContext from "./context/ProductContext";
import AddProductElement from "./Components/AddProduct";
import ProductList from "./Components/Product-list";
import Home from "./Components/home";

function App() {
  //c2
  const routes = useRoutes([
    {
      path: "",
      element: (
        <ProductContext>
          <Client />
        </ProductContext>
      ),
      children: [
        { path: "", element: <Home /> },
        {
          path: "products",
          element: <ProductList />,
        },
        {
          path: "product/add",
          element: <AddProductElement />,
        },
        {
          path: "product/edit/:id",
          element: <EditProduct />,
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
