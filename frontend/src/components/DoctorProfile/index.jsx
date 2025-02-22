import { NavLink,Route,Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
const DoctorProfile = ()=>{
    return(
           <>
              <div className="flex flex-row w-screen h-screen min-vw-100">
                 <div className="basis-1/5 flex flex-col items-center  m-4 p-2">
                      <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"></img>
                      <h1 className="text-xl font-bold">John Doe</h1>
                      <hr className="my-4 border border-gray-700 w-full" />
                      <div></div>   
                      <div className="flex flex-col justify-between ">
                       <NavLink to="/doctorprofile/editprofile"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white   ">
                          Edit Profile
                       </NavLink>
                       <NavLink to="/doctorprofile/bookings"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                         Bookings
                       </NavLink>
                       <NavLink to="/doctorprofile/notifications"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                        <span className=""><FontAwesomeIcon icon={faBell} className="text-blue-500 text-lg pr-2" />Notifications</span>
                       </NavLink> 
                       <NavLink to="/doctorprofile/reports"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                         Reports
                       </NavLink>
                       <NavLink to="/logout"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                          Logout
                       </NavLink>
                       </div>
                  </div>
                  <div className="basis-4/5 bg-blue-500 m-4 p-2">
                   <Routes>
                          <Route path='editprofile' 
                          element={
                            <>
                                <h1>Dashboard</h1>
                            </>
                          }> </Route>
                          <Route path='bookings' 
                          element={
                            <>
                                <h1>myappointment</h1>
                            </>
                          }> </Route>
                          <Route path='notifications' element={<><h1>Notifications</h1></>}></Route>                 
                        </Routes>
                        <Outlet/>
                </div>
              </div>
           </> 
    )
}

export default DoctorProfile;