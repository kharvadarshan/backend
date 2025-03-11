import { NavLink, useNavigate } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import EditProfile from "./EditProfile.jsx";
import Appointments from "./MyAppointment/index.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendarWeek,faPenToSquare, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetIsLogin, resetRole } from "../../slices/loginSlice.jsx";
import { resetUser } from "../../slices/userAuthSlice.jsx";
import { toast } from "react-toastify";




const Profile =()=>{
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const logout = async (e)=>
            {   
              e.preventDefault();
                  console.log("logout event triggred.");
                 try{
                  const token = localStorage.getItem('token');
                 
                     console.log(token);
                      const result = await  axios.post("http://localhost:5001/user/logout",null,{ headers: {
                        Authorization: `Bearer ${token}`,
                      }, withCredentials:true});
                      if(result.data.ok)
                      {
                         toast.success("Logout Successfully...!",{
                                                  position:"top-right"
                                             });
                        localStorage.removeItem('token');
                        dispatch(resetIsLogin());
                        dispatch(resetUser());
                        dispatch(resetRole());
                        navigate('/');
                      }
          
                 }catch(err)
                 {
                  console.log(err);
                 }
            }
    return(
          <>
                  <div className="flex flex-row w-screen  h-screen  min-vw-100   ">
                <div className="basis-1/5 flex flex-col items-center  m-4 p-2">
                      <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"></img>
                      <h1 className="text-xl font-bold">John Doe</h1>
                      <hr className="my-4 border border-gray-700 w-full" />
                      <div></div>   
                      <div className="flex flex-col justify-between ">
                       <NavLink to="/profile/editprofile"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white   ">
                              <span><FontAwesomeIcon icon={faPenToSquare}  className="text-blue-500 text-lg pr-2" />Edit Profile</span>
                       </NavLink>
                       <NavLink to="/profile/myappointment"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                       <span><FontAwesomeIcon icon={faCalendarWeek} className="text-blue-500 text-lg pr-2" />My Appointment</span>
                       </NavLink>
                       <NavLink onClick={logout}  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                       <span className=""><FontAwesomeIcon icon={faRightFromBracket} className="text-blue-500 text-lg pr-2" />Logout</span>
                       </NavLink>
                       </div>
                </div>
                  
                <div className="basis-4/5 bg-blue-500 m-4 p-2">
                <Routes>
                          <Route path='editprofile' 
                          element={<EditProfile/> }> </Route>
                          <Route path='myappointment' 
                          element={<Appointments/>}> </Route>
                                              
                        </Routes>
                        <Outlet/>
                </div>
                </div>
          </>
    )
}

export default Profile;