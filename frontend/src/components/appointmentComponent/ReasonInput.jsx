const ReasonInput = ({ reason, setReason, onSubmit, onPrev }) => {
    return (
      <div className="w-96">
        <h2 className="text-2xl font-bold mb-6">Reason for Appointment</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
          placeholder="Enter your reason..."
        />
        <div className="flex justify-between mt-6">
          <button onClick={onPrev} className="bg-gray-500 text-white py-2 px-4 rounded-md">
            Back
          </button>
          <button
            onClick={() => onSubmit()}
            disabled={!reason}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md disabled:bg-indigo-300"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
  
  export default ReasonInput;