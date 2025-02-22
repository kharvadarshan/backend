import AddDoctor from "../AddDoctor";
import Appointment from "../Appointment";
import SideBar from "../SideBar";
import { Route,Routes,Outlet } from "react-router-dom";
import ContactList from "./AllContact/AllContact";

const Admin=()=>{
    return (
         <>
            <div className="">
            <div className="flex flex-row justify-start ">
                    <div className="w-0 lg:w-64">
                        <SideBar/>
                    </div>
                   <div className="w-screen h-screen">
                       <Routes>
                          <Route path='/dashboard'
                          element={
                                <h1>Dashboard</h1>
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