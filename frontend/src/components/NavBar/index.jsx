import './index.css';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/login');
  }

  const handleSignUpPage = () => {
    navigate('/signup');
  }
  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}  
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Logo</h1>
            </div>

            {/* Toggle Button for Mobile */}
            <div className="flex lg:hidden">
              <button
                className="text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                type="button"
              >
                <span className="sr-only">Open Menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="hidden lg:flex space-x-6 items-center">
              <a href="/" className="text-white no-underline hover:text-gray-400 text-lg">
                Home
              </a>
              <a href="/all-doctors" className="text-white no-underline hover:text-gray-400 text-lg text-underline ">
                All Doctors
              </a>
              <a href="/about" className="text-white no-underline hover:text-gray-400 text-lg">
                About
              </a>
              <a href="/admin" className="text-white no-underline hover:text-gray-400 text-lg">
                Admin
              </a>
              <a href="/contact" className="text-white no-underline hover:text-gray-400 text-lg">
                Contact
              </a>
            </div>
             
              
             
            {/* Actions */}
            <div className="hidden lg:flex space-x-4 items-center">
              <button onClick={handleLoginPage} className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Login
              </button>
              <button  onClick={handleSignUpPage}  className=" bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                Sign Up
              </button>
            

              {/* Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-white hover:text-gray-400 focus:outline-none">
                  <i className="bi bi-person-circle text-xl"></i>
                  <span className="ml-2 hidden lg:inline">Darshan</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-md shadow-lg hidden group-hover:block">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-600">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-600">
                    My Appointment
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-600">
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;










// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const NavBar=()=>{
//     return (
//        <>
//         <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white ">
//          <div className="container-fluid d-flex flex-row justify-content-evenly">
//                  <div className='col-4'>
//                  <h1>Logo</h1>
//                  </div>
//                 <div className='ms-auto'>
//                 <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon bg-light"></span>
//                 </button>
//                 </div>
//                 <div className="collapse navbar-collapse mx-lg-3 px-lg-3  " id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                       <li className="nav-item">
//                         <a className="nav-link  nav-link:hover active text-light fs-4 py-2" aria-current="page" href="/home">Home</a>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link  nav-link:hover active text-light fs-4 py-2" aria-current="page" href="/all-doctors">All Doctors</a>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/about">About</a>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/admin">Admin</a>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/contact">Contact</a>
//                       </li>
//                       </ul>
//                       <form className="d-flex flex-row align-items-center">
//                               <a className="btn btn-outline-primary mx-2" type="submit" href='/login'>Login</a>
//                               <a className="btn btn-outline-warning mx-2" type="submit" href='/signup'>Sign Up</a>
                              
//                       </form>
//                       <div className="dropdown open">
//                                      <a
//                                        className="text-decoration-none text-white dropdown-toggle p-3"
//                                        type="button"
//                                        id="triggerId"
//                                        data-bs-toggle="dropdown"
//                                        aria-expanded="false"
//                                      >
//                                       <i className="bi bi-person-circle"></i>{" "}
//                                       <span className="ms-3 d-none d-lg-inline d-sm-none">Darshan</span>
//                                     </a>
//                                    <div className="dropdown-menu" aria-labelledby="triggerId">
//                                       <a className="dropdown-item" href="#">
//                                         <span className="d-sm-inline">1</span>
//                                         <span className="d-none d-lg-inline d-sm-inline px-2">
//                                          Profile
//                                         </span>
//                                       </a>
//                                       <a className="dropdown-item" href="#">
//                                         <span className="d-sm-inline">2</span>
//                                         <span className="d-none d-sm-inline d-lg-inline px-2">
//                                           My Appointment
//                                         </span>
//                                       </a>
//                                       <a className="dropdown-item" href="#">
//                                         <span className="d-sm-inline">2</span>
//                                         <span className="d-none d-sm-inline d-lg-inline px-2">
//                                           Setting
//                                         </span>
//                                       </a>
//                                     </div>
//                                   </div>
//                 </div>
//          </div>
//        </nav>
//        </>
//     )
// }
// export default NavBar;