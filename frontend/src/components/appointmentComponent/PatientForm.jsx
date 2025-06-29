import {} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {} from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useEffect,useState } from "react";
import { useToast } from "../Notification/ToastProvider";

const PatientForm = ({ appointmentData, setAppointmentData }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const fieldData = [
    { id: "name", label: "Your Name" },
    { id: "patientname", label: "Patient Name" },
    { id: "age", label: "Patient Age", type: "number" },
    { id: "gender", label: "Patient Gender" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "city", label: "City" },
    { id: "number", label: "Mobile Number", type: "tel" },
    { id: "address", label: "Address" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      patientForm: {
        ...appointmentData.patientForm,
        [id]: value,
      },
    });
  };

  const [doctor, setDoctor] = useState(null);
  console.log(doctor);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctorprofile/getDoctorById/${appointmentData.doctorId}`,{
            withCredentials:true
          }
        );
        if(response.data.ok)
        {
          setDoctor(response.data.result);
        }
        
      } catch (error) {
        console.error("Error fetching doctor:", error);
        // toast.error("Failed to load doctor details");
        toast("error","Failed To Load Doctor Details...!");
      }
    };
    if (appointmentData?.doctorId) {
      fetchDoctor();
    }
  }, [appointmentData?.doctorId]);

  const handleSubmit = async (appointment) => {

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments/appointments`,
        appointment,
        {
          withCredentials:true
        }
      );

      if (response.data.ok) {
        console.log(response.data);
        // toast.success("Appointment booked successfully!", {
        //   position: "top-right",
        //   autoClose: 1000,
        // });
        toast("success","Appointment Booked Successfully...!");
        navigate("/checkout",{ state:
           { 
              appointmentData:response.data.appointment,
              doctor:doctor,
             } });
        // setTimeout(() => navigate("/all-doctors"), 2000); // Redirect after 2 sec
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };
  
  return (
    <div className="container py-20 md:py-20 min-h-screen flex justify-center items-center">
      <div className="bg-white text-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-3xl transform transition">
        <h2 className="text-center text-blue-600 font-bold text-3xl mb-6">
          Appointment Form
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(appointmentData);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fieldData.map(({ id, label, type = "text" }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block pl-1 mb-2 text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                {id === "gender" ? (
                  <div className="relative">
                    <select
                      id={id}
                      value={appointmentData.patientForm[id]}
                      onChange={handleChange}
                      className="w-full appearance-none p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition outline-none pr-10"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>

                    {/* Custom Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <input
                    type={type}
                    id={id}
                    value={appointmentData.patientForm[id]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition outline-none"
                    placeholder={`Enter ${label}`}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label
              htmlFor="reason"
              className="block pl-1 mb-2 text-sm font-medium text-gray-700"
            >
              Enter Your Reason
            </label>
            <textarea
              id="reason"
              value={appointmentData.patientForm.reason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition outline-none"
              placeholder="Enter Your Reason For The Appointment"
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
              Add Appointment
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
