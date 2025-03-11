


import { useState } from 'react';

const ManageSchedule = () => {
  
   const [timeSlot , setTimeSlot ] = useState({
    doctorId:'67a8ddf7f417c09f242f0e42',
    date:'',
    slot:[
      {
        start:'',
        end:'',
        status:"Available"
      }
    ]
   });
   const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setTimeSlot({...timeSlot,[name]:value})
   }
   const handleSlotChange = (index,e)=>{
    const {name,value} = e.target;
    const updatedSlots = [...timeSlot.slot];
    updatedSlots[index] = {...updatedSlots[index],[name]:value};
    setTimeSlot({...timeSlot,slot:updatedSlots});
   }
   const addSlot = ()=>{
    console.log(timeSlot);
    setTimeSlot({
      ...timeSlot,
      slot:[...timeSlot.slot,{start:'',end:'',status:'Available'}],
    })
   }
 

  return (
    <div className="flex flex-row  h-full p-3 mx-auto my-auto ">
      {/* Manage Availability */}
      <div className="basis-2/3  bg-white p-4   rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Manage Availability</h3>
        <div className='flex flex-col md:flex-row  mb-4 justify-start p-2'>
        <input
            type="date"
            name="date"
            value={timeSlot.date}
            onChange={handleInputChange}
            className="border p-2 rounded  min-w-0 space-y-2"
          />
        </div>
        <div className="  grid grid-cols-3  gap-2 mb-4 justify-start  p-2 ">
          {
             timeSlot.slot.map((slot,index)=> (
                <div key={index} className='border p-4 rounded-md space-y-2 '>
                     <h3 className='text-lg font-semibold'>Slot {index+1}</h3>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">
                         Start Time
                       </label>
                       <input
                         type="time"
                         name="start"
                         value={slot.start}
                         onChange={(e) => handleSlotChange(index, e)}
                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                         required
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">
                         End Time
                       </label>
                       <input
                         type="time"
                         name="end"
                         value={slot.end}
                         onChange={(e) => handleSlotChange(index, e)}
                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                         required
                       />
                     </div>
                     
                </div>
             ))
          } 
        </div>
        <button
          type="button"
          onClick={addSlot}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-2"
        >
          Add Another Slot
        </button>
        {/* Submit Button */}
        <button
          type="submit"
          onClick={addSlot}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 m-2"
        >
          Create Time Slot
        </button>
       
      </div>
         <div className='basis-1/3 bg-white ml-4 p-4 rounded-lg shadow w-full' >
            <h1>Select Date</h1>
            <input type="date"  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
            <hr className='mt-4 mb-4 border-4 border-indigo-100 '/>
            <div className='mt-4'>
                    <h1>Slots According to Date and its status</h1>
            </div>
         </div>
    </div>
  );
};
export default ManageSchedule;























// import  { useState } from 'react';

// const DoctorProfile = () => {
//   // Hardcoded raw data for the doctor (simulating registration and profile)
//   const [doctor, setDoctor] = useState({
//     id: 'doc001',
//     name: 'Dr. Ross Geller',
//     email: 'ross.geller@example.com',
//     specialization: 'Anesthetics',
//     rating: 5.0,
//     isApproved: false, // Waiting for admin approval
//     availability: [
//       {
//         date: '2025-02-24', // Current date
//         timeSlots: [
//           { time: '09:30', isBooked: false, patient: null },
//           { time: '10:00', isBooked: true, patient: 'Patient A' },
//           { time: '10:30', isBooked: false, patient: null },
//           { time: '11:00', isBooked: false, patient: null },
//         ],
//       },
//       {
//         date: '2025-02-25', // Next day
//         timeSlots: [
//           { time: '09:00', isBooked: false, patient: null },
//           { time: '09:30', isBooked: true, patient: 'Patient B' },
//           { time: '10:00', isBooked: false, patient: null },
//         ],
//       },
//     ],
//     medicalReports: [
//       { patient: 'Patient A', report: 'Routine checkup - Normal', date: '2025-02-24' },
//       { patient: 'Patient B', report: 'Prescription for medication X', date: '2025-02-25' },
//     ],
//   });

//   // State for form inputs and UI updates
//   const [editedProfile, setEditedProfile] = useState({ ...doctor });
//   const [newSlot, setNewSlot] = useState({ date: '', time: '' });
//   const [newReport, setNewReport] = useState({ patient: '', report: '', date: '' });
//   const [showApprovalMessage, setShowApprovalMessage] = useState(true);

//   // Handle profile updates (specialization, availability, etc.)
//   const handleProfileUpdate = (e) => {
//     const { name, value } = e.target;
//     setEditedProfile({ ...editedProfile, [name]: value });
//   };

//   // Update doctor's availability (manage appointment slots)
//   const addAvailabilitySlot = () => {
//     const { date, time } = newSlot;
//     if (date && time) {
//       const existingDate = doctor.availability.find((a) => a.date === date);
//       if (existingDate) {
//         existingDate.timeSlots.push({ time, isBooked: false, patient: null });
//       } else {
//         doctor.availability.push({
//           date,
//           timeSlots: [{ time, isBooked: false, patient: null }],
//         });
//       }
//       setDoctor({ ...doctor });
//       setNewSlot({ date: '', time: '' });
//     }
//   };

