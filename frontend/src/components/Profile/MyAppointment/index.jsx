import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Trash2 } from "lucide-react";
const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const activeUser = useSelector((state)=>state.user.user);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  useEffect(() => {
     getAllAppointmentsByPatientId();
  }, []);

  const getAllAppointmentsByPatientId = async()=>{
    const response  =  await axios.post("http://localhost:5001/api/getAppointmentByPatientId",{id:activeUser.email});
    
    if(response.data.ok)
    {
      setAppointments(response.data.result);
    }
  }
  

 



  

  // useEffect(() => {
  //   const savedAppointments =
  //     JSON.parse(localStorage.getItem("appointments")) || [];
  //   setAppointments(savedAppointments);
  // }, []);

  useEffect(() => {
   
  }, []);

  const getStatusBadge = (status) => {
    const statusColors = {
      Confirmed: "bg-green-100 text-green-700 border border-green-400",
      Pending: "bg-yellow-100 text-yellow-700 border border-yellow-400",
      Cancelled: "bg-red-100 text-red-700 border border-red-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };

  const handleDelete = (id) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
  };

  const uniqueYears = useMemo(() => {
    const years = [
      ...new Set(appointments.map((appt) => appt.date.split("-")[0])),
    ];
    return years.sort();
  }, [appointments]);

  const uniqueMonths = useMemo(() => {
    const months = [
      ...new Set(
        appointments.map((appt) =>
          new Date(appt.date).toLocaleString("en-US", { month: "long" })
        )
      ),
    ];
    return months;
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const [year, month] = appointment.date.split("-");
      const appointmentMonth = new Date(appointment.date).toLocaleString(
        "en-US",
        { month: "long" }
      );

      return (
        (filterStatus === "All" || appointment.status === filterStatus) &&
        (filterMonth === "All" || appointmentMonth === filterMonth) &&
        (filterYear === "All" || year === filterYear)
      );
    });
  }, [appointments, filterStatus, filterMonth, filterYear]);

  return (
    <div className="p-6 mt-6  max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📅 My Appointments
      </h1>

      {/* Filter Section */}
      <div className="flex hover:cursor-pointer flex-wrap gap-4 justify-center mb-5">
        {/* Status Filter */}
        <div className="relative">
          <select
            className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={20}
          />
        </div>

        {/* Month Filter */}
        <div className="relative">
          <select
            className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="All">All Months</option>
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={20}
          />
        </div>

        {/* Year Filter */}
        <div className="relative">
          <select
            className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="All">All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={20}
          />
        </div>
      </div>
      {/* Appointments */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No appointments found.
        </p>
      ) : (
        <div className="p-4 shadow-lg bg-white rounded-xl">
          {/* Table for larger screens */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-700">
                  <th className="border p-3">Doctor</th>
                  <th className="border p-3">Patient</th>
                  <th className="border p-3">Date</th>
                  <th className="border p-3">Time</th>
                  <th className="border p-3">Reason</th>
                  <th className="border p-3 text-center">Status</th>
                  <th className="border p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredAppointments.map((appointment) => (
                    <motion.tr
                      key={appointment._id}
                      className="border text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="p-3 border">{appointment.doctor}</td>
                      <td className="p-3 border">{appointment.patientId}</td>
                      <td className="p-3 border">{appointment.date}</td>
                      <td className="p-3 border">{appointment.time}</td>
                      <td className="p-3 border">{appointment.reason}</td>
                      <td className="p-3 border">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="p-3 border">
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Cards for mobile view */}
          <div className="md:hidden text-center space-y-4">
            <AnimatePresence>
              {filteredAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border flex flex-col space-y-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {appointment.doctor}
                  </h2>
                  <p className="text-gray-600">📅 {appointment.date}</p>
                  <p className="text-gray-600">⏰ {appointment.time}</p>
                  <div className="self-start mx-auto">
                    {getStatusBadge(appointment.status)}
                  </div>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="py-2 mx-auto px-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center w-fit"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;