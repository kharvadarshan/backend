import { useState } from "react";
import { motion } from "framer-motion";

const AddDoctor = () => {
   const fieldData = [
    { id: "name", label: "Your Name" },
    { id: "specialization", label: "Specialization" },
    { id: "experience", label: "Experience", type: "number" },
    { id: "degree", label: "Degree" },
    { id: "fees", label: "Fees", type: "number" },
    { id: "address", label: "Address" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    degree: "",
    fees: "",
    address: "",
    about: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Data:", formData);
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      degree: "",
      fees: "",
      address: "",
      about: "",
    });
  };

  return (
    <div className="container py-20 md:py-10 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white text-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-3xl transform transition">
        <h2 className="text-center text-blue-600 font-bold text-3xl mb-6">
          Add Doctor
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fieldData.map(({ id, label, type = "text" }) => (
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
            ))}
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
