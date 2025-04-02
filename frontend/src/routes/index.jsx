import {
//   useNavigate,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import Footer from "../components/Footer";
import Admin from "../components/Admin";
import Contact from "../components/Contact";
import Doctor from "../components/Doctor";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import DoctorDetails from '../components/Doctor/IndividualDoctor'
import BookAppointment from '../components/BookAppointment'
import Profile from '../components/Profile'
import DoctorProfile from '../components/DoctorProfile';
import { useSelector } from 'react-redux';
import About from '../components/About';
import FeedbackForm from '../components/FeedBackForm/FeedBack';
import Chatbot from '../components/Chatbot/Chatbot';
import { useEffect } from 'react';

const AllRoute = () => {
    const location = useLocation();
    const role = useSelector((state)=>state.isLogin.role);
   const navigate=useNavigate();
    const hideNavFooter = location.pathname === "/login" || location.pathname === "/signup" || role === 'doctor' ;
     const publicRoutes = ['/login','/signup','/','/chatbot'];
    useEffect(()=>{
        if(role==='' && !publicRoutes.includes(location.pathname))
        {
            navigate('/login');
        }
    },[role,location.pathname,navigate])

    return (
        <>
            <div className='row g-0 custom-row'>
                <div className='col-12 bg-light'>
                    <div className='d-flex flex-column w-auto  h-auto'>
                        {!hideNavFooter &&  <NavBar  />}
                        <div className="d-flex justify-content-center">
                            <div className='h-auto w-auto'>
            <Routes>  
                       
                           
                        <Route path="/doctorprofile/*" element={ <DoctorProfile/>}></Route>
                        <Route path="/login"  element={<Login  />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />}/>
                        <Route path="/all-doctors" element={<Doctor />} />
                        <Route path="/admin/*" element={<Admin />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/all-doctors/:id" element={<DoctorDetails />} />
                        <Route path="/appointment/:id" element={<BookAppointment/>}/>
                        <Route path="/profile/*" element={<Profile/>}></Route>
                        <Route path="/feedbackform" element={<FeedbackForm/>}></Route>
                        <Route path="/chatbot" element={<Chatbot/>}></Route>
            </Routes>
       
                            </div>
                        </div>
                        {!hideNavFooter && <Footer />}
                    </div>
                </div>
            </div>
            {!hideNavFooter && <Footer />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRoute;


// import {   Route, Routes, useLocation } from 'react-router-dom';
// import { useState } from 'react';
// import NavBar from '../components/NavBar';
// import Home from '../components/Home';
// import Footer from '../components/Footer';
// import Admin from '../components/Admin';
// import Contact from '../components/Contact';
// import Doctor from '../components/Doctor';
// import Login from "../components/Login";
// import SignUp from "../components/SignUp";
// import DoctorDetails from '../components/Doctor/IndividualDoctor'
// import BookAppointment from '../components/BookAppointment';
// import Profile from '../components/Profile';
// import DoctorProfile from '../components/DoctorProfile';

// const AllRoute = () => {
//     const location = useLocation();
//     const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';
//     const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');

//     return(<>
//            <div className=" min-vw-100 min-vh-100">
//                 <div className="flex flex-col">
//                     <div className="bg-light">
//                         <div className="flex flex-col w-auto h-auto ">
//                             {!isLoginPage && <NavBar isLogin={isLogin} setIsLogin={setIsLogin} />}
//                             <div className="flex justify-center">
//                                 <div className="h-auto w-auto">

//                                     <Routes>
//                                         <Route path="/doctorprofile/*" element={<DoctorProfile/>}></Route>
//                                         <Route path="/" element={<Home />}></Route>
//                                         <Route
//                                             path="/about"
//                                             element={
//                                                 <>
//                                                     <h1 className="mt-4 p-4 min-h-screen">Welcome to About Page</h1>
//                                                 </>
//                                             }
//                                         ></Route>
//                                         <Route path="/signup" element={<SignUp />}></Route>
//                                         <Route path="/all-doctors" element={<Doctor />}></Route>
//                                         <Route path="/admin/*" element={<Admin />}></Route>
//                                         <Route path="/contact" element={<Contact />}></Route>
//                                         <Route  path="/login" element={<Login  setIsLogin={setIsLogin} />} />
//                                         <Route path="/all-doctors/:id" element={<DoctorDetails />} />
//                                         <Route path="/appointment/:id" element={<BookAppointment/>}/>
//                                         <Route path="/profile/*" element={<Profile/>}></Route>
//                                     </Routes>

//                                 </div>
//                             </div>
//                             {!isLoginPage && <Footer/>}
//                         </div>
//                 </div>
//                 </div>
//        </div>
//     </>
//     );

// };

// export default AllRoute;
