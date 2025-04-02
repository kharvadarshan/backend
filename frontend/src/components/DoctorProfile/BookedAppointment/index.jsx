import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
import {faCheck,faXmark,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookedAppointment = () => {
  const activeUser = useSelector((state) => state.doctor.doctor);
  console.log(activeUser);
  const [appointments, setAppointment] = useState([]);
  const [upcoming,setUpComing]=useState([]);
  const [completed,setCompleted]=useState([]);
  const [select ,setSelect]=useState("Upcoming");

  useEffect(() => {
    getAllAppointmentByDoctorId();
  }, []);

  const handleAccept = async (appointmentId) => {
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
          const response = await axios.post("http://localhost:5001/doctorprofile/changeAppointment", {
            id: appointmentId,
          });
  
          if (response.data.ok) {
            Swal.fire("Accepted!", "The appointment has been accepted.", "success");
          } else {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not connect to the server.", "error");
        }
      }
    });
  };

  const handleReject=async(appointmentId) =>{
    Swal.fire({
            title:"Are you sure?",
            text:"Do you really want to reject this appointment?",
            icon:"warning",
            confirmButtonText:"Yes, Reject",
            cancelButtonText:"No, Cancel",
    }).then(async(result)=>{
      if(result.isConfirmed){
        try{
              const response = await axios.post("http://localhost:5001/doctorprofile/rejectAppointment",{
                id:appointmentId
              });

              if(!response.data.ok)
              {
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

  const handleCompleted=async(appointmentId) =>{
    Swal.fire({
            title:"Are you sure?",
            text:"Do you really want to mark this as Completed?",
            icon:"warning",
            confirmButtonText:"Yes, Continue",
            cancelButtonText:"No, Cancel",
    }).then(async(result)=>{
      if(result.isConfirmed){
        try{
              const response = await axios.post("http://localhost:5001/doctorprofile/markCompleted",{
                id:appointmentId
              });

              if(response.data.ok)
              {
                   Swal.fire("Marked Completed!","The appointment has been completed","success");
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

  const getAllAppointmentByDoctorId = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/getAppointmentByDoctorId",
        { name: activeUser.name }
      );
      if (response.data.ok) {
        setAppointment(response.data.result);
        setUpComing(response.data.upcomingAppointments);
        setCompleted(response.data.completedAppointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* View Booked Appointments */}
      <div className="bg-white p-4 m-4 mb-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Appointments Requests</h3>
        <div className="">
             <button onClick={()=>setSelect("Upcoming")} name="Upcoming" className={` my-2  mr-3 rounded-full  p-2 ${select === "Upcoming" ? "bg-indigo-700  text-white" : "text-black"}`}>UpComing</button>
             <button onClick={()=>setSelect("Completed")} name="Completed" className={` my-2  ml-3 rounded-full p-2 ${select === "Completed" ? "bg-indigo-700  text-white" : "text-black"}`}>Completed</button>
        </div>
       
        {/* Responsive Table Container */}
        <div className="overflow-x-auto">

        {select === "Upcoming" && (
          <>
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="p-3">{app.doctor}</td>
                  <td className="p-3">{app.patientId}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3">{app.time}</td>
                  <td className="p-3">{app.reason}</td>
                  <td
                    className={`p-3 ${
                      app.status === "Approved"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="p-3">
                    <button  onClick={()=>handleAccept(app._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-2 my-2">
                     <span className="mx-1"><FontAwesomeIcon  icon={faCheck} /></span>Accept
                    </button>
                    <button  onClick={()=>handleReject(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
                    <span className="mx-1"><FontAwesomeIcon  icon={faXmark} /></span>Reject
                    </button>
                    <button disabled={app.status === "pending"} onClick={()=> handleCompleted(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
                      <span className="mx-1"><FontAwesomeIcon  icon={faCheckCircle} /></span> Mark Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
        )}



        {select === "Completed" && (
          <>
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="p-3">{app.doctor}</td>
                  <td className="p-3">{app.patientId}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3">{app.time}</td>
                  <td className="p-3">{app.reason}</td>
                  <td
                    className={`p-3 ${
                      app.status === "Approved"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </td>
                  {/* <td className="p-3">
                    <button  onClick={()=>handleAccept(app._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-2 my-2">
                     <span className="mx-1"><FontAwesomeIcon  icon={faCheck} /></span>Accept
                    </button>
                    <button  onClick={()=>handleReject(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
                    <span className="mx-1"><FontAwesomeIcon  icon={faXmark} /></span>Reject
                    </button>
                    <button disabled={app.status === "pending"} onClick={()=> handleCompleted(app._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mx-1 my-2">
                      <span className="mx-1"><FontAwesomeIcon  icon={faCheckCircle} /></span> Mark Completed
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          </>
        )}
          
        </div>
    
      </div>
    </>
  );
};

export default BookedAppointment;
