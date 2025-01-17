
import  { useState } from 'react';
import { FcGoogle  } from "react-icons/fc";
import { FaFacebook  } from "react-icons/fa";
import './style.scss';
function LoginPage() {
  const [loginType, setLoginType] = useState('patient'); // Default to 'patient' login

  return (
    <div className='container-fluid d-flex flex-column justify-content-center border border-1 my-5 p-3 ' >
       <div 
            className='btn-group mx-3 my-5 d-flex flex-row justify-content-between bg-light' 
            role="group" 
            aria-label="Basic outlined example"
          >
        {/* Buttons to switch login type */}
        <button
          type="button"
          className={`btn btn-outline-primary ${loginType === 'patient' ? 'active' : ''}`}
          onClick={() => setLoginType('patient')}
        >
          Patient Login
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary  ${loginType === 'doctor' ? 'active' : ''}`}
          onClick={() => setLoginType('doctor')}
        >
          Doctor Login
        </button>
        <button 
            type="button" 
            className={`btn btn-outline-primary  ${loginType === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginType('admin')}>
          Admin Login
        </button>
      </div>

      {/* Dynamic Form */}
      <form className='mb-2  mx-3 d-flex flex-column justify-content-center' >
      {loginType === 'patient' && (
        <>
        <h3 className='my-2'>Patient Login</h3>
        <div className='mb-3'>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
        </>
      )}
        

        {/* Extra field for Doctor Login */}
        {loginType === 'doctor' && (
            <>
            <h3 className='my-2'>Doctor Login</h3>
        <div className='mb-3'>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
          <div className='mb-3'>
            <label className='form-label'>Doctor ID</label>
            <input
              type='text'
              className='form-control'
              id='exampleDoctorID'
            />
          </div>
          </>
        )}

        {
            loginType==='admin' && (
               <>
               <h3 className='my-2'>Admin Login</h3>
                  <div className='mb-3'>
                    <label className='form-label'>Email address</label>
                    <input
                      type='email'
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='exampleInputPassword1'
                    />
                  </div>
               </>
            )
        }
        <div className='d-flex justify-content-center mt-5 mb-3'>
        <button type='submit' className='btn btn-primary  w-50'>
          Login
        </button>
        </div>
        <div className='d-flex justify-content-center'>
          <p>Don&apos;t have an account? <a href='/signup'>Sign Up</a></p>
       </div>
        <div className='px-3 mt-5 d-flex flex-column justify-content-between'>
             <button className='fs-3  btn btn-outline-dark mb-2 d-flex flex-row justify-content-center align-items-center'> <FcGoogle  /><span className='fs-3 p-2 px-4'>Continue with Google</span></button>
             <button className='fs-3   btn btn-outline-dark mt-2 d-flex flex-row justify-content-center align-items-center'> <FaFacebook /><span className='fs-3 p-2 px-4'>Continue with Facebook</span></button>
       </div>
      </form>
    </div>
  );
}

export default LoginPage;




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