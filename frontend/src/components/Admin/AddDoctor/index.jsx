import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
const AddDoctor = () => {
  const fieldData = [
    { id: "name", label: "Full Name" },
    { id: "email", label: "Email Id" },
    { id: "specialization", label: "Specialization" },
    { id: "speciality", label: "Speciality" },
    { id: "phoneno", label: "Phone No" },
    { id: "experience", label: "Experience", type: "number" },
    { id: "degree", label: "Degree" },
    { id: "field", label: "Field" },
    { id: "fees", label: "Fees", type: "number" },
    { id: "address", label: "Address" },
  ];

  const specializationOptions = [
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Gynecology",
    "General Medicine",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    speciality: "",
    phoneno: "",
    experience: "",
    degree: "",
    field: "",
    fees: "",
    address: "",
    about: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Data:", formData);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to add Doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/admin/addDoctor`,
            formData
          );

          if (response.data.ok) {
            Swal.fire("Added!", "The new doctor has been added.", "success");
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not connect to the server.", "error");
          console.error(error);
        }
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container py-20 md:py-10 min-h-screen flex justify-center items-center">
      <div className="bg-white text-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-center text-blue-600 font-bold  text-2xl md:text-4xl mb-6">
          Add Doctor
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fieldData.map(({ id, label, type = "text" }) =>
              id === "specialization" ? (
                <div key={id} ref={dropdownRef} className="relative w-full">
                  <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <div
                    className="relative h-[48px]"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div className="flex justify-between items-center w-full h-full px-3 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-pointer">
                      <span>{formData[id] || `Select ${label}`}</span>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                    {showDropdown && (
                      <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md">
                        {specializationOptions.map((option) => (
                          <div
                            key={option}
                            onClick={() => {
                              setFormData({ ...formData, [id]: option });
                              setShowDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block pl-1 mb-2 text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition outline-none"
                    placeholder={`Enter ${label}`}
                    required
                  />
                </div>
              )
            )}
          </div>

          <div className="mt-6">
            <label
              htmlFor="about"
              className="block pl-1 mb-2 text-sm font-medium text-gray-700"
            >
              About
            </label>
            <textarea
              id="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition outline-none"
              placeholder="Enter About"
              rows="4"
            ></textarea>
          </div>

          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              type="submit"
            >
              Add Doctor
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;

// import { useState } from "react";
// import { motion } from "framer-motion";

// const AddDoctor = () => {
//    const fieldData = [
//     { id: "name", label: "Full Name" },
//     { id: "email", label: "Email Id" },
//     { id: "specialization", label: "Specialization" },
//     { id: "speciality", label: "Speciality" },
//     { id: "phoneno", label: "Phone No" },
//     { id: "experience", label: "Experience", type: "number" },
//     { id: "degree", label: "Degree" },
//     { id: "field", label: "Field" },
//     { id: "fees", label: "Fees", type: "number" },
//     { id: "address", label: "Address" },
//   ];

//   const [formData, setFormData] = useState({
//     name: "",
//     specialization: "",
//     experience: "",
//     degree: "",
//     fees: "",
//     address: "",
//     about: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.id]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Doctor Data:", formData);
//     setFormData({
//       name: "",
//       specialization: "",
//       experience: "",
//       degree: "",
//       fees: "",
//       address: "",
//       about: "",
//     });
//   };

//   return (
//     <div className="container py-20 md:py-10 min-h-screen flex justify-center items-center p-6">
//       <div className="bg-white text-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-3xl transform transition">
//         <h2 className="text-center text-blue-600 font-bold text-3xl mb-6">
//           Add Doctor
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {fieldData.map(({ id, label, type = "text" }) => (
//               <div key={id}>
//                 <label
//                   htmlFor={id}
//                   className="block pl-1 mb-2 text-sm font-medium text-gray-700"
//                 >
//                   {label}
//                 </label>
//                 <input
//                   type={type}
//                   id={id}
//                   value={formData[id]}
//                   onChange={handleChange}
//                   className="w-full  p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition outline-none"
//                   placeholder={`Enter ${label}`}
//                   required
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="mt-6">
//             <label
//               htmlFor="about"
//               className="block pl-1 mb-2 text-sm font-medium text-gray-700"
//             >
//               About
//             </label>
//             <textarea
//               id="about"
//               value={formData.about}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition outline-none"
//               placeholder="Enter About"
//               rows="4"
//             ></textarea>
//           </div>

//           <div className="flex justify-center mt-8">
//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.3)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
//               type="submit"
//             >
//               Add Doctor
//             </motion.button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDoctor;
