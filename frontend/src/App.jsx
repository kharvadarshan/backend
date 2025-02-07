
<<<<<<< HEAD
=======

>>>>>>> ef3e23e549a9632ceb7a3fb5e0ffdb81ea4b6d52
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route,Routes } from 'react-router-dom';
import Login from "../src/components/Login";
import SignUp from "../src/components/SignUp";
<<<<<<< HEAD
// import Doctors from "../src/components/Doctors";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Admin from './components/Admin';
=======
//import Doctors from "./components/Doctor";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Contact from './components/Contact';
// import NavBar from './components/NavBar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { Route,Routes } from 'react-router-dom';
// import Login from "../src/components/Login";
// import SignUp from "../src/components/SignUp";
// import Doctors from "../src/components/Doctors";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import Home from './components/Home';
// import Footer from './components/Footer';
// import Admin from './components/Admin';

>>>>>>> ef3e23e549a9632ceb7a3fb5e0ffdb81ea4b6d52
// import ContactApp from './components/Contact/contactApp';

import Doctor from "./components/Doctor";

function App() {
    return(
<<<<<<< HEAD
=======
    
          
>>>>>>> ef3e23e549a9632ceb7a3fb5e0ffdb81ea4b6d52
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
                                  <Route path='/home' element={<Home/> }></Route>
                                  <Route path='/about' element={
                                      <>
                                          <h1 className='mt-4 p-4 min-vh-100'>Welcom to About Page</h1>
                                      </>
                                  }></Route>
                                  <Route path='/login' element={<Login/>}></Route>
                                  <Route path='/signup' element={<SignUp/>}></Route>
                                  <Route path='/all-doctors' element={ <Doctor_List/>}></Route>
                                  <Route path='/admin/*' element={<Admin/>}></Route>
                                  <Route path='/contact' element={<Contact/>}></Route>
>>>>>>> ef3e23e549a9632ceb7a3fb5e0ffdb81ea4b6d52
                                  
                             </Routes>
                             </div>
                       </div>
                       <Footer/>
                    </div>
               </div>
           </div>
          </div>
            
        </>
<<<<<<< HEAD
=======
       
>>>>>>> ef3e23e549a9632ceb7a3fb5e0ffdb81ea4b6d52
    )
}

export default App;
