import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // when the application loads ask are you logged in or not
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{/* <Outlet /> */}</main>
        <Footer />
      </div>
    </div>
  ) : (
    <div> Loading......</div>
  );
}

export default App;
