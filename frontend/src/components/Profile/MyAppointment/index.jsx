import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const activeUser = useSelector((state)=>state.user.user);
  useEffect(() => {
     getAllAppointmentsByPatientId();
  }, []);

  const getAllAppointmentsByPatientId = async()=>{
    const response  =  await axios.post("http://localhost:5001/api/getAppointmentByPatientId",{id:activeUser.id});

    if(response.data.ok)
    {
      setAppointments(response.data.result);
    }
  }
  

 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      {/* Filter Section */}
      {/* <div className="mb-3">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select className="p-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div> */}

      {/* Appointment List */}
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        <div className="p-4 shadow-md bg-white rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Patient</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>

              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="border">
                  <td className="p-2 border">{appointment.doctor}</td>
                  <td className="p-2 border">{appointment.patientId}</td>
                  <td className="p-2 border">{appointment.date}</td>
                  <td className="p-2 border">{appointment.time}</td>
                  <td className="p-2 border">{appointment.reason}</td>
                  <td className="p-2 border text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ${
                    appointment.status === 'Confirmed'
                        ? "bg-red-100 text-red-800"
                        : "",
                    appointment.status === 'Rejected' ? "bg-green-100 text-green-800":""
                    }`}
                  >
                   {appointment.status}
                  </span> 
                  </td>
                  <td className="p-2 border">
                  
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;



// import { useState, useEffect, useMemo } from "react";

// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [newAppointment, setNewAppointment] = useState({ doctor: "", date: "", time: "", status: "Confirmed" });
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
//     setAppointments(savedAppointments);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("appointments", JSON.stringify(appointments));
//   }, [appointments]);

//   const handleAddAppointment = () => {
//     if (!newAppointment.doctor || !newAppointment.date || !newAppointment.time) {
//       alert("Please fill in all fields!");
//       return;
//     }

//     const newEntry = { ...newAppointment, id: Date.now() };
//     setAppointments([...appointments, newEntry]);
//     setNewAppointment({ doctor: "", date: "", time: "", status: "Confirmed" });
//   };

//   const handleRemoveAppointment = (id) => {
//     if (window.confirm("Are you sure you want to remove this appointment?")) {
//       setAppointments(appointments.filter((appointment) => appointment.id !== id));
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusColors = {
//       Confirmed: "bg-green-200 text-green-700",
//       Pending: "bg-yellow-200 text-yellow-700",
//       Cancelled: "bg-red-200 text-red-700",
//     };
//     return <span className={`px-2 py-1 rounded text-sm ${statusColors[status]}`}>{status}</span>;
//   };

//   const filteredAppointments = useMemo(() => {
//     if (filter === "All") return appointments;
//     return appointments.filter((appointment) => appointment.status === filter);
//   }, [appointments, filter]);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

//       {/* Appointment Form */}
//       <div className="p-4 shadow-md bg-white rounded-lg mb-4">
//         <h2 className="text-lg font-semibold mb-2">Book an Appointment</h2>
//         <div className="grid grid-cols-2 gap-2 mb-3">
//           <input
//             type="text"
//             placeholder="Doctor's Name"
//             className="p-2 border rounded"
//             value={newAppointment.doctor}
//             onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
//           />
//           <input
//             type="date"
//             className="p-2 border rounded"
//             value={newAppointment.date}
//             onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
//           />
//           <input
//             type="time"
//             className="p-2 border rounded"
//             value={newAppointment.time}
//             onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
//           />
//           <select
//             className="p-2 border rounded"
//             value={newAppointment.status}
//             onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
//           >
//             <option value="Confirmed">Confirmed</option>
//             <option value="Pending">Pending</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={handleAddAppointment}>
//           Add Appointment
//         </button>
//       </div>

//       {/* Filter Section */}
//       <div className="mb-3">
//         <label className="mr-2 font-semibold">Filter by Status:</label>
//         <select className="p-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
//           <option value="All">All</option>
//           <option value="Confirmed">Confirmed</option>
//           <option value="Pending">Pending</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Appointment List */}
//       {filteredAppointments.length === 0 ? (
//         <p className="text-gray-500 text-center">No appointments found.</p>
//       ) : (
//         <div className="p-4 shadow-md bg-white rounded-lg">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Doctor</th>
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Time</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAppointments.map((appointment) => (
//                 <tr key={appointment.id} className="border">
//                   <td className="p-2 border">{appointment.doctor}</td>
//                   <td className="p-2 border">{appointment.date}</td>
//                   <td className="p-2 border">{appointment.time}</td>
//                   <td className="p-2 border text-center">{getStatusBadge(appointment.status)}</td>
//                   <td className="p-2 border text-center">
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
//                       onClick={() => handleRemoveAppointment(appointment.id)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Appointments;









// import { useState } from "react";

// const Appointments = () => {
//   const [appointments, setAppointments] = useState([
//     { id: 1, doctor: "Dr. A Sharma", date: "2025-02-20", time: "10:00 AM", status: "Confirmed" },
//     { id: 2, doctor: "Dr. B Gupta", date: "2025-02-22", time: "12:30 PM", status: "Pending" },
//     { id: 3, doctor: "Dr. C Rao", date: "2025-02-25", time: "03:00 PM", status: "Cancelled" },
//   ]);

//   // Function to remove an appointment by ID
//   const removeAppointment = (id) => {
//     setAppointments(appointments.filter((appointment) => appointment.id !== id));
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
//       <div className="p-4 shadow-md bg-white rounded-lg">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Doctor</th>
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Time</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Action</th> {/* New Action Column */}
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appointment) => (
//               <tr key={appointment.id} className="border">
//                 <td className="p-2 border">{appointment.doctor}</td>
//                 <td className="p-2 border">{appointment.date}</td>
//                 <td className="p-2 border">{appointment.time}</td>
//                 <td className="p-2 border">{appointment.status}</td>
//                 <td className="p-2 border text-center">
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
//                     onClick={() => removeAppointment(appointment.id)}
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Appointments;
