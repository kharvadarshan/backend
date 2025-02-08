import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route,Routes } from 'react-router-dom';
import Login from "../components/Login";
import SignUp from "../components/SignUp";
//import Doctors from "./components/Doctor";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from '../components/Home';
import Footer from '../components/Footer';
import Admin from '../components/Admin';
import Contact from '../components/Contact';

import Doctor from '../components/Doctor';

const AllRoute=()=>{
    return(
           <>
            <div className='container min-vw-100 min-vh-100'>
           <div className='row g-0 custom-row'>
               {/* <div className='col-2 bg-dark custom-col '><SideBar/></div> */}
               <div className='col-12 bg-light'> 
                    <div className='d-flex flex-column  w-auto h-auto'>
                          <NavBar/>
                       <div className="d-flex justify-content-center">
                             <div className='h-auto  w-auto'>
                             <Routes>
                                  <Route path='/' element={<Home/> }></Route>
                                  <Route path='/about' element={
                                      <>
                                          <h1 className='mt-4 p-4 min-vh-100'>Welcom to About Page</h1>
                                      </>
                                  }></Route>
                                  <Route path='/login' element={<Login/>}></Route>
                                  <Route path='/signup' element={<SignUp/>}></Route>
                                  <Route path='/all-doctors' element={ <Doctor/>}></Route>
                                  <Route path='/admin/*' element={<Admin/>}></Route>
                                  <Route path='/contact' element={<Contact/>}></Route>
                                  
                             </Routes>
                             </div>
                       </div>
                       <Footer/>
                    </div>
               </div>
           </div>
          </div>
           </>
    )
}
export default AllRoute;