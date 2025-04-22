import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const Feedback = ({ doctor }) => {
  const [feedback, setFeedback] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 6;

  useEffect(() => {
    if (doctor?._id) {
      fetchFeedback();
    }
  }, [doctor?._id]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/appointments/getAppointmentByDoctorId/${doctor._id}`,{withCredentials:true}
      );

      if (response.data.ok) {
        setFeedback(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderRating = (rating) => (
    <div className="flex items-center gap-1">
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

  const totalPages = Math.ceil(feedback?.length / feedbacksPerPage);
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentAppointment = feedback?.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-4 m-4 mb-4 border border-blue-400 rounded-lg shadow-lg">
      <h3 className="text-2xl lg:text-4xl  text-center font-bold mb-10 text-indigo-700">
        Patients Feedbacks
      </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAppointment?.map((item) => (
            <div
              key={item?._id}
              className="flex flex-col p-5 bg-white rounded-xl shadow-md border hover:shadow-lg transition-all"
            >
              <div className="text-lg font-semibold text-gray-800">
                {item?.patientForm?.patientname}
              </div>
              <div className="text-sm truncate  text-gray-600">
                {item?.patientForm?.email}
              </div>
              <div className="my-2">
                {renderRating(item?.feedbackForm?.rating || 0)}
              </div>
              <div className="text-gray-700 truncate  text-sm">
                {item?.feedbackForm?.feedback || "No comments"}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex md:mb-3 justify-center mt-8">
          <div className="flex items-center justify-center space-x-3 border border-gray-300 rounded-lg px-6 py-3 shadow-lg bg-white w-full max-w-md">
            <button
              className="px-4 py-2 rounded-full text-sm md:text-xl font-semibold bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>
            <span className="px-4 py-2 md:text-xl  rounded-full bg-indigo-500 text-white text-sm font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 hover:bg-gray-300 md:text-xl  disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

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
