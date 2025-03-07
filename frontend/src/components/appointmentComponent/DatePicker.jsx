import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const DatePicker = ({ selectedDoctor,selectedDate, setSelectedDate,selectedTime,setSelectedTime, onNext, onPrev }) => {
 // const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  const [timeSlot,setTimeSlot]=useState([]);
   console.log(selectedDoctor);
    useEffect(()=>{
        getAvailableTimeSlots();
    },[]);
    const getAvailableTimeSlots = async ()=>{
       try{
             const response = await axios.post("http://localhost:5001/doctorprofile/getTimeSlots", {_id:selectedDoctor._id});
              console.log(response.data.result);
             setTimeSlot(response.data.result);
             console.log(timeSlot);
       }catch(error)
       {
          console.log(error);
       }
    }

    return (
      <div className="flex flex-col justify-center items-center w-full w-screen  p-3">
        {/* <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        /> */}
       
        <h2 className="text-2xl font-bold mb-6">Select a Time Slot</h2>
        <div className="mt-3 mb-3">

        {timeSlot.map((slot) => (
                    <div key={slot._id} className="bg-white p-6 rounded-lg shadow-md mt-3 mb-3">
                      
                        <div className="space-y-2">
                            <button onClick={()=>setSelectedDate(new Date(slot.date).toLocaleDateString())} className="bg-indigo-700 text-white py-2 px-4 rounded-md"><span className="font-medium">Date:</span> {new Date(slot.date).toLocaleDateString()}</button>
                            <div>
                                <h3 className="font-medium mt-2 mb-2">Slots:</h3>
                                 <div className="grid grid-cols-3 gap-4">
                                    {slot.slot.map((time, idx) => (
                                        <div key={time._id} onClick={()=>setSelectedTime(`${new Date(time.start).toLocaleTimeString()} - ${new Date(time.end).toLocaleTimeString()}`)} className="ml-4   p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            <span className="font-medium">Slot {idx + 1}:</span> {new Date(time.start).toLocaleTimeString()} - {new Date(time.end).toLocaleTimeString()} ({time.status})
                                        </div>
                                    ))}
                                  </div>
                            </div>
                        </div>
                    </div>
                ))}
          {/* {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-4 border rounded-md ${
                selectedTime === time ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-200"
              }`}
            >
              {time}
            </button>
          ))} */}
       
        </div>
        <div className="flex justify-between mt-6 w-full">
          <button onClick={onPrev}
          
            className="bg-gray-500 text-white py-2 px-4 rounded-md">
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