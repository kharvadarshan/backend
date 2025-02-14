
// import  { useState } from "react";
// import Doctor from "../src/components/Doctor";
// import DatePicker from "../src/components/appointmentComponent/DatePicker";
// import TimeSlots from "../src/components/appointmentComponent/TimeSlots";
// import ReasonInput from "../src/components/appointmentComponent/ReasonInput";
// import Confirmation from "../src/components/appointmentComponent/Confirmation";


// const BookAppointment = () => {
//   const [step, setStep] = useState(1); // Track current step
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const handleNext = () => setStep(step + 1);
//   const handlePrev = () => setStep(step - 1);

//   const handleSubmit = async () => {
//     const appointmentData = {
//       doctor: selectedDoctor,
//       date: selectedDate,
//       time: selectedTime,
//       reason,
//     };

//     // Send data to backend
//     try {
//       const response = await fetch("/api/appointments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(appointmentData),
//       });
//       if (response.ok) {
//         setIsConfirmed(true);
//       }
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
//         {!isConfirmed ? (
//           <>
//             {step === 1 && (
//               <Doctor
//                 selectedDoctor={selectedDoctor}
//                 setSelectedDoctor={setSelectedDoctor}
//                 onNext={handleNext}
//               />
//             )}
//             {step === 2 && (
//               <DatePicker
//                 selectedDate={selectedDate}
//                 setSelectedDate={setSelectedDate}
//                 onNext={handleNext}
//                 onPrev={handlePrev}
//               />
//             )}
//             {step === 3 && (
//               <TimeSlots
//                 selectedTime={selectedTime}
//                 setSelectedTime={setSelectedTime}
//                 onNext={handleNext}
//                 onPrev={handlePrev}
//               />
//             )}
//             {step === 4 && (
//               <ReasonInput
//                 reason={reason}
//                 setReason={setReason}
//                 onSubmit={handleSubmit}
//                 onPrev={handlePrev}
//               />
//             )}
//           </>
//         ) : (
//           <Confirmation />
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookAppointment;

import  AllRoute from '../src/routes';

function App() {
    return(
        <>
         <AllRoute/>
        </>       
    )
}

export default App;
