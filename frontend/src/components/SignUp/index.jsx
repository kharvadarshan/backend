import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [signUpType, setSignUpType] = useState('patient'); // Default to 'patient' sign up
 
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md my-10 mx-7">
        <div className="flex justify-evenly mb-6 gap-2 md:gap-4">
          {/* Buttons to switch sign-up type */}
          <button
            className={`px-6 py-2 text-sm md:text-lg font-medium border ${
              signUpType === 'patient' ? 'bg-blue-500 text-white' : 'text-gray-700'
            } rounded-md`}
            onClick={() => setSignUpType('patient')}
          >
            Patient Sign Up
          </button>
          <button
            className={`px-6 py-2 text-sm md:text-lg font-medium border ${
              signUpType === 'doctor' ? 'bg-blue-500 text-white' : 'text-gray-700'
            } rounded-md`}
            onClick={() => setSignUpType('doctor')}
          >
            Doctor Sign Up
          </button>
          <button
            className={`px-6 py-2 text-sm md:text-lg font-medium border ${
              signUpType === 'admin' ? 'bg-blue-500 text-white' : 'text-gray-700'
            } rounded-md`}
            onClick={() => setSignUpType('admin')}
          >
            Admin Sign Up
          </button>
        </div>

        {/* Dynamic Form */}
        <form className="space-y-4">
          {signUpType === 'patient' && (
            <>
              <h3 className="md:text-xl text-center text-sm font-bold mb-4">Patient Sign Up</h3>
              <div className='mb-4'>
                <label className="block text-gray-700 md:text-lg  text-sm">Email address</label>
                <input
                  type="email"
                  className="w-full mt-2 px-3 md:text-lg  text-sm py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='mb-4'>
                <label className="block text-gray-700 md:text-lg  text-sm">Password</label>
                <input
                  type="password"
                  className="w-full mt-2 px-3 py-2 border md:text-lg  text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}

          {signUpType === 'doctor' && (
            <>
              <h3 className="md:text-xl text-sm text-center font-bold mb-4">Doctor Sign Up</h3>
              <div className='mb-4'>
                <label className="block text-gray-700 md:text-lg ml-1 mb-2  text-sm">Email address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border md:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='mb-4'>
                <label className="block text-gray-700 md:text-lg ml-1 mb-2  text-sm">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border md:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className='mb-4'>
                <label className="block md:text-lg text-sm ml-1 mb-2 text-gray-700">Doctor ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border md:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Doctor ID"
                  required
                />
              </div>
            </>
          )}

          {signUpType === 'admin' && (
            <>
              <h3 className="md:text-xl text-sm text-center font-bold mb-4">Admin Sign Up</h3>
              <div className='mb-4'>
                <label className="block md:text-lg text-sm ml-1 mb-2 text-gray-700">Email address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 md:text-lg text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='mb-4'>
                <label className="block text-gray-700 md:text-lg text-sm ml-1 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md md:text-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-center mt-5 md:text-lg text-sm">
            <button type="submit" className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Sign Up
            </button>
          </div>
          <div className='md:text-lg text-sm text-center'>
            <p>Already Sign Up? <Link to="/login" className='text-blue-500 ' >Login</Link></p>
          </div>
          <div className="flex flex-col space-y-3 mt-6">
            <button className="flex items-center justify-center md:text-lg text-sm border py-2 rounded-md">
              <FcGoogle className="mr-2" />
              Continue with Google
            </button>
            <button className="flex items-center justify-center md:text-lg text-sm border py-2 rounded-md">
              <FaFacebook className="text-blue-700 mr-2" />
              Continue with Facebook
            </button>
          </div>
        </form>
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
//           className={`btn btn-outline-primary  ${signUpType === 'patient' ? 'active' : ''}`}
//           onClick={() => setSignUpType('patient')}
//         >
//           Patient Sign Up
//         </button>
//         <button
//           type="button"
//           className={`btn btn-outline-primary   ${signUpType  === 'doctor' ? 'active' : ''}`}
//           onClick={() => setSignUpType('doctor')}
//         >
//           Doctor Sign Up
//         </button>
//         <button  
//            type="button"
//            className={`btn btn-outline-primary   ${signUpType  === 'admin' ? 'active' : ''}`}
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