import AddDoctor from "../AddDoctor";
import Appointment from "../Appointment";
import SideBar from "../SideBar";


import { Route,Routes,Outlet } from "react-router-dom";

const Admin=()=>{
    return (
         <>
<<<<<<< HEAD
         
            <div className="flex flex-row items-start w-full">
          
                    <div className="mx-auto">
=======
            <div className="container w-full">
            <div className="flex flex-row justify-start ">
                    <div className="">
>>>>>>> a9143deea5ca2c38619067fe313c8b49b97140fc
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
         </>
    )
}

export default Admin;