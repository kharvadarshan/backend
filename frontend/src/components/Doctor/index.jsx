import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Star} from "lucide-react";


const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 9; // Number of doctors per page
  const navigate = useNavigate();
  const [specialization,setSpecialization]=useState([]);


  useEffect(() => {
    fetchDoctors();
    getSpecialization();
  }, []);


  


  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`,{withCredentials:true});
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };


  

  const getSpecialization = async()=>{
      try
      {
           const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/getSpecialization`,{
            withCredentials: true, // This sends cookies
          });
  
           if(response.data.ok)
           {
              const nameOnly = response.data.specialization.map((item)=>item.name);
              console.log(nameOnly);
              setSpecialization(["All",...nameOnly]);
           }
      }catch(error)
      {
       console.log(error);
      }
    }
  
  
    console.log(specialization);


  // const specializations = [
  //   "All",
  //   ...new Set(doctors.map((doctor) => doctor.specialization)),
  // ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      selectedSpecialization === "All" ||
      doctor.specialization === selectedSpecialization
  );

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);


  const renderRating = (rating) => (
      <div className="flex items-center justify-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={index < rating ? "text-yellow-500" : "text-gray-300"}
            fill={index < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    );

  return (
    <div className="mx-5 py-7">
      <h1 className="text-center text-4xl text-indigo-600 font-extrabold mb-10">
        Doctor Directory
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-300">
            <h5 className="text-xl font-bold text-center mb-4 text-indigo-700">
              Specialization
            </h5>
            { specialization?.map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 rounded-md my-2 transition-all font-medium ${
                  selectedSpecialization === item
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
                }`}
                onClick={() => {
                  setSelectedSpecialization(item);
                  setCurrentPage(1);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => navigate(`/all-doctors/${doctor._id}`)}
                className="cursor-pointer border p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white border-gray-300 hover:shadow-xl"
              >
                <img
                  src={
                    doctor?.image !== ""
                      ? `${import.meta.env.VITE_API_URL}${doctor.image}`
                      : "/assets/doctor.png"
                  }
                  alt={doctor.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-indigo-200"
                />
                <div>
                 {
                  renderRating(doctor.rating)
                  }
                </div>
                <h5 className="text-xl font-bold text-center text-indigo-700">
                  {doctor.name}
                </h5>
                <p className="text-gray-600 text-center text-lg">
                  {doctor.specialization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center justify-center space-x-3 border border-gray-300 rounded-lg px-6 py-3 shadow-lg bg-white w-full max-w-sm sm:max-w-md">
          <button
            className="px-4 py-2 rounded-full text-base sm:text-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span className="px-4 py-2 rounded-full bg-indigo-500 text-white text-base sm:text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-full text-base sm:text-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
