import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2, Ban, Unlock, ChevronDown } from "lucide-react";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/doctors`,{
        withCredentials: true, // This sends cookies
        headers: {
          'Content-Type': 'application/json',
        }
      } );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const toggleBlock = (id) =>
    setDoctors((prev) =>
      prev.map((d) => (d._id === id ? { ...d, isBlocked: !d.isBlocked } : d))
    );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`,{
        withCredentials: true, // This sends cookies
        headers: {
          'Content-Type': 'application/json',
        }
      });
      fetchDoctors();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const uniqueYears = useMemo(() => {
    return [
      ...new Set(doctors.map((doc) => new Date(doc.createdAt).getFullYear())),
    ];
  }, [doctors]);

  const uniqueMonths = useMemo(() => {
    return [
      ...new Set(
        doctors.map((doc) =>
          new Date(doc.createdAt).toLocaleString("en-US", { month: "long" })
        )
      ),
    ];
  }, [doctors]);


  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const doctorDate = new Date(doctor.createdAt);
      const matchesYear = selectedYear
        ? doctorDate.getFullYear().toString() === selectedYear
        : true;
      const matchesMonth = selectedMonth
        ? doctorDate.toLocaleString("en-US", { month: "long" }) ===
          selectedMonth
        : true;
      const matchesBlocked = showBlocked ? doctor.isBlocked : true;

      return matchesSearch && matchesYear && matchesMonth && matchesBlocked;
    });
  }, [doctors, searchTerm, selectedYear, selectedMonth, showBlocked]);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );
  console.log(paginatedDoctors);
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 min-h-[650px]">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Doctor List
      </motion.h1>

      <div className="flex flex-wrap  gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or specialization"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 outline-none focus:ring-2 ring-indigo-400 border border-gray-300 rounded-md w-full max-w-md"
        />
        <div className="relative  w-full md:max-w-xs">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full overflow-y-auto appearance-none p-3 border border-gray-300 rounded-xl shadow pr-8 focus:ring-2 ring-indigo-400 outline-none"
          >
            <option value="">Filter by Year</option>
            {uniqueYears.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-3.5 text-gray-600 pointer-events-none"
            size={20}
          />
        </div>

        <div className="relative w-full md:max-w-xs">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full  appearance-none p-3 border border-gray-300 rounded-xl shadow pr-8 focus:ring-2 ring-indigo-400 outline-none"
          >
            <option value="">Filter by Month</option>
            {uniqueMonths.map((month, i) => (
              <option key={i} value={month}>
                {month}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-3.5 text-gray-600 pointer-events-none"
            size={20}
          />
        </div>
        <button
          onClick={() => setShowBlocked((prev) => !prev)}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          {showBlocked ? "Show All" : "Show Blocked"}
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Specialization</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-center">More</th>
              <th className="px-4 py-3 text-center">Block</th>
              <th className="px-4 py-3 text-center">Delete</th>
              <th className="px-4 py-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedDoctors.length > 0 ? (
              paginatedDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-100">
                  <td className="px-4 py-3">{doctor.name}</td>
                  <td className="px-4 py-3">{doctor.specialization}</td>
                  <td className="px-4 py-3">
                    <img
                      src={doctor.image || "/assets/doctor.png"}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => (e.target.src = "/assets/doctor.png")}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-blue-500 underline"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setIsModalOpen(true);
                      }}
                    >
                      View More
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleBlock(doctor._id)}
                      // title={doctor.blocked ? "Unblock" : "Block"}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {doctor.isBlocked ? (
                        <Unlock size={20} />
                      ) : (
                        <Ban size={20} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      title="Delete Doctor"
                      className="text-red-600  hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(doctor.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center justify-center space-x-3 border border-gray-300 rounded-lg px-6 py-3 shadow-lg bg-white w-full max-w-md">
          <button
            className="px-4 py-2 rounded-full text-sm md:text-xl font-semibold bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span className="px-4 py-2 md:text-xl  rounded-full bg-indigo-500 text-white text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 hover:bg-gray-300 md:text-xl  disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Doctor Details
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Experience:</strong> {selectedDoctor.experience}
              </p>
              <p>
                <strong>Degree:</strong> {selectedDoctor.degree}
              </p>
              <p>
                <strong>Fees:</strong> ₹{selectedDoctor.fees}
              </p>
              <p>
                <strong>Address:</strong> {selectedDoctor.address}
              </p>
              <p>
                <strong>About:</strong> {selectedDoctor.about}
              </p>
              <p>
                <strong>Field:</strong> {selectedDoctor.field}
              </p>
              <p>
                <strong>Contact:</strong> {selectedDoctor.contact}
              </p>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-300 text-lg font-bold text-blue-900 rounded hover:bg-blue-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;

// import { useEffect, useState } from "react";
// import axios from 'axios';

// const DoctorList=()=>{
//     const [doctors,setDoctors] = useState();
//     useEffect(()=>{
//         fetchDoctors();
//     },[]);
//     const fetchDoctors = async () => {
//         try {
//           const response = await axios.get("http://localhost:5001/api/doctors");
//           setDoctors(response.data);
//         } catch (error) {
//           console.error("Error fetching doctors:", error);
//         }
//       };
//     return(
//         <>
//            <div className="container mx-auto p-4">
//     <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Doctor List</h1>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="py-3 px-4 text-left text-sm font-semibold">ID</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Specialty</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Specialization</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Experience</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Degree</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Fees</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Address</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">About</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Field</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Contact</th>
//             <th className="py-3 px-4 text-left text-sm font-semibold">Image</th>
//           </tr>
//         </thead>
//         <tbody>
//         {

//          doctors &&   doctors.map((doctor,key)=>(
//           <tr className="border-b hover:bg-gray-50" key={key}>
//             <td className="py-3 px-4 text-gray-700">{doctor.id}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.name}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.speciality}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.specialization}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.experience}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.degree}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.fees}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.address}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.about}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.field}</td>
//             <td className="py-3 px-4 text-gray-700">{doctor.contact}</td>
//             <td className="py-3 px-4">
//               <img src="../../../public/assets/doctor.png" alt="Dr. Ravi Verma" className="w-16 h-16 object-cover rounded-full"/>
//             </td>
//           </tr>
//         ))
//         }
//         </tbody>
//       </table>
//     </div>
//   </div>
//         </>
//     )
// }
// export default DoctorList
