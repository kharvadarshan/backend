import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Trash2, Ban, Unlock } from "lucide-react";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6;

  useEffect(() => {
    setPatients([
      {
        id: 1,
        name: "Neel Sathvara",
        email: "neel@example.com",
        appointments: 4,
        completed: 3,
        pending: 5,
        rejected: 1,
        blocked: false,
      },
      {
        id: 2,
        name: "Pooja Sinh",
        email: "pooja@example.com",
        appointments: 2,
        completed: 13,
        pending: 9,
        rejected: 3,
        blocked: false,
      },
      {
        id: 3,
        name: "Darshan Patel",
        email: "darshan@example.com",
        appointments: 3,
        completed: 3,
        pending: 13,
        rejected: 0,
        blocked: false,
      },
      {
        id: 4,
        name: "Anjali Rana",
        email: "anjali@example.com",
        appointments: 1,
        completed: 0,
        pending: 4,
        rejected: 2,
        blocked: false,
      },
    ]);
  }, []);

  const handleDelete = (id) => setPatients((prev) => prev.filter((p) => p.id !== id));

  const toggleBlock = (id) =>
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, blocked: !p.blocked } : p))
    );

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showBlockedOnly || p.blocked)
  );

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Subcomponent: Desktop Row
  const PatientRow = ({ patient }) => (
    <motion.tr
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4">{patient.name}</td>
      <td className="px-6 py-4">{patient.email}</td>
      <td className="px-6 py-4">{patient.appointments}</td>
      <td className="px-6 py-4">{patient.pending}</td>
      <td className="px-6 py-4">{patient.completed}</td>
      <td className="px-6 py-4">{patient.rejected}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => toggleBlock(patient.id)}
          title={patient.blocked ? "Unblock" : "Block"}
          className="text-indigo-600 hover:text-indigo-800"
        >
          {patient.blocked ? <Unlock size={20} /> : <Ban size={20} />}
        </button>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleDelete(patient.id)}
          title="Delete Patient"
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </motion.tr>
  );

  // Subcomponent: Mobile Card
  const PatientCard = ({ patient }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 shadow-lg rounded-xl border border-gray-300"
    >
      <h3 className="text-xl font-semibold text-indigo-600">{patient.name}</h3>
      <p className="text-gray-700 text-sm">📧 {patient.email}</p>
      <p className="text-gray-700 text-sm mt-1">📅 Appointments: {patient.appointments}</p>
      <p className="text-gray-700 text-sm">✔ Completed: {patient.completed}</p>
      <p className="text-gray-700 text-sm">⏳ Pending: {patient.pending}</p>
      <p className="text-gray-700 text-sm">❌ Rejected: {patient.rejected}</p>
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => toggleBlock(patient.id)}
          title={patient.blocked ? "Unblock" : "Block"}
          className="text-indigo-600 hover:text-indigo-800"
        >
          {patient.blocked ? <Unlock size={20} /> : <Ban size={20} />}
        </button>
        <button
          onClick={() => handleDelete(patient.id)}
          title="Delete Patient"
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <motion.h2
        className="text-indigo-700 pt-12 md:pt-4 pb-2 text-center text-3xl md:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Registered Patients
      </motion.h2>

      {/* Search + Filter */}
      <div className="flex flex-col pb-2 md:flex-row md:justify-between gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
        />
        <button
          onClick={() => setShowBlockedOnly((prev) => !prev)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          {showBlockedOnly ? "Show All" : "Show Blocked Only"}
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto bg-gray-200 rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-400">
              <tr>
                {["Name", "Email ID", "Appointments", "Pending", "Completed", "Rejected", "Block", "Delete"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-center">
              {currentPatients.length ? (
                currentPatients.map((p) => <PatientRow key={p.id} patient={p} />)
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-gray-600">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-6 lg:hidden">
        {currentPatients.length ? (
          currentPatients.map((p) => <PatientCard key={p.id} patient={p} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">No patients found.</p>
        )}
      </div>

      {/* Pagination */}
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

export default Patients;
