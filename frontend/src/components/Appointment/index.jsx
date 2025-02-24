import { motion } from "framer-motion";
import { useState } from "react";

const Appointment = () => {
  const [selectedReason, setSelectedReason] = useState(null);
  const contact = {
    message : "Reason Here Reason HereReason Here"
  }
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

  const reasonPopUp = () => {
    if (!selectedReason) return null; // Prevents rendering when no reason is selected
  
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-40"
          onClick={() => setSelectedReason(null)}
        ></div>
  
        {/* Popup Box */}
        <motion.div
          className="fixed bg-white shadow-2xl p-6 rounded-lg w-[90%] md:max-w-[90%] sm:w-[500px] max-w-[78%] z-50 md:left-32 left-9 lg:left-96 xl:left-[40%]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          style={{
            top: "10vh",
            transform: "translate(-50%, 0%)",
            position: "fixed",
            minHeight: "150px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedReason(null)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          >
            ✖
          </button>
  
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 text-center">Reason</h2>
  
          {/* Content */}
          <div
            className="overflow-y-auto px-2"
            style={{ maxHeight: "65vh", wordBreak: "break-word" }}
          >
            <p className="text-gray-700 text-center">
              {selectedReason?.message || "No Reason Provided"}
            </p>
          </div>
        </motion.div>
      </>
    );
  };
  
  

  return (
    <div className="max-w-7xl mx-auto p-4">
      <motion.h2
        className="text-red-600 pt-14 md:pt-7 lg:p-3  text-center text-2xl md:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Latest Appointments
      </motion.h2>

      {/* Stats Cards */}
      <div className="grid text-center grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", count: 0, color: "bg-blue-500" },
          { label: "Pending", count: 5, color: "bg-yellow-500" },
          { label: "Approved", count: 3, color: "bg-green-500" },
          { label: "Rejected", count: 7, color: "bg-red-500" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`p-4 text-white rounded-lg shadow-md ${stat.color}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            {stat.label}: {stat.count}
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full divide-y  divide-gray-300">
          <thead className=" bg-gray-400">
            <tr>
              {tableData.map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-center text-xs font-medium text-white-600 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-center divide-gray-200">
            {[1, 2].map((id) => (
              <motion.tr
                key={id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: id * 0.2 }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4">{id}</td>
                <td className="px-4 py-4">John Doe</td>
                <td className="px-4 py-4">1234567890</td>
                <td className="px-4 py-4">Dr. ABC</td>
                <td className="px-4 py-4">12/03/2025 </td>
                <td className="px-4 py-4">12:30</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      id === 1
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {id === 1 ? "Inactive" : "Confirmed"}
                  </span>
                </td>
                <td className="px-4 py-4 flex space-x-3">
                  <motion.button
                   onClick={() => setSelectedReason(contact)}
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.4 }}
                    className="mt-2 mr-2 sm:mt-0 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition w-full sm:w-auto"
                  >
                    Reason
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.4 }}
                    className="mt-2 mr-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition w-full sm:w-auto"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.4 }}
                    className="mt-2 mr-2 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition w-full sm:w-auto"
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
    </div>
  );
};

export default Appointment;