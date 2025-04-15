import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  faCheck,
  faXmark,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChevronDown, Trash2 } from "lucide-react";

const BookedAppointment = ({ doctor }) => {
  const [select, setSelect] = useState("Upcoming");
  const [actionDisabled, setActionDisabled] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8;
  const [upcoming, setUpcoming] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [rejected, setRejected] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  const disableButtons = (index) => {
    setActionDisabled((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const getMonth = (date) =>
    new Date(date).toLocaleString("default", { month: "long" });
  const getYear = (date) => new Date(date).getFullYear();

  const getAllAppointments = () => {
    return [
      ...(upcoming || []),
      ...(confirmed || []),
      ...(rejected || []),
      ...(completed || []),
    ];
  };

  const uniqueMonths = Array.from(
    new Set(getAllAppointments().map((a) => getMonth(a.date)))
  );
  const uniqueYears = Array.from(
    new Set(getAllAppointments().map((a) => getYear(a.date)))
  );

  const applyFilters = (appointments) => {
    return appointments.filter((app) => {
      const monthMatch =
        filterMonth === "All" || getMonth(app.date) === filterMonth;
      const yearMatch =
        filterYear === "All" || getYear(app.date) === Number(filterYear);
      return monthMatch && yearMatch;
    });
  };

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/appointments/getAppointmentByDoctorId/${doctor._id}`
      );
      if (response.data.ok) {
        setUpcoming(response.data.upcomingAppointments);
        setConfirmed(response.data.confirmedAppointment);
        setRejected(response.data.rejectedAppointments);
        setCompleted(response.data.completedAppointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   fetchAppointment();
  },[]);

  const handleAccept = async (id) => {
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
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/doctorprofile/acceptAppointment/${id}`
          );

          if (response.data.ok) {
            Swal.fire(
              "Accepted!",
              "The appointment has been accepted.",
              "success"
            );
            await fetchAppointment();
          } else {
            Swal.fire("Error!",  response.data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not connect to the server.", "error");
        }
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to reject this appointment?",
      icon: "warning",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/doctorprofile/rejectAppointment/${id}`
          );

          if (!response.data.ok) {
            await fetchAppointment();
            Swal.fire(
              "Rejected!",
              "The appointment request has been rejected.",
              "success"
            );
          } else {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not connect to the server.", "error");
        }
      }
    });
  };

  const handleCompleted = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to mark this as Completed?",
      icon: "warning",
      confirmButtonText: "Yes, Continue",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/doctorprofile/markCompleted/${id}`
          );

          if (response.data.ok) {
            await fetchAppointment();
            Swal.fire(
              "Marked Completed!",
              "The appointment has been completed",
              "success"
            );
          } else {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not connect to the server.", "error");
        }
      }
    });
  };

  const handleUploadReport = async (appointmentId) => {
    Swal.fire({
      title: "Upload Report",
      html: `
        <input name="reports" type="file" id="reportFile" accept="application/pdf" class="swal2-file" style="display: block; margin: 10px auto;" />
      `,
      showCancelButton: true,
      confirmButtonText: "Upload",
      cancelButtonText: "Cancel",
      preConfirm: async () => {
        const fileInput = document.getElementById(
          "reportFile"
        ) ;
        const files = Array.from(fileInput.files);
        if (files.length > 5) {
          Swal.showValidationMessage("Maximum 5 files allowed");
          return false;
        }
        for (const file of files) {
          if (file.type !== "application/pdf") {
            Swal.showValidationMessage("Only PDF files are allowed");
            return false;
          }
          if (file.size > 10 * 1024 * 1024) {
            Swal.showValidationMessage("Each file must be less than 10MB");
            return false;
          }
        }

        const formData = new FormData();
        files.forEach((file) => formData.append("reports", file));

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/doctorprofile/uploadReport/${appointmentId}`,
            formData,
            { withCredentials: true }
          );
          if (!response.data.ok) {
            Swal.showValidationMessage(response.data.message || "Upload failed");
            return false;
          }
          return true;
        } catch (error) {
          Swal.showValidationMessage(
            error.response?.data?.message || "Upload failed"
          );
          return false;
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Report uploaded successfully!", "success");
        await fetchAppointment(); // Refresh to get updated reportFileKey
      }
    });
  };


  const handleViewReport = async (appointmentId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctorprofile/viewReport/${appointmentId}`,
        { withCredentials: true }
      );

      if (response.data.ok) {
        const reports = response.data.reports;
        if (reports.length === 0) {
          Swal.fire('Info', 'No reports available.', 'info');
          return;
        }

        const html = reports
        .map(
          (report) => `
            <div style="margin: 10px 0;">
              <a href="${report.url}" target="_blank" style="color: #1e90ff;">
                ${report.fileName} (Uploaded: ${new Date(
                  report.uploadedAt
                ).toLocaleDateString()})
              </a>
            </div>
          `
        )
        .join('');
        // reports.forEach((report) => {
        //   const link = document.createElement('a');
        //   link.href = report.url;
        //   link.download = report.fileName; // Suggest filename for download
        //   document.body.appendChild(link);
        //   link.click();
        //   document.body.removeChild(link);
        // });

        Swal.fire({
          title: 'Reports',
          html,
          icon: 'info',
          confirmButtonText: 'Close',
        });
      } else {
        Swal.fire('Error!', response.data.message || 'Failed to view reports', 'error');
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to view report", "error");
    }
  };


  const handleDelete = async (appointmentId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `http://localhost:5001/appointments/deleteAppointment/${appointmentId}`
        );
        if (res.data.ok) {
          Swal.fire("Deleted!", res.data.message, "success");
          fetchAppointment();
        }else
        {
          Swal.fire("Error!", res.data.message, "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.error(error);
      }
    }
  };

  const filteredAppointments = () => {
    if (select === "Upcoming") return applyFilters(upcoming || []);
    if (select === "Accepted") return applyFilters(confirmed || []);
    if (select === "Rejected") return applyFilters(rejected || []);
    if (select === "Completed") return applyFilters(completed || []);
    return [];
  };
  const paginatedAppointments = () => {
    const filtered = filteredAppointments() || [];
    const start = (currentPage - 1) * appointmentsPerPage;
    const end = start + appointmentsPerPage;
    return filtered.slice(start, end);
  };

  const totalPages = Math.ceil(
    (filteredAppointments()?.length || 0) / (appointmentsPerPage || 1)
  );

  const renderCard = (app, index) => (
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
        {app.time}
      </p>
      <p>
        <strong>Reason:</strong> {app.patientForm.reason}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold ${
            app.status === "Confirmed"
              ? "text-yellow-800"
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
      {
        select==="Upcoming" && (
          <p>
          <strong>Payment Status:</strong>{" "}
         {app.paymentStatus}
         </p>
        )
      }
      
      <p>
        <strong>Report:</strong>{" "}
        {app.report?.length>0 ? (
          <button
            onClick={() => handleViewReport(app._id)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
          >
            <span className="text-xl">☁️</span> {/* Cloud icon (replace with proper icon if available) */}
            <span>Download</span>
          </button>
        ) : (
          "No report uploaded"
        )}
      </p>
      {select === "Completed" && (
        <div className="p-3 mt-2 flex flex-wrap justify-center gap-2">
        <button
            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg"
            onClick={() => handleUploadReport(app._id)}
          >
            Upload Report
          </button>
        <button  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
         onClick={() => handleDelete(app._id)} 
        >
          <Trash2 size={18} />
        </button>
      </div>
      )}
      {select==="Upcoming" && (
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
        
        </div>
      )}

      { 
        select==="Accepted" && (
          <div className="flex flex-wrap gap-2 mt-3">
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
        )
      }
    </div>
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
  
  console.log(paginatedAppointments());

  return (
    <div className="bg-white p-4 m-4 mb-4 border border-blue-400 rounded-lg shadow-lg">
      <h3 className="text-2xl lg:text-4xl  text-center font-bold mb-10 text-indigo-700">
        Appointment Requests
      </h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-5">
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

      {/* Continue with the rest of your component... */}

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
              {select === "Upcoming" && <th className="p-3">Payment Status</th>}
              {select === "Completed" && <th className="p-3">Report</th>}
              {select === "Upcoming" && <th className="p-3">Actions</th>}
              {select === "Accepted" && <th className="p-3">Actions</th>}
              {select === "Completed" && <th className="p-3">Actions</th>}
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
                {formatTime(app.time)}
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
                
                
                  {
                     select === "Upcoming" && ( <td className="p-3 border-r"> {app.paymentStatus}</td> )
                  }
               
                {
                  select==="Completed" && (
                <td className="p-3 border-r">
                  {app.report?.length>0  ? (
                    <button
                       onClick={() => handleViewReport(app._id)}
                       className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
                      >
                              <span className="text-xl">☁️</span> {/* Cloud icon (replace with proper icon if available) */}
                              <span>Download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUploadReport(app._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Upload
                    </button>
                  )}
                </td>)
                }
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
                  
                  </td>
                )}

                {select === "Accepted" && (
                  <td className="p-3 flex flex-wrap justify-center gap-2">
                    {/* <button
                      onClick={() => {
                        disableButtons(index);
                        handleReject(app._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                      disabled={actionDisabled[index]}
                    >
                      <FontAwesomeIcon icon={faXmark} className="mr-1" /> Reject
                    </button> */}
                    <button
                      onClick={() => {
                        disableButtons(index);
                        handleCompleted(app._id);
                      }}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-50"
                      disabled={actionDisabled[index]}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />{" "}
                      Complete
                    </button>
                  </td>
                )}

                {select === "Completed" && (
                  <td className="p-3 flex flex-wrap justify-center gap-2">
                    <button className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    onClick={() => handleDelete(app._id)}
                    >
                      <Trash2 size={18} />
                    </button>
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
            className="px-4 py-2 rounded-full text-sm sm:text-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm sm:text-lg font-semibold ">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-full text-sm sm:text-lg font-semibold transition-all bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
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
