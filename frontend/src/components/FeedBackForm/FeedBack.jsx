import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
// import axios from "axios";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    console.log("Neel");
    e.preventDefault();
    if (rating === 0 || feedback.trim() === "") return;
    try {
    //   await axios.post("http://localhost:5000/api/feedback", {
    //     rating,
    //     feedback,
    //   });
      toast.success("Feedback submitted successfully!",{
        position:"top-center"
      });
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
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
                  currentRating <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(currentRating)}
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
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <button 
          onClick={handleSubmit} 
          className={`w-full mt-4 py-2 px-4 rounded-md transition duration-200 ${
            rating > 0 && feedback.trim() !== "" 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`} 
          disabled={rating === 0 || feedback.trim() === ""}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;