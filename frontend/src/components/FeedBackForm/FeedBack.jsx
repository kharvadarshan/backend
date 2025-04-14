import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const FeedbackForm = ({appointmentId,onSubmitSuccess}) => {
 
  const [hover, setHover] = useState(0);
 
  
  const [feedbackForm,setFeedbackForm] =useState({
    appointmentId:appointmentId,
    rating:0,
    feedback:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(feedbackForm);
    try {
     const response = await axios.post(`${import.meta.env.VITE_API_URL}/appointments/giveFeedback`,feedbackForm);
     
      if(response.data.ok)
        {
          onSubmitSuccess();
          toast.success("Feedback submitted successfully!",{
            position:"top-center"
          });
          setFeedbackForm({...feedbackForm,rating:0,feedback:""});
        }
         
    } catch (error) {
      console.error("Error submitting feedback", error);
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Give Your Feedback</h2>
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                size={30}
                className={`cursor-pointer transition-colors duration-200 ${
                  currentRating <= (hover || feedbackForm.rating) ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setFeedbackForm({...feedbackForm,rating:currentRating})}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
              />
            );
          })}
        </div>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="Write your feedback..."
          value={feedbackForm.feedback}
          onChange={(e) => setFeedbackForm({...feedbackForm,feedback:e.target.value})}
        ></textarea>
        <button 
          onClick={handleSubmit} 
          className={`w-full mt-4 py-2 px-4 rounded-md transition duration-200 ${
            feedbackForm.rating > 0 && feedbackForm.feedback.trim() !== "" 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`} 
          disabled={feedbackForm.rating === 0 || feedbackForm.feedback.trim() === ""}
        >
          Submit Feedback
        </button>
      </div>
    // </div>
  );
};

export default FeedbackForm;