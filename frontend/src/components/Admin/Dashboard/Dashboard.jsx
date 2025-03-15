



import axios from 'axios';
import {useState,useEffect} from 'react';


const DashBoard = () => {

  const [appointments,setAppointment]=useState([]);
  useEffect(()=>{
    getAllAppointment();
  },[])
  const getAllAppointment = async()=>{
    try{
      const response = await axios.get("http://localhost:5001/api/getAllAppointment");
      if(response.data.Ok){
      setAppointment(response.data.result);
      }
      console.log(appointments);
    }catch(error)
    {
      console.log(error);
    }
  }
    
  
    return (
      <div className="min-h-[650px] bg-gray-100 flex">
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Appointment List</h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-500 text-white rounded">Total: {appointments.length}</div>
            <div className="p-4 bg-yellow-500 text-white rounded">Pending: {appointments.filter(app => app.status === "Pending").length}</div>
            <div className="p-4 bg-green-500 text-white rounded">Approved: {appointments.filter(app => app.status === "Approved").length}</div>
            <div className="p-4 bg-red-500 text-white rounded">Rejected: {appointments.filter(app => app.status === "Rejected").length}</div>
          </div>
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
        </main>
      </div>
    );
  };
  
  export default DashBoard;
  
  
  