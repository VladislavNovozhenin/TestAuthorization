import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import Motion from "../../components/Motion/Motion";
import { KeyIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleOut = () => {
    dispatch(logout());
    navigate("/registration");
  };

  return (
    <Motion>
      <>
        <h2 className="text-2xl mb-5 font-semibold text-center">Профиль</h2>
        <ul style={{ display: "flex", flexDirection: "column" }}>
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              border: "1px solid #c4c4c4",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <div className="flex items-center mb-1">
              <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-lg">Ваш Email</span>
            </div>

            <span className="text-white">{user?.email}</span>
          </li>
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              border: "1px solid #c4c4c4",
              borderRadius: "8px",
            }}
          >
            <div className="flex items-center mb-1">
              <KeyIcon className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-lg">Ваш ID</span>
            </div>

            <span className="text-white">{user?.id}</span>
          </li>
        </ul>
        <button
          className="mt-auto w-full rounded-lg border border-gray-400 px-4 py-2 text-lg font-medium transition hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleOut}
        >
          Выйти
        </button>
      </>
    </Motion>
  );
};

export default Profile;
