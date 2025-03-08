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
