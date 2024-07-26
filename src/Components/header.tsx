import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppCT } from "../context/AppContext";
import Login from "./Login";
import Register from "./register";
import Message from "./message";

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
                  dispatch({ type: "register", value: false });
                  dispatch({ type: "login", value: true });
                }}
                className="  py-4 block text-white"
              >
                Đăng kí
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch({ type: "login", value: false });
                  dispatch({ type: "register", value: true });
                }}
                className=" py-4 block text-white"
              >
                Đăng Nhâp
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {appState.isLogin && <Login />}
      {appState.isRegister && <Register />}
      {appState.Message.status && <Message />}
    </header>
  );
};

export default Header;
