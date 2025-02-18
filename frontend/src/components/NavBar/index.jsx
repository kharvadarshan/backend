import './index.css';
//import { useState } from 'react';
import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

const NavBar = ({isLogin,setIsLogin}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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
              localStorage.setItem('isLogin',false);
              localStorage.removeItem('token');
              setIsLogin(false);
              //console.log(isLogin);
              navigate('/');
            }

       }catch(err)
       {
        console.log(err);
       }
  }
  const handleSignUpPage = () => {
    navigate('/signup');
  }

  const handleLoginPage = () => navigate("/login");
  

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
          { !isLogin?<>
            <button onClick={handleLoginPage} className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
            <button onClick={handleSignUpPage} className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600">
              Sign Up
            </button>
            </>   
            :
            <>
            <button onClick={logout} className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Logout
               </button>
            </>
          }
               
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


