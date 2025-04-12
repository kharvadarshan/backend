import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userAuthSlice";
import { setIsLogin, setRole } from "../../slices/loginSlice";
import { setDoctor } from "../../slices/doctorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
function LoginPage() {
  const [loginType, setLoginType] = useState("patient"); // Default to 'patient' login
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [message,setMessage]=useState("");

  // const isLogin = useSelector((state) => state.isLogin.isLogin);

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5001/user/login",
        formData,
        { withCredentials: true }
      );

      if (result.data.ok) {
        setMessage(result.data.message);
        dispatch(setIsLogin());
        dispatch(setRole(result.data.user.role));
        dispatch(setUser(result.data.user));
        toast.success("Login Successfully...!", {
          position: "top-right",
        });
        if (result.data.user.role === "doctor") {
          dispatch(setDoctor(result.data.user.doctor));
          navigate("/doctorprofile");
        }else if(result.data.user.role==="admin"){

          navigate('/admin');

        } else {
          setMessage(result.data.message);
          navigate("/");
        }
      } 
      if(!result.data.ok){
        setMessage(result.data.message);
        navigate("/login"); 
      }
    } catch (err) {
      if(err.response){
      setMessage(err.response.data.message);
      }else if (err.request)
      {
        setMessage('No response from server');
      }else
      {
        setMessage('Request error:'+err.message);
      }
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen mx-3 flex flex-col items-center justify-center ">
      <div className="w-full  max-w-lg  p-6 bg-white border border-blue-300 rounded-lg shadow-md my-10 mx-7">
        {/* <div className="p-2">
          {message}
        </div> */}
        {message && (
          <div
            className={`p-3 rounded-md text-center mb-4 ${
              message.includes("success") || message.includes("Successfully")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}
        <div className="items-start mb-5 ">
          <button
            onClick={goToHome}
            className=" p-2  hover:border-blue-500 hover:border rounded-lg"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            Go to Home
          </button>
        </div>
        <div className="flex justify-evenly md:gap-4 gap-2  mb-6">
          {/* Buttons to switch login type */}
          <button
            className={`px-6 py-2  text-sm  md:text-lg  font-medium border ${
              loginType === "patient"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            } rounded-md`}
            onClick={() => {
              setLoginType("patient");
              setFormData({ ...formData, role: "user" });
            }}
          >
            Patient Login
          </button>
          <button
            className={`px-6 py-2 text-sm  md:text-lg  font-medium border ${
              loginType === "doctor"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            } rounded-md`}
            onClick={() => {
              setLoginType("doctor");
              setFormData({ ...formData, role: "doctor" });
            }}
          >
            Doctor Login
          </button>
          {/* <button
            className={`px-6 py-2 text-sm md:text-lg font-medium border ${
              loginType === 'admin' ? 'bg-blue-500 text-white' : 'text-gray-700'
            } rounded-md`}
            onClick={() => {setLoginType('admin');setFormData({...formData,role:'admin'})}}
          >
            Admin Login
          </button> */}
        </div>

        <form onSubmit={login}>
          {loginType === "patient" && (
            <>
              <h3 className="md:text-xl font-bold mb-4 text-center  text-sm">
                Patient Login
              </h3>
              <div className="mb-4">
                <label className="block ml-1 text-gray-700 md:text-lg text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full mt-2 px-3 py-2 border rounded-md md:text-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block ml-1 text-gray-700 md:text-lg  text-sm">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full mt-2 px-3 py-2 border md:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}

          {loginType === "doctor" && (
            <>
              <h3 className="md:text-xl  font-bold text-sm text-center mb-4">
                Doctor Login
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 md:text-lg text-sm ml-1 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md md:text-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block md:text-lg text-sm text-gray-700 ml-1 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border md:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}

          {/* {loginType === 'admin' && (
            <>
              <h3 className="md:text-xl font-bold mb-4 text-center text-sm">Admin Login</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 md:text-lg ml-1 text-sm">Email address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e)=> setFormData({...formData,email:e.target.value})}
                  className="w-full px-3 py-2 border md:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 md:text-lg ml-1 text-sm">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e)=> setFormData({...formData,password:e.target.value})}
                  className="w-full px-3 py-2 border md:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )} */}

          <div className="flex justify-center md:text-lg text-sm mt-5">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <p className="md:text-lg text-sm">
              Don&apos;t have an account?{" "}
              <NavLink
                to="/signup"
                className="text-blue-500 md:text-lg text-sm hover:font-semibold"
              >
                SignUp
              </NavLink>
            </p>
          </div>

          {/* <div className="flex flex-col space-y-3 mt-6">
            <button className="flex items-center justify-center  text-sm md:text-lg border py-2 rounded-md hover:bg-orange-500">
              <FcGoogle className="mr-2" />
              Continue with Google
            </button>
            <button className="flex items-center  justify-center md:text-lg text-sm border py-2 rounded-md hover:bg-orange-500">
              <FaFacebook className="text-blue-700 mr-2" /> 
              Continue with Facebook
            </button>
          </div> */}

          
        </form>
      </div>
    </div>
  );
}

export default LoginPage;









// import  { useState } from 'react';
// import { FcGoogle  } from "react-icons/fc";
// import { FaFacebook  } from "react-icons/fa";
// import './style.scss';
// function LoginPage() {
//   const [loginType, setLoginType] = useState('patient'); // Default to 'patient' login

//   return (
//     <div className='container-fluid d-flex flex-column justify-content-center border border-1 my-5 p-3 ' >
//        <div
//             className='btn-group mx-3 my-5 d-flex flex-row justify-content-between bg-light'
//             role="group"
//             aria-label="Basic outlined example"
//           >
//         {/* Buttons to switch login type */}
//         <button
//           type="button"
//           className={`btn btn-outline-primary ${loginType === 'patient' ? 'active' : ''}`}
//           onClick={() => setLoginType('patient')}
//         >
//           Patient Login
//         </button>
//         <button
//           type="button"
//           className={`btn btn-outline-primary  ${loginType === 'doctor' ? 'active' : ''}`}
//           onClick={() => setLoginType('doctor')}
//         >
//           Doctor Login
//         </button>
//         <button
//             type="button"
//             className={`btn btn-outline-primary  ${loginType === 'admin' ? 'active' : ''}`}
//             onClick={() => setLoginType('admin')}>
//           Admin Login
//         </button>
//       </div>

//       {/* Dynamic Form */}
//       <form className='mb-2  mx-3 d-flex flex-column justify-content-center' >
//       {loginType === 'patient' && (
//         <>
//         <h3 className='my-2'>Patient Login</h3>
//         <div className='mb-3'>
//           <label className='form-label'>Email address</label>
//           <input
//             type='email'
//             className='form-control'
//             id='exampleInputEmail1'
//             aria-describedby='emailHelp'
//           />
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Password</label>
//           <input
//             type='password'
//             className='form-control'
//             id='exampleInputPassword1'
//           />
//         </div>
//         </>
//       )}

//         {/* Extra field for Doctor Login */}
//         {loginType === 'doctor' && (
//             <>
//             <h3 className='my-2'>Doctor Login</h3>
//         <div className='mb-3'>
//           <label className='form-label'>Email address</label>
//           <input
//             type='email'
//             className='form-control'
//             id='exampleInputEmail1'
//             aria-describedby='emailHelp'
//           />
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Password</label>
//           <input
//             type='password'
//             className='form-control'
//             id='exampleInputPassword1'
//           />
//         </div>
//           <div className='mb-3'>
//             <label className='form-label'>Doctor ID</label>
//             <input
//               type='text'
//               className='form-control'
//               id='exampleDoctorID'
//             />
//           </div>
//           </>
//         )}

//         {
//             loginType==='admin' && (
//                <>
//                <h3 className='my-2'>Admin Login</h3>
//                   <div className='mb-3'>
//                     <label className='form-label'>Email address</label>
//                     <input
//                       type='email'
//                       className='form-control'
//                       id='exampleInputEmail1'
//                       aria-describedby='emailHelp'
//                     />
//                   </div>
//                   <div className='mb-3'>
//                     <label className='form-label'>Password</label>
//                     <input
//                       type='password'
//                       className='form-control'
//                       id='exampleInputPassword1'
//                     />
//                   </div>
//                </>
//             )
//         }
//         <div className='d-flex justify-content-center mt-5 mb-3'>
//         <button type='submit' className='btn btn-primary  w-50'>
//           Login
//         </button>
//         </div>
//         <div className='d-flex justify-content-center'>
//           <p>Don&apos;t have an account? <a href='/signup'>Sign Up</a></p>
//        </div>
//         <div className='px-3 mt-5 d-flex flex-column justify-content-between'>
//              <button className='fs-3  btn btn-outline-dark mb-2 d-flex flex-row justify-content-center align-items-center'> <FcGoogle  /><span className='fs-3 p-2 px-4'>Continue with Google</span></button>
//              <button className='fs-3   btn btn-outline-dark mt-2 d-flex flex-row justify-content-center align-items-center'> <FaFacebook /><span className='fs-3 p-2 px-4'>Continue with Facebook</span></button>
//        </div>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;

// import React from "react";
// import './style.css';
// import { useState,useEffect } from "react";
// const Login=()=>{
//     const [formData,setFormData]=useState({});

//     return (

//           <div className='container-fluid border border-1 mx-3 p-3' >
//               <div className='mx-3'>
//                  <button className='btn btn-success'>Patient Login</button>
//                  <button className='btn btn-success m-2'>Doctor Login</button>
//               </div>

//            <form className='mb-2 mx-3'>
//                <div className='mb-3'>
//                <label class="form-label">Email address</label>
//                 <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
//                </div>
//                <div className='mb-3'>
//                <label  class="form-label">Password</label>
//                <input type="password" class="form-control" id="exampleInputPassword1"/>
//                </div>
//                <button type='submit' className='btn btn-primary'>Login</button>
//            </form>

//           </div>

//     )
// }

// export default Login;
