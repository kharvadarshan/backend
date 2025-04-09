import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  faCheck,
  faXmark,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const BookedAppointment = ({doctor}) => {
  const [select, setSelect] = useState("Upcoming");
  const [actionDisabled, setActionDisabled] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8;
  const [upcoming, setUpcoming] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [rejected,setRejected] = useState(null);
  const [confirmed,setConfirmed] = useState(null);

  const disableButtons = (index) => {
    setActionDisabled((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };
 
  

  const fetchAppointment = async()=>{
    try
    {
         const response = await axios.get(`http://localhost:5001/appointments/getAppointmentByDoctorId/${doctor._id}`);
         if(response.data.ok)
         {
              // console.log(response.data);
             setUpcoming(response.data.upcomingAppointments);
             setConfirmed(response.data.confirmedAppointment);
             setRejected(response.data.rejectedAppointments);
             setCompleted(response.data.completedAppointments);
         }
    }catch(error)
    {
      console.log(error);
    }
  }
 
  useEffect(()=>{
    if(doctor?._id)
    fetchAppointment();
 },[doctor?._id]);



  const handleAccept = async(id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to accept this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get(`http://localhost:5001/doctorprofile/acceptAppointment/${id}`);

          if (response.data.ok) {
            
            Swal.fire("Accepted!", "The appointment has been accepted.", "success");
            await fetchAppointment();
          } else {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not connect to the server.", "error");
        }
      }
    });
  };


  const handleReject = async(id) => {
    Swal.fire({
                  title:"Are you sure?",
                  text:"Do you really want to reject this appointment?",
                  icon:"warning",
                  confirmButtonText:"Yes, Reject",
                  cancelButtonText:"No, Cancel",
          }).then(async(result)=>{
            if(result.isConfirmed){
              try{
                    const response = await axios.get(`http://localhost:5001/doctorprofile/rejectAppointment/${id}`);
      
                    if(!response.data.ok)
                    {
                         await fetchAppointment();
                         Swal.fire("Rejected!","The appointment request has been rejected.","success");
                    }else
                    {
                         Swal.fire("Error!","Something went wrong. Try again.","error");
                    }
              }catch(error)
              {
                Swal.fire("Error!","Could not connect to the server.","error");
              }
            }
          });
  };


  
  const handleCompleted = async(id) => {
                 Swal.fire({
            title:"Are you sure?",
            text:"Do you really want to mark this as Completed?",
            icon:"warning",
            confirmButtonText:"Yes, Continue",
            cancelButtonText:"No, Cancel",
    }).then(async(result)=>{
      if(result.isConfirmed){
        try{
              const response = await axios.get(`http://localhost:5001/doctorprofile/markCompleted/${id}`);

              if(response.data.ok)
              {    
                await fetchAppointment();
                   Swal.fire("Marked Completed!","The appointment has been completed","success");
              }else
              {
                   Swal.fire("Error!","Something went wrong. Try again.","error");
              }
        }
        catch(error)
        {
          Swal.fire("Error!","Could not connect to the server.","error");
        }
      }
    });
  };

  const filteredAppointments = () => {
    if (select === "Upcoming")
      return upcoming;
    if (select === "Accepted")
      return confirmed;
    if (select === "Rejected")
      return rejected;
    if (select === "Completed") 
      return completed;
    return [];
  };


  const paginatedAppointments = () => {
    const filtered = filteredAppointments()||[];
    // console.log(filtered);
    const start = (currentPage - 1) * appointmentsPerPage;
    const end = start + appointmentsPerPage;
    return filtered.slice(start, end);
  };

  const totalPages = Math.ceil(filteredAppointments()?.length || 0) / (appointmentsPerPage || 1)
  const renderCard = (app, index, isUpcoming = true) => (
    <div
      key={app._id}
      className="border border-gray-300 rounded-xl p-4 mb-4 shadow-sm"
    >
      <p>
        <strong>Patient:</strong> {app.patientForm.patientname}
      </p>
      <p>
        <strong>Date:</strong> {new Date(app.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong>{" "}
        {new Date(`1970-01-01T${app.time.split("-")[0]}`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p>
        <strong>Reason:</strong> {app.patientForm.reason}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold ${
            app.status === "Confirmed"
              ? "text-green-600"
              : app.status === "Rejected"
              ? "text-red-600"
              : app.status === "Completed"
              ? "text-green-700"
              : "text-yellow-600"
          }`}
        >
          {app.status}
        </span>
      </p>
      {isUpcoming && app.status === "Pending" && (
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => {
              disableButtons(index);
              handleAccept(app._id);
            }}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={actionDisabled[index]}
          >
            <FontAwesomeIcon icon={faCheck} className="mr-1" /> Accept
          </button>
          <button
            onClick={() => {
              disableButtons(index);
              handleReject(app._id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
            disabled={actionDisabled[index]}
          >
            <FontAwesomeIcon icon={faXmark} className="mr-1" /> Reject
          </button>
          <button
            onClick={() => {
              disableButtons(index);
              handleCompleted(app._id);
            }}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={actionDisabled[index]}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Complete
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-4 m-4 mb-4 border border-blue-400 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700">
        Appointment Requests
      </h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["Upcoming", "Accepted", "Rejected", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelect(tab);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              select === tab
                ? "bg-indigo-700 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
            <tr>
              <th className="p-3 border-r">Patient</th>
              <th className="p-3 border-r">Date</th>
              <th className="p-3 border-r">Time</th>
              <th className="p-3 border-r">Reason</th>
              <th className="p-3 border-r">Status</th>
              {select === "Upcoming" && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
           {paginatedAppointments()?.map((app, index) => ( 
              <tr
                key={app._id}
                className="even:bg-gray-50 text-center border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="p-3 border-r">{app.patientForm.patientname}</td>
                <td className="p-3 border-r">
                  {new Date(app.date).toLocaleDateString()}
                </td>
                <td className="p-3 border-r">
                  {new Date(`1970-01-01T${app.time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-3 border-r">{app.patientForm.reason}</td>
                <td
                  className={`p-3 border-r font-semibold ${
                    app.status === "Approved"
                      ? "text-green-600"
                      : app.status === "Rejected"
                      ? "text-red-600"
                      : app.status === "Completed"
                      ? "text-green-700"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status}
                </td>
                {select === "Upcoming" && (
                  <td className="p-3 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => {
                        disableButtons(index);
                        handleAccept(app._id);
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                      disabled={actionDisabled[index]}
                    >
                      <FontAwesomeIcon icon={faCheck} className="mr-1" /> Accept
                    </button>
                    <button
                      onClick={() => {
                        disableButtons(index);
                        handleReject(app._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                      disabled={actionDisabled[index]}
                    >
                      <FontAwesomeIcon icon={faXmark} className="mr-1" /> Reject
                    </button>
                    {/* <button
                      onClick={() => {
                        disableButtons(index);
                        handleCompleted(app._id);
                      }}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-50"
                      disabled={actionDisabled[index]}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />{" "}
                      Complete
                    </button> */}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View (Mobile) */}
      <div className="lg:hidden">
        {paginatedAppointments()?.map((app, i) =>
          renderCard(app, i, select === "Upcoming")
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center justify-center space-x-3 border border-gray-300 rounded-lg px-6 py-3 shadow-lg bg-white w-full max-w-sm sm:max-w-md">
          <button
            className="px-4 py-2 rounded-full text-base sm:text-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span className="px-4 py-2 rounded-full bg-indigo-500 text-white text-base sm:text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-full text-base sm:text-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
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

export default BookedAppointment;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import Swal from 'sweetalert2'
// import {faCheck,faXmark,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const BookedAppointment = () => {
//   const activeUser = useSelector((state) => state.doctor.doctor);
//   console.log(activeUser);
//   const [appointments, setAppointment] = useState([]);
//   const [upcoming,setUpComing]=useState([]);
//   const [completed,setCompleted]=useState([]);
//   const [select ,setSelect]=useState("Upcoming");

//   useEffect(() => {
//     getAllAppointmentByDoctorId();
//   }, []);

//   const handleAccept = async (appointmentId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to accept this appointment?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Accept",
//       cancelButtonText: "No, Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await axios.post("http://localhost:5001/doctorprofile/changeAppointment", {
//             id: appointmentId,
//           });

//           if (response.data.ok) {
//             Swal.fire("Accepted!", "The appointment has been accepted.", "success");
//           } else {
//             Swal.fire("Error!", "Something went wrong. Try again.", "error");
//           }
//         } catch (error) {
//           Swal.fire("Error!", "Could not connect to the server.", "error");
//         }
//       }
//     });
//   };

//   const handleReject=async(appointmentId) =>{
//     Swal.fire({
//             title:"Are you sure?",
//             text:"Do you really want to reject this appointment?",
//             icon:"warning",
//             confirmButtonText:"Yes, Reject",
//             cancelButtonText:"No, Cancel",
//     }).then(async(result)=>{
//       if(result.isConfirmed){
//         try{
//               const response = await axios.post("http://localhost:5001/doctorprofile/rejectAppointment",{
//                 id:appointmentId
//               });

//               if(!response.data.ok)
//               {
//                    Swal.fire("Rejected!","The appointment request has been rejected.","success");
//               }else
//               {
//                    Swal.fire("Error!","Something went wrong. Try again.","error");
//               }
//         }catch(error)
//         {
//           Swal.fire("Error!","Could not connect to the server.","error");
//         }
//       }
//     });
//   };

//   const handleCompleted=async(appointmentId) =>{
//     Swal.fire({
//             title:"Are you sure?",
//             text:"Do you really want to mark this as Completed?",
//             icon:"warning",
//             confirmButtonText:"Yes, Continue",
//             cancelButtonText:"No, Cancel",
//     }).then(async(result)=>{
//       if(result.isConfirmed){
//         try{
//               const response = await axios.post("http://localhost:5001/doctorprofile/markCompleted",{
//                 id:appointmentId
//               });

//               if(response.data.ok)
//               {
//                    Swal.fire("Marked Completed!","The appointment has been completed","success");
//               }else
//               {
//                    Swal.fire("Error!","Something went wrong. Try again.","error");
//               }
//         }catch(error)
//         {
//           Swal.fire("Error!","Could not connect to the server.","error");
//         }
//       }
//     });
//   };

//   const getAllAppointmentByDoctorId = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/api/getAppointmentByDoctorId",
//         { name: activeUser.name }
//       );
//       if (response.data.ok) {
//         setAppointment(response.data.result);
//         setUpComing(response.data.upcomingAppointments);
//         setCompleted(response.data.completedAppointments);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {/* View Booked Appointments */}
//       <div className="bg-white p-4 m-4 mb-4 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-4">Appointments Requests</h3>
//         <div className="">
//              <button onClick={()=>setSelect("Upcoming")} name="Upcoming" className={` my-2  mr-3 rounded-full  p-2 ${select === "Upcoming" ? "bg-indigo-700  text-white" : "text-black"}`}>UpComing</button>
//              <button onClick={()=>setSelect("Completed")} name="Completed" className={` my-2  ml-3 rounded-full p-2 ${select === "Completed" ? "bg-indigo-700  text-white" : "text-black"}`}>Completed</button>
//         </div>

//         {/* Responsive Table Container */}
//         <div className="overflow-x-auto">

//         {select === "Upcoming" && (
//           <>
//           <table className="w-full bg-white shadow-md rounded">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-3 text-left">Doctor</th>
//                 <th className="p-3 text-left">Patient</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Time</th>
//                 <th className="p-3 text-left">Reason</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {upcoming.map((app) => (
//                 <tr key={app._id} className="border-t">
//                   <td className="p-3">{app.doctor}</td>
//                   <td className="p-3">{app.patientId}</td>
//                   <td className="p-3">{app.date}</td>
//                   <td className="p-3">{app.time}</td>
//                   <td className="p-3">{app.reason}</td>
//                   <td
//                     className={`p-3 ${
//                       app.status === "Approved"
//                         ? "text-green-600"
//                         : app.status === "Rejected"
//                         ? "text-red-600"
//                         : "text-yellow-600"
//                     }`}
//                   >
//                     {app.status}
//                   </td>
//                   <td className="p-3">
//                     <button  onClick={()=>handleAccept(app._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-2 my-2">
//                      <span className="mx-1"><FontAwesomeIcon  icon={faCheck} /></span>Accept
//                     </button>
//                     <button  onClick={()=>handleReject(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
//                     <span className="mx-1"><FontAwesomeIcon  icon={faXmark} /></span>Reject
//                     </button>
//                     <button disabled={app.status === "pending"} onClick={()=> handleCompleted(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
//                       <span className="mx-1"><FontAwesomeIcon  icon={faCheckCircle} /></span> Mark Completed
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           </>
//         )}

//         {select === "Completed" && (
//           <>
//           <table className="w-full bg-white shadow-md rounded">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-3 text-left">Doctor</th>
//                 <th className="p-3 text-left">Patient</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Time</th>
//                 <th className="p-3 text-left">Reason</th>
//                 <th className="p-3 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {upcoming.map((app) => (
//                 <tr key={app._id} className="border-t">
//                   <td className="p-3">{app.doctor}</td>
//                   <td className="p-3">{app.patientId}</td>
//                   <td className="p-3">{app.date}</td>
//                   <td className="p-3">{app.time}</td>
//                   <td className="p-3">{app.reason}</td>
//                   <td
//                     className={`p-3 ${
//                       app.status === "Approved"
//                         ? "text-green-600"
//                         : app.status === "Rejected"
//                         ? "text-red-600"
//                         : "text-yellow-600"
//                     }`}
//                   >
//                     {app.status}
//                   </td>
//                   {/* <td className="p-3">
//                     <button  onClick={()=>handleAccept(app._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-2 my-2">
//                      <span className="mx-1"><FontAwesomeIcon  icon={faCheck} /></span>Accept
//                     </button>
//                     <button  onClick={()=>handleReject(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
//                     <span className="mx-1"><FontAwesomeIcon  icon={faXmark} /></span>Reject
//                     </button>
//                     <button disabled={app.status === "pending"} onClick={()=> handleCompleted(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
//                       <span className="mx-1"><FontAwesomeIcon  icon={faCheckCircle} /></span> Mark Completed
//                     </button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           </>
//         )}

//         </div>

//       </div>
//     </>
//   );
// };

// export default BookedAppointment;
