import { useState } from "react";

const BookedAppointment = ()=>{
    const [doctor, setDoctor] = useState({
        id: 'doc001',
        name: 'Dr. Ross Geller',
        email: 'ross.geller@example.com',
        specialization: 'Anesthetics',
        rating: 5.0,
        isApproved: false,
        availability: [
          {
            date: '2025-02-24',
            timeSlots: [
              { time: '09:30', isBooked: false, patient: null },
              { time: '10:00', isBooked: true, patient: 'Patient A' },
              { time: '10:30', isBooked: false, patient: null },
              { time: '11:00', isBooked: false, patient: null },
            ],
          },
          {
            date: '2025-02-25',
            timeSlots: [
              { time: '09:00', isBooked: false, patient: null },
              { time: '09:30', isBooked: true, patient: 'Patient B' },
              { time: '10:00', isBooked: false, patient: null },
            ],
          },
        ],
        medicalReports: [
          { patient: 'Patient A', report: 'Routine checkup - Normal', date: '2025-02-24' },
          { patient: 'Patient B', report: 'Prescription for medication X', date: '2025-02-25' },
        ],
      });
    return (
        <>

        {/* View Booked Appointments */}
      <div className="bg-white p-4 m-4 mb-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Booked Appointments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {doctor.availability
            .flatMap((day) =>
              day.timeSlots.map((slot) => ({ ...slot, date: day.date }))
            )
            .filter((slot) => slot.isBooked)
            .map((slot, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded break-words">
                {slot.time} on {slot.date} - Patient: {slot.patient}
              </div>
            ))}
        </div>
      </div>

        </>
    )
}

export default BookedAppointment;