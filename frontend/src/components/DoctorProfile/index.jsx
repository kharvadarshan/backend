import { NavLink,Route,Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBell,faCalendarWeek,faPenToSquare,faFileMedical, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./EditProfile";
import ManageSchedule from './ManageSchedule';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetIsLogin } from "../../slices/loginSlice";
import Reports from "./Reports";
import BookedAppointment from "./BookedAppointment";
import { toast } from "react-toastify";
import { resetUser } from "../../slices/userAuthSlice";
import {resetDoctor} from '../../slices/doctorSlice';
const DoctorProfile = ()=>{
  //const isLogin = useSelector((state)=>state.isLogin);
  const activeUser = useSelector((state)=>state.user.user);
  console.log(activeUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                dispatch(resetDoctor());
                navigate('/');
              }
  
         }catch(err)
         {
          console.log(err);
         }
    }
    return(
           <>
              <div className="flex flex-row w-screen h-full min-vw-100">
                 <div className="basis-1/5 flex flex-col items-center h-auto m-4 p-2">
                      <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"></img>
                      <h1 className="text-xl font-bold">John Doe</h1>
                      <hr className="my-4 border border-gray-700 w-full" />
                      <div></div>   
                      <div className="flex flex-col justify-between ">
                       <NavLink to="/doctorprofile/editprofile"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white   ">
                          <span><FontAwesomeIcon icon={faPenToSquare}  className="text-blue-500 text-lg pr-2" />Edit Profile</span>
                       </NavLink>
                       <NavLink to="/doctorprofile/bookings"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                         <span><FontAwesomeIcon icon={faCalendarWeek} className="text-blue-500 text-lg pr-2" />Bookings</span>
                       </NavLink>
                       <NavLink to="/doctorprofile/manageschedule"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                        <span className=""><FontAwesomeIcon icon={faBell} className="text-blue-500 text-lg pr-2" />Notifications</span>
                       </NavLink> 
                       <NavLink to="/doctorprofile/reports"  className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                       <span className=""><FontAwesomeIcon icon={faFileMedical} className="text-blue-500 text-lg pr-2" />Reports</span>
                       </NavLink>
                       <NavLink  onClick={logout} className="text-dark space-x-3 p-2 rounded-lg hover:bg-gray-800 hover:text-white">
                       <span className=""><FontAwesomeIcon icon={faRightFromBracket} className="text-blue-500 text-lg pr-2" />Logout</span>
                       </NavLink>
                       </div>
                  </div>
                  <div className="basis-4/5 bg-blue-500 m-4 p-2">
                   <Routes>
                          <Route path='editprofile' 
                          element={<EditProfile/>}> </Route>
                          <Route path='bookings' 
                          element={<BookedAppointment/>}> </Route>
                          <Route path='manageschedule' element={<ManageSchedule/>}></Route> 
                          <Route path='reports' element={<Reports/>}></Route>                
                    </Routes>
                      <Outlet/>
                </div>
              </div>
           </> 
    )
}

export default DoctorProfile;