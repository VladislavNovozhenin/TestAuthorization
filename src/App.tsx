import { Route, Routes, useNavigate } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { fetchProfile } from "./request";
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isProfileLoading = useAppSelector(
    (state) => state.auth.isProfileLoading
  );
  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token)).then((errorMesagge) => { //Если есть токен делаем запрос на /profile
        if (errorMesagge) {
          navigate("/registration");
        } else {
          navigate("/profile");
        }
      });
    } else {
      navigate("/registration");
    }
  }, [token, dispatch]);

  if (isProfileLoading) return <Skeleton />; // Пока идет запрос рисуем скелетон

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
