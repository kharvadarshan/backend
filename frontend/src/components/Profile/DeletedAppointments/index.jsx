import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  ChevronDown } from "lucide-react";
import { } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const MyAppointments = () => {
  const activeUser = useSelector((state)=> state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 4;
  
  const [appointments, setAppointments] = useState();

  useEffect(()=>{
       getDeletedAppointmentByPatientId();
  },[]);

  const getDeletedAppointmentByPatientId = async()=>{
    try
    {
         const response = await axios.get(`${import.meta.env.VITE_API_URL}/appointments/getDeletedAppointmentByPatientId/${activeUser.id}`,{withCredentials:true});

         if(response.data.ok)
         {
          setAppointments(response.data.result);
         }

    }catch(error)
    {
          console.log(error);
    }
  };



  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  // const [selectedDetail, setSelectedDetail] = useState(null);
  // const [selectedReport, setSelectedReport] = useState(null);
  // const [selectedReview, setSelectedReview] = useState(null);

 

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

  const uniqueYears = useMemo(() => {
    if (!appointments) return [];
    const years = [
      ...new Set(appointments.map((appt) => new Date(appt.date).getFullYear())),
    ];
    return years.sort();
  }, [appointments]);

  const uniqueMonths = useMemo(() => {
    if (!appointments) return [];
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
    if(!appointments) return [];
    return appointments.filter((appointment) => {
      const apptDate = new Date(appointment.date.$date);
      const year = apptDate.getFullYear().toString();
      const appointmentMonth = apptDate.toLocaleString(
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

  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstPatient = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointment = filteredAppointments.slice(
    indexOfFirstPatient,
    indexOfLastAppointment
  );

  // Function to format the time from 24-hour to 12-hour AM/PM format
  const formatTime = (time) => {
    const [startTime, endTime] = time.split(" - ");

    const convertTo12Hour = (timeStr) => {
      const [hours, minutes] = timeStr.split(":");
      let hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      return `${hour}:${minutes} ${ampm}`;
    };

    return `${convertTo12Hour(startTime)} - ${convertTo12Hour(endTime)}`;
  };

  const renderViewButton = (label, icon, className, onClick) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      className= {`${className} mt-1  text-black px-4 py-2 rounded-lg shadow-md transition w-full sm:w-36 flex items-center justify-center gap-2 `}
    >
      {icon}
      {label}
    </motion.button>
  );

  return (
    <div className="p-6 mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📅 Deleted Appointments
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-5">
        {/* Status Filter */}
        <div className="relative">
          <select
            className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center focus:text-blue-500"
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
            className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center focus:text-blue-500"
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
            className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center focus:text-blue-500"
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

      {/* Card Layout for Small Screens */}
      <div className="md:hidden space-y-4">
        <AnimatePresence>
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment._id.$oid}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white shadow-md rounded-xl p-4 border"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                {getStatusBadge(appointment.status)}
              </div>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> { new Date(appointment.date.$date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Time:</strong> {formatTime(appointment.time)}
              </p>
              {/* <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {renderViewButton("Details", <Info size={16}/>,"bg-green-300", () =>
                  setSelectedDetail(appointment.patientForm.reason)
                )}
                {renderViewButton("Report", <FileText size={16} />,"bg-blue-300", () =>
                  setSelectedReport(appointment.report)
                )}
                
                {renderViewButton("Review", <Star size={16} />,"bg-yellow-300", () =>
                  setSelectedReview(appointment.review)
                )}
              </div> */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Table Layout for Medium+ Screens */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-4">
          No appointments found.
        </p>
      ) : (
        <div className="hidden md:block  p-4 shadow-lg bg-white rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="border p-3">Doctor</th>
                <th className="border p-3">Patient</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Time</th>
                <th className="border p-3 text-center">Status</th>
                {/* <th className="border p-3">Details</th>
                <th className="border p-3 text-center">Report</th>
                <th className="border p-3 text-center">Review</th> */}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentAppointment.map((appointment) => (
                  <motion.tr
                    key={appointment._id}
                    className="border text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="p-3 border">{appointment.doctor}</td>
                    <td className="p-3 border">{appointment.patientForm.patientname}</td>
                    <td className="p-3 border">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="p-3 border">{formatTime(appointment.time)}</td>
                    <td className="p-3 border">
                      {getStatusBadge(appointment.status)}
                    </td>
                    {/* <td className="p-3 border">
                      {renderViewButton("View", <Info size={16} />,"bg-green-300", () =>
                        setSelectedDetail(appointment.patientForm.reason)
                      )}
                    </td>
                    <td className="p-3 border">
                      {renderViewButton(
                        "Report",
                        <FileText size={16} />,
                        "bg-blue-300",
                        () => setSelectedReport(appointment.report)
                      )}
                    </td>
                    <td className="p-3 border">
                      {renderViewButton("Review", <Star size={16} />,"bg-yellow-300", () =>
                        setSelectedReview(appointment.review)
                      )}
                    </td> */}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      </div>

    </div>
  );
};

export default MyAppointments;



