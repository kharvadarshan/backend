import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';

const EditProfile = () => {
  const [user,setUser]=useState("");
  const activeUser = useSelector((state)=>state.user.user);
  const [photoPreview, setPhotoPreview] = useState(''); // State for photo preview


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      user.image = file;
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };





  useEffect(()=>{
    if(activeUser?.id)
     fetchUser();
  },[activeUser?.id]);


   const fetchUser = async ()=>{
    try{
           const response = await axios.post('http://localhost:5001/profile/edit',{id:activeUser.id});
          
           if(response.data.ok)
           {
               setUser(response.data.result[0]);
           }
    }catch(error)
    {
      console.error(error);
    }
   }

    useEffect(()=>{
        if(user?.image){
        setPhotoPreview(`http://localhost:5001${user.image}`);
        }
      },[user]);

    console.log(user);
   const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
               
               const response = await axios.post('http://localhost:5001/profile/editProfile',
                                                 user,
                                                 {headers: {
                                                   'Content-Type':'multipart/form-data'
                                                 }});
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
    <div className="min-h-[650px] mt-10 md:my-2 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-400 p-6">
          <h1 className="text-3xl font-bold text-center text-white">Edit Profile</h1>
        </div>

        {/* Profile Photo Section */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={photoPreview}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl text-center font-bold text-gray-800">{user.userName}</h2>
              <p className="text-gray-600">{}</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="tel"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="p-6 bg-gray-50">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;