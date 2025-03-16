import { useState } from "react";
import axios from 'axios';
import {toast } from 'react-toastify';

const EditProfile = ({doctor}) => {
  
  const [formData,setFormData] = useState({...doctor});

  const handleSubmit = async(e)=>{
    e.preventDefault();
     try{
            const response = await axios.post('http://localhost:5001/doctorprofile/editProfile',formData);
           if(response.data.ok)
           {
                toast.success("Profile updated Successfully...!",{
                           position:"top-right"
                      });
           }

     }catch(error)
     {
          console.log(error);
     }
  };


  return (
    <form className="flex-1 p-4 md:p-8" onSubmit={handleSubmit}> 
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        {/* Profile Image and Name */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="https://randomuser.me/api/portraits/men/94.jpg"
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">{formData.name}</h2>
            <p className="text-gray-600">{formData.contact}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 md:my-6 border-gray-200" />

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
               name="contact"
              value={formData.contact}
              onChange={(e)=>setFormData({...formData,contact:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Speciality */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Speciality
            </label>
            <input
              type="text"
               name="specialty"
              value={formData.specialty}
              onChange={(e)=>setFormData({...formData,specialty:e.target.value})}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <input
              type="text"
               name="specialization"
              value={formData.specialization}
              onChange={(e)=>setFormData({...formData,specialization:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              type="text"
               name="experience"
              value={formData.experience}
              onChange={(e)=>setFormData({...formData,experience:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Degree */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Degree
            </label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={(e)=>setFormData({...formData,degree:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Fees */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fees
            </label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={(e)=>setFormData({...formData,fees:Number(e.target.value)})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Adress */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e)=>setFormData({...formData,address:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={(e)=>setFormData({...formData,about:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Field
            </label>
            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={(e)=>setFormData({...formData,field:e.target.value})}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

         

          {/* Save Changes Button */}
          <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;