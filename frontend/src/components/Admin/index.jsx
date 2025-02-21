import AddDoctor from "../AddDoctor";
import Appointment from "../Appointment";
import SideBar from "../SideBar";
import { Route,Routes,Outlet } from "react-router-dom";

const Admin=()=>{
    return (
         <>
            <div className="container w-full">
            <div className="flex flex-row justify-start ">
                    <div className="">
                        <SideBar/>
                    </div>
                   <div className="m-3">
                       <Routes>
                          <Route path='/dashboard'
                          element={
                                <h1>Dashboard</h1>
                          }> </Route>
                          <Route path='/appointments' 
                          element={<Appointment/>}/>

                          <Route path='/allcontacts' 
                          element={<h1> All Contacts</h1>}/>

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