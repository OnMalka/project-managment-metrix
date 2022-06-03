import { createContext, useReducer } from "react";
import loginReducer, { loginDataInitialState } from "../reducers/loginReducer";
import { getLoginDataFromSessionStorage } from "../sessionStorage/sessionStorage";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loginData, dispatchLoginData] = useReducer(
    loginReducer,
    getLoginDataFromSessionStorage() || loginDataInitialState
  );

  return (
    <LoginContext.Provider value={{ loginData, dispatchLoginData }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
