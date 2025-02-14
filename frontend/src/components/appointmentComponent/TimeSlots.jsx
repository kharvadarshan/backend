const TimeSlots = ({ selectedTime, setSelectedTime, onNext, onPrev }) => {
    const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  
    return (
      <div className="w-96">
        <h2 className="text-2xl font-bold mb-6">Select a Time Slot</h2>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-4 border rounded-md ${
                selectedTime === time ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-200"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={onPrev} className="bg-gray-500 text-white py-2 px-4 rounded-md">
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!selectedTime}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md disabled:bg-indigo-300"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default TimeSlots;