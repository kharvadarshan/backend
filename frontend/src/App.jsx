
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SideBar from './components/SideBar';
import { Route,Routes } from 'react-router-dom';
import Login from "../src/components/Login";
import SignUp from "../src/components/SignUp";
import Doctors from "../src/components/Doctors";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    return(
        <>
          <div className='container min-vw-100 min-vh-100'>
           <div className='row g-0 custom-row'>
               <div className='col-2 bg-dark custom-col '><SideBar/></div>
               <div className='col-10 bg-light'> 
                    <div className='d-flex flex-column w-100 h-100'>
                          <NavBar/>
                       <div className="d-flex">
                             <div className='h-100'>
                             <Routes>
                                  <Route path='/home' element={ 
                                      <>
                                          <h1 className='mt-4 p-4'>Welcom to Home Page</h1>
                                      </>
                                  }></Route>
                                  <Route path='/about' element={
                                      <>
                                          <h1 className='mt-4 p-4'>Welcom to About Page</h1>
                                      </>
                                  }></Route>
                                  <Route path='/login' element={<Login/>}></Route>
                                  <Route path='/signup' element={<SignUp/>}></Route>
                                  <Route path='/all-doctors' element={<Doctors/>}></Route>
                             </Routes>
                             </div>
                       </div>
                    </div>
               </div>
           </div>
          </div>
            
        </>
    )
}

export default App;
