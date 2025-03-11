import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BookedAppointment = () => {
  const activeUser = useSelector((state) => state.doctor.doctor);
  const [appointments, setAppointment] = useState([]);

  useEffect(() => {
    getAllAppointmentByDoctorId();
  }, []);

  const getAllAppointmentByDoctorId = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/getAppointmentByDoctorId",
        { id: activeUser._id }
      );
      if (response.data.ok) {
        setAppointment(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* View Booked Appointments */}
      <div className="bg-white p-4 m-4 mb-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Booked Appointments</h3>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
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
              {appointments.map((app) => (
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
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookedAppointment;
