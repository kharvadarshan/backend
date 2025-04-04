// import  { useState } from "react";
// import Doctor from "../Doctor";
// import DatePicker from "../appointmentComponent/DatePicker";
// import TimeSlots from "../appointmentComponent/TimeSlots";
// import ReasonInput from "../appointmentComponent/ReasonInput";
// import Confirmation from "../appointmentComponent/Confirmation";


// const BookAppointment = () => {
//   const [step, setStep] = useState(1); // Track current step
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const handleNext = () => setStep(step + 1);
//   const handlePrev = () => setStep(step - 1);

//    console.log(selectedDoctor,selectedDate,selectedTime,reason)

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
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 min-w-screen">
//       <div className="bg-white p-8 rounded-lg shadow-md min-w-screen ">
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



// import { useState } from "react";
// import Doctor from "../Doctor";
// import DatePicker from "../appointmentComponent/DatePicker";
// import TimeSlots from "../appointmentComponent/TimeSlots";
// import ReasonInput from "../appointmentComponent/ReasonInput";
// import Confirmation from "../appointmentComponent/Confirmation";

// const BookAppointment = () => {
//   const [step, setStep] = useState(1);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   const handleDoctorSelect = (doctor) => {
//     setSelectedDoctor(doctor);
//     setStep(2); // Move to the next step automatically
//   };

//   const handleSubmit = async () => {
//     const appointmentData = {
//       doctor: selectedDoctor,
//       date: selectedDate,
//       time: selectedTime,
//       reason,
//     };

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
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 min-w-screen">
//       <div className="bg-white p-8 rounded-lg shadow-md min-w-screen">
//         {!isConfirmed ? (
//           <>
//             {step === 1 && (
//               <Doctor
//                 selectedDoctor={selectedDoctor}
//                 setSelectedDoctor={handleDoctorSelect}
//                 onNext={() => setStep(3)} // Click moves to the next step
//               />
//             )}
//             {step === 2 && (
//               <DatePicker
//                 selectedDate={selectedDate}
//                 setSelectedDate={setSelectedDate}
//                 onNext={() => setStep(3)}
//                 onPrev={() => setStep(1)}
//               />
//             )}
//             {step === 3 && (
//               <TimeSlots
//                 selectedTime={selectedTime}
//                 setSelectedTime={setSelectedTime}
//                 onNext={() => setStep(4)}
//                 onPrev={() => setStep(2)}
//               />
//             )}
//             {step === 4 && (
//               <ReasonInput
//                 reason={reason}
//                 setReason={setReason}
//                 onSubmit={handleSubmit}
//                 onPrev={() => setStep(3)}
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

import { useState } from "react";
import { useNavigate , useLocation  } from "react-router-dom";
import ReasonInput from "../appointmentComponent/ReasonInput";
import Confirmation from "../appointmentComponent/Confirmation";
import axios from "axios";
import { useSelector } from "react-redux";
import PatientForm from "../appointmentComponent/PatientForm";
import CustomDatePicker from "../appointmentComponent/DatePicker";

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  // const [selectedDoctor, setSelectedDoctor] = useState(null);

  const activeUser = useSelector((state)=>state.user.user);
   console.log(activeUser);
  const { state } = useLocation();
  const selectedDoctor = state?.doctor;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [slot,setSlot ]= useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  // console.log(selectedDoctor);

  const handleSubmit = async () => {
    const appointmentData = {
      doctor: selectedDoctor.name,
      patientId:activeUser.email,
      date: selectedDate,
      time: selectedTime,
      reason,
      slot,
      doctorId:selectedDoctor._id
    };
    console.log(appointmentData);
    try {
      // console.log("Sending appointment data:", appointmentData);
      const response = await axios.post("http://localhost:5001/api/appointments", appointmentData);
      
      if (response.status === 201) { // 201 means "Created"
        setIsConfirmed(true);
        setTimeout(() => navigate("/all-doctors"), 2000); // Redirect after 2 sec
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-full">
      {/* <div className="bg-white p-8 rounded-lg shadow-md  max-w-lg w-auto"> */}
        {!isConfirmed ? (
          <>
            {/* {step === 1 && (
              <DoctorDetails
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                onNext={() => setStep(2)}
              />
            )} */}
            {step === 1 && (
              <CustomDatePicker
                selectedDoctor={selectedDoctor}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedSlot={slot}
                setSlot={setSlot}
                onNext={() => setStep(2)}
                onPrev={() => navigate(`/all-doctors/${selectedDoctor._id}`)}
              />
            )}

            {/* {step === 2 && (
              <TimeSlots
               
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                onNext={() => setStep(3)}
                onPrev={() => setStep(1)}
              />
            )} */}


            {step === 2 && (
              <PatientForm
                // onSubmit={handlePatientForm}
                onPrev={() => setStep(1)}
              />
            )}

            
            {step === 3 && (
              <ReasonInput
                reason={reason}
                setReason={setReason}
                onSubmit={handleSubmit}
                onPrev={() => setStep(1)}
              />
            )}
          </>
        ) : (
          <Confirmation />
        )}
      </div>
    // </div>
  );
};

export default BookAppointment;
