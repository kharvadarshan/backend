
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import Footer from '../components/Footer';
import Admin from '../components/Admin';
import Contact from '../components/Contact';
import Doctor from '../components/Doctor';
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavFooter = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <div className='container min-vw-100 min-vh-100'>
            <div className='row g-0 custom-row'>
                <div className='col-12 bg-light'>
                    <div className='d-flex flex-column w-auto h-auto'>
                        {!hideNavFooter && <NavBar />}
                        <div className="d-flex justify-content-center">
                            <div className='h-auto w-auto'>
                                {children}
                            </div>
                        </div>
                        {!hideNavFooter && <Footer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AllRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/*" element={
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<h1 className='mt-4 p-4 min-vh-100'>Welcome to About Page</h1>} />
                        <Route path="/all-doctors" element={<Doctor />} />
                        <Route path="/admin/*" element={<Admin />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Layout>} />
            </Routes>
        </BrowserRouter>
    );  
};

export default AllRoute;


















// import NavBar from '../components/NavBar';
// import { BrowserRouter, Route,Routes } from 'react-router-dom';
// import Home from '../components/Home';
// import Footer from '../components/Footer';
// import Admin from '../components/Admin';
// import Contact from '../components/Contact';
// import Doctor from '../components/Doctor';

// import Login from "../components/Login";
// import SignUp from "../components/SignUp";

// const AllRoute=()=>{
//     return(
//            <>
//            <BrowserRouter>
//             <div className='container min-vw-100 min-vh-100'>
//            <div className='row g-0 custom-row'>
//                <div className='col-12 bg-light'> 
//                     <div className='d-flex flex-column  w-auto h-auto'>
//                           <NavBar/>
//                        <div className="d-flex justify-content-center">
//                              <div className='h-auto  w-auto'>
//                              <Routes>
//                                   <Route path='/' element={<Home/> }></Route>
//                                   <Route path='/about' element={
//                                       <>
//                                           <h1 className='mt-4 p-4 min-vh-100'>Welcom to About Page</h1>
//                                       </>
//                                   }></Route>
//                                   <Route path='/all-doctors' element={ <Doctor/>}></Route>
//                                   <Route path='/admin/*' element={<Admin/>}></Route>
//                                   <Route path='/contact' element={<Contact/>}></Route>
                                  
//                              </Routes>
//                              </div>
//                        </div>
//                        <Footer/>
//                     </div>
                   
//                </div>
//            </div>
//           </div>
//           <Routes>
//             <Route path='/login' element={<Login/>}></Route>
//             <Route path='/signup' element={<SignUp/>}></Route>
//         </Routes>
//         </BrowserRouter>
//            </>
//     )
// }
// export default AllRoute;
