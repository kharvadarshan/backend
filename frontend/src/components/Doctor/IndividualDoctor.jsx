import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo,setPhoto]=useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) {
        setError("Invalid doctor ID");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setError("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };

   

    fetchDoctor();
  }, [id]);

  useEffect(()=>{
    if(doctor?.image)
    {
      setPhoto(`${import.meta.env.VITE_API_URL}${doctor.image}`);
    }else{
      setPhoto("/assets/doctor.png")
    }
  },[doctor]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!doctor) return <div className="text-center text-lg">Doctor not found</div>;

  return (
    <motion.div 
      className="container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg border border-blue-200 rounded-lg p-6">
        <div className="flex flex-col items-center text-center">
          <motion.img
            src={photo} 
            alt={doctor.name}
            className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-500"
            whileHover={{ scale: 1.1 }}
          />
          <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-blue-600 font-semibold">{doctor.specialization}</p>
        </div>

        {/* Doctor Details */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Doctor Details</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Degree:</strong> {doctor.degree}</p>
            <p><strong>Fees:</strong> ₹{doctor.fees}</p>
            <p><strong>Address:</strong> {doctor.address}</p>
            <p><strong>Field:</strong> {doctor.field}</p>
            <p><strong>Contact:</strong> {doctor.contact}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">About</h3>
          <p className="text-gray-600">{doctor.about}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <motion.button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/all-doctors")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to All Doctors
          </motion.button>
          
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate(`/appointment/${id}`, { state: { doctor } })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Appointment →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorDetails;
