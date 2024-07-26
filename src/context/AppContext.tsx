import { boolean } from "joi";
import React, { useReducer } from "react";

type Props = {
  children: React.ReactNode;
};
export const AppCT = React.createContext({} as any);
type TAppSate = {
  isLogin: boolean;
  isRegister: boolean;
  Message: { status: boolean; text?: string };
};
type TAppAction = {
  type: string;
  value: boolean;
  text?: string;
};

const reducer = (state: TAppSate, action: TAppAction) => {
  if (action.type === "register") {
    return { ...state, isLogin: action.value };
  } else if (action.type === "login") {
    return { ...state, isRegister: action.value };
  } else if (action.type === "message") {
    return { ...state, Message: { status: action.value, text: action.text } };
  } else {
    return state;
  }
};
const AppContext = ({ children }: Props) => {
  // const [appState, dispatch] = useReducer("hàm xử lí action ", giá trị khởi tạo );

  const [appState, dispatch] = useReducer(reducer, {
    isLogin: false,
    isRegister: false,
    Message: { status: false, text: "" },
  });
  return (
    <AppCT.Provider value={{ appState, dispatch }}>{children}</AppCT.Provider>
  );
};

export default AppContext;
