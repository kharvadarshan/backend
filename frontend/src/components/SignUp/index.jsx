import {  useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const navigate=useNavigate();
  const [signUpRole, setSignUpRole] = useState('user'); // Default to 'patient' sign up
  const [message,setMessage]=useState('');
  const [otp,setOTP] = useState('');
  const [step,setStep] = useState('register');
  const [formData,setFormData ]  = useState({
    userName:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:signUpRole,
    image:""
  }) ;

  const requestOTP = async (e) => {
           e.preventDefault();
            //  if(formData.password !== formData.confirmPassword)
            //  {
            //    setMessage('Passwords do not match');
            //  }else{
             try{
                const response = await axios.post('http://localhost:5001/user/sendOTP',{ email:formData.email});

                 if(response.data.ok){
                  setMessage(response.data.message);
                  setStep('verify');
                 }
             }catch(error)
             {
                   setMessage(error.response?.data?.message || "Error requesting OTP");
             }
   };

   const verifyOTPAndRegister = async(e) =>{
    e.preventDefault();
    try{
          const verifyResponse = await axios.post("http://localhost:5001/user/sendOTP",{ email:formData.email,otp:otp});
          if(verifyResponse.data.ok)
          {
            try{
       
              const response = await axios.post("http://localhost:5001/user/signup",formData)
             
             if(response.data.ok)
             {
                  navigate('/login');
             }
             else{
                  navigate('/signup');
             }
           }catch(error)
           {
             console.error(error)
           }
          }
    }catch(error)
    {
        setMessage(error.response?.data?.message || "Error during verification");
    }
  };
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen mx-3 flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md border border-blue-300 my-10 ">
        <div className="items-start mb-5 ">
          <button
            onClick={goToHome}
            className=" p-2  hover:border-blue-500 hover:border rounded-lg"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            Go to Home
          </button>
        </div>
        {step === "register" && (
          <>
            <div className="flex justify-evenly mb-6 gap-2 md:gap-4">
              {/* Buttons to switch sign-up type */}
              <button
                className={`px-6 py-2 text-sm md:text-lg font-medium border ${
                  signUpRole === "user"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                } rounded-md`}
                onClick={() => {
                  setSignUpRole("user");
                  setFormData({ ...formData, role: "user" });
                }}
              >
                Patient Sign Up
              </button>
              <button
                className={`px-6 py-2 text-sm md:text-lg font-medium border ${
                  signUpRole === "doctor"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                } rounded-md`}
                onClick={() => {
                  setSignUpRole("doctor");
                  setFormData({ ...formData, role: "doctor" });
                }}
              >
                Doctor Sign Up
              </button>
                         </div>
                              <form className="space-y-4" onSubmit={requestOTP} >
                                {signUpRole === 'user' && (
                                  <>
                                    <h3 className="md:text-xl text-center text-sm font-bold mb-4">Patient Sign Up</h3>
                                    <div className='d-flex flex-row justify-content-between mb-4' >
                                            <div className=' mr-1'>
                                              <label className="block text-gray-700 md:text-lg  text-sm">username</label>
                                              <input
                                                type="text"
                                                value = {formData.userName}
                                                onChange={(e)=>
                                                  setFormData({ ...formData, userName: e.target.value })
                                                }
                                                className="w-full mt-2 px-3 md:text-lg  text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter your frist name"
                                                required
                                              />
                                            </div>
                                            
                                    </div>
                                    
                                    <div className='mb-4'>
                                      <label className="block text-gray-700 md:text-lg  text-sm">Email</label>
                                      <input
                                        type="email"
                                        value = {formData.email}
                                        onChange={(e)=>
                                                  setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full mt-2 px-3 md:text-lg  text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                        required
                                      />
                                    </div>
                                    <div className='mb-4'>
                                      <label className="block text-gray-700 md:text-lg  text-sm">Password</label>
                                      <input
                                        type="password"
                                        value = {formData.password}
                                        onChange={(e)=>
                                                  setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="w-full mt-2 px-3 py-2 border md:text-lg  text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                        required
                                      />
                                    </div>
                                    <div className='mb-4'>
                                      <label className="block text-gray-700 md:text-lg  text-sm">Confirm address</label>
                                      <input
                                        type="password"
                                        value = {formData.confirmPassword}
                                        onChange={(e)=>
                                                  setFormData({ ...formData,confirmPassword: e.target.value })
                                        }
                                        className="w-full mt-2 px-3 md:text-lg  text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your confirm password"
                                        required
                                      />
                                    </div>
                                  </>
                                )}

                                     {signUpRole === 'doctor' && (
                                       <>
                                       <h3 className="md:text-xl text-center text-sm font-bold mb-4">Doctor Sign Up</h3>
                                         <div className='d-flex flex-row justify-content-between mb-4' >
                                                 <div className=' mr-1'>
                                                   <label className="block text-gray-700 md:text-lg  text-sm">username</label>
                                                   <input
                                                     type="text"
                                                     value = {formData.userName}
                                                     onChange={(e)=>
                                                       setFormData({ ...formData, userName: e.target.value })
                                                     }
                                                     className="w-full mt-2 px-3 md:text-lg  text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                     placeholder="Enter your frist name"
                                                     required
                                                   />
                                                 </div>
                                         </div>
                                         
                                         <div className='mb-4'>
                                           <label className="block text-gray-700 md:text-lg  text-sm">Email</label>
                                           <input
                                             type="email"
                                             value = {formData.email}
                                             onChange={(e)=>
                                                       setFormData({ ...formData, email: e.target.value })
                                             }
                                             className="w-full mt-2 px-3 md:text-lg  text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             placeholder="Enter your email"
                                             required
                                           />
                                         </div>
                                         <div className='mb-4'>
                                           <label className="block text-gray-700 md:text-lg  text-sm">Password</label>
                                           <input
                                             type="password"
                                             value = {formData.password}
                                             onChange={(e)=>
                                                       setFormData({ ...formData, password: e.target.value })
                                             }
                                             className="w-full mt-2 px-3 py-2 border md:text-lg  text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             placeholder="Enter your password"
                                             required
                                           />
                                         </div>
                                         <div className='mb-4'>
                                           <label className="block text-gray-700 md:text-lg  text-sm">Confirm address</label>
                                           <input
                                             type="password"
                                             value = {formData.confirmPassword}
                                             onChange={(e)=>
                                                       setFormData({ ...formData,confirmPassword: e.target.value })
                                             }
                                             className="w-full mt-2 px-3 md:text-lg  text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             placeholder="Enter your confirm password"
                                             required
                                           />
                                         </div>
                                       </>
                                     )}

              <div className="flex justify-center mt-5 md:text-lg text-sm">
                <button
                  type="submit"
                  className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Request OTP
                </button>
              </div>
              <div className="md:text-lg text-sm text-center">
                <p>
                  Already Sign Up?{" "}
                  <Link to="/login" className="text-blue-500  hover:font-semibold">
                    Login
                  </Link>
                </p>
              </div>

              

              {message && <p className="text-center text-red-500">{message}</p>}
            </form>
          </>
        )}

        {step === "verify" && (
          <>
            <form className="space-y-4" onSubmit={verifyOTPAndRegister}>
              <h3 className="md:text-xl text-center text-sm font-bold mb-4">
                Verify OTP
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 md:text-lg text-sm">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="w-full mt-2 px-3 md:text-lg text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the OTP sent to your email"
                  required
                />
              </div>

              <div className="flex justify-center mt-5 md:text-lg text-sm">
                <button
                  type="submit"
                  className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Verify & Register
                </button>
              </div>

              {message && <p className="text-center text-red-500">{message}</p>}
            </form>
          </>
        )}

        {/* Dynamic Form */}
      </div>
    </div>
  );
};

export default SignUp;





//import  { useState } from 'react';
//import { FcGoogle  } from "react-icons/fc";
// import { FaFacebook  } from "react-icons/fa";
// const SignUp=()=> {
//   const [signUpType, setSignUpType] = useState('patient'); // Default to 'patient' login

//   return (
//     <div className='container-fluid border border-1  my-5 p-3 '>
//       <div className=' btn-group mx-3 my-5  d-flex flex-row justify-content-between'  role="group"
//             aria-label="Basic outlined example">
//         {/* Buttons to switch login type */}
//         <button
//           type="button"
//           className={btn btn-outline-primary  ${signUpType === 'patient' ? 'active' : ''}}
//           onClick={() => setSignUpType('patient')}
//         >
//           Patient Sign Up
//         </button>
//         <button
//           type="button"
//           className={btn btn-outline-primary   ${signUpType  === 'doctor' ? 'active' : ''}}
//           onClick={() => setSignUpType('doctor')}
//         >
//           Doctor Sign Up
//         </button>
//         <button
//            type="button"
//            className={btn btn-outline-primary   ${signUpType  === 'admin' ? 'active' : ''}}
//            onClick={() => setSignUpType('admin')}>
//          Admin Sign Up
//         </button>
//       </div>

//       {/* Dynamic Form */}
//       <form className='mb-2 mx-3'>
//       {signUpType  === 'patient' && (
//         <>
//         <h3 className='my-2'>Patient Sign Up</h3>
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
//         {signUpType  === 'doctor' && (
//             <>
//             <h3 className='my-2'>Doctor Sign Up</h3>
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
//             signUpType ==='admin' && (
//                <>
//                <h3 className='my-2'>Admin Sign Up</h3>
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

//         <div className='d-flex justify-content-center my-5'>
//         <button type='submit' className='btn btn-primary  w-50'>
//           Sign Up
//         </button>
//         </div>
//         <div className='px-3 mt-5 d-flex flex-column justify-content-between'>
//                      <button className='fs-3  btn btn-outline-dark mb-2 d-flex flex-row justify-content-center align-items-center'> <FcGoogle  /><span className='fs-3 p-2 px-4'>Continue with Google</span></button>
//                      <button className='fs-3   btn btn-outline-dark mt-2 d-flex flex-row justify-content-center align-items-center'> <FaFacebook /><span className='fs-3 p-2 px-4'>Continue with Facebook</span></button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SignUp;

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
