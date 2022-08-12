import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userAPI from './services/userAPI';
import Toast from "./components/Toast";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Admin from "./pages/Admin";
import Menu from "./components/Menu";

const users = new userAPI();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [msg, setMsg] = useState("Error. Please try again");
  const [aType, setAType] = useState("error");

  useEffect(() => {
    async function initApp() {
      try{
        const isLoggedIn = await users.checkLogin();
        setLoggedIn(isLoggedIn);
      } catch (err) {
        triggerAlert("error", err.message);
      }
    }
    initApp();
  }, []);

  const triggerAlert = (type, message) => {
    setAType(type);
    setMsg(message);
    setToastOpen(true);
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    window.location.assign("/");
  }
  
  const routes = [
    { path: "/", element: <Login triggerAlert={triggerAlert}/> },
    { path: "/Customer", element: <Customer triggerAlert={triggerAlert}/> },
    { path: "/Admin", element: <Admin triggerAlert={triggerAlert}/> }
  ];

  const routeComponents = routes.map(({ path, element }, key) => (
    <Route exact path={path} element={element} key={key} />
  ));

  return (
    <React.Fragment>
      <Menu loggedIn = {loggedIn} logOut={logOut} />
        <BrowserRouter>
          <Routes>{routeComponents}</Routes>
        </BrowserRouter>
      <Toast
          alertType={aType}
          message={msg}
          open={toastOpen}
          setOpen={setToastOpen}
      />
    </React.Fragment>
  );
}

export default App;
