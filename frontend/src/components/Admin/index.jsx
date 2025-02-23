
import AddDoctor from "../AddDoctor";
import Appointment from "../Appointment";
import SideBar from "../SideBar";
import { Route,Routes,Outlet } from "react-router-dom";
import ContactList from "./AllContact/AllContact";
import DashBoard from "../Admin/Dashboard/Dashboard";

const Admin=()=>{
    return (
         <>
            <div className="">
            <div className="flex flex-row justify-start ">

                    <div className="w-0 lg:w-64 z-50">
                        <SideBar/>
                    </div>
                    
                    <div className="w-screen lg:max-w-7xl h-screen  overflow-y-auto">
                       <Routes>
                        
                       <Route path='/'
                          element={
                              <h1>Dashboard</h1>
                          }> </Route>

                          <Route path='/dashboard'
                          element={
                                <DashBoard/>
                          }> </Route>

                          <Route path='/appointments' 
                          element={<Appointment/>}/>

                          <Route path='/allcontacts' 
                          element={<ContactList/>}
                          />

                          <Route path='/adddoctor' 
                          element={<AddDoctor/>}/>
                          
                          <Route path='/doctorslist' 
                          element={
                                <h1>Doctors List</h1>
                          }/>
                          
                        </Routes>
                        <Outlet/>
                   </div>
            </div>
            </div>
         </>
         )
}

export default Admin;
    