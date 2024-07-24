import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/header";
import Footer from "../Components/Footer";

type Props = {};
const Client = (props: Props) => {
  return (
    <div className="max-w-[1240px] mx-auto">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Client;
