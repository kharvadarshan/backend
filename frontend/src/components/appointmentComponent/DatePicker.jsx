const DatePicker = ({ selectedDate, setSelectedDate, onNext, onPrev }) => {
    return (
      <div className="w-96 ">
        <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex justify-between mt-6">
          <button onClick={onPrev} className="bg-gray-500 text-white py-2 px-4 rounded-md">
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!selectedDate}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md disabled:bg-indigo-300"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default DatePicker;