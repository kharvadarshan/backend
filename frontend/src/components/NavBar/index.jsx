import "./index.css";
//import { useState } from 'react';
import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { resetUser } from "../../slices/userAuthSlice";
import { useDispatch } from "react-redux";
import { resetIsLogin, resetRole } from "../../slices/loginSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  // const activeUser = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.isLogin.isLogin);
 

  const logout = async () => {

    try {
     
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        null,
        {
          
          withCredentials: true,
        }
      );
      if (result.data.ok) {
        toast.success("Logout Successfully...!", {
          position: "top-right",
        });
        // localStorage.removeItem("token");
        dispatch(resetIsLogin());
        dispatch(resetUser());
        dispatch(resetRole());
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSignUpPage = () => {
    navigate("/signup");
  };

  const handleLoginPage = () => navigate("/login");

  return (
    <nav className="bg-gray-800 text-white  relative z-50 shadow-lg ">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full   w-screen"> */}
      <div className="flex justify-between items-center h-16  px-3 ">
        {/* Logo */}
        <div className="">
          <img className="" width="326px" height="" src="../../../public/assets/BookMyDoctor Logo - Original with Transparent Background - 5000x5000.png" ></img>
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
        <div className="hidden  lg:flex space-x-8 items-center ">
          <NavLink
            to="/"
            className="text-white hover:text-gray-400 text-lg no-underline"
          >
            Home
          </NavLink>
          <NavLink
            to="/all-doctors"
            className="text-white hover:text-gray-400 text-lg no-underline"
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className="text-white hover:text-gray-400 text-lg no-underline"
          >
            About
          </NavLink>
          {/* <NavLink
            to="/admin"
            className="text-white hover:text-gray-400 text-lg no-underline"
          >
            Admin
          </NavLink> */}
          <NavLink
            to="/contact"
            className="text-white hover:text-gray-400 text-lg no-underline"
          >
            Contact
          </NavLink>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex space-x-4 items-center">
          {!isLogin ? (
            <>
              <button
                onClick={handleLoginPage}
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={handleSignUpPage}
                className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={logout}
                className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          )}

          <div className="relative" ref={dropdownRef}>
            {isLogin && (
              <button
                className="flex flex-row items-center text-white  px-4 py-2 rounded-md hover:text-gray-400 focus:outline-none"
                onClick={() => navigate("/profile")}
              >
                {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
                <span className="ml-2 hidden lg:inline">
                  {" "}
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-blue-500 text-lg pr-2"
                  />
                  {/* {activeUser ? activeUser.email : ""} */}
                </span>
              </button>
            )}

            {/* {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg">
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-600 text-white no-underline">
                    Profile
                  </NavLink>
                </div>
              )} */}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 space-y-4 shadow-md">
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-gray-400 text-lg text-center no-underline"
          >
            Home
          </NavLink>
          <NavLink
            to="/all-doctors"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-gray-400  text-center  text-lg no-underline"
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-gray-400 text-lg  text-center  no-underline"
          >
            About
          </NavLink>
          <NavLink
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-gray-400 text-lg  text-center  no-underline"
          >
            Admin
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block text-white hover:text-gray-400  text-center text-lg no-underline"
          >
            Contact
          </NavLink>
          <button
            onClick={handleLoginPage}
            className="block bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={handleSignUpPage}
            className="block bg-yellow-500 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-600"
          >
            Sign Up
          </button>
        </div>
      )}
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
