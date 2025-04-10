


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({appointmentData,setAppointmentData,onNext,onPrev}) => {
  const staticTimeSlots = [
    { id: "1", start: "09:00 AM", end: "09:30 AM", status: "Available" },
    { id: "2", start: "10:00 PM", end: "10:30 PM", status: "Available" },
    { id: "3", start: "10:00 PM", end: "10:30 PM", status: "Available" },
    { id: "4", start: "10:00 PM", end: "10:30 PM", status: "Available" },
    { id: "5", start: "10:00 PM", end: "10:30 PM", status: "Available" },
    { id: "6", start: "10:00 PM", end: "10:30 PM", status: "Available" },
    { id: "7", start: "11:00 PM", end: "11:30 PM", status: "Booked" },
    { id: "8", start: "02:00 PM", end: "02:30 PM", status: "Available" },
  ];
 
  const handleDateChange = (date) => {
    setAppointmentData((prev) => ({
      ...prev,
      date: date,
    }));
  };
  const handleTimeSlotSelect = (time) => {
    


    setAppointmentData((prev) => ({
      ...prev,
     time: `${time.start} - ${time.end}`,
      slot: time.id,
    }));
  };
  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Select a Date & Time Slot
      </h2>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg border border-blue-700">
        {/* Date Picker */}
        <div className="w-full md:w-1/2 flex flex-col justify-center mb-10 items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Pick a Date</h3>
          <div className="bg-white p-4  rounded-lg shadow-md border border-blue-500 ">
            <DatePicker
             selected={appointmentData.date || new Date()}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="w-full p-2 text-base text-center border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold text-center  text-gray-700 mb-5">Available Slots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {staticTimeSlots.map((time) => (
              <button
                key={time.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleTimeSlotSelect(time);
                }}
                className={`py-2 px-4 text-sm font-medium rounded-md border transition-all shadow-md ${
                  time.status === "Booked"
                    ? "bg-red-100 text-gray-400 cursor-not-allowed border-red-400"
                    : appointmentData.slot === time.id
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-lg scale-105"
                    : "bg-blue-50 hover:bg-indigo-100 border-gray-300"
                }`}
                disabled={time.status === "Booked"}
              >
                {time.start} - {time.end} ({time.status})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 w-full max-w-md">
        <button
          onClick={onPrev}
          className="bg-gray-500 text-white py-2 px-6 rounded-md font-semibold transition-all hover:bg-gray-600 shadow-md"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!appointmentData.date || !appointmentData.time}
          className="bg-indigo-600 text-white py-2 px-6 rounded-md font-semibold transition-all hover:bg-indigo-700 disabled:bg-indigo-300 shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomDatePicker;


// import axios from "axios";
// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { Calendar } from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const DatePicker = ({
//   selectedDoctor,
//   selectedDate,
//   setSelectedDate,
//   selectedTime,
//   setSelectedTime,
//   selectedSlot,
//   setSlot,
//   onNext,
//   onPrev,
// }) => {
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (selectedDoctor) {
//       getAvailableTimeSlots();
//     }
//   }, [selectedDoctor]);

//   const getAvailableTimeSlots = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/doctorprofile/getTimeSlots",
//         { _id: selectedDoctor._id }
//       );
//       setTimeSlots(response.data.result);
//     } catch (error) {
//       console.error("Error fetching time slots:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full p-5 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
//         Select a Date & Time Slot
//       </h2>
//       <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
//         {/* Date Picker */}
//         <div className="w-full md:w-1/2 flex flex-col items-center">
//           <h3 className="text-xl font-semibold text-gray-700 mb-3">
//             Pick a Date
//           </h3>
//           <Calendar
//             onChange={setSelectedDate}
//             value={selectedDate}
//             minDate={new Date()}
//             className="border border-gray-300 rounded-lg shadow-md p-2 w-full"
//           />
//         </div>

//         {/* Time Slots */}
//         <div className="w-full md:w-1/2">
//           <h3 className="text-xl font-semibold text-gray-700 mb-3">
//             Available Slots
//           </h3>
//           {loading ? (
//             <p className="text-gray-500">Loading available slots...</p>
//           ) : timeSlots.length > 0 ? (
//             timeSlots.map((slot) => (
//               <div key={slot._id} className="mb-3">
//                 <h4 className="text-lg font-medium text-indigo-600">
//                   {format(new Date(slot.date), "PPPP")}
//                 </h4>
//                 <div className="grid grid-cols-2 gap-3 mt-2">
//                   {slot.slot.map((time, idx) => (
//                     <button
//                       key={time._id}
//                       onClick={() => {
//                         setSelectedTime(
//                           `${format(
//                             new Date(time.start),
//                             "hh:mm a"
//                           )} - ${format(new Date(time.end), "hh:mm a")}`
//                         );
//                         setSlot(time._id);
//                       }}
//                       className={`py-2 px-4 rounded-md border-2 text-sm font-medium transition-all ${
//                         time.status === "Booked"
//                           ? "bg-red-100 text-gray-400 cursor-not-allowed border-red-400"
//                           : selectedSlot === time._id
//                           ? "bg-indigo-600 text-white border-indigo-700"
//                           : "bg-blue-50 hover:bg-indigo-100 border-gray-300"
//                       }`}
//                       disabled={time.status === "Booked"}
//                     >
//                       {format(new Date(time.start), "hh:mm a")} -{" "}
//                       {format(new Date(time.end), "hh:mm a")} ({time.status})
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">
//               No available slots for the selected date.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-6 w-full max-w-md">
//         <button
//           onClick={onPrev}
//           className="bg-gray-500 text-white py-2 px-5 rounded-lg font-semibold transition-all hover:bg-gray-600"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           disabled={!selectedDate || selectedTime}
//           className="bg-indigo-600 text-white py-2 px-5 rounded-lg font-semibold transition-all hover:bg-indigo-700 disabled:bg-indigo-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DatePicker;



// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// const DatePicker = ({
//   selectedDoctor,
//   selectedDate,
//   setSelectedDate,
//   selectedTime,
//   setSelectedTime,
//   selectedSlot,
//   setSlot,
//   onNext,
//   onPrev,
// }) => {

//   const [timeSlot, setTimeSlot] = useState([]);

//   console.log(selectedDoctor);
//   useEffect(() => {
//     getAvailableTimeSlots();
//   }, []);
//   const getAvailableTimeSlots = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/doctorprofile/getTimeSlots",
//         { _id: selectedDoctor._id }
//       );
//       console.log(response.data.result);
//       setTimeSlot(response.data.result);
//       console.log(timeSlot);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center w-full p-3">

//       <h2 className="text-2xl font-bold mb-6">Select a Time Slot</h2>
//       <div className="mt-3 mb-3">
//         {timeSlot.map((slot) => (
//           <div
//             key={slot._id}
//             className="bg-white p-6 rounded-lg shadow-md mt-3 mb-3"
//           >
//             <div className="space-y-2">
//               <button
//                 onClick={() =>
//                   setSelectedDate(new Date(slot.date).toLocaleDateString())
//                 }
//                 className={`  py-2 px-4 rounded-md ${
//                   selectedDate == "" ? "bg-blue-50" : ""
//                 } ${
//                   selectedDate === new Date(slot.date).toLocaleDateString()
//                     ? "text-white bg-indigo-700"
//                     : "bg-blue-50"
//                 }`}
//               >
//                 <span className="font-medium">Date:</span>{" "}
//                 {new Date(slot.date).toLocaleDateString()}
//               </button>
//               <div>
//                 <h3 className="font-medium mt-2 mb-2">Slots:</h3>
//                 <div className="grid grid-cols-3 gap-4">
//                   {slot.slot.map((time, idx) => (
//                     <div
//                       key={time._id}
//                       onClick={() => {
//                         setSelectedTime(
//                           `${new Date(
//                             time.start
//                           ).toLocaleTimeString()} - ${new Date(
//                             time.end
//                           ).toLocaleTimeString()}`
//                         ),
//                           setSlot(time._id);
//                       }}
//                       className={`ml-4   p-4 mb-4 text-sm  rounded-lg border-2 border-dark dark:bg-gray-800 dark:text-red-400  ${
//                         time.status == "Booked"
//                           ? "bg-red-50 cursor-not-allowed"
//                           : "bg-blue-50"
//                       } ${
//                         selectedSlot === time._id
//                           ? "text-white bg-indigo-700"
//                           : "bg-blue-50"
//                       }`}
//                       role="alert"
//                     >
//                       <span className="font-medium">Slot {idx + 1}:</span>{" "}
//                       {new Date(time.start).toLocaleTimeString()} -{" "}
//                       {new Date(time.end).toLocaleTimeString()} ({time.status})
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//       </div>
//       <div className="flex justify-between mt-6 w-full">
//         <button
//           onClick={onPrev}
//           className="bg-gray-500 text-white py-2 px-4 rounded-md"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           disabled={!selectedDate || !selectedTime}
//           className="bg-indigo-600 text-white py-2 px-4 rounded-md disabled:bg-indigo-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DatePicker;
