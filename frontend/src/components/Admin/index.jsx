
import AddDoctor from "../AddDoctor";
import Appointment from "../Appointment";
import SideBar from "./SideBar";
import { Route,Routes,Outlet } from "react-router-dom";
import ContactList from "./AllContact/AllContact";
import DashBoard from "../Admin/Dashboard/Dashboard";
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
                          element={<DashBoard/>}> </Route>

                          <Route path='/appointments' 
                          element={<Appointment/>}/>

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
    