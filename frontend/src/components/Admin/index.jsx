
import AddDoctor from "../Admin/AddDoctor";
import Appointment from "../Admin/Appointment";
import SideBar from "./SideBar";
import { Route,Routes,Outlet } from "react-router-dom";
import ContactList from "./AllContact/AllContact";
import DoctorList from "./DoctorList";

const Admin=()=>{
    return (
         <>
           
            <div className="flex flex-row justify-start ">

                    <div className="w-0 lg:w-64 z-50">
                        <SideBar/>
                    </div>
                    
                    <div className="w-screen lg:max-w-7xl max-h-[650px]  overflow-y-auto">
                       <Routes>
                        
                       

                          <Route path='/'
                          element={<Appointment/>}> </Route>

                          <Route path='/allcontacts' 
                          element={<ContactList/>}
                          />

                          <Route path='/adddoctor' 
                          element={<AddDoctor/>}/>
                          
                          <Route path='/doctorslist' 
                          element={<DoctorList/>}/>
                          
                        </Routes>
                        <Outlet/>
                   </div>
            </div>
           
         </>
         )
}

export default Admin;
    