//   // View and manage booked appointments (accept/cancel)
//   const handleAppointmentAction = (date, time, action) => {
//     const availability = doctor.availability.find((a) => a.date === date);
//     const slot = availability.timeSlots.find((s) => s.time === time);

//     if (action === 'accept') {
//       slot.isBooked = true;
//       slot.patient = `Patient ${Math.floor(Math.random() * 100) + 1}`; // Simulate a patient
//     } else if (action === 'cancel') {
//       slot.isBooked = false;
//       slot.patient = null;
//     }
//     setDoctor({ ...doctor });
//   };

//   // Add medical reports or prescriptions
//   const addMedicalReport = () => {
//     const { patient, report, date } = newReport;
//     if (patient && report && date) {
//       doctor.medicalReports.push({ patient, report, date });
//       setDoctor({ ...doctor });
//       setNewReport({ patient: '', report: '', date: '' });
//     }
//   };

//   return (
//     <div className="flex flex-col bg-pink-500 p-4 min-h-screen max-w-screen-lg mx-auto w-full ">
//       <h2 className="text-2xl font-bold mb-4 text-white">Doctor Profile</h2>

//       {/* Registration and Approval Status */}
//       {showApprovalMessage && (
//         <div className="bg-red-100 p-4 mb-4 rounded-lg flex justify-between items-center">
//           <p className="text-red-700">Registration submitted. Waiting for admin approval...</p>
//           <button
//             onClick={() => setShowApprovalMessage(false)}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Hide
//           </button>
//         </div>
//       )}

//       {/* Profile Details */}
//       <div className="bg-white p-4 mb-4 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             value={editedProfile.name}
//             onChange={handleProfileUpdate}
//             placeholder="Name"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="email"
//             name="email"
//             value={editedProfile.email}
//             onChange={handleProfileUpdate}
//             placeholder="Email"
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="specialization"
//             value={editedProfile.specialization}
//             onChange={handleProfileUpdate}
//             placeholder="Specialization"
//             className="border p-2 rounded w-full"
//           />
//           <p className="text-yellow-500">Rating: ★ {editedProfile.rating}</p>
//         </div>
//         <button
//           onClick={() => setDoctor(editedProfile)}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Save Profile
//         </button>
//       </div>

//       {/* Manage Availability (Set Available Timings) */}
//       <div className="bg-white p-4 mb-4 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-2">Manage Availability</h3>
//         <div className="flex flex-col md:flex-row gap-4 mb-4">
//           <input
//             type="date"
//             value={newSlot.date}
//             onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
//             className="border p-2 rounded w-full md:w-1/2"
//           />
//           <input
//             type="time"
//             value={newSlot.time}
//             onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
//             className="border p-2 rounded w-full md:w-1/2"
//           />
//           <button
//             onClick={addAvailabilitySlot}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full md:w-auto"
//           >
//             Add Availability Slot
//           </button>
//         </div>

//         <h4 className="text-lg font-medium mb-2">Current Availability</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {doctor.availability.map((day) => (
//             <div key={day.date} className="bg-gray-50 p-3 rounded-lg">
//               <h5 className="text-md font-semibold">{new Date(day.date).toLocaleDateString()}</h5>
//               {day.timeSlots.map((slot) => (
//                 <div
//                   key={slot.time}
//                   className={`p-2 mb-2 rounded ${
//                     slot.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
//                   }`}
//                 >
//                   {slot.time} - {slot.isBooked ? `Booked by ${slot.patient}` : 'Available'}
//                   {!slot.isBooked ? (
//                     <button
//                       onClick={() => handleAppointmentAction(day.date, slot.time, 'accept')}
//                       className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
//                     >
//                       Accept
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleAppointmentAction(day.date, slot.time, 'cancel')}
//                       className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* View Booked Appointments */}
//       <div className="bg-white p-4 mb-4 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-2">Booked Appointments</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {doctor.availability
//             .flatMap((day) => day.timeSlots)
//             .filter((slot) => slot.isBooked)
//             .map((slot, index) => (
//               <div key={index} className="bg-gray-100 p-2 rounded">
//                 {slot.time} on {slot.date} - Patient: {slot.patient}
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Add Medical Reports/Prescriptions */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-2">Add Medical Report/Prescription</h3>
//         <div className="flex flex-col md:flex-row gap-4 mb-4">
//           <input
//             type="text"
//             value={newReport.patient}
//             onChange={(e) => setNewReport({ ...newReport, patient: e.target.value })}
//             placeholder="Patient Name"
//             className="border p-2 rounded w-full md:w-1/3"
//           />
//           <textarea
//             value={newReport.report}
//             onChange={(e) => setNewReport({ ...newReport, report: e.target.value })}
//             placeholder="Report/Prescription"
//             className="border p-2 rounded w-full md:w-1/3"
//           />
//           <input
//             type="date"
//             value={newReport.date}
//             onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
//             className="border p-2 rounded w-full md:w-1/3"
//           />
//           <button
//             onClick={addMedicalReport}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full md:w-auto"
//           >
//             Add Report
//           </button>
//         </div>

//         <h4 className="text-lg font-medium mb-2">Existing Reports</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {doctor.medicalReports.map((report, index) => (
//             <div key={index} className="bg-gray-100 p-2 rounded">
//               {report.date} - {report.patient}: {report.report}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;


