


import AddDoctor from "../AddDoctor";
import Appointment from "../Appointment";
import SideBar from "../SideBar";
import { Route,Routes,Outlet } from "react-router-dom";

const Admin=()=>{
    return (
         <>
            <div className="container w-100 min-vw-100 ">
            <div className=" d-flex flex-row justify-content-start">
                    <div className="">
                        <SideBar/>
                    </div>
                   <div className="m-3">
                       <Routes>
                          <Route path='' 
                          element={
                            <>
                                <h1>Dashboard</h1>
                            </>
                          }> </Route>
                          <Route path='appointments' 
                          element={<Appointment/>}> </Route>
                          <Route path='add-doctor' 
                          element={<AddDoctor/>}> </Route>
                          <Route path='doctors-list' 
                          element={
                            <>
                                <h1>Doctors List</h1>
                            </>
                          }> </Route>
                          
                        </Routes>
                        <Outlet/>
                   </div>
            </div>

            </div>
         </>
    )
}

export default Admin;