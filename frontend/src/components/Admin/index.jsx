
import AddDoctor from "../AddDoctor";
import Appointment from "../Appointment";
import SideBar from "../SideBar";
import { Route,Routes,Outlet } from "react-router-dom";
import ContactList from "./AllContact/AllContact";

const Admin=()=>{
    return (
         <>
            <div className="container w-full">
            <div className="flex flex-row justify-start ">
                    <div className="">
            <div className=" flex flex-col  w-screen h-screen ">
            <div className=" flex flex-row justify-start items-start w-screen">
          
                    <div className="basis-1/5 mx-auto">

                        <SideBar/>
                    </div>
                   <div className="basis-4/5 m-3">
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
            </div>
            </div>
            </div>
         </>
         )
}

export default Admin;
    
