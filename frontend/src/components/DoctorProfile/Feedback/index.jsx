// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Star } from "lucide-react";

// const Feedback = ({ doctor }) => {
//   const [feedback, setFeedback] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (doctor?._id) {
//       fetchFeedback();
//     }
//   }, [doctor?._id]);

//   const fetchFeedback = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/appointments/getAppointmentByDoctorId/${doctor._id}`
//       );

//       if (response.data.ok) {
//         setFeedback(response.data.result);
//       } else {
//         setError("No feedback found.");
//       }
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//       setError("Failed to load feedback.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderRating = (rating) => (
//     <div className="flex items-center gap-1">
//       {[...Array(5)].map((_, index) => (
//         <Star
//           key={index}
//           size={16}
//           className={index < rating ? "text-yellow-500" : "text-gray-300"}
//           fill={index < rating ? "currentColor" : "none"}
//         />
//       ))}
//     </div>
//   );

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Patient Feedback</h2>
//       {loading ? (
//         <p className="text-gray-500">Loading feedback...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : feedback.length === 0 ? (
//         <p className="text-gray-500">No feedback available.</p>
//       ) : (
//         <div className="space-y-4">
//           {feedback.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col p-4 bg-white rounded-lg shadow-md border"
//             >
//               <p className="font-semibold">{item?.patientForm?.patientname || "Anonymous"}</p>
//               <p className="text-gray-600">{item?.patientForm?.email || "No email provided"}</p>
//               <div className="my-2">{renderRating(item?.feedbackForm?.rating || 0)}</div>
//               <p className="text-gray-700">{item?.feedbackForm?.feedback || "No comment provided"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feedback;


import { useEffect,useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const Feedback=({doctor})=>{
   
    const [feedback,setFeedback]=useState(null);

    useEffect(()=>{
        if(doctor?._id){
        fetchFeedback();
        }
    },[doctor?._id]);


    const fetchFeedback= async()=>{
        try
        {
               const response = await axios.get(`${import.meta.env.VITE_API_URL}/appointments/getAppointmentByDoctorId/${doctor._id}`)

               if(response.data.ok)
               {
                   setFeedback(response.data.result);
               }
        }catch(error)
        {
            console.log(error);
        }
    }
   
     const renderRating = (rating) => (
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={index < rating ? "text-yellow-500" : "text-gray-300"}
              fill={index < rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      );

    return (

      
        <div className="max-w-4xl mx-auto p-4">
              <h2 className="text-4xl p-4 text-violet-500">Patient Feedbacks</h2>
               <div className="grid grid-cols-3 gap-4">
                {
                     feedback?.map((item)=>(
                        <div key={item?._id} className="flex flex-col p-4 bg-white rounded-lg shadow-md border items-start">
                              <div className="font-semibold text-xl">{item?.patientForm?.patientname}</div>
                              <div>{item?.patientForm?.email}</div>
                              <div className="my-2">{renderRating(item?.feedbackForm?.rating || 0)}</div>
                              <div className="text-gray-700">{item?.feedbackForm?.feedback || "No comments"}</div>
                        </div>
                     ))
                }
                </div>
        </div>

    )
}

export default Feedback;