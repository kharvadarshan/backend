import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import {toast} from "react-toastify";
import { useToast } from "../../Notification/ToastProvider";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetIsLogin,resetRole } from '../../../slices/loginSlice';
import { resetUser } from '../../../slices/userAuthSlice';
import {
  CalendarCheck,
  Stethoscope,
  UserPlus,
  Phone,
  Users,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";





const Sidebar = () => {
  const toast = useToast();
  const menu = [
    { label: "Doctors List", icon: <Stethoscope className="w-5 h-5" /> },
    { label: "Add Doctor", icon: <UserPlus className="w-5 h-5" /> },
    { label: "All Contacts", icon: <Phone className="w-5 h-5" /> },
    { label: "All Patient", icon: <Users className="w-5 h-5" /> },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const logout = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        null,
        { withCredentials: true }
      );
      if (result.data.ok) {
        // toast.success("Logout Successfully...!", { position: "top-right" });
        toast("success","Logout Successfully...!");
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
    <>
      {/* Hamburger for mobile/tablet */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-800 text-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

{/*    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={closeSidebar}
        ></div>
      )} */}

      {/* Sidebar */}
        {/* <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-2xl p-4 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:flex`}
      >
       <div className="p-4">
          <h2 className="text-2xl font-bold">Hospital</h2>
         
           <nav className='flex flex-col space-y-3'>
            <NavLink to='/admin'  className="flex items-center text-xl p-2 rounded-lg hover:bg-gray-700"  onClick={closeSidebar} >
            <FontAwesomeIcon className=" mr-2  " icon={faClipboardList} />{" "}Appointments
            </NavLink>
            <NavLink to='/admin/doctorslist'  className="flex items-center text-xl p-2 rounded-lg hover:bg-gray-700"   >
            <FontAwesomeIcon className="mr-2  " icon={faUserDoctor} />{" "}Doctor List
            </NavLink>
            <NavLink to='/admin/adddoctor'  className="flex items-center text-xl p-2 rounded-lg hover:bg-gray-700"   >
            <FontAwesomeIcon className=" mr-2 " icon={faUserPlus} />{" "}Add Doctor
            </NavLink>
            <NavLink to='/admin/allcontacts'  className="flex items-center text-xl p-2 rounded-lg hover:bg-gray-700"   >
            <FontAwesomeIcon className=" mr-2 " icon={faAddressCard} />{" "}All Contact
            </NavLink>
            <NavLink to='/admin/allpatient'  className="flex items-center text-xl p-2 rounded-lg hover:bg-gray-700" >
            <FontAwesomeIcon className="mr-2 " icon={faHospitalUser} />{" "}All Patient
            </NavLink>
            <NavLink onClick={logout}  className="flex items-center text-xl p-2 rounded-lg hover:bg-gray-700">
            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />{" "}Logout
            </NavLink>
            
            </nav>
                      
        
        </div> 
      </div>*/}

      {/* Improved Mobile Overlay */}
       {isOpen && (
          <div
            onClick={toggleSidebar}
            className="md:hidden fixed inset-0  bg-opacity-50 z-30 transition-opacity duration-200"
          ></div>
        )}

   
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end mb-2">
          <button onClick={toggleSidebar}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col h-full w-full p-4">
          <h2 className="text-3xl font-bold mb-8 tracking-wide text-center">
            🏥 Hospital
          </h2>

          <ul className="space-y-2  text-base flex-1">
            <li>
              <Link
                to="/admin"
                onClick={closeSidebar}
                className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                <CalendarCheck className="w-5 h-5" />
                <span className="font-medium">Appointments</span>
              </Link>
            </li>

            {menu.map((item) => (
              <li key={item.label}>
                <Link
                  to={`/admin/${item.label.replace(/\s/g, "").toLowerCase()}`}
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="pb-5  md:pb-10 md:pt-3  lg:pb-0 border-t border-blue-500/50">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <UserCircle className="w-6 h-6 text-white/90" />
                <span className="text-sm font-semibold">Admin</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-red-600/70 bg-red-500/60 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

    </>
  );
};

export default Sidebar;









// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { resetIsLogin, resetRole } from "../../../slices/loginSlice";
// import { resetUser } from "../../../slices/userAuthSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// const Sidebar = () => {
//   const menu = ["Doctors List", "Add Doctor", "All Contacts", "All Patient"];
//   const [isOpen, setIsOpen] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeSidebar = () => {
//     setIsOpen(false);
//   };

//   const logout = async () => {
//     try {
//       const result = await axios.post(
//         `${import.meta.env.VITE_API_URL}/user/logout`,
//         null,
//         {
//           withCredentials: true,
//         }
//       );
//       if (result.data.ok) {
//         toast.success("Logout Successfully...!", {
//           position: "top-right",
//         });
//         // localStorage.removeItem("token");
//         dispatch(resetIsLogin());
//         dispatch(resetUser());
//         dispatch(resetRole());
//         navigate("/");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const style1 =
//     " left-[150px] bg-transparent text-2xl md:top-[94px] md:left-[200px]";
//   const style2 = " left-4  bg-blue-500 text-2xl p-[6px]";
//   const btnStyle = `${isOpen ? style1 : style2}`;

//   return (
//     <div className="min-h-screen">
//       {/* Hamburger Button for Mobile */}
//       <button
//         onClick={toggleSidebar}
//         className={`lg:hidden  absolute md:top-[86px] top-20 z-50  text-white rounded-full ${btnStyle}`}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <div
//         className={` min-h-[650px] z-50 inset-y-0 left-0 md:p-3 md:text-xl md:w-64 w-48 bg-blue-800 text-white transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
//       >
//         <div className="p-4">
//           <h2 className="text-2xl font-bold">Hospital</h2>
//           <ul className="mt-6">
//             <li>
//               <Link
//                 to="/admin"
//                 className="block p-2 hover:bg-blue-900 rounded"
//                 onClick={closeSidebar}
//               >
//                 Appointments
//               </Link>
//             </li>
//             {menu.map((item) => (
//               <li key={item} className="mb-2 ">
//                 <Link
//                   to={`/admin/${item.trim().replace(/\s/g, "").toLowerCase()}`}
//                   onClick={closeSidebar}
//                   className="block p-2 hover:bg-blue-900 rounded"
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//             <button
//               onClick={logout}
//               className="flex items-center p-3 text-gray-700 hover:bg-red-100 rounded-lg w-full"
//             >
//               <FontAwesomeIcon
//                 icon={faRightFromBracket}
//                 className="text-red-500 text-lg mr-3"
//               />
//               Logout
//             </button>
//           </ul>
//         </div>
//       </div>

//       {/* Improved Mobile Overlay */}
//       {/* {isOpen && (
//           <div
//             onClick={toggleSidebar}
//             className="md:hidden fixed inset-0  bg-opacity-50 z-30 transition-opacity duration-200"
//           ></div>
//         )} */}
//     </div>
//   );
// };

// export default Sidebar;

// const SideBar = () => {
//   return (
//     <div className="flex min-h-screen flex-col bg-gray-900 text-white p-3 w-64">
//       <div className="flex flex-col justify-between h-full">
//         <div>
//           <a className="flex items-center no-underline space-x-2 text-xl font-semibold">
//             <i className="bi bi-speedometer"></i>
//             <span >Brand</span>
//           </a>
//           <hr className="my-4 border-gray-700" />
//           <ul className="space-y-2">
//             <li>
//               <a href="/admin" className="flex no-underline items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
//                 <i className="bi bi-speedometer2"></i>
//                 <span className="hidden lg:inline">Dashboard</span>
//               </a>
//             </li>
//             <li>
//               <a href="/admin/appointments" className="flex no-underline items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
//                 <i className="bi bi-calendar-check"></i>
//                 <span className="hidden lg:inline">Appointments</span>
//               </a>
//             </li>
//             <li>
//               <a href="/admin/add-doctor" className="flex no-underline items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
//                 <i className="bi bi-plus-circle"></i>
//                 <span className="hidden lg:inline">Add Doctor</span>
//               </a>
//             </li>
//             <li>
//               <a href="/admin/doctors-list" className="flex no-underline items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
//                 <i className="bi bi-people"></i>
//                 <span className="hidden lg:inline">Doctors List</span>
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="relative">
//           <button className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-gray-800">
//             <i className="bi bi-person-circle"></i>
//             <span className="hidden lg:inline">Darshan</span>
//           </button>
//           <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg hidden">
//             <a className="block px-4 py-2 hover:bg-gray-700" href="#">Profile</a>
//             <a className="block px-4 py-2 hover:bg-gray-700" href="#">Settings</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
