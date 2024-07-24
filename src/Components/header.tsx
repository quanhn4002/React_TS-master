import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppCT } from "../context/AppContext";
import Login from "./Login";
import Register from "./register";

type Props = {};

const Header = (props: Props) => {
  const { appState, dispatch } = useContext(AppCT);
  return (
    <header className="bg-slate-500">
      <div className="max-w-[1200px] mx-auto">
        <nav>
          <ul className="flex gap-5">
            <li>
              <Link className="a py-4 block text-white" to={"/"}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link className="a py-4 block text-white" to={"/products"}>
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                className=" a py-4 block text-white"
                to="/dashboard/product"
              >
                Liên hệ
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch({ type: "register", value: true });
                  dispatch({ type: "login", value: false });
                }}
                className=" block text-white"
              >
                Đăng ký
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch({ type: "login", value: true });
                  dispatch({ type: "register", value: false });
                }}
                className=" block text-white"
              >
                Đăng nhập
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {appState.isLogin && <Login />}
      {appState.isRegister && <Register />}
    </header>
  );
};

export default Header;
