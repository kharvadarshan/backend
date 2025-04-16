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
//         <div className="w-0 lg:w-72 z-50 ">
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

import { Routes, Route } from "react-router-dom";
import AddDoctor from "../Admin/AddDoctor";
import Appointment from "../Admin/Appointment";
import SideBar from "./SideBar";
import ContactList from "./AllContact/AllContact";
import DoctorList from "./DoctorList";
import ALLPatient from "./AllPatient";
import SpecializationForm from "./ManagedSpecialization";

const Admin = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="lg:block lg:w-64 bg-white shadow-lg z-10">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto max-h-screen p-4">
        <Routes>
          <Route path="/" element={<Appointment />} />
          <Route path="/allcontacts" element={<ContactList />} />
          <Route path="/adddoctor" element={<AddDoctor />} />
          <Route path="/doctorslist" element={<DoctorList />} />
          <Route path="/allpatient" element={<ALLPatient />} />
          <Route path="/managedspecialization" element={<SpecializationForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
