import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/header";

type Props = {};

const Client = (props: Props) => {
  return (
    <div className="max-w-[1240px] mx-auto">
      <Header></Header>
      <Outlet />
    </div>
  );
};

export default Client;
