
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const specializations = ["All", ...new Set(doctors.map((doctor) => doctor.specialization))];

  const filteredDoctors = doctors.filter(
    (doctor) => selectedSpecialization === "All" || doctor.specialization === selectedSpecialization
  );

  return (
    <div className="mx-5">
      <div className="mx-auto pt-5 pb-10">
        <h1 className="text-center text-3xl text-gray-800 font-bold mb-7">Doctor Details</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4">
            <div className="bg-gray-300 p-4 rounded-lg shadow-md">
              <h5 className="text-lg font-semibold mb-3">Specialization</h5>
              {specializations.map((specialization) => (
                <button
                  key={specialization}
                  className={`w-full text-left px-4 py-2 rounded-md my-1 transition-colors ${
                    selectedSpecialization === specialization
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedSpecialization(specialization)}
                >
                  {specialization}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => navigate(`/all-doctors/${doctor._id}`)}
                  className="cursor-pointer border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-white border-gray-300"
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                  />
                  <h5 className="text-lg font-bold text-center">{doctor.name}</h5>
                  <p className="text-gray-600 text-center">{doctor.specialization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;


