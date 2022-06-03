import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginRoute from "./routers/LoginRoute";
import Login from "./pages/Login";
import PrivateRoute from "./routers/PrivateRoute";
import LoginContextProvider from "./context/LoginContext";
import PageNotFound from "./pages/PageNotFound";
import MyProjects from "./pages/MyProjects";

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Header title={"My Projects"} />
        <Routes>
          <Route path="/" element={<Navigate to="/my-projects" />} />
          <Route
            path="/my-projects"
            element={
              <PrivateRoute>
                <MyProjects />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
