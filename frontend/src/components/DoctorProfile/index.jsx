import { NavLink, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCalendarWeek,
  faPenToSquare,
  faFileMedical,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import EditProfile from "./EditProfile";
import ManageSchedule from "./ManageSchedule";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetIsLogin, resetRole } from "../../slices/loginSlice";
import Reports from "./Reports";
import BookedAppointment from "./BookedAppointment";
import { toast } from "react-toastify";
import { resetUser } from "../../slices/userAuthSlice";
import { resetDoctor } from "../../slices/doctorSlice";

const DoctorProfile = () => {
  const activeUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [photo,setPhoto]=useState(`http://localhost:5001${activeUser.doctor?.image}`);
  
  useEffect(()=>{
    if(activeUser?.doctor?.image)
    {
      setPhoto(`http://localhost:5001${activeUser.doctor?.image}`);
    }
  },[photo]);
  console.log(photo);

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
        dispatch(resetDoctor());
        dispatch(resetRole());
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row  min-h-screen">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className={`md:hidden p-4 absolute ${isSidebarOpen ? "left-[230px] text-blue-500" : "left-0  top-6 "} z-50  rounded`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`absolute min-h-screen md:relative  w-64 bg-gray-600 text-white p-4 z-40 transform ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        } md:translate-x-0  transition-transform duration-300 ease-in-out md:flex md:flex-col `}
      >
        <div className="flex flex-col items-center">
          <img
            src={photo}
            className="w-24 h-24 bg-gray-300 rounded-full mb-4"
            alt="Profile"
          />
          <h1 className="text-xl font-bold">{activeUser.doctor?.name}</h1>
          <hr className="my-4 border-gray-700 w-full" />
        </div>
        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/doctorprofile/editprofile"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-blue-400 mr-2"
            />{" "}
            Edit Profile
          </NavLink>
          <NavLink
            to="/doctorprofile/bookings"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon
              icon={faCalendarWeek}
              className="text-blue-400 mr-2"
            />{" "}
            Bookings
          </NavLink>
          <NavLink
            to="/doctorprofile/manageschedule"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faBell} className="text-blue-400 mr-2" />{" "}
            Notifications
          </NavLink>
          <NavLink
            to="/doctorprofile/reports"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon
              icon={faFileMedical}
              className="text-blue-400 mr-2"
            />{" "}
            Reports
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center p-2 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-blue-400 mr-2"
            />{" "}
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4  mt-16 md:mt-0">
        <Routes>
          <Route path="editprofile"   element={<EditProfile doctor={activeUser.doctor}  />} />
          <Route path="bookings" element={<BookedAppointment doctor={activeUser.doctor}/>} />
          <Route path="manageschedule" element={<ManageSchedule />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorProfile;