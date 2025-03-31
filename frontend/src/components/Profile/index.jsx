import { NavLink, useNavigate } from "react-router-dom";
import { Route, Routes, Outlet } from "react-router-dom";
import EditProfile from "./EditProfile.jsx";
import Appointments from "./MyAppointment/index.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarWeek, faPenToSquare, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetIsLogin, resetRole } from "../../slices/loginSlice.jsx";
import { resetUser } from "../../slices/userAuthSlice.jsx";
import { toast } from "react-toastify";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        "http://localhost:5001/user/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (result.data.ok) {
        toast.success("Logout Successfully...!", { position: "top-right" });
        localStorage.removeItem("token");
        dispatch(resetIsLogin());
        dispatch(resetUser());
        dispatch(resetRole());
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className={`md:hidden p-4 absolute ${isSidebarOpen ? "left-48" : "left-0"} top-16  z-50 text-gray-700 rounded`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div className={`absolute min-h-[650px] md:relative w-64 bg-cyan-300 shadow-md flex flex-col items-center text-center p-6 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}> 
        <img
          src="https://randomuser.me/api/portraits/men/94.jpg"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-300 mb-4"
          alt="User Avatar"
        />
        <h1 className="text-xl font-semibold text-gray-700">John Doe</h1>
        <hr className="my-4 w-full border-gray-300" />
        
        {/* Navigation Links */}
        <div className="flex flex-col w-full space-y-2">
          <NavLink
            to="/profile"
            className="flex items-center p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-blue-500 text-lg mr-3" />
            Edit Profile
          </NavLink>
          <NavLink
            to="/profile/myappointment"
            className="flex items-center p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
          >
            <FontAwesomeIcon icon={faCalendarWeek} className="text-blue-500 text-lg mr-3" />
            My Appointments
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center p-3 text-gray-700 hover:bg-red-100 rounded-lg w-full"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-red-500 text-lg mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white shadow-md ">
        <Routes>
          <Route path="/" element={<EditProfile />} />
          <Route path="myappointment" element={<Appointments />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;