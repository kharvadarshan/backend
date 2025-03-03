import { useState } from "react";
const EditProfile = ()=>{

   const [formData,setFormData]=useState({
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "+1234567890",
   });

   const [photo, setPhoto] = useState(null); // State for the selected photo file
   const [photoPreview, setPhotoPreview] = useState('C:\\Users\\Admin\\Desktop\\DesignEngineering\\Backend\\frontend\\public\\assets\\circle-user-solid.svg'); // State for photo preview

   const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };
   console.log(formData);

    return(
        <form className="flex-1 p-8" onSubmit='' >
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-6">
            <img
              src={photoPreview}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photo
               </label>
              <input 
                 type='file'
                 accept="image/*"
                 onChange={handlePhotoChange}
                 className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                 />
            </div>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onClick={(e)=>setFormData({...formData,name:e.target.value})}
                defaultValue="John Doe"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onClick={(e)=>setFormData({...formData,email:e.target.value})}
                defaultValue="john.doe@example.com"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.contact}
                onClick={(e)=>setFormData({...formData,contact:e.target.value})}
                defaultValue="+1234567890"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
        </form>
    )
}

export default EditProfile;