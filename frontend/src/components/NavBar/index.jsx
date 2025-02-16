import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLoginPage = () => navigate("/login");
  const handleSignUpPage = () => navigate("/signup");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 text-white relative z-50 shadow-lg">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8 items-center">
            <NavLink to="/"  className="text-white hover:text-gray-400 text-lg no-underline">
              Home
            </NavLink>
            <NavLink to="/all-doctors"  className="text-white hover:text-gray-400 text-lg no-underline">
              All Doctors
            </NavLink>
            <NavLink to="/about" className="text-white hover:text-gray-400 text-lg no-underline">
              About
            </NavLink>
            <NavLink to="/admin" className="text-white hover:text-gray-400 text-lg no-underline">
              Admin
            </NavLink>
            <NavLink to="/contact" className="text-white hover:text-gray-400 text-lg no-underline">
              Contact
            </NavLink>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex space-x-4 items-center">
            <button onClick={handleLoginPage} className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
            <button onClick={handleSignUpPage} className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600">
              Sign Up
            </button>

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-white hover:text-gray-400 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <i className="bi bi-person-circle text-xl"></i>
                <span className="ml-2 hidden lg:inline">Darshan</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg">
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-600 text-white no-underline">
                    Profile
                  </NavLink>
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-600 text-white no-underline">
                    My Appointment
                  </NavLink>
                  <NavLink to="#" className="block px-4 py-2 hover:bg-gray-600 text-white no-underline">
                    Settings
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 space-y-4 shadow-md">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-gray-400 text-lg text-center no-underline">
              Home
            </NavLink>
            <NavLink to="/all-doctors"  onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-gray-400  text-center  text-lg no-underline">
              All Doctors
            </NavLink>
            <NavLink to="/about"  onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-gray-400 text-lg  text-center  no-underline">
              About
            </NavLink>
            <NavLink to="/admin"  onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-gray-400 text-lg  text-center  no-underline">
              Admin
            </NavLink>
            <NavLink to="/contact"  onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-gray-400  text-center text-lg no-underline">
              Contact
            </NavLink>
            <button onClick={handleLoginPage} className="block bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600">
              Login
            </button>
            <button onClick={handleSignUpPage} className="block bg-yellow-500 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-600">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;


// import './index.css';
// import { NavLink, useNavigate } from 'react-router-dom';
// const NavBar = () => {
//   const navigate = useNavigate();

//   const handleLoginPage = () => {
//     navigate('/login');
//   }

//   const handleSignUpPage = () => {
//     navigate('/signup');
//   }
//   return (
//     <>
//       <nav className="bg-gray-800 text-white ">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}  
//             <div className="flex-shrink-0">
//               <h1 className="text-2xl font-bold">Logo</h1>
//             </div>

            // {/* Toggle Button for Mobile */}
            // <div className="flex lg:hidden">
            //   <button
            //     className="text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            //     type="button"
            //   >
            //     <span className="sr-only">Open Menu</span>
            //     <svg
            //       className="h-6 w-6"
            //       xmlns="http://www.w3.org/2000/svg"
            //       fill="none"
            //       viewBox="0 0 24 24"
            //       stroke="currentColor"
            //     >
            //       <path
            //         strokeLinecap="round"
            //         strokeLinejoin="round"
            //         strokeWidth={2}
            //         d="M4 6h16M4 12h16M4 18h16"
            //       />
            //     </svg>
            //   </button>
            // </div>

//             {/* Links */}
//             <div className="hidden lg:flex space-x-6 items-center">
//               <NavLink to="/" className="text-white no-underline hover:text-gray-400 text-lg">
//                 Home
//               </NavLink>
//               <NavLink to="/all-doctors" className="text-white no-underline hover:text-gray-400 text-lg text-underline ">
//                 All Doctors
//               </NavLink>
//               <NavLink to="/about" className="text-white no-underline hover:text-gray-400 text-lg">
//                 About
//               </NavLink>
//               <NavLink to="/admin" className="text-white no-underline hover:text-gray-400 text-lg">
//                 Admin
//               </NavLink>
//               <NavLink to="/contact" className="text-white no-underline hover:text-gray-400 text-lg">
//                 Contact
//               </NavLink>
//             </div>
             
              
             
//             {/* Actions */}
//             <div className="hidden lg:flex space-x-4 items-center">
//               <button onClick={handleLoginPage} className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                 Login
//               </button>
//               <button  onClick={handleSignUpPage}  className=" bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
//                 Sign Up
//               </button>
            

//               {/* Dropdown */}
//               <div className="relative group">
//                 <button className="flex items-center text-white hover:text-gray-400 focus:outline-none">
//                   <i className="bi bi-person-circle text-xl"></i>
//                   <span className="ml-2 hidden lg:inline">Darshan</span>
//                 </button>

//                 <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg hidden group-hover:block">
//                   <NavLink to="#" className="block px-4 py-2 hover:bg-gray-600 text-white no-underline">
//                     Profile
//                   </NavLink>
//                   <NavLink to="#" className="block px-4 py-2 hover:bg-gray-600 text-white no-underline">
//                     My Appointment
//                   </NavLink>
//                   <NavLink to="#" className="block px-4 py-2 hover:bg-gray-600 text-white no-underline">
//                     Settings
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavBar;





// // import './index.css';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // const NavBar=()=>{
// //     return (
// //        <>
// //         <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white ">
// //          <div className="container-fluid d-flex flex-row justify-content-evenly">
// //                  <div className='col-4'>
// //                  <h1>Logo</h1>
// //                  </div>
// //                 <div className='ms-auto'>
// //                 <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// //                 <span className="navbar-toggler-icon bg-light"></span>
// //                 </button>
// //                 </div>
// //                 <div className="collapse navbar-collapse mx-lg-3 px-lg-3  " id="navbarSupportedContent">
// //                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
// //                       <li className="nav-item">
// //                         <a className="nav-link  nav-link:hover active text-light fs-4 py-2" aria-current="page" href="/home">Home</a>
// //                       </li>
// //                       <li className="nav-item">
// //                         <a className="nav-link  nav-link:hover active text-light fs-4 py-2" aria-current="page" href="/all-doctors">All Doctors</a>
// //                       </li>
// //                       <li className="nav-item">
// //                         <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/about">About</a>
// //                       </li>
// //                       <li className="nav-item">
// //                         <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/admin">Admin</a>
// //                       </li>
// //                       <li className="nav-item">
// //                         <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/contact">Contact</a>
// //                       </li>
// //                       </ul>
// //                       <form className="d-flex flex-row align-items-center">
// //                               <a className="btn btn-outline-primary mx-2" type="submit" href='/login'>Login</a>
// //                               <a className="btn btn-outline-warning mx-2" type="submit" href='/signup'>Sign Up</a>
                              
// //                       </form>
// //                       <div className="dropdown open">
// //                                      <a
// //                                        className="text-decoration-none text-white dropdown-toggle p-3"
// //                                        type="button"
// //                                        id="triggerId"
// //                                        data-bs-toggle="dropdown"
// //                                        aria-expanded="false"
// //                                      >
// //                                       <i className="bi bi-person-circle"></i>{" "}
// //                                       <span className="ms-3 d-none d-lg-inline d-sm-none">Darshan</span>
// //                                     </a>
// //                                    <div className="dropdown-menu" aria-labelledby="triggerId">
// //                                       <a className="dropdown-item" href="#">
// //                                         <span className="d-sm-inline">1</span>
// //                                         <span className="d-none d-lg-inline d-sm-inline px-2">
// //                                          Profile
// //                                         </span>
// //                                       </a>
// //                                       <a className="dropdown-item" href="#">
// //                                         <span className="d-sm-inline">2</span>
// //                                         <span className="d-none d-sm-inline d-lg-inline px-2">
// //                                           My Appointment
// //                                         </span>
// //                                       </a>
// //                                       <a className="dropdown-item" href="#">
// //                                         <span className="d-sm-inline">2</span>
// //                                         <span className="d-none d-sm-inline d-lg-inline px-2">
// //                                           Setting
// //                                         </span>
// //                                       </a>
// //                                     </div>
// //                                   </div>
// //                 </div>
// //          </div>
// //        </nav>
// //        </>
// //     )
// // }
// // export default NavBar;