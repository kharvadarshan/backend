import { motion } from "framer-motion";
import { useState } from "react";

const Appointment = () => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set items per page

  const contact = {
    message: "Reason Here Reason HereReason Here",
  };

  const tableData = [
    "ID",
    "Name",
    "Contact No",
    "Doctor Name",
    "Date",
    "Time",
    "Status",
    "Action",
  ];

  const appointments = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: "John Doe",
    contact: "1234567890",
    doctor: "Dr. ABC",
    date: "12/03/2025",
    time: "12:30",
    status: i % 2 === 0 ? "Confirmed" : "Inactive",
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-7xl  mx-auto p-4">
      <motion.h2
        className="text-red-600 pt-14 md:pt-7 lg:p-3 text-center text-2xl md:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Latest Appointments
      </motion.h2>

      <div className="overflow-x-auto bg-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-400">
            <tr>
              {tableData.map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-center divide-gray-200">
            {currentItems.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4">{item.id}</td>
                <td className="px-4 py-4">{item.name}</td>
                <td className="px-4 py-4">{item.contact}</td>
                <td className="px-4 py-4">{item.doctor}</td>
                <td className="px-4 py-4">{item.date}</td>
                <td className="px-4 py-4">{item.time}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === "Inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4 flex space-x-3">
                  <motion.button
                    onClick={() => setSelectedReason(contact)}
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.4 }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Reason
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.4 }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.4 }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4 p-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;








// import { motion } from "framer-motion";
// import { useState,useEffect } from "react";
// import axios from "axios";
// const Appointment = () => {
//   const [selectedReason, setSelectedReason] = useState(null);
//   const contact = {
//     message : "Reason Here Reason HereReason Here"
//   }
//   const tableData = [
//     "Doctor",
//     "Patient",
//     "Date",
//     "Time",
//     "Reason", 
//     "Status",
//     "Action",
//   ];

//   const [appointments,setAppointment]=useState([]);
//     useEffect(()=>{
//       getAllAppointment();
//     },[])
//     const getAllAppointment = async()=>{
//       try{
//         const response = await axios.get("http://localhost:5001/api/getAllAppointment");
//         if(response.data.Ok){
//         setAppointment(response.data.result);
//         }
//         console.log(appointments);
//       }catch(error)
//       {
//         console.log(error);
//       }
//     }

//   const reasonPopUp = () => {
//     if (!selectedReason) return null; // Prevents rendering when no reason is selected
  
//     return (
//       <>
//         {/* Overlay */}
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-40"
//           onClick={() => setSelectedReason(null)}
//         ></div>
  
//         {/* Popup Box */}
//         <motion.div
//           className="fixed bg-white shadow-2xl p-6 rounded-lg w-[90%] md:max-w-[90%] sm:w-[500px] max-w-[78%] z-50 md:left-32 left-9 lg:left-96 xl:left-[40%]"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 20 }}
//           exit={{ opacity: 0, y: -50 }}
//           transition={{ duration: 0.3 }}
//           style={{
//             top: "10vh",
//             transform: "translate(-50%, 0%)",
//             position: "fixed",
//             minHeight: "150px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//           }}
//         >
//           {/* Close Button */}
//           <button
//             onClick={() => setSelectedReason(null)}
//             className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
//           >
//             ✖
//           </button>
  
//           {/* Title */}
//           <h2 className="text-2xl font-semibold mb-4 text-center">Reason</h2>
  
//           {/* Content */}
//           <div
//             className="overflow-y-auto px-2"
//             style={{ maxHeight: "65vh", wordBreak: "break-word" }}
//           >
//             <p className="text-gray-700 text-center">
//               {selectedReason?.message || "No Reason Provided"}
//             </p>
//           </div>
//         </motion.div>
//       </>
//     );
//   };
  
  

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <motion.h2
//         className="text-red-600 pt-14 md:pt-7 lg:p-3  text-center text-2xl md:text-4xl font-bold mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Latest Appointments
//       </motion.h2>

//       {/* Stats Cards */}
//       <div className="grid text-center grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         {[
//           { label: "Total", count: 0, color: "bg-blue-500" },
//           { label: "Pending", count: 5, color: "bg-yellow-500" },
//           { label: "Approved", count: 3, color: "bg-green-500" },
//           { label: "Rejected", count: 7, color: "bg-red-500" },
//         ].map((stat, index) => (
//           <motion.div
//             key={index}
//             className={`p-4 text-white rounded-lg shadow-md ${stat.color}`}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: index * 0.2 }}
//           >
//             {stat.label}: {stat.count}
//           </motion.div>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-gray-300 rounded-lg shadow-lg">
//         <table className="min-w-full divide-y  divide-gray-300">
//           <thead className=" bg-gray-400">
//             <tr>
//               {tableData.map((heading, index) => (
//                 <th
//                   key={index}
//                   className="px-4 py-3 text-center text-xs font-medium text-white-600 uppercase tracking-wider"
//                 >
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y text-center divide-gray-200">
//             {appointments.map((app,index) => (
//               <motion.tr
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.2 }}
//                 className="hover:bg-gray-50 transition"
//               >
//                 <td className="px-4 py-4">{app.doctor}</td>
//                 <td className="px-4 py-4">{app.patientId}</td>
//                 <td className="px-4 py-4">{app.date}</td>
//                 <td className="px-4 py-4">{app.time}</td>
//                 <td className="px-4 py-4">{app.reason}</td>
//                 <td className="px-4 py-4">
//                  <span
//                     className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ${
//                     app.status === 'Confirmed'
//                         ? "bg-red-100 text-red-800"
//                         : "",
//                     app.status === 'Rejected' ? "bg-green-100 text-green-800":""
//                     }`}
//                   >
//                    {app.status}
//                   </span> 
//                 </td>
//                 <td className="px-4 py-4 flex space-x-3">
//                   <motion.button
//                    onClick={() => setSelectedReason(contact)}
//                     whileHover={{ scale: 0.9 }}
//                     whileTap={{ scale: 1.4 }}
//                     className="mt-2 mr-2 sm:mt-0 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition w-full sm:w-auto"
//                   >
//                     Reason
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 0.9 }}
//                     whileTap={{ scale: 1.4 }}
//                     className="mt-2 mr-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition w-full sm:w-auto"
//                   >
//                     Edit
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 0.9 }}
//                     whileTap={{ scale: 1.4 }}
//                     className="mt-2 mr-2 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition w-full sm:w-auto"
//                   >
//                     Delete
//                   </motion.button>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//             {reasonPopUp()}
//       </div>
//     </div>
//   );
// };

// export default Appointment;