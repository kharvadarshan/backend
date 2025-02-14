import NavBar from '../components/NavBar';
import { Route, Routes } from 'react-router-dom';
import SignUp from "../components/SignUp";
import Home from '../components/Home';
import Footer from '../components/Footer';
import Admin from '../components/Admin';
import Contact from '../components/Contact';
import Login from '../components/Login';
import { useLocation } from 'react-router-dom';
import BookAppointment from '../components/BookAppointment';

const AllRoute = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <>
            <div className=" min-vw-100 min-vh-100">
                <div className="flex flex-col">
                    <div className="bg-light">
                        <div className="flex flex-col w-auto h-auto ">
                            {!isLoginPage && <NavBar />}
                            <div className="flex justify-center">
                                <div className="h-auto w-auto">
                                    <Routes>
                                        <Route path="/" element={<Home />}></Route>
                                        <Route
                                            path="/about"
                                            element={
                                                <>
                                                    <h1 className="mt-4 p-4 min-h-screen">Welcome to About Page</h1>
                                                </>
                                            }
                                        ></Route>
                                        <Route path="/signup" element={<SignUp />}></Route>
                                        <Route path="/all-doctors" element={<BookAppointment />}></Route>
                                        <Route path="/admin/*" element={<Admin />}></Route>
                                        <Route path="/contact" element={<Contact />}></Route>
                                        <Route path="/login" element={<Login />} />
                                    </Routes>
                                </div>
                            </div>
                            {!isLoginPage && <Footer />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllRoute;





// import NavBar from '../components/NavBar';
// import { Route,Routes } from 'react-router-dom';
// //import Login from "../components/Login";
// import SignUp from "../components/SignUp";
// import Home from '../components/Home';
// import Footer from '../components/Footer';
// import Admin from '../components/Admin';
// import Contact from '../components/Contact';
// //import Doctor from '../components/Doctor';
// import Login from '../components/Login';
// import { useLocation } from 'react-router-dom';
// import BookAppointment from '../components/BookAppointment';

// const AllRoute=()=>{
//     const location = useLocation(); 
//   const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';
//     return(
//            <>
//             <div className='container min-vw-100 min-vh-100'>
//            <div className='row g-0 custom-row'>
//                <div className='col-12 bg-light'> 
//                     <div className='d-flex flex-column  w-auto h-auto'>
//                         { !isLoginPage &&  <NavBar/> }
//                        <div className="d-flex justify-content-center">
//                              <div className='h-auto  w-screen'>
//                              <Routes>
//                                   <Route path='/' element={<Home/> }></Route>
//                                   <Route path='/about' element={
//                                       <>
//                                           <h1 className='mt-4 p-4 min-vh-100'>Welcom to About Page</h1>
//                                       </>
//                                   }></Route>
                                 
//                                   <Route path='/signup' element={<SignUp/>}></Route>
//                                   <Route path='/all-doctors' element={ <BookAppointment/>}></Route>
//                                   <Route path='/admin/*' element={<Admin/>}></Route>
//                                   <Route path='/contact' element={<Contact/>}></Route>
//                                   <Route path='/login' element={<Login/>}/>
                                  
//                              </Routes>
//                              </div>
//                        </div>
//                         { !isLoginPage && <Footer/>}
//                     </div>
//                </div>
//            </div>
//           </div>
//            </>
//     )
// }
// export default AllRoute;