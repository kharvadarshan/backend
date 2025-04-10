import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronDown, Info, FileText, Star, X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import FeedBackForm from "../../FeedBackForm/FeedBack";

const MyAppointments = () => {
  const activeUser = useSelector((state)=> state.user.user);
  const [appointments, setAppointments] = useState();
  const [modalData,setModalData] = useState();
  const [showFeedbackForm,setShowFeedbackForm]=useState(false);

  useEffect(()=>{
    if(activeUser?.id)
       getAppointmentByPatientId();
  },[activeUser?.id]);


  // get all apointment of patient 
  const getAppointmentByPatientId = async()=>{
    try
    {
         const response = await axios.get(`http://localhost:5001/appointments/getAppointmentByPatientId/${activeUser.id}`);

         if(response.data.ok)
         {
          setAppointments(response.data.result);
         }

    }catch(error)
    {
          console.log(error);
    }
  };


  // delete appointment which is  completed
  const handleDelete = async(appointmentId)=>{

       Swal.fire({
                title:"Are you sure?",
                text:"Do you really want to delete this completed appointment ?",
                icon:"warning",
                confirmButtonText:"Yes, Continue",
                cancelButtonText:"No, Cancel",
        }).then(async(result)=>{
          if(result.isConfirmed){
            try{
              const response = await  axios.delete(`http://localhost:5001/appointments/deleteAppointment/${appointmentId}`);
    
                  if(response.data.ok)
                  {    
                       Swal.fire("Deleted Successfully!","The appointment has been deleted","success");
                       await getAppointmentByPatientId();
                  }else
                  {
                       Swal.fire(response.data.message,"Something went wrong. Try again.","error");
                  }
            }
            catch(error)
            {
              Swal.fire("Error!","Could not connect to the server.","error");
            }
          }
        });
        
     }



  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

 

  const getStatusBadge = (status) => {
    const statusColors = {
      Confirmed: "bg-green-100 text-green-700 border border-green-400",
      Pending: "bg-yellow-100 text-yellow-700 border border-yellow-400",
      Rejected: "bg-red-100 text-red-700 border border-red-400",
      Completed:"bg-blue-100 text-blue-700 border border-blue-400"
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
    if(!appointments) return [];
    const years = [
      ...new Set(appointments.map((appt) => new Date(appt.date.$date).getFullYear())),
    ];
    return years.sort();
  }, [appointments]);

  const uniqueMonths = useMemo(() => {
    if(!appointments) return [];
    const months = [
      ...new Set(
        appointments.map((appt) =>
          new Date(appt.date.$date).toLocaleString("en-US", { month: "long" })
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


  // New function to render rating stars
  const renderRating = (rating) => (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? "text-yellow-500" : "text-gray-300"}
          fill={index < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );

  // appointment form details popup
  const Modal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Patient Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-3">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Patient Name:</strong> {data.patientname}</p>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Gender:</strong> {data.gender}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Reason:</strong> {data.reason}</p>
            <p><strong>City:</strong> {data.city}</p>
            <p><strong>Number:</strong> {data.number}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  };

  // feedback popup
  const FeedbackModal = ({ isOpen, onClose, appointment }) => {
    if (!isOpen || !appointment) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Submit Feedback</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <FeedBackForm
            appointmentId={appointment._id} // Assuming doctorId exists in appointment
            onSubmitSuccess={()=>{
              onClose();
              getAppointmentByPatientId();
              } }// Close modal on success
          />
        </motion.div>
      </div>
    );
  };
  return (
    <div className="p-6 mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📅 My Appointments
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-5">
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
            <option value="Rejected">Cancelled</option>
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
                <strong>Time:</strong> {appointment.time}
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">

                 {/* patient details button */}
                {renderViewButton("Details", <Info size={16}/>,"bg-green-300", () =>
                  setModalData(appointment.patientForm)
                )}
                

                {/* patient can get report */}
                {renderViewButton("Report", <FileText size={16} />,"bg-blue-300", () =>
                  setSelectedReport(appointment.report)
                )}

                  {/* give feedback & display rating */}
                { appointment.status === "Completed" &&  
                ( 
                  !appointment.feedbackForm?.rating ? 
                  (
                             renderViewButton("Give Feedback", <Star size={16} />,"bg-yellow-300", () =>{
                             setSelectedAppointment(appointment);
                              setShowFeedbackForm(true);})
                  ):(  
                         renderRating(appointment.feedbackForm.rating)
                       )
                )}



                <button
                  onClick={() => handleDelete(appointment._id.$oid)}
                  className="mt-1 bg-red-100 text-red-600 p-2 rounded-lg flex justify-center items-center gap-1 hover:bg-red-200 transition w-full sm:w-auto"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
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
        <div className="hidden md:block overflow-y-auto p-4 shadow-lg bg-white rounded-xl">
          <table className="w-full  border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="border p-3">Doctor</th>
                <th className="border p-3">Patient</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Time</th>
                <th className="border p-3 text-center">Status</th>
                <th className="border p-3">Details</th>
                <th className="border p-3 text-center">Report</th>
                <th className="border p-3 text-center">Review</th>
                <th className="border p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredAppointments.map((appointment) => (
                  <motion.tr
                    key={appointment._id.$oid}
                    className="border text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="p-3 border">{appointment.doctor}</td>
                    <td className="p-3 border">{appointment.patientForm.patientname}</td>
                    <td className="p-3 border">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="p-3 border">{appointment.time}</td>
                    <td className="p-3 border">
                      {getStatusBadge(appointment.status)}
                    </td>

                     {/* patient details button */}
                    <td className="p-3 border">
                      {renderViewButton("View", <Info size={16} />,"bg-green-300", () =>
                        setModalData(appointment.patientForm)
                      )}
                    </td>

                     {/* patient can get report */}
                    <td className="p-3 border">
                      {renderViewButton(
                        "Report",
                        <FileText size={16} />,
                        "bg-blue-300",
                        () => setSelectedReport(appointment.report)
                      )}
                    </td>


                     {/* give feedback & display rating */}
                    <td className="p-3 border">

                      { 
                        appointment.status==="Completed" && (   
                         !appointment.feedbackForm?.rating ? 
                          (
                                
                                    (renderViewButton("Give Feedback", <Star size={16} />,"bg-yellow-300", () =>{
                                                   setSelectedAppointment(appointment);
                                                    setShowFeedbackForm(true);})
                                    )
                          ): (
                            renderRating(appointment.feedbackForm.rating)
                          )

                      )}
                    </td>
                    <td className="p-3 border">
                      <button
                        onClick={() => handleDelete(appointment._id)}
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
      )}

      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        data={modalData}
      />
      <FeedbackModal
      isOpen={showFeedbackForm}
      onClose={()=>setShowFeedbackForm(false)} 
      appointment={selectedAppointment}>
      </FeedbackModal>
    </div>
  );
};

export default MyAppointments;





// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {  Trash2 } from "lucide-react";
// import {toast} from 'react-toastify';

// const MyAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const activeUser = useSelector((state)=>state.user.user);
//   useEffect(() => {
//      getAllAppointmentsByPatientId();
//   }, []);
// console.log(activeUser);

//   const getAllAppointmentsByPatientId = async()=>{

//     try{
//         const response  =  await axios.post("http://localhost:5001/api/getAppointmentByPatientId",{email:activeUser.email});

//       if(response.data.ok)
//       {
//          setAppointments(response.data.result);
//        }
//     }catch(error)
//     {
//       console.log(error);
//     }
//   }

//   const handleDelete = async(appointmentId)=>{
//     try{

//       const response = await  axios.delete(`http://localhost:5001/appointments/deleteAppointment/${appointmentId}`);

//       if(response.data.ok)
//       {
//           toast.success("Appointment deleted Successfully!",{positon:"top-right"});
//       }else
//       {
//           toast.failure("Something went wrong!");
//       }

//     }catch(error)
//     {
//            console.log(error);
//     }

//   }

//   useEffect(() => {

//   }, []);

//   const getStatusBadge = (status) => {
//     const statusColors = {
//       Confirmed: "bg-green-100 text-green-700 border border-green-400",
//       Pending: "bg-yellow-100 text-yellow-700 border border-yellow-400",
//       Cancelled: "bg-red-100 text-red-700 border border-red-400",
//     };
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   // const handleDelete = (id) => {
//   //   setAppointments((prev) =>
//   //     prev.filter((appointment) => appointment.id !== id)
//   //   );
//   // };

//   // const uniqueYears = useMemo(() => {
//   //   const years = [
//   //     ...new Set(appointments.map((appt) => appt.date.split("-")[0])),
//   //   ];
//   //   return years.sort();
//   // }, [appointments]);

//   // const uniqueMonths = useMemo(() => {
//   //   const months = [
//   //     ...new Set(
//   //       appointments.map((appt) =>
//   //         new Date(appt.date).toLocaleString("en-US", { month: "long" })
//   //       )
//   //     ),
//   //   ];
//   //   return months;
//   // }, [appointments]);

//   // const filteredAppointments = useMemo(() => {
//   //   return appointments.filter((appointment) => {
//   //     const [year, month] = appointment.date.split("-");
//   //     const appointmentMonth = new Date(appointment.date).toLocaleString(
//   //       "en-US",
//   //       { month: "long" }
//   //     );

//   //     return (
//   //       (filterStatus === "All" || appointment.status === filterStatus) &&
//   //       (filterMonth === "All" || appointmentMonth === filterMonth) &&
//   //       (filterYear === "All" || year === filterYear)
//   //     );
//   //   });
//   // }, [appointments, filterStatus, filterMonth, filterYear]);

//   return (
//     <div className="p-6 mt-6  max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         📅 My Appointments
//       </h1>

//       {/* Filter Section */}
//       <div className="flex hover:cursor-pointer flex-wrap gap-4 justify-center mb-5">
//         {/* Status Filter */}
//         {/* <div className="relative">
//           <select
//             className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="All">All Status</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="Pending">Pending</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//           <ChevronDown
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
//             size={20}
//           />
//         </div> */}

//         {/* Month Filter */}
//         {/* <div className="relative">
//           <select
//             className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none"
//             value={filterMonth}
//             onChange={(e) => setFilterMonth(e.target.value)}
//           >
//             <option value="All">All Months</option>
//             {uniqueMonths.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//           <ChevronDown
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
//             size={20}
//           />
//         </div>*/}

//         {/* Year Filter
//         <div className="relative">
//           <select
//             className="p-3 border rounded-lg shadow-sm bg-white text-gray-700 pr-10 appearance-none"
//             value={filterYear}
//             onChange={(e) => setFilterYear(e.target.value)}
//           >
//             <option value="All">All Years</option>
//             {uniqueYears.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//           <ChevronDown
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
//             size={20}
//           />
//         </div> */}
//       </div>
//       {/* Appointments */}
//       {appointments.length === 0 ? (
//         <p className="text-gray-500 text-center text-lg">
//           No appointments found.
//         </p>
//       ) : (
//         <div className="p-4 shadow-lg bg-white rounded-xl">
//           {/* Table for larger screens */}
//           <div className="hidden md:block">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-blue-100 text-gray-700">
//                   <th className="border p-3">Doctor</th>
//                   <th className="border p-3">Patient</th>
//                   <th className="border p-3">Date</th>
//                   <th className="border p-3">Time</th>
//                   <th className="border p-3">Reason</th>
//                   <th className="border p-3 text-center">Status</th>
//                   <th className="border p-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence>
//                   {appointments.map((appointment) => (
//                     <motion.tr
//                       key={appointment._id}
//                       className="border text-center"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <td className="p-3 border">{appointment.doctor}</td>
//                       <td className="p-3 border">{appointment.patientId}</td>
//                       <td className="p-3 border">{appointment.date}</td>
//                       <td className="p-3 border">{appointment.time}</td>
//                       <td className="p-3 border">{appointment.reason}</td>
//                       <td className="p-3 border">
//                         {getStatusBadge(appointment.status)}
//                       </td>
//                       <td className="p-3 border">
//                         <button
//                           onClick={() => handleDelete(appointment._id)}
//                           className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>

//           {/* Cards for mobile view */}
//           <div className="md:hidden text-center space-y-4">
//             <AnimatePresence>
//               {appointments.map((appointment) => (
//                 <motion.div
//                   key={appointment.id}
//                   className="p-4 bg-gray-50 rounded-lg shadow-sm border flex flex-col space-y-2"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     {appointment.doctor}
//                   </h2>
//                   <p className="text-gray-600">📅 {appointment.date}</p>
//                   <p className="text-gray-600">⏰ {appointment.time}</p>
//                   <div className="self-start mx-auto">
//                     {getStatusBadge(appointment.status)}
//                   </div>
//                   <button
//                     onClick={() => handleDelete(appointment._id)}
//                     className="py-2 mx-auto px-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center w-fit"
//                   >
//                     <Trash2 size={18} className="mr-2" />
//                     Delete
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;
