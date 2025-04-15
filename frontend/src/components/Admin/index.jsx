import AddDoctor from "../Admin/AddDoctor";
import Appointment from "../Admin/Appointment";
import SideBar from "./SideBar";
import { Route, Routes } from "react-router-dom";
import ContactList from "./AllContact/AllContact";
import DoctorList from "./DoctorList";
import ALLPatient from "./AllPatient";

const Admin = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <SideBar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed z-50">
        <SideBar />
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto max-h-screen">
        <Routes>
          <Route path="/" element={<Appointment />} />
          <Route path="/adddoctor" element={<AddDoctor />} />
          <Route path="/doctorslist" element={<DoctorList />} />
          <Route path="/allcontacts" element={<ContactList />} />
          <Route path="/allpatient" element={<ALLPatient />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;

















// import AddDoctor from "../Admin/AddDoctor";
// import Appointment from "../Admin/Appointment";
// import SideBar from "./SideBar";
// import { Route, Routes, Outlet } from "react-router-dom";
// import ContactList from "./AllContact/AllContact";
// import DoctorList from "./DoctorList";
// import ALLPatient from "./AllPatient";

// const Admin = () => {
//   return (
//     <>
//       <div className="flex flex-row justify-start h-full min-h-screen">
//         <div className="w-0 lg:w-64 z-50">
//           <SideBar />
//         </div>

//         <div className="w-screen lg:max-w-7xl max-h-[650px]  overflow-y-auto">
//           <Routes>
//             <Route path="/" element={<Appointment />}>
//               {" "}
//             </Route>

//             <Route path="/allcontacts" element={<ContactList />} />

//             <Route path="/adddoctor" element={<AddDoctor />} />

//             <Route path="/doctorslist" element={<DoctorList />} />
//             <Route path="/allpatient" element={<ALLPatient />} />
//           </Routes>
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Admin;
