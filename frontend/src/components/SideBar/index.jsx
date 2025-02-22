 

const SideBar = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white p-3 w-64">
      <div className="flex flex-col justify-between h-full">
        <div>
          <a className="flex items-center space-x-2 text-xl font-semibold">
            <i className="bi bi-speedometer"></i>
            <span>Brand</span>
          </a>
          <hr className="my-4 border-gray-700" />
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
                <i className="bi bi-speedometer2"></i>
                <span className="hidden lg:inline">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/admin/appointments" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
                <i className="bi bi-calendar-check"></i>
                <span className="hidden lg:inline">Appointments</span>
              </a>
            </li>
            <li>
              <a href="/admin/add-doctor" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
                <i className="bi bi-plus-circle"></i>
                <span className="hidden lg:inline">Add Doctor</span>
              </a>
            </li>
            <li>
              <a href="/admin/doctors-list" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
                <i className="bi bi-people"></i>
                <span className="hidden lg:inline">Doctors List</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="relative">
          <button className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-gray-800">
            <i className="bi bi-person-circle"></i>
            <span className="hidden lg:inline">Darshan</span>
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg hidden">
            <a className="block px-4 py-2 hover:bg-gray-700" href="#">Profile</a>
            <a className="block px-4 py-2 hover:bg-gray-700" href="#">Settings</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;





// import {useState} from "react";

// const SideBar=()=>{

//   const [submenuOpen, setSubmenuOpen] = useState(false);
//   const toggleSubmenu = () => {
//     setSubmenuOpen(!submenuOpen);
//   };
//     return(
//         <>


// <div className="container d-flex flex-row justify-content-center bg-dark ">
//         <div className="min-vh-100 d-flex flex-column justify-content-between pt-3">
//           <div>
//             <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-items-center ms-3 mt-2">
//               <i className="fs-4 bi bi-speedometer"></i>
//               <span className="ms-1 fs-4 d-none d-sm-inline">Brand</span>
//             </a>
//             <hr className="text-secondary d-none d-sm-block" />
//             <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
//               <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
//                 <a className="nav-link text-white fs-5 " href="/admin">
//                   <i className="bi bi-speedometer2"></i>
//                   <span className="ms-3 d-none d-sm-none d-lg-inline">
//                     Dashboard
//                   </span>
//                 </a>
//               </li>
//               <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
//                 <a className="nav-link text-white fs-5" href="/admin/appointments">
//                   <i className="bi bi-calendar-check"></i>
//                   <span className="ms-3 d-none d-sm-none d-lg-inline">Appointments</span>
//                 </a>
//               </li>
//               <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
//                 <a className="nav-link text-white fs-5" href="/admin/add-doctor">
//                   <i className="bi bi-plus-circle"></i>
//                   <span className="ms-3 d-none d-sm-none d-lg-inline">
//                     Add Doctor
//                   </span>
//                 </a>
//               </li>
//               <li
//                 className="nav-item text-white fs-4 my-1 py-2 py-sm-0"
//                 onClick={toggleSubmenu}
//               >
//                 <a
//                   className="nav-link text-white fs-5 d-flex align-items-center justify-content-between"
//                   href="#"
//                 >
//                   <span>
//                     <i className="bi bi-grid"></i>
//                     <span className="ms-3 d-none d-sm-none d-lg-inline">
//                       Products
//                     </span>
//                   </span>
//                   <i
//                     className={`bi d-none d-sm-none d-lg-inline ${
//                       submenuOpen ? "bi-caret-up-fill" : "bi-caret-down-fill"
//                     }`}
//                   ></i>
//                 </a> 
//                 {submenuOpen && (
//                   <ul className="nav flex-column ms-4 d-none d-sm-none d-lg-inline">
//                     <li className="nav-item">
//                       <a className="nav-link text-white" href="#">
//                         Add Product
//                       </a>
//                     </li>
//                     <li className="nav-item">
//                       <a className="nav-link text-white" href="#">
//                         Manage Products
//                       </a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
//                 <a className="nav-link text-white fs-5" href="/admin/doctors-list">
//                   <i className="bi bi-people"></i>
//                   <span className="ms-3 d-none d-sm-none d-lg-inline">
//                     Doctors List
//                   </span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div className="dropdown open">
//             <a
//               className="text-decoration-none text-white dropdown-toggle p-3"
//               type="button"
//               id="triggerId"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <i className="bi bi-person-circle"></i>{" "}
//               <span className="ms-3 d-none d-lg-inline d-sm-none">Darshan</span>
//             </a>
//             <div className="dropdown-menu" aria-labelledby="triggerId">
//               <a className="dropdown-item" href="#">
//                 <span className="d-sm-inline">1</span>
//                 <span className="d-none d-lg-inline d-sm-inline px-2">
//                   Profile
//                 </span>
//               </a>
//               <a className="dropdown-item" href="#">
//                 <span className="d-sm-inline">2</span>
//                 <span className="d-none d-sm-inline d-lg-inline px-2">
//                   Setting
//                 </span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
          
//         </>
//     );
// }

// export default SideBar;