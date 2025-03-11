import { useEffect, useState } from "react";
import axios from 'axios';
import { motion } from "framer-motion";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

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

  const truncateText = (text, maxLength = 15) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 min-h-[650px]">
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Doctor List
      </motion.h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Specialty</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Specialization</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Experience</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Degree</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Fees</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Address</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">About</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Field</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Image</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <motion.tr
                  key={doctor.id || index} // Use doctor.id if available, fallback to index
                  className="hover:bg-gray-50 transition"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <td className="py-3 px-4 text-gray-700">{doctor.id}</td>
                  <td className="py-3 px-4 text-gray-700">{doctor.name}</td>
                  <td className="py-3 px-4 text-gray-700">{doctor.specialty || doctor.speciality}</td> {/* Handle typo */}
                  <td className="py-3 px-4 text-gray-700">{doctor.specialization}</td>
                  <td className="py-3 px-4 text-gray-700">{doctor.experience}</td>
                  <td className="py-3 px-4 text-gray-700">{doctor.degree}</td>
                  <td className="py-3 px-4 text-gray-700">₹{doctor.fees}</td>
                  <td className="py-3 px-4 text-gray-700">{doctor.address}</td>
                  <td className="py-3 px-4 text-gray-700">{truncateText(doctor.about)}</td>
                  <td className="py-3 px-4 text-gray-700">{doctor.field}</td>
                  <td className="py-3 px-4 text-gray-700">{doctor.contact}</td>
                  <td className="py-3 px-4">
                    <img
                      src={doctor.image || "/assets/doctor.png"} // Use doctor.image if available
                      alt={doctor.name}
                      className="w-16 h-16 object-cover rounded-full"
                      onError={(e) => (e.target.src = "/assets/doctor.png")} // Fallback image
                    />
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="py-4 text-center text-gray-500">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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