import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Header = ({ title }) => {
  const { loginData } = useContext(LoginContext);

  return (
    <div>
      {loginData?.userName && <h1>{loginData.userName}</h1>}
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
