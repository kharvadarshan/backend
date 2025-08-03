import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = ({ doctor, onPhotoUpdate }) => {
  const [formData, setFormData] = useState("");

  const fetchDoctor = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/doctorprofile/getDoctorById`,
        { email: doctor.contact },{withCredentials:true}
      );
      if (response.data.ok) {
        setFormData(response.data.result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    fetchDoctor();
  }, []);

  useEffect(() => {
    if (formData?.image) {
      setPhotoPreview(`http://localhost:5001${formData.image}`);
    }
  }, [formData]);

  //  `C:\\Users\\Admin\\Desktop\\DesignEngineering\\Backend\\uploads\\${formData.image}`

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formData.image = file;
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/doctorprofile/editProfile",
        formData,
        { 
          withCredentials:true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.ok) {
        toast.success("Profile updated Successfully...!", {
          position: "top-right",
        });
        const newPhotoUrl = `http://localhost:5001${doctor?.image}`;
        onPhotoUpdate(newPhotoUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex-1 p-4 md:p-8" onSubmit={handleSubmit}>
      {/* Heading */}

      {/* Profile Card */}
      <div className="bg-white p-4  mb-4 border border-blue-400 rounded-lg shadow-lg">
        <h3 className="text-2xl mt-2 lg:text-4xl mb-2 text-center font-bold  text-indigo-700">
          Edit Profile
        </h3>
        {/* Profile Image and Name */}
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
              <h2 className="text-2xl text-center font-bold text-gray-800">
                {formData.name}
              </h2>
              <p className="text-gray-600">{formData.contact}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        {/* <hr className="my-4 md:my-6 border-gray-200" /> */}

        {/* Form Fields */}
        <div className=" lg:grid lg:gap-5 space-y-4 lg:space-y-0 lg:grid-cols-2 grid-cols-1">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, specialization: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, fees: Number(e.target.value) })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, field: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="md:min-w-96 min-w-56  mx-auto  col-span-2  bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
