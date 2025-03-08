import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const BookedAppointment = ()=>{
  const activeUser = useSelector((state)=>state.doctor.doctor);
  console.log(activeUser);
   const [appointments,setAppointment]=useState([]);
   useEffect(()=>{
    getAllAppointmentByDoctorId();
   },[]);
   
   const getAllAppointmentByDoctorId = async()=>{
    try{
      const response = await axios.post("http://localhost:5001/api/getAppointmentByDoctorId",{id:activeUser._id});
      console.log(response.data);
      if(response.data.ok)
      {
         setAppointment(response.data.result);
         console.log(appointments);
      }
    }catch(error)
    {
      console.log(error); 
    }
   }
    return (
        <>

        {/* View Booked Appointments */}
      <div className="bg-white p-4 m-4 mb-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Booked Appointments</h3>
        <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Doctor</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="p-3">{app.doctor}</td>
                  <td className="p-3">{app.patientId}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3">{app.time}</td>
                  <td className="p-3">{app.reason}</td>
                  <td className={`p-3 ${app.status === "Approved" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>{app.status}</td>
                  <td className="p-3"><button className="bg-blue-500 text-white px-3 py-1 rounded">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

        </>
    )
}

export default BookedAppointment;