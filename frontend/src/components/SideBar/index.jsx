<<<<<<< HEAD
=======


>>>>>>> 12a40bb40651788042d3d115ef10c2f87fa0c8b8
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menu = ["Dashboard", "Appointments", "Doctors List", "Add Doctor", "All Contacts"];
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const style1 = " left-[150px] bg-transparent text-2xl md:top-[94px] md:left-[200px]";
  const style2 = " left-4  bg-blue-500 text-2xl p-[6px]";
  const btnStyle = `${isOpen ? style1 : style2}`

  return (
<<<<<<< HEAD
    
      <div>
        
=======
    <div>
      <div className="flex">
    <div className=''>
      <div className="flex justify-start">

>>>>>>> 12a40bb40651788042d3d115ef10c2f87fa0c8b8
      {/* Hamburger Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden  absolute md:top-[86px] top-20 z-50  text-white rounded ${btnStyle}`}>
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`min-h-screen inset-y-0 left-0 md:p-3 md:text-xl md:w-64 w-48 bg-blue-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">Hospital</h2>
          <ul className="mt-6">
            {
              menu.map(
                (item) => (
                  <li key={item} className="mb-2 ">
                    <Link
                     to={`/admin/${item.trim().replace(/\s/g, "").toLowerCase()}`}
                      onClick={closeSidebar} 
                      className="block p-2 hover:bg-blue-900 rounded"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )
            }
<<<<<<< HEAD
=======

>>>>>>> 12a40bb40651788042d3d115ef10c2f87fa0c8b8
          </ul>
        </div>
      </div>

      {/* Improved Mobile Overlay */}
       {/* {isOpen && (
          <div
            onClick={toggleSidebar}
            className="md:hidden fixed inset-0  bg-opacity-50 z-30 transition-opacity duration-200"
          ></div>
        )} */}

        
    </div>
    </div>
    </div>
  );
};

export default Sidebar;







<<<<<<< HEAD
=======







>>>>>>> 12a40bb40651788042d3d115ef10c2f87fa0c8b8
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

<<<<<<< HEAD
// export default SideBar;
=======
// export default SideBar;


// import {useState} from "react";

// const SideBar=()=>{

//   const [submenuOpen, setSubmenuOpen] = useState(false);
//   const toggleSubmenu = () => {
//     setSubmenuOpen(!submenuOpen);
//   };
//     return(
//         <>

>>>>>>> 12a40bb40651788042d3d115ef10c2f87fa0c8b8
