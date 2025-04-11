import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";

const Appointment = () => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const itemsPerPage = 3;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAllAppointments();
  }, []);

  const getAllAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/getAllAppointment"
      );
      if (response.data.Ok) {
        setAppointments(response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueYears = useMemo(() => {
    if (!appointments) return [];
    const years = [
      ...new Set(
        appointments.map((appt) =>
          new Date(appt.date.$date || appt.date).getFullYear()
        )
      ),
    ];
    return years.sort();
  }, [appointments]);

  const uniqueMonths = useMemo(() => {
    if (!appointments) return [];
    const months = [
      ...new Set(
        appointments.map((appt) =>
          new Date(appt.date.$date || appt.date).toLocaleString("en-US", {
            month: "long",
          })
        )
      ),
    ];
    return months;
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientForm.patientname
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const dateObj = new Date(item.date.$date || item.date);
      const matchesMonth = selectedMonth
        ? dateObj.toLocaleString("en-US", { month: "long" }) === selectedMonth
        : true;
      const matchesYear = selectedYear
        ? dateObj.getFullYear() === parseInt(selectedYear)
        : true;

      return matchesSearch && matchesMonth && matchesYear;
    });
  }, [appointments, searchQuery, selectedMonth, selectedYear]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const reasonPopUp = () => {
    if (!selectedReason) return null;
    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-40"
          onClick={() => setSelectedReason(null)}
        ></div>

        <motion.div
          className="fixed bg-white shadow-2xl p-6 rounded-2xl w-[90%] md:w-[500px] z-50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          style={{
            top: "10vh",
            transform: "translate(-50%, 0%)",
            left: "50%",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setSelectedReason(null)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          >
            ✖
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Reason</h2>

          <div className="overflow-y-auto px-2" style={{ maxHeight: "65vh", wordBreak: "break-word" }}>
            <p className="text-gray-700 text-center">{selectedReason || "No Reason Provided"}</p>
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <motion.h2
        className="text-indigo-600 pt-14 md:pt-7 lg:p-3 text-center text-3xl md:text-4xl font-bold mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Appointment Dashboard
      </motion.h2>

      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <input
          type="text"
          placeholder="Search Doctor or Patient"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl shadow w-full md:max-w-xs focus:ring-2 ring-indigo-400 outline-none"
        />

        <div className="relative w-full md:max-w-xs">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full appearance-none p-3 border border-gray-300 rounded-xl shadow pr-8 focus:ring-2 ring-indigo-400 outline-none "
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

        <div className="relative w-full md:max-w-xs">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full appearance-none p-3 border border-gray-300 rounded-xl shadow pr-8 focus:ring-2 ring-indigo-400 outline-none"
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
      </div>

      {/* Appointment Status Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-indigo-600 text-white text-center text-lg sm:text-2xl font-semibold rounded-xl shadow">
          Total: {appointments.length}
        </div>
        <div className="p-4 bg-yellow-500 text-white text-center text-lg sm:text-2xl font-semibold rounded-xl shadow">
          Pending: {appointments.filter((a) => a.status === "Pending").length}
        </div>
        <div className="p-4 bg-green-500 text-white text-center text-lg sm:text-2xl font-semibold rounded-xl shadow">
          Completed: {appointments.filter((a) => a.status === "Completed").length}
        </div>
        <div className="p-4 bg-red-500 text-white text-center text-lg sm:text-2xl font-semibold rounded-xl shadow">
          Rejected: {appointments.filter((a) => a.status === "Rejected").length}
        </div>
      </div>

      <div className=" overflow-x-auto scroll-smooth bg-white rounded-xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-100">
            <tr>
              {["Doctor", "Patient", "Date", "Time", "Reason", "Status", "Reason", "Delete"].map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-center text-xs font-semibold text-indigo-700 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-center">
            {currentItems.map((item) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hover:bg-indigo-50 transition"
              >
                <td className="px-4">{item.doctor}</td>
                <td className="px-4">{item.patientForm.patientname}</td>
                <td className="px-4">
                  {new Date(item.date.$date || item.date).toLocaleDateString()}
                </td>
                <td className="px-4">{item.time}</td>
                <td className="px-4  truncate max-w-[150px]">{item.patientForm.reason}</td>
                <td className="px-4 ">
                  <span
                    className={`px-3  text-xs font-bold rounded-full ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4">
                  <motion.button
                    onClick={() => setSelectedReason(item.patientForm.reason)}
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.1 }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
                  >
                    Reason
                  </motion.button>
                </td>
                <td className="px-4">
                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.1 }}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {reasonPopUp()}
      </div>

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